import fs from "node:fs";
import path from "node:path";

/*
  Blog loading layer for Ghost Crown Electric.

  Articles live as Markdown files with a small YAML front matter block at
  content/blog/{slug}.md. The foundation content loader reads JSON entries; the
  blog authors ship Markdown, so this loader handles that format and exposes the
  parsed result to both the blog templates and, through content.ts, the sitemap.

  The front matter parser understands only the subset the articles use: quoted
  string values and JSON style string arrays. Anything it does not recognize is
  kept as a trimmed raw string, so it fails safe rather than throwing.
*/

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  relatedServices: string[];
  body: string;
  // Keep the shape assignable to the permissive Post type in lib/content.ts, so
  // getPosts/getPost can delegate here and the sitemap reads blog entries.
  [key: string]: unknown;
}

// Split a raw file into its front matter block and the Markdown body.
function splitFrontMatter(raw: string): { frontMatter: string; body: string } {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontMatter: "", body: normalized.trim() };
  return { frontMatter: match[1], body: match[2].trim() };
}

// Parse one front matter value: a JSON array, a JSON string, or a raw string.
function parseValue(raw: string): string | string[] {
  const trimmed = raw.trim();
  if (trimmed.startsWith("[") || trimmed.startsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // Fall through to the raw string handling below.
    }
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontMatter(frontMatter: string): Record<string, string | string[]> {
  const data: Record<string, string | string[]> = {};
  for (const line of frontMatter.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1);
    if (!key) continue;
    data[key] = parseValue(value);
  }
  return data;
}

function asString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(" ");
  return value ?? "";
}

function asStringArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.length > 0) return [value];
  return [];
}

function toPost(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.md$/, "");
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  } catch (error) {
    console.warn(
      `blog: skipping unreadable article ${fileName}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }

  const { frontMatter, body } = splitFrontMatter(raw);
  const data = parseFrontMatter(frontMatter);

  return {
    slug,
    title: asString(data.title) || slug,
    description: asString(data.description),
    date: asString(data.date),
    tags: asStringArray(data.tags),
    relatedServices: asStringArray(data.relatedServices),
    body,
  };
}

// Every article, newest first by date, then stable by slug. Returns an empty
// array when the blog directory is missing or still being written.
export function loadAllPosts(): BlogPost[] {
  let entries: string[];
  try {
    entries = fs.readdirSync(BLOG_DIR);
  } catch {
    return [];
  }

  const posts: BlogPost[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const post = toPost(entry);
    if (post) posts.push(post);
  }

  return posts.sort((a, b) => {
    if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

export function loadPost(slug: string): BlogPost | null {
  return loadAllPosts().find((post) => post.slug === slug) ?? null;
}

// Format an ISO date such as "2026-07-21" as "July 21, 2026". Fixed to UTC and
// en-US so the build output is deterministic and never shifts by time zone.
export function formatPostDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
