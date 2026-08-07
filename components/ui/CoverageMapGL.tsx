"use client";

import { useEffect, useRef } from "react";
import { routes } from "@/lib/routes";
import type { CountyGroup, CountyId } from "@/lib/coverage";
import "mapbox-gl/dist/mapbox-gl.css";

/*
  Live Mapbox coverage map. Rendered only when NEXT_PUBLIC_MAPBOX_TOKEN is set
  (CoverageMap falls back to a schematic SVG otherwise). Loaded via next/dynamic
  with ssr:false, so mapbox-gl (which needs window) never runs on the server.

  One marker per city, colored by county and linking to that city's page.
  Selecting a county in the control panel dims the others and zooms to fit.

  Markers are added as soon as the map exists, NOT on the 'load' event: mapbox
  v3 defers 'load' when the map is offscreen at init (this widget is usually
  below the fold), and markers are DOM overlays that do not need the style.
*/

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface CoverageMapGLProps {
  groups: CountyGroup[];
  selected: CountyId | "all";
  countyColor: Record<CountyId, string>;
  homeSlug: string;
}

// A little padding around a set of cities, returned as a Mapbox bounds array.
function boundsOf(
  cities: { lat: number; lng: number }[],
): [[number, number], [number, number]] | null {
  if (cities.length === 0) return null;
  const lats = cities.map((c) => c.lat);
  const lngs = cities.map((c) => c.lng);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

export default function CoverageMapGL({
  groups,
  selected,
  countyColor,
  homeSlug,
}: CoverageMapGLProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ el: HTMLElement; countyId: CountyId }[]>([]);
  const readyRef = useRef(false);

  const allCities = groups.flatMap((g) => g.cities);

  // Initialize the map once.
  useEffect(() => {
    if (!TOKEN || !containerRef.current) return;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;
    let cleanupExtra = () => {};

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled || !containerRef.current) return;
      mapboxgl.accessToken = TOKEN;

      map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-80.15, 26.35],
        zoom: 8,
        cooperativeGestures: true,
        dragRotate: false,
        pitchWithRotate: false,
        attributionControl: true,
      });
      mapRef.current = map;
      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right",
      );

      // Add a marker + popup for every city, right away.
      for (const city of allCities) {
        const el = document.createElement("div");
        el.className = "gce-marker";
        if (city.slug === homeSlug) el.classList.add("gce-marker--home");
        el.style.setProperty("--marker-color", countyColor[city.countyId]);

        const label =
          city.slug === homeSlug ? `${city.name} (home base)` : city.name;
        const popup = new mapboxgl.Popup({
          offset: 16,
          closeButton: false,
        }).setHTML(
          `<a class="gce-map-popup" href="${routes.city(
            city.slug,
          )}"><span>${label}</span><span class="gce-map-popup__cta">View page &rarr;</span></a>`,
        );

        new mapboxgl.Marker({ element: el })
          .setLngLat([city.lng, city.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push({ el, countyId: city.countyId });
      }

      const b = boundsOf(allCities);
      if (b) map.fitBounds(b, { padding: 48, maxZoom: 11, duration: 0 });

      // Mapbox pauses rendering while the map is hidden or off-screen, so a map
      // created far down the page (or in a background tab) can stay blank until
      // something forces a frame. Nudge a resize + repaint whenever the widget
      // scrolls into view or the tab becomes visible.
      const nudge = () => {
        try {
          map.resize();
          map.triggerRepaint();
        } catch {
          // map may already be gone
        }
      };
      map.once("idle", nudge);
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) nudge();
        },
        { rootMargin: "200px" },
      );
      if (containerRef.current) io.observe(containerRef.current);
      document.addEventListener("visibilitychange", nudge);
      cleanupExtra = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", nudge);
      };

      readyRef.current = true;
      applySelection(selected);
    })();

    return () => {
      cancelled = true;
      readyRef.current = false;
      markersRef.current = [];
      cleanupExtra();
      if (map) map.remove();
      mapRef.current = null;
    };
    // Init once; selection changes are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dim non-selected pins and zoom to fit the active county.
  function applySelection(sel: CountyId | "all") {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    // Show only the selected county's pins (hide the rest) so the map does not
    // look cluttered. "All" shows every pin.
    for (const m of markersRef.current) {
      const active = sel === "all" || m.countyId === sel;
      m.el.style.display = active ? "" : "none";
    }
    const scope =
      sel === "all" ? allCities : allCities.filter((c) => c.countyId === sel);
    const b = boundsOf(scope);
    if (b) map.fitBounds(b, { padding: 60, maxZoom: 12, duration: 700 });
  }

  useEffect(() => {
    applySelection(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
