import type { Service } from "@/lib/content";

/*
  Home-page service categories. Every service maps into exactly one of these six
  buckets, so the home can show six category cards instead of a wall of
  individual services. The full list lives on the services index, grouped by
  these same categories. Order here is the display order.
*/

export interface ServiceCategory {
  /** Anchor id used for deep links from the home cards (/services#<id>). */
  id: string;
  label: string;
  blurb: string;
  /** Representative image filename in /public/images (no extension). */
  image: string;
  serviceSlugs: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "panels-and-service-upgrades",
    label: "Panels & Service Upgrades",
    blurb:
      "Panel upgrades, Zinsco and Federal Pacific replacements, and full service rebuilds.",
    image: "damean-panel",
    serviceSlugs: [
      "electrical-panel-upgrade",
      "zinsco-panel-replacement",
      "federal-pacific-panel-replacement",
      "electrical-service-rebuild",
    ],
  },
  {
    id: "meters-and-power-equipment",
    label: "Meters & Power Equipment",
    blurb:
      "Meter socket and multi-unit meter bank replacement for homes and buildings.",
    image: "damean-meter",
    serviceSlugs: ["meter-socket-replacement", "meter-bank-replacement"],
  },
  {
    id: "emergency-and-restoration",
    label: "24/7 Emergency & Restoration",
    blurb:
      "Day or night power restoration and emergency electrical response, when it cannot wait.",
    image: "damean-rooftop",
    serviceSlugs: ["emergency-electrician", "emergency-power-restoration"],
  },
  {
    id: "pool-electrical-safety",
    label: "Pool Electrical Safety",
    blurb:
      "Grounding, bonding, and repairs that keep the water and everyone in it safe.",
    image: "damean-pool",
    serviceSlugs: [
      "pool-grounding-bonding-inspection",
      "pool-electrical-repair",
      "pool-gfci-breaker-replacement",
      "pool-electrical-service-rebuild",
    ],
  },
  {
    id: "ev-generators-and-surge",
    label: "EV, Generators & Surge",
    blurb:
      "EV chargers, standby generators, and whole-home surge protection.",
    image: "damean-ev",
    serviceSlugs: [
      "ev-charger-installation",
      "generator-installation",
      "whole-home-surge-protection",
    ],
  },
  {
    id: "safety-inspections",
    label: "Safety Inspections",
    blurb:
      "A defined walkthrough of your panel, meter socket, and overall system condition.",
    image: "damean-consult",
    serviceSlugs: ["electrical-safety-check"],
  },
];

export interface CategoryWithServices extends ServiceCategory {
  services: Service[];
}

/*
  Resolve each category's services from the loaded set, in listed order, dropping
  any that are not present. Also returns any service that is not mapped to a
  category, so a newly added service is never silently hidden from the index.
*/
export function categorizeServices(all: Service[]): {
  categories: CategoryWithServices[];
  uncategorized: Service[];
} {
  const bySlug = new Map(all.map((service) => [service.slug, service]));
  const claimed = new Set<string>();

  const categories = SERVICE_CATEGORIES.map((category) => {
    const services = category.serviceSlugs
      .map((slug) => {
        claimed.add(slug);
        return bySlug.get(slug);
      })
      .filter((service): service is Service => Boolean(service));
    return { ...category, services };
  }).filter((category) => category.services.length > 0);

  const uncategorized = all.filter((service) => !claimed.has(service.slug));
  return { categories, uncategorized };
}
