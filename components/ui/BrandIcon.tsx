import type { SVGProps } from "react";

/*
  Ghost Crown Electric custom icon set (Brand Guide v1.0). Lucide-compatible
  24px, 2px-stroke, currentColor line icons with solid mini-bolt accents,
  generated from the brand package SVG_editable masters. Inline so they
  inherit currentColor and size like text. Markup is our own trusted brand
  art, injected verbatim to preserve per-path fills (the mini-bolts).
*/

export type BrandIconName =
  | "book-a-visit"
  | "call-day-or-night"
  | "commercial-lighting"
  | "crown-bolt"
  | "emergency-247"
  | "ev-charger"
  | "five-star-work"
  | "licensed-shield"
  | "lighting-fans-outlets"
  | "meter-bank"
  | "one-honest-number"
  | "panel-upgrades"
  | "pool-spa-electrical"
  | "safety-inspection"
  | "service-area-pin"
  | "service-meter-upgrades"
  | "service-truck"
  | "surge-protection";

const ICON_MARKUP: Record<BrandIconName, string> = {
  "book-a-visit": '<path d="M8 2 V6"/><path d="M16 2 V6"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10 H21"/><path d="M9 16 L11 18 L15 14"/>',
  "call-day-or-night": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  "commercial-lighting": '<path d="M7 21 V5"/><path d="M4 21 H10"/><path d="M7 5 H14"/><rect x="14" y="3" width="6" height="3.6" rx="1"/><path d="M17 9.6 V11.6"/><path d="M14.4 8.8 L13.1 10.2"/><path d="M19.6 8.8 L20.9 10.2"/>',
  "crown-bolt": '<path d="M4 16 V8.4 L8.4 11 L12 4.8 L15.6 11 L20 8.4 V16 Z"/><circle cx="4" cy="5.8" r="1.1"/><circle cx="12" cy="2.6" r="1.1"/><circle cx="20" cy="5.8" r="1.1"/><path d="M5 19.5 H19"/><path d="M12.9 10.4 L10.3 13.9 H12.1 L11.2 16.4 L13.9 13 H12.1 Z" fill="currentColor" stroke="none"/>',
  "emergency-247": '<circle cx="12" cy="12" r="9"/><path d="M13.4 6.4 L8.9 12.5 H11.4 L10.4 17.6 L15.1 11.3 H12.5 Z" fill="currentColor" stroke="none"/>',
  "ev-charger": '<rect x="4" y="3" width="10" height="18" rx="2"/><path d="M7 7 H11"/><path d="M9.9 10.4 L7.4 13.8 H9 L8.2 16.8 L10.8 13.4 H9.2 Z" fill="currentColor" stroke="none"/><path d="M14 13 H17 A2 2 0 0 1 19 15 V16.6"/><circle cx="19" cy="19" r="2"/>',
  "five-star-work": '<path d="M11.53 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.91l-3.74 3.64a2.12 2.12 0 0 0-.61 1.87l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0l-4.62 2.43a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.87L2.16 9.8a.53.53 0 0 1 .3-.91l5.16-.75a2.12 2.12 0 0 0 1.6-1.16z"/>',
  "licensed-shield": '<path d="M20 13c0 5-3.5 7.5-7.7 9a.6.6 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .65-.94l7-2.62a1 1 0 0 1 .7 0l7 2.62A1 1 0 0 1 20 6z"/><path d="M9 12 L11 14 L15 10"/>',
  "lighting-fans-outlets": '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18 H15"/><path d="M10 22 H14"/>',
  "meter-bank": '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="8.5" cy="8.5" r="2"/><circle cx="15.5" cy="8.5" r="2"/><circle cx="8.5" cy="15.5" r="2"/><circle cx="15.5" cy="15.5" r="2"/>',
  "one-honest-number": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 13 H15"/><path d="M9 17 H13"/>',
  "panel-upgrades": '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 7 V17"/><path d="M8 8 H10"/><path d="M14 8 H16"/><path d="M8 12 H10"/><path d="M14 12 H16"/><path d="M8 16 H10"/><path d="M14 16 H16"/>',
  "pool-spa-electrical": '<path d="M13.1 2.4 L9.2 7.8 H11.5 L10.5 11.8 L14.7 6.4 H12.3 Z" fill="currentColor" stroke="none"/><path d="M3 16 c1.5 -1.4 3 -1.4 4.5 0 s3 1.4 4.5 0 3 -1.4 4.5 0 3 1.4 4.5 0"/><path d="M3 20 c1.5 -1.4 3 -1.4 4.5 0 s3 1.4 4.5 0 3 -1.4 4.5 0 3 1.4 4.5 0"/>',
  "safety-inspection": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14 L11 16 L15 12"/>',
  "service-area-pin": '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><path d="M12.8 5.8 L9.9 9.8 H11.7 L10.9 13.2 L14 9.2 H12.1 Z" fill="currentColor" stroke="none"/>',
  "service-meter-upgrades": '<path d="M12 6 V2"/><rect x="6" y="6" width="12" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M12 13 L14.2 10.8"/>',
  "service-truck": '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M8.9 7.2 L6.7 10.2 H8.1 L7.4 12.8 L9.7 9.8 H8.3 Z" fill="currentColor" stroke="none"/>',
  "surge-protection": '<path d="M20 13c0 5-3.5 7.5-7.7 9a.6.6 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .65-.94l7-2.62a1 1 0 0 1 .7 0l7 2.62A1 1 0 0 1 20 6z"/><path d="M13 6.8 L9.6 11.4 H11.6 L10.8 15.2 L14.4 10.6 H12.4 Z" fill="currentColor" stroke="none"/>',
};

interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: BrandIconName;
  size?: number;
}

export function BrandIcon({ name, size = 24, ...props }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: ICON_MARKUP[name] }}
    />
  );
}

// Each service's brand icon, keyed by slug (Brand Guide v1.0 icon set).
export const SERVICE_BRAND_ICON: Record<string, BrandIconName> = {
  "electrical-panel-upgrade": "panel-upgrades",
  "electrical-service-rebuild": "service-meter-upgrades",
  "emergency-electrician": "emergency-247",
  "commercial-lighting": "commercial-lighting",
  "pool-electrical": "pool-spa-electrical",
  "ev-charger-installation": "ev-charger",
  "meter-bank-replacement": "meter-bank",
  "lighting-fans-outlets": "lighting-fans-outlets",
  "surge-protection": "surge-protection",
  "electrical-safety-check": "safety-inspection",
};

export function serviceBrandIcon(slug: string): BrandIconName {
  return SERVICE_BRAND_ICON[slug] ?? "crown-bolt";
}
