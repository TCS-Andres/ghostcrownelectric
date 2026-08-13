/*
  Central map of brand imagery. Editorial, atmospheric trade photography for the
  detail work, and golden-hour location imagery for the cities. Every service,
  city, and article maps to its own image, so nothing repeats across the site.

  These are category and location illustration, not photos of specific Ghost
  Crown jobs, people, or trucks. Alt text describes the image, never a proof
  claim. Real job and crew photography still supplements these (see
  PLACEHOLDERS.md).
*/

// One image per service. No two services share an image. Uses the on-brand
// Damean action photography for the human-facing services, with illustration
// for surge protection. Maps to the 7 consolidated services (see SERVICE_SLUGS).
const SERVICE_IMAGE: Record<string, string> = {
  "electrical-panel-upgrade": "damean-panel",
  "electrical-service-rebuild": "service-entrance",
  "emergency-electrician": "damean-rooftop",
  "commercial-lighting": "commercial-lighting-night",
  "pool-electrical": "damean-pool",
  "ev-charger-installation": "damean-ev",
  "meter-bank-replacement": "damean-meter",
  "lighting-fans-outlets": "damean-recessed",
  "surge-protection": "surge-protection",
  "electrical-safety-check": "damean-consult",
};

// One golden-hour location image per city.
const CITY_IMAGE: Record<string, string> = {
  "north-lauderdale": "city-north-lauderdale",
  "fort-lauderdale": "city-fort-lauderdale",
  "lauderhill": "city-lauderhill",
  "tamarac": "city-tamarac",
  "sunrise": "city-sunrise",
  "plantation": "city-plantation",
  "pompano-beach": "city-pompano-beach",
  "hollywood": "city-hollywood",
};

// One hero image per article.
const POST_IMAGE: Record<string, string> = {
  "zinsco-federal-pacific-panels-insurance": "blog-panels-insurance",
  "pool-grounding-and-bonding-explained": "blog-pool-grounding",
  "what-a-residential-service-rebuild-involves": "blog-service-rebuild",
};

// Descriptive alt text per image.
const IMAGE_ALT: Record<string, string> = {
  "hero-electrician": "An electrician installing breakers inside a modern electrical panel",
  "panel-upgrade": "A clean, modern electrical panel with neatly organized breakers",
  "zinsco-panel": "An aged Zinsco-style electrical panel of the kind insurers flag for replacement",
  "old-panel": "An older electrical panel of the kind insurers often flag for replacement",
  "service-entrance": "The exterior electrical service entrance of a home at dusk",
  "emergency-night": "An electrician working at night by warm task light",
  "power-restoration": "A hand resetting a main breaker as power is restored",
  "meter-socket": "A single electrical meter socket on a home exterior wall",
  "meter-bank": "A bank of electrical meter sockets on the exterior of a building",
  "ev-charger": "A modern EV charger mounted on the exterior wall of a home",
  "safety-check": "An open electrical panel being inspected during a safety check",
  "surge-protection": "A panel-mounted whole-home surge protection device",
  "pool-bonding": "Pool equipotential bonding, a grounding lug and copper wire on pool equipment",
  "pool-repair": "A poolside equipment pad with pump, heater, and electrical at dusk",
  "pool-gfci": "A GFCI breaker and a poolside electrical sub-panel",
  "pool-safety": "A backyard swimming pool lit softly at dusk",
  "about-craft": "An electrician testing a circuit with a multimeter",
  "cta-texture-blue": "",
  "city-north-lauderdale": "A North Lauderdale residential neighborhood at golden hour",
  "city-fort-lauderdale": "A Fort Lauderdale waterfront neighborhood at golden hour",
  "city-lauderhill": "An established Lauderhill residential community at golden hour",
  "city-tamarac": "A Tamarac community of homes and palms at golden hour",
  "city-sunrise": "A Sunrise suburban community at golden hour",
  "city-plantation": "A leafy Plantation neighborhood at golden hour",
  "city-pompano-beach": "A Pompano Beach coastal neighborhood at golden hour",
  "city-hollywood": "A historic Hollywood, Florida neighborhood at golden hour",
  "blog-panels-insurance": "A close inspection of an aged residential electrical panel",
  "blog-pool-grounding": "An underwater view of a pool light and a bonded metal handrail",
  "blog-service-rebuild": "A residential electrical service rebuild in progress",
  "damean-panel": "A Ghost Crown Electric electrician testing a residential electrical panel",
  "damean-meter": "A Ghost Crown Electric electrician inspecting a building's meter bank",
  "damean-rooftop": "A Ghost Crown Electric electrician servicing a rooftop electrical disconnect",
  "damean-pool": "A Ghost Crown Electric electrician correcting pool bonding and grounding",
  "damean-ev": "A Ghost Crown Electric electrician installing a home EV charger",
  "damean-consult": "A Ghost Crown Electric electrician meeting a homeowner at the door",
  "damean-switchgear": "A Ghost Crown Electric electrician testing commercial switchgear",
  "damean-cabletray": "A Ghost Crown Electric electrician running cable in a commercial ceiling",
  "damean-recessed": "A Ghost Crown Electric electrician installing recessed lighting in a ceiling",
  "damean-outlet": "A Ghost Crown Electric electrician wiring a new wall outlet",
  // Real Ghost Crown job photography (client-supplied): a storefront sign
  // relight, before and after. Unlike the illustrative imagery above, these may
  // be described as actual Ghost Crown work.
  "commercial-lighting-before": "The Ghost Crown Electric bucket truck at a storefront sign repair in progress",
  "commercial-lighting-after": "The repaired storefront sign at dusk, every letter back in place",
  "commercial-lighting-night": "The storefront sign fully lit at night after the Ghost Crown relight",
};

const SERVICE_FALLBACK = "panel-upgrade";

export function imagePath(name: string): string {
  return `/images/${name}.jpg`;
}

export function imageAlt(name: string): string {
  return IMAGE_ALT[name] ?? "";
}

function resolve(name: string): { src: string; alt: string } {
  return { src: imagePath(name), alt: imageAlt(name) };
}

export function serviceImage(slug: string): { src: string; alt: string } {
  return resolve(SERVICE_IMAGE[slug] ?? SERVICE_FALLBACK);
}

// Only the original set of cities has bespoke golden-hour photography. Newer
// service-area cities return null so their page renders an honest text hero
// rather than a mislabeled, repeated image.
export function cityImage(slug: string): { src: string; alt: string } | null {
  const name = CITY_IMAGE[slug];
  return name ? resolve(name) : null;
}

// Articles without a mapped image return null so the template can skip cleanly.
export function postImage(slug: string): { src: string; alt: string } | null {
  const name = POST_IMAGE[slug];
  return name ? resolve(name) : null;
}
