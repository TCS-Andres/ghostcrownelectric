/*
  Single source of truth for the site's URL patterns.

  The route segments themselves (service, city, and blog pages, plus the top
  level About, Contact, FAQ, Reviews, and legal pages) are built by other
  workers. Centralising the paths here keeps every link and the sitemap in
  agreement, and makes it a one-line change if a segment name is adjusted during
  assembly.
*/
export const routes = {
  home: "/",

  services: "/services",
  service: (slug: string) => `/services/${slug}`,

  serviceAreas: "/service-areas",
  city: (slug: string) => `/service-areas/${slug}`,

  blog: "/blog",
  post: (slug: string) => `/blog/${slug}`,

  about: "/about",
  contact: "/contact",
  faq: "/faq",
  reviews: "/reviews",

  // Booking CTAs point at the dedicated booking flow.
  book: "/book",

  privacy: "/privacy",
  terms: "/terms",
} as const;

// Top-level, always-present marketing routes for the sitemap. Content-driven
// routes (services, cities, blog) are added dynamically from the loaders.
export const STATIC_ROUTES = [
  routes.home,
  routes.services,
  routes.serviceAreas,
  routes.blog,
  routes.about,
  routes.contact,
  routes.book,
  routes.faq,
  routes.reviews,
  routes.privacy,
  routes.terms,
] as const;
