import {
  CITY_SLUGS,
  getCities,
  type Service,
  type ServiceTier,
} from "@/lib/content";

/*
  Small cross-page link and grouping helpers.

  These let the service and city templates link to the full set of pages even
  while some content files are still being written. City links, in particular,
  are derived from the master slug list so every service page can point at all
  eight city pages before the city JSON lands on disk.
*/

// Turn a slug such as "pompano-beach" into a display name "Pompano Beach".
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface CityLink {
  slug: string;
  name: string;
}

// All eight service-area cities in canonical order. Prefers the real name from a
// loaded city file, and falls back to a title-cased slug so links are present
// even before the city content exists.
export function cityLinks(): CityLink[] {
  const loaded = new Map(getCities().map((city) => [city.slug, city.name]));
  return CITY_SLUGS.map((slug) => ({
    slug,
    name: loaded.get(slug) ?? slugToTitle(slug),
  }));
}

// Display order and warm labels for the service index groups. Money services
// lead, then the pool cluster, then safety, then everyday core work.
export const SERVICE_GROUPS: {
  tier: ServiceTier;
  label: string;
  blurb: string;
}[] = [
  {
    tier: "money",
    label: "Panels, meters, and service upgrades",
    blurb:
      "The work carriers and inspectors ask about most, priced once and done right.",
  },
  {
    tier: "pool",
    label: "Pool electrical",
    blurb:
      "Grounding, bonding, and repairs that keep the water and everyone in it safe.",
  },
  {
    tier: "safety",
    label: "Safety and protection",
    blurb: "Checks and protection that quietly look after your home and family.",
  },
  {
    tier: "core",
    label: "More electrical work",
    blurb: "Everyday electrical needs handled by our own in-house crew.",
  },
];

export interface ServiceGroup {
  tier: ServiceTier;
  label: string;
  blurb: string;
  services: Service[];
}

// Partition services into their display groups, preserving master order within
// each group and dropping any group that has no services yet.
export function groupServices(services: Service[]): ServiceGroup[] {
  return SERVICE_GROUPS.map((group) => ({
    ...group,
    services: services.filter((service) => service.tier === group.tier),
  })).filter((group) => group.services.length > 0);
}

// The first sentence of a longer piece of prose, used as a one-line card hook.
export function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.*?[.!?])(\s|$)/);
  return match ? match[1] : trimmed;
}
