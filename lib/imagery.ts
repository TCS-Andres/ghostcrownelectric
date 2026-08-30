/*
  Central map of brand imagery. Editorial, atmospheric trade photography for the
  detail work, and golden-hour location imagery for the cities. Every service,
  city, and article maps to its own image, so nothing repeats across the site.

  These are category and location illustration, not photos of specific Ghost
  Crown jobs, people, or trucks. Alt text describes the image, never a proof
  claim. Real job and crew photography still supplements these (see
  PLACEHOLDERS.md).
*/

// One image per service. No two services share an image. Maps to the 10
// services (see SERVICE_SLUGS). Emergency uses the night scene and the safety
// check uses the inspection shot, so each hero shows the actual work rather
// than a generic pose. Pool and EV charging deliberately use equipment-only
// frames rather than crew photography, so the card reads as the work itself.
const SERVICE_IMAGE: Record<string, string> = {
  "electrical-panel-upgrade": "panel-upgrade",
  "electrical-service-rebuild": "work-service-rebuild",
  "emergency-electrician": "emergency-night",
  "commercial-lighting": "commercial-lighting-night",
  "pool-electrical": "pool-bonding",
  "ev-charger-installation": "ev-charger",
  "meter-bank-replacement": "work-meter-bank",
  "lighting-fans-outlets": "work-residential-dusk",
  "surge-protection": "surge-protection",
  "electrical-safety-check": "safety-check",
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
  // Real Ghost Crown job photography (client-supplied): a storefront sign
  // relight, before and after. Unlike the illustrative imagery above, these may
  // be described as actual Ghost Crown work.
  "commercial-lighting-before": "The Ghost Crown Electric bucket truck at a storefront sign repair in progress",
  "commercial-lighting-after": "The repaired storefront sign at dusk, every letter back in place",
  "commercial-lighting-night": "The storefront sign fully lit at night after the Ghost Crown relight",
  "work-service-rebuild": "A Ghost Crown Electric electrical service entrance rebuild in progress",
  "work-meter-bank": "A multi-tenant electrical meter bank serviced by Ghost Crown Electric",
  "work-service-upgrade": "A Ghost Crown Electric electrician rebuilding a residential electrical service",
  "work-service-subpanels": "A completed residential electrical service with meter, main panel, disconnects, and battery backup",
  "work-panel-replace": "A Federal Pacific Stab-Lok load center found behind a panel cover on a Broward County service call",
  "work-panel-rewire": "An overcrowded residential panel interior with decades of added circuits",
  "work-panel-old": "An aged residential panel interior with corrosion and mixed breakers",
  "work-residential-dusk": "Landscape and palm uplighting on a South Florida home at dusk",
  "work-bucket-truck": "The Ghost Crown Electric bucket truck at a South Florida job site",
  "meter-fire-before": "A nine-meter bank and fire-damaged exterior wall before the Ghost Crown Electric rebuild",
  "meter-fire-after": "The same nine-meter bank rebuilt and the wall repaired after the fire",
  "meter-burnout-before": "Nine electrical meters melted and burned out of their sockets after a fire, with heavy soot on the wall behind them",
  "meter-burnout-after": "The same wall with a new nine-meter bank installed, every meter numbered and back in service",
};

/*
  Supporting photography for each service page, so the templates read as trade
  pages rather than walls of text. The first entry sits beside the definition
  copy; the rest fill the photo band further down.

  `real: true` marks a genuine Ghost Crown job photo (client-supplied), which
  the template labels as our work. Everything without the flag is category
  illustration and its caption never claims to be a specific job.
*/
export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  real: boolean;
}

const SERVICE_GALLERY: Record<
  string,
  { name: string; caption: string; real?: boolean }[]
