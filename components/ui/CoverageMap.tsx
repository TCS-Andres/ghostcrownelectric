"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import type { CountyGroup, CountyId } from "@/lib/coverage";

/*
  Service-area coverage widget.

  A glass control panel listing the counties we cover, paired with a stylized
  map of South Florida that projects every city page by its real latitude and
  longitude. Selecting a county highlights its region and pins and reveals its
  city links. The map is intentionally schematic, a brand illustration of our
  coverage, not a live street map, so it needs no external map service.

  Per the client (2026-08-12): actively promote Broward and Palm Beach, and do
  NOT market Miami-Dade as a co-equal county. He takes select Miami-Dade jobs
  but does not want that traffic, so Miami-Dade renders as a quiet footnote
  (down to North Miami Beach) rather than a selectable county card.
*/

// The county demoted to a footnote. Its pins stay on the map (the coverage is
// real) but it never gets a promoted, selectable card.
const EDGE_COUNTY: CountyId = "miami-dade";

const COUNTY_COLOR: Record<CountyId, string> = {
  "palm-beach": "#e6c98a", // gold
  broward: "#22cfea", // cyan (home county)
  "miami-dade": "#a3bcd4", // steel (southern edge)
};

// The live Mapbox map (client-only, loaded on demand). It renders only when a
// public token is configured (NEXT_PUBLIC_MAPBOX_TOKEN); otherwise we fall back
// to the schematic SVG below so the widget always works.
const CoverageMapGL = dynamic(() => import("./CoverageMapGL"), {
  ssr: false,
  loading: () => null,
});
const HAS_MAPBOX = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

// Map canvas in SVG user units. Portrait, because our coverage is a coastal
// corridor that runs north to south.
const W = 320;
const H = 460;
const PAD = 30;

interface CoverageMapProps {
  groups: CountyGroup[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  homeSlug?: string;
  className?: string;
}

export function CoverageMap({
  groups,
  eyebrow = "Coverage network",
  title = "Serving all of South Florida",
  subtitle = "Licensed electricians across all of Broward and Palm Beach, day or night. Pick a county to see the cities we cover.",
  homeSlug = "north-lauderdale",
  className,
}: CoverageMapProps) {
  const [selected, setSelected] = useState<CountyId | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  // If the live Mapbox map fails (bad/URL-restricted token, blocked network, no
  // WebGL), drop to the schematic SVG so the widget is never a blank box.
  const [glError, setGlError] = useState(false);

  const cities = useMemo(() => groups.flatMap((g) => g.cities), [groups]);
  const totalCities = cities.length;
  const promoted = groups.filter((g) => g.id !== EDGE_COUNTY);
  const edge = groups.find((g) => g.id === EDGE_COUNTY) ?? null;

  // Projection: convert lat/lng to canvas coordinates, preserving aspect with a
  // cosine correction on longitude so the shape does not stretch east to west.
  const project = useMemo(() => {
    const lats = cities.map((c) => c.lat);
    const lngs = cities.map((c) => c.lng);
    const latMin = Math.min(...lats);
    const latMax = Math.max(...lats);
    const lngMin = Math.min(...lngs);
    const lngMax = Math.max(...lngs);
    const kx = Math.cos(((latMin + latMax) / 2) * (Math.PI / 180));
    const worldW = (lngMax - lngMin) * kx || 1;
    const worldH = latMax - latMin || 1;
    const innerW = W - PAD * 2;
    const innerH = H - PAD * 2;
    const scale = Math.min(innerW / worldW, innerH / worldH);
    const drawW = worldW * scale;
    const drawH = worldH * scale;
    const offX = PAD + (innerW - drawW) / 2;
    const offY = PAD + (innerH - drawH) / 2;
    return {
      x: (lng: number) => offX + (lng - lngMin) * kx * scale,
      y: (lat: number) => offY + (latMax - lat) * scale,
    };
  }, [cities]);

  // Vertical band for each county, from its northernmost to southernmost pin.
  const bands = useMemo(
    () =>
      groups.map((group) => {
        const groupLats = group.cities.map((c) => c.lat);
        const top = project.y(Math.max(...groupLats)) - 16;
        const bottom = project.y(Math.min(...groupLats)) + 16;
        return {
          id: group.id,
          y: Math.max(6, top),
          height: Math.min(H - 12, bottom) - Math.max(6, top),
          name: group.short,
        };
      }),
    [groups, project],
  );

  const isActive = (id: CountyId) => selected === "all" || selected === id;
  const selectedGroup =
    selected === "all" ? null : groups.find((g) => g.id === selected) ?? null;

  return (
    <div
      className={cn(
        "grid gap-6 rounded-3xl border border-navy-600/60 bg-surface-dark p-4 text-ink-on-dark sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8",
        className,
      )}
    >
      {/* Control panel */}
      <div className="glass-dark flex flex-col rounded-2xl p-6">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-ink-on-dark sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted-on-dark">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSelected("all")}
            aria-pressed={selected === "all"}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition",
              selected === "all"
                ? "border-accent-bright/70 bg-white/10"
                : "border-navy-600/70 bg-white/5 hover:border-navy-600 hover:bg-white/10",
            )}
          >
            <span className="font-heading text-sm font-semibold text-ink-on-dark">
              All service areas
            </span>
            <span className="text-xs text-ink-muted-on-dark">
              {totalCities} cities
            </span>
          </button>

