import type { MetadataRoute } from "next";
import { getCities, getPosts, getServices, SITE_URL } from "@/lib/content";
import { routes, STATIC_ROUTES } from "@/lib/routes";

/*
  XML sitemap generated over every content entry plus the always-present
  marketing pages. Content loaders return empty arrays while content workers are
  still running, so this builds cleanly with zero content and grows as entries
  land on disk.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (pathname: string) => `${SITE_URL}${pathname}`;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    (pathname) => ({
      url: url(pathname),
      lastModified: now,
      changeFrequency: "monthly",
      priority: pathname === routes.home ? 1 : 0.7,
    }),
  );

  const serviceEntries: MetadataRoute.Sitemap = getServices().map(
    (service) => ({
      url: url(routes.service(service.slug)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const cityEntries: MetadataRoute.Sitemap = getCities().map((city) => ({
    url: url(routes.city(city.slug)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: url(routes.post(post.slug)),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...cityEntries, ...postEntries];
}