> = {
  "electrical-panel-upgrade": [
    {
      name: "work-panel-replace",
      caption:
        "A Federal Pacific Stab-Lok load center found behind the cover on a Broward service call. Insurers flag these on sight.",
      real: true,
    },
    {
      name: "work-panel-rewire",
      caption:
        "Decades of added circuits crowded into a panel that was never sized to carry them.",
      real: true,
    },
    {
      name: "work-panel-old",
      caption:
        "Corrosion, mixed breakers, and no room left to grow. This is the point where a repair stops being worth it.",
      real: true,
    },
  ],
  "electrical-service-rebuild": [
    {
      name: "work-service-upgrade",
      caption:
        "Our crew rebuilding a residential service, meter can to main disconnect, with the power off and the permit pulled.",
      real: true,
    },
    {
      name: "work-service-subpanels",
      caption:
        "The finished wall: new meter can, main panel, disconnects, and battery backup, all inspected.",
      real: true,
    },
    {
      name: "service-entrance",
      caption:
        "The service entrance is where the utility hands power to your building. Everything downstream depends on it.",
    },
  ],
  "emergency-electrician": [
    {
      name: "power-restoration",
      caption:
        "The moment the main goes back on. Most calls end right here, the same night.",
    },
    {
      name: "meter-fire-before",
      caption:
        "A fire took out a nine-meter bank and left a whole building without power.",
      real: true,
    },
    {
      name: "work-bucket-truck",
      caption:
        "Our truck on site the next morning. We own the equipment, so nothing waits on a rental.",
      real: true,
    },
  ],
  "commercial-lighting": [
    {
      name: "commercial-lighting-before",
      caption:
        "Before. A storefront sign with letters dark and our bucket truck already on site.",
      real: true,
    },
    {
      name: "commercial-lighting-after",
      caption:
        "After. The same sign at dusk with every letter back in place.",
      real: true,
    },
    {
      name: "work-bucket-truck",
      caption:
        "Pole lights, high signs, and parking lot work. We bring our own bucket truck to all of it.",
      real: true,
    },
  ],
  "pool-electrical": [
    {
      name: "pool-gfci",
      caption:
        "The poolside sub-panel and GFCI breaker. Everything within reach of the water lands here first.",
    },
    {
      name: "pool-repair",
      caption:
        "Equipment pad service: pump, heater, and the panel that feeds them, brought back to code together.",
    },
    {
      name: "pool-safety",
      caption:
        "The end result. A pool you can light up at night and stop thinking about.",
    },
  ],
  "ev-charger-installation": [
    {
      name: "panel-upgrade",
      caption:
        "Every EV install starts at the panel. The capacity has to be there before a charger goes on the wall.",
    },
    {
      name: "work-service-subpanels",
      caption:
        "A residential service built to carry home charging and battery backup, permitted and inspected.",
      real: true,
    },
    {
      name: "work-panel-replace",
      caption:
        "An older panel like this one cannot carry a 48 amp charger. We tell you that before you spend the money.",
      real: true,
    },
  ],
  "meter-bank-replacement": [
    {
      name: "meter-burnout-before",
      caption:
        "Before. Nine meters melted out of their sockets, and nine units in the dark for a week.",
      real: true,
    },
    {
      name: "meter-burnout-after",
      caption:
        "After. A new bank on the same wall, every position numbered and back in service.",
      real: true,
    },
    {
      name: "meter-fire-after",
      caption:
        "The finished wall from the parking lot. Permit closed, and every family back on their own power.",
      real: true,
    },
    {
      name: "meter-socket",
      caption:
        "A single meter socket. The same job at house scale, and just as unforgiving.",
    },
  ],
  "lighting-fans-outlets": [
    {
      name: "hero-electrician",
      caption:
        "Switches, dimmers, and outlets are only as good as the connections behind the plate.",
    },
    {
      name: "pool-safety",
      caption:
        "Outdoor and landscape lighting, wired on a timer and protected the way code requires.",
    },
    {
      name: "about-craft",
      caption:
        "Every fixture and device gets tested before we call it done.",
    },
  ],
  "surge-protection": [
    {
      name: "panel-upgrade",
      caption:
        "A whole home device lives at the main panel. That is the first line of defense for everything behind it.",
    },
    {
      name: "service-entrance",
      caption:
        "Most damaging surges arrive through the service entrance, so that is where we stop them.",
    },
    {
      name: "work-panel-replace",
      caption:
        "Older panels often have no surge protection at all, and nowhere to put it until the panel is replaced.",
      real: true,
    },
    {
      name: "hero-electrician",
      caption:
        "Installing one is about an hour at the panel, with the power off and the work done to code.",
    },
  ],
  "electrical-safety-check": [
    {
      name: "about-craft",
      caption:
        "Testing circuits with a meter, because the problems that matter are the ones you cannot see.",
    },
    {
      name: "old-panel",
      caption:
        "Aged panels are the first thing we open, and the most common thing an insurer asks about.",
    },
    {
      name: "zinsco-panel",
      caption:
        "Zinsco and Federal Pacific equipment gets its own line on the report, every time.",
    },
    {
      name: "work-panel-rewire",
      caption:
        "Double taps, mixed breakers, and crowded gutters. All of it goes to you in writing.",
      real: true,
    },
  ],
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

// Supporting photography for a service page. Returns an empty array for any
// service without a mapped set, so the template skips those sections cleanly.
export function serviceGallery(slug: string): GalleryPhoto[] {
  return (SERVICE_GALLERY[slug] ?? []).map((photo) => ({
    ...resolve(photo.name),
    caption: photo.caption,
    real: photo.real === true,
  }));
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