          {promoted.map((group) => {
            const active = selected === group.id;
            return (
              <div
                key={group.id}
                className={cn(
                  "rounded-xl border transition",
                  active
                    ? "border-accent-bright/70 bg-white/10"
                    : "border-navy-600/70 bg-white/5 hover:border-navy-600 hover:bg-white/10",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelected(active ? "all" : group.id)}
                  aria-pressed={active}
                  className="w-full px-4 py-3 text-left"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: COUNTY_COLOR[group.id] }}
                      />
                      <span className="font-heading text-sm font-semibold text-ink-on-dark">
                        {group.name}
                      </span>
                    </span>
                    <span className="text-xs text-ink-muted-on-dark">
                      {group.cities.length} cities
                    </span>
                  </span>
                  <span className="mt-1 block pl-5 text-xs text-ink-muted-on-dark">
                    Day or night
                  </span>
                </button>

                {active ? (
                  <div className="flex flex-wrap gap-1.5 px-4 pb-3 pl-9">
                    {group.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={routes.city(city.slug)}
                        onMouseEnter={() => setHovered(city.slug)}
                        onMouseLeave={() => setHovered(null)}
                        className="rounded-full border border-navy-600/70 bg-navy-800/60 px-2.5 py-1 text-xs font-medium text-ink-on-dark hover:border-accent-bright hover:text-accent-bright"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          {edge ? (
            <div className="rounded-xl border border-navy-600/40 bg-white/[0.03] px-4 py-3">
              <p className="text-xs leading-relaxed text-ink-muted-on-dark">
                Plus our nearest Miami-Dade neighbors, down to North Miami
                Beach.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {edge.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={routes.city(city.slug)}
                    onMouseEnter={() => setHovered(city.slug)}
                    onMouseLeave={() => setHovered(null)}
                    className="rounded-full border border-navy-600/50 bg-navy-800/40 px-2.5 py-1 text-xs font-medium text-ink-muted-on-dark hover:border-accent-bright hover:text-accent-bright"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-6 border-t border-navy-600/60 pt-5">
          <div>
            <div className="font-heading text-2xl font-semibold text-accent-bright">
              {totalCities}
            </div>
            <div className="text-xs uppercase tracking-wide text-ink-muted-on-dark">
              Cities
            </div>
          </div>
          <div>
            <div className="font-heading text-2xl font-semibold text-accent-bright">
              {promoted.length}
            </div>
            <div className="text-xs uppercase tracking-wide text-ink-muted-on-dark">
              Full counties
            </div>
          </div>
          <Link
            href={routes.serviceAreas}
            className="ml-auto text-sm font-semibold text-accent-bright hover:underline"
          >
            View all cities
          </Link>
        </div>
      </div>

      {/* Map */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-navy-600/60 bg-navy sm:aspect-[16/11] lg:aspect-auto lg:min-h-[420px]">
        {HAS_MAPBOX && !glError ? (
          <CoverageMapGL
            groups={groups}
            selected={selected}
            countyColor={COUNTY_COLOR}
            homeSlug={homeSlug}
            onError={() => setGlError(true)}
          />
        ) : (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label={`Map of the ${totalCities} cities Ghost Crown Electric serves across Broward and Palm Beach counties, south to North Miami Beach`}
        >
          <defs>
            <linearGradient id="cov-sky" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0e2f52" />
              <stop offset="100%" stopColor="#08203a" />
            </linearGradient>
            <linearGradient id="cov-ocean" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0e2f52" stopOpacity="0" />
              <stop offset="100%" stopColor="#0b2440" stopOpacity="0.9" />
            </linearGradient>
            <pattern
              id="cov-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0 L0 0 0 20"
                fill="none"
                stroke="#2a5c8f"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill="url(#cov-sky)" />
          <rect x="0" y="0" width={W} height={H} fill="url(#cov-grid)" />

          {/* Atlantic on the eastern edge */}
          <rect
            x={W - 66}
            y="0"
            width="66"
            height={H}
            fill="url(#cov-ocean)"
          />
          <text
            x={W - 14}
            y={H - 16}
            textAnchor="end"
            className="fill-ink-muted-on-dark"
            fontSize="9"
            letterSpacing="2"
            opacity="0.5"
          >
            ATLANTIC
          </text>

          {/* County bands */}
          {bands.map((band) => {
            const active = isActive(band.id);
            return (
              <g key={band.id}>
                <rect
                  x="10"
                  y={band.y}
                  width={W - 20}
                  height={band.height}
                  rx="14"
                  fill={COUNTY_COLOR[band.id]}
                  opacity={active ? 0.12 : 0.05}
                />
                <text
                  x="20"
                  y={band.y + 16}
                  fontSize="9"
                  letterSpacing="1.5"
                  className="uppercase"
                  fill={COUNTY_COLOR[band.id]}
                  opacity={active ? 0.85 : 0.35}
                >
                  {band.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* City pins */}
          {cities.map((city) => {
            const active = isActive(city.countyId);
            const isHome = city.slug === homeSlug;
            const isHovered = hovered === city.slug;
            const showLabel =
              isHovered || isHome || (selectedGroup && active);
            const cx = project.x(city.lng);
            const cy = project.y(city.lat);
            const color = COUNTY_COLOR[city.countyId];
            const r = isHome ? 5.5 : isHovered ? 5 : active ? 4 : 3;
            return (
              <g
                key={city.slug}
                opacity={active ? 1 : 0.35}
                onMouseEnter={() => setHovered(city.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <title>
                  {isHome ? `${city.name} (home base)` : city.name}
                </title>
                {(isHome || isHovered) && active ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 4}
                    fill={color}
                    opacity="0.25"
                  />
                ) : null}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  stroke="#08203a"
                  strokeWidth="1"
                />
                {isHome ? (
                  <circle cx={cx} cy={cy} r="1.8" fill="#08203a" />
                ) : null}
                {showLabel ? (
                  <text
                    x={cx + r + 4}
                    y={cy + 3}
                    fontSize="9"
                    fontWeight="600"
                    className="fill-ink-on-dark"
                  >
                    {isHome ? `${city.name} - home base` : city.name}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        )}
      </div>
    </div>
  );
}
