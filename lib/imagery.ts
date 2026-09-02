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
  "electrical-panel-upgrade": "panel-leviton-indoor",
  "electrical-service-rebuild": "work-service-subpanels",
  "emergency-electrician": "emergency-burned-main",
  "commercial-lighting": "commercial-lighting-after",
  "pool-electrical": "pool-spa-dusk",
  "ev-charger-installation": "ev-charger-home",
  "meter-bank-replacement": "meter-upgrade-finished",
  "lighting-fans-outlets": "work-residential-dusk",
  "surge-protection": "surge-device",
  "electrical-safety-check": "inspection-panel-check",
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
  "work-panel-replace": "A Federal Pacific Stab-Lok load center found behind a panel cover on a South Florida service call",
  "work-panel-rewire": "An overcrowded residential panel interior with decades of added circuits",
  "work-panel-old": "An aged residential panel interior with corrosion and mixed breakers",
  "work-residential-dusk": "Landscape and palm uplighting on a South Florida home at dusk",
  "work-bucket-truck": "The Ghost Crown Electric bucket truck at a South Florida job site",
  "meter-fire-before": "A nine-meter bank and fire-damaged exterior wall before the Ghost Crown Electric rebuild",
  "meter-fire-after": "The same nine-meter bank rebuilt and the wall repaired after the fire",
  "meter-burnout-before": "Nine electrical meters melted and burned out of their sockets after a fire, with heavy soot on the wall behind them",
  "meter-burnout-after": "The same wall with a new nine-meter bank installed, every meter numbered and back in service",
  "meter-fire-after-crop": "The rebuilt nine-meter bank on the repaired wall after the fire",
  "meter-upgrade-finished": "A rebuilt multi-meter service with a new Eaton emergency disconnect, installed by Ghost Crown Electric",
  "panel-leviton-indoor": "A new Leviton load center installed and labeled by Ghost Crown Electric, every breaker marked by room",
  "panel-leviton-closed": "The finished Leviton panel closed and flush in the wall, with a clear window over the breakers",
  "panel-leviton-outdoor": "A new outdoor Leviton 200 amp panel installed by Ghost Crown Electric on a stucco wall",
  "panel-leviton-interior": "Inside a new Leviton panel: clean conductors, labeled breakers, and a full ground bar",
  "ev-charger-home": "A Level 2 EV charger installed on the stucco wall of a South Florida home, cable plugged into a parked electric SUV",
  "surge-device": "A whole home surge protective device mounted beside an open residential panel and wired to its own breaker",
  "safety-inspection": "A gloved hand testing a breaker terminal with a digital multimeter inside an open residential panel",
  "recessed-lighting": "New recessed LED lights glowing in a bright South Florida living room, a step ladder below",
  "patio-fan": "A new outdoor ceiling fan on a covered patio beside a screened pool enclosure",
  "gfci-outlet": "A newly installed white GFCI outlet in a kitchen subway tile backsplash",
  "bucket-truck-lift": "The Ghost Crown Electric bucket truck with its boom fully extended at a South Florida commercial plaza",
  "truck-branded-front": "The Ghost Crown Electric bucket truck, decaled with the crown logo, company name, and phone number, parked at a commercial building",
  "truck-branded-lift": "The Ghost Crown Electric bucket truck with its boom fully extended to a parking lot pole light at a South Florida plaza",
  "pool-equipment-pad": "A South Florida pool equipment pad with pump, filter, and heater, fed from a weatherproof sub-panel and timer on the wall",
  "pool-bonding-lug": "A bronze bonding lug clamped to a pool ladder rail with bare copper bonding wire across a travertine deck",
  "emergency-night-call": "An exterior electrical panel open at night on a stucco wall, lit by a work light on the ground",
  "safety-inspection-v2": "A digital multimeter clipped to an open residential panel with its leads on a breaker terminal, reading 120 volts",
  "inspection-panel-check": "A Ghost Crown Electric electrician crouched at an open residential panel, testing a breaker with a multimeter",
  "meter-bank-after-clean": "The rebuilt nine-meter bank on a freshly painted white wall, every position numbered and back in service",
  "pool-spa-dusk": "A South Florida pool and raised spa at blue hour, underwater lights, a lit waterfall feature, and landscape lighting inside a screened enclosure",
  "surge-exterior-main": "A whole home surge protective device mounted beside the main disconnect below the meter on a South Florida home",
  "pool-spa-day": "A South Florida pool and raised spa in bright daylight, waterfall running, inside a screened enclosure",
  "landscape-lighting-day": "A new brass path light and palm uplight fixture set in a mulch bed beside a South Florida home in daylight",
  "emergency-burned-main": "An exterior main disconnect open in daylight, showing a scorched breaker and melted lug from an overheated connection",
  "emergency-tripped-panel": "A residential panel with the door open and the main breaker in the tripped position, in daylight",
  "surge-status-light": "Close up of a whole home surge protective device beside a residential panel, its green status light lit",
};

/*
  Before and after pairs for service pages that have one. The template shows
  these as a drag slider beside the definition copy, and the photo band then
  carries the full gallery. Both frames must share the same crop so the wipe
  reads as one wall.
*/
export interface BeforeAfterPair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: string;
}

const SERVICE_BEFORE_AFTER: Record<
  string,
  { before: string; after: string; caption: string }
