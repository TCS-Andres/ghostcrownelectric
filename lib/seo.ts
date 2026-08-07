import type { Metadata } from "next";
import { getBusiness, SITE_URL } from "@/lib/content";

/*
  SEO metadata layer for Ghost Crown Electric.

  One builder, buildMetadata, produces a complete Next.js Metadata object for any
  page: an absolute title (so it is not double branded by the root template), a
  canonical URL, Open Graph and Twitter cards, an index and follow robots
  directive with large image previews, and geo meta tags. Every route's
  generateMetadata calls this so the whole site stays consistent.

  Canonical and Open Graph URLs are built from SITE_URL, the single site URL
  constant (env NEXT_PUBLIC_SITE_URL with a launch placeholder default). We reuse
  that constant rather than defining a second one.
*/

// Branded social share image: crown lockup on navy with tagline (1200x630).
export const OG_IMAGE_PATH = "/og-ghost-crown.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Build an absolute URL for a site-relative path.
export function absoluteUrl(pathname: string): string {
  if (!pathname.startsWith("/")) return `${SITE_URL}/${pathname}`;
  return `${SITE_URL}${pathname}`;
}

export interface GeoPoint {
  placename: string;
  lat: number;
  lng: number;
  // ISO 3166-2 region code. Defaults to Florida.
  region?: string;
}

interface SeoOptions {
  /** Full, final page title. Used verbatim (not run through the brand template). */
  title: string;
  description: string;
  /** Canonical site-relative path, for example "/services". */
  path: string;
  type?: "website" | "article";
  /** ISO date, only for article pages. */
  publishedTime?: string;
  /** Geo signal for local SEO. Falls back to the business location. */
  geo?: GeoPoint;
  /** Alt text for the share image. Falls back to the title. */
  imageAlt?: string;
}

// Turn a geo point into the classic geo meta tag set used for local search.
function geoTags(geo: GeoPoint): Record<string, string> {
  const position = `${geo.lat};${geo.lng}`;
  return {
    "geo.region": geo.region ?? "US-FL",
    "geo.placename": geo.placename,
    "geo.position": position,
    ICBM: `${geo.lat}, ${geo.lng}`,
  };
}

// The business location, used as the default geo signal for pages that do not
// carry their own coordinates (service pages and the marketing hubs).
export function businessGeo(): GeoPoint {
  const business = getBusiness();
  return {
    placename: `${business.address.locality}, ${business.address.region}`,
    lat: business.geo.lat,
    lng: business.geo.lng,
    region: "US-FL",
  };
}

export function buildMetadata(options: SeoOptions): Metadata {
  const business = getBusiness();
  const url = absoluteUrl(options.path);
  const geo = options.geo ?? businessGeo();
  const image = {
    url: absoluteUrl(OG_IMAGE_PATH),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: options.imageAlt ?? options.title,
  };

  return {
    // absolute keeps the authored title exactly as written, since service and
    // city titles already carry the brand and a geo signal.
    title: { absolute: options.title },
    description: options.description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: options.type ?? "website",
      url,
      title: options.title,
      description: options.description,
      siteName: business.name,
      locale: "en_US",
      images: [image],
      ...(options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image.url],
    },
    other: geoTags(geo),
  };
}
