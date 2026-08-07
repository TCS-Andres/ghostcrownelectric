import fs from "node:fs";
import path from "node:path";
import { loadAllPosts, loadPost } from "@/lib/blog";

/*
  Content loading layer for Ghost Crown Electric.

  All marketing content lives as JSON on disk under content/. These loaders read
  it at build time. They are deliberately defensive: content workers write to
  content/services, content/cities, and content/blog in parallel with the rest
  of the build, so every loader returns an empty array gracefully when a
  directory is missing or empty, and skips any single file that is not valid
  JSON yet rather than failing the whole build.
*/

// Absolute path to the canonical production site. Real domain is a launch
// placeholder (see PLACEHOLDERS.md). Override with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ghostcrownelectric.com"
).replace(/\/$/, "");

const CONTENT_DIR = path.join(process.cwd(), "content");

// Master ordering used to sort nav and listings deterministically. These mirror
// the master slug lists in the shared style and schema contract.
// Consolidated 2026-08-07 from 16 granular services to 8 general ones (client
// direction: fewer, broader service pages). Order here is the master display
// order; the header and footer show the first six. Old slugs redirect to their
// consolidated target in next.config.ts.
export const SERVICE_SLUGS = [
  "electrical-panel-upgrade",
  "electrical-service-rebuild",
  "emergency-electrician",
  "pool-electrical",
  "ev-charger-installation",
  "meter-bank-replacement",
  "generators-and-surge-protection",
  "electrical-safety-check",
] as const;

export const CITY_SLUGS = [
  // Broward County (home county)
  "north-lauderdale",
  "fort-lauderdale",
  "lauderhill",
  "tamarac",
  "sunrise",
  "plantation",
  "pompano-beach",
  "hollywood",
  "coral-springs",
  "coconut-creek",
  "margate",
  "deerfield-beach",
  "davie",
  "weston",
  "pembroke-pines",
  "miramar",
  // Palm Beach County
  "boca-raton",
  "delray-beach",
  "boynton-beach",
  "west-palm-beach",
  "wellington",
  // Miami-Dade County (southern edge of our service area)
  "north-miami-beach",
  "aventura",
  "sunny-isles-beach",
] as const;

/* ----------------------------------------------------------------------------
   Types
   These interfaces match the schemas in shared-style-and-schema.md exactly.
---------------------------------------------------------------------------- */

export interface Business {
  name: string;
  legalName: string;
  tagline: string;
  founder: { name: string; title: string; note: string };
  phoneDisplay: string;
  phoneTel: string;
  phoneIsPlaceholder: boolean;
  email: string;
  emailIsPlaceholder: boolean;
  address: {
    locality: string;
    region: string;
    country: string;
    street?: string;
    streetIsPlaceholder: boolean;
  };
  hours: string;
  licenses: { label: string; number: string }[];
  serviceArea: string;
  geo: { lat: number; lng: number };
  stats: { permittedProjects: number; yearsActive: number; trucks: number };
  social: string[];
}

export type ServiceTier = "money" | "pool" | "safety" | "core";

export interface TitledBody {
  title: string;
  body: string;
}

export interface HeadingBody {
  heading: string;
  body: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tier: ServiceTier;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  definition: { heading: string; body: string };
  symptoms: TitledBody[];
  process: TitledBody[];
  benefits: TitledBody[];
  localSections: HeadingBody[];
  guide: { title: string; sections: HeadingBody[] };
  faqs: Faq[];
  related: string[];
  pricing: { display: string; notes: string };
  stats: { value: string; label: string }[];
  cta: { headline: string; body: string };
}

export interface City {
  slug: string;
  name: string;
  county: "Broward";
  lat: number;
  lng: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  neighborhoods: string[];
  housingNotes: string;
  permitNote: string;
  challenges: HeadingBody[];
  faqs: Faq[];
}

// The blog schema is owned by the blog content worker and is not fixed in the
// shared contract, so this stays intentionally permissive while still typing the
// fields the layout is likely to rely on.
export interface Post {
  slug: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  date?: string;
  author?: string;
  body?: string;
  [key: string]: unknown;
}

/* ----------------------------------------------------------------------------
   Low-level helpers
---------------------------------------------------------------------------- */

function readJsonFile<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    // A file may be missing or mid-write while a parallel worker is running.
    // Skip it rather than breaking the build, and leave a breadcrumb in logs.
    console.warn(
      `content: skipping unreadable JSON at ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }
}

function readJsonDir<T>(dirName: string): T[] {
  const dirPath = path.join(CONTENT_DIR, dirName);
  let entries: string[];
  try {
    entries = fs.readdirSync(dirPath);
  } catch {
    // Directory does not exist or cannot be read yet: treat as no content.
    return [];
  }

  const items: T[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".json")) continue;
    const parsed = readJsonFile<T>(path.join(dirPath, entry));
    if (parsed !== null) items.push(parsed);
  }
  return items;
}

function orderBySlug<T extends { slug: string }>(
  items: T[],
  order: readonly string[],
): T[] {
  const rank = new Map(order.map((slug, index) => [slug, index]));
  return [...items].sort((a, b) => {
    const ra = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return a.slug.localeCompare(b.slug);
  });
}

/* ----------------------------------------------------------------------------
   Public loaders
---------------------------------------------------------------------------- */

export function getBusiness(): Business {
  const business = readJsonFile<Business>(
    path.join(CONTENT_DIR, "business.json"),
  );
  if (!business) {
    // business.json is committed as part of the foundation, so this should never
    // happen. Fail loudly if it does: it is a launch-blocking data source.
    throw new Error("content: business.json is missing or invalid");
  }
  return business;
}

export function getServices(): Service[] {
  return orderBySlug(readJsonDir<Service>("services"), SERVICE_SLUGS);
}

export function getService(slug: string): Service | null {
  return getServices().find((service) => service.slug === slug) ?? null;
}

export function getCities(): City[] {
  return orderBySlug(readJsonDir<City>("cities"), CITY_SLUGS);
}

export function getCity(slug: string): City | null {
  return getCities().find((city) => city.slug === slug) ?? null;
}

// Blog articles are authored as Markdown with front matter, so the parsing and
// ordering live in lib/blog.ts. These delegate to it, keeping getPosts/getPost
// as the single content entry point that the sitemap and other loaders call.
export function getPosts(): Post[] {
  return loadAllPosts();
}

export function getPost(slug: string): Post | null {
  return loadPost(slug);
}