> = {
  "meter-bank-replacement": {
    before: "meter-burnout-before",
    after: "meter-bank-after-clean",
    caption:
      "Drag the slider: nine meters melted out of their sockets, and the same wall rebuilt, repainted, and back in service.",
  },
};

export function serviceBeforeAfter(slug: string): BeforeAfterPair | null {
  const pair = SERVICE_BEFORE_AFTER[slug];
  if (!pair) return null;
  return {
    before: resolve(pair.before),
    after: resolve(pair.after),
    caption: pair.caption,
  };
}

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
      name: "panel-leviton-outdoor",
      caption:
        "A new outdoor 200 amp Leviton panel. Weather rated, labeled, permitted, and inspected.",
      real: true,
    },
    {
      name: "work-panel-replace",
      caption:
        "What we usually find behind the old cover: a Federal Pacific Stab-Lok that insurers flag on sight.",
      real: true,
    },
    {
      name: "panel-leviton-interior",
      caption:
        "Inside the new panel: clean conductors, every breaker labeled by room, and a full ground bar.",
      real: true,
    },
    {
      name: "panel-leviton-closed",
      caption:
        "Closed up and flush in the wall, with a window so you can check a breaker without opening it.",
      real: true,
    },
  ],
  "electrical-service-rebuild": [
    {
      name: "meter-upgrade-finished",
      caption:
        "A completed service and meter upgrade: new meter bank, new emergency disconnect, inspected and back on.",
      real: true,
    },
    {
      name: "work-service-rebuild",
      caption:
        "Mid-rebuild. Every conductor labeled before anything gets landed, because guessing is how people get hurt.",
      real: true,
    },
    {
      name: "panel-leviton-outdoor",
      caption:
        "The finished outdoor side: a new 200 amp panel set clean on the wall, ready for inspection.",
      real: true,
    },
    {
      name: "meter-fire-after",
      caption:
        "A nine-meter service rebuilt on a repaired wall, every family back on their own power.",
      real: true,
    },
  ],
  "emergency-electrician": [
    {
      name: "emergency-tripped-panel",
      caption:
        "A main that will not hold is telling you something. We find out what before we reset it.",
    },
    {
      name: "meter-fire-before",
      caption:
        "A fire took out a nine-meter bank and left a whole building without power.",
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
      name: "commercial-lighting-night",
      caption:
        "After, at night. Every letter back on and burning bright.",
      real: true,
    },
    {
      name: "truck-branded-lift",
      caption:
        "Pole lights, high signs, and parking lot work. Our own bucket truck reaches all of it.",
    },
  ],
  "pool-electrical": [
    {
      name: "pool-bonding-lug",
      caption:
        "Equipotential bonding at the ladder rail. This copper is what keeps stray voltage out of the water.",
    },
    {
      name: "pool-spa-day",
      caption:
        "The end result. A pool, a spa, and a water feature you can run without thinking about what is behind them.",
    },
  ],
  "ev-charger-installation": [
    {
      name: "panel-leviton-indoor",
      caption:
        "Every EV install starts at the panel. The capacity has to be there before a charger goes on the wall.",
      real: true,
    },
    {
      name: "work-service-subpanels",
      caption:
        "A residential service built to carry home charging and battery backup, permitted and inspected.",
      real: true,
    },
  ],
  "meter-bank-replacement": [
    {
      name: "meter-fire-after",
      caption:
        "The finished wall from the parking lot. Permit closed, and every family back on their own power.",
      real: true,
    },
    {
      name: "work-meter-bank",
      caption:
        "The part of a multi-tenant building nobody notices until the day it fails.",
      real: true,
    },
  ],
  "lighting-fans-outlets": [
    {
      name: "recessed-lighting",
      caption:
        "Recessed LED lighting laid out to the room, wired, and patched in clean.",
    },
    {
      name: "patio-fan",
      caption:
        "A patio fan on a fan-rated box and a wet-rated motor, built for the weather that reaches it.",
    },
    {
      name: "gfci-outlet",
      caption:
        "GFCI protection wherever water lives: kitchens, baths, garages, and outdoors.",
    },
    {
      name: "landscape-lighting-day",
      caption:
        "Landscape and path lighting on a timer, with the low voltage runs buried and protected.",
    },
  ],
  "surge-protection": [
    {
      name: "surge-exterior-main",
      caption:
        "Where we mount it: at the main disconnect below the meter, so every circuit in the house sits behind it.",
    },
    {
      name: "panel-leviton-outdoor",
      caption:
        "Outdoor panels take the hit first. The device mounts right beside them, protected from the weather.",
      real: true,
    },
    {
      name: "surge-status-light",
      caption:
        "The green light means it is standing guard. When it goes dark, the device has taken a hit for you.",
    },
  ],
  "electrical-safety-check": [
    {
      name: "safety-inspection-v2",
      caption:
        "Every breaker gets tested under a meter, because the problems that matter are the ones you cannot see.",
    },
    {
      name: "work-panel-old",
      caption:
        "Aged panels are the first thing we open, and the most common thing an insurer asks about.",
      real: true,
    },
    {
      name: "work-panel-replace",
      caption:
        "A Federal Pacific Stab-Lok behind the cover. Insurers flag these on sight.",
      real: true,
    },
    {
      name: "work-panel-rewire",
      caption:
        "Zinsco and Federal Pacific equipment gets its own line on the report, every time.",
      real: true,
    },
  ],
};

const SERVICE_FALLBACK = "panel-leviton-indoor";

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
