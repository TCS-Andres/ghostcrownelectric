/*
  Central map of brand imagery. Editorial, atmospheric trade photography that
  illustrates a service category. These are not photos of specific Ghost Crown
  jobs or people, so alt text stays descriptive of the image, never a proof
  claim. Real job and crew photography replaces or supplements these later
  (see PLACEHOLDERS.md).
*/

// Service slug to image file (in /public/images). Services in the same family
// share an image on purpose, so the set reads as one cohesive system.
const SERVICE_IMAGE: Record<string, string> = {
  "electrical-panel-upgrade": "panel-upgrade",
  "zinsco-panel-replacement": "old-panel",
  "federal-pacific-panel-replacement": "old-panel",
  "electrical-service-rebuild": "service-entrance",
  "emergency-electrician": "emergency-night",
  "emergency-power-restoration": "emergency-night",
  "meter-socket-replacement": "meter-bank",
  "meter-bank-replacement": "meter-bank",
  "ev-charger-installation": "ev-charger",
  "electrical-safety-check": "about-craft",
  "generator-installation": "generator-surge",
  "whole-home-surge-protection": "generator-surge",
  "pool-grounding-bonding-inspection": "pool-safety",
  "pool-electrical-repair": "pool-safety",
  "pool-gfci-breaker-replacement": "pool-safety",
  "pool-electrical-service-rebuild": "pool-safety",
};

// Descriptive alt text per image, written to describe what the photo shows.
const IMAGE_ALT: Record<string, string> = {
  "hero-electrician": "An electrician installing breakers inside a modern electrical panel",
  "panel-upgrade": "A clean, modern electrical panel with neatly organized breakers",
  "old-panel": "An older electrical panel of the kind insurers often flag for replacement",
  "service-entrance": "The exterior electrical service entrance of a home at dusk",
  "emergency-night": "An electrician working at night by warm task light",
  "meter-bank": "A bank of electrical meter sockets on the exterior of a building",
  "ev-charger": "A modern EV charger mounted on the exterior wall of a home",
  "pool-safety": "A backyard swimming pool lit softly at dusk",
  "generator-surge": "A whole-home standby generator beside a house",
  "about-craft": "An electrician testing a circuit with a multimeter",
  "cta-texture": "",
};

const FALLBACK = "panel-upgrade";

export function imagePath(name: string): string {
  return `/images/${name}.jpg`;
}

export function imageAlt(name: string): string {
  return IMAGE_ALT[name] ?? "";
}

// Resolve the image for a service slug into a ready {src, alt} pair.
export function serviceImage(slug: string): { src: string; alt: string } {
  const name = SERVICE_IMAGE[slug] ?? FALLBACK;
  return { src: imagePath(name), alt: imageAlt(name) };
}
