import type { Metadata } from "next";
import Link from "next/link";
import { getCities, getPosts, getServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbListNode,
  electricianNode,
  founderNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

// Human-readable page listing, distinct from the machine sitemap at
// /sitemap.xml. This route is defined by the folder name, so its canonical path
// is written out here directly rather than pulled from lib/routes.ts.
const SITEMAP_PATH = "/sitemap";

const TITLE = "Site Map | Ghost Crown Electric";
const DESCRIPTION =
  "Every page on the Ghost Crown Electric site in one place: services, service areas, articles, and company pages for Broward County and South Florida.";

interface LinkGroup {
  heading: string;
  links: { href: string; label: string }[];
}

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: SITEMAP_PATH,
  });
}

export default function SiteMapPage() {
  const services = getServices();
  const cities = getCities();
  const posts = getPosts();

  const groups: LinkGroup[] = [
    {
      heading: "Main pages",
      links: [
        { href: routes.home, label: "Home" },
        { href: routes.about, label: "About" },
        { href: routes.faq, label: "FAQ" },
        { href: routes.reviews, label: "Reviews" },
        { href: routes.contact, label: "Contact and booking" },
        { href: routes.book, label: "Book online" },
      ],
    },
    {
      heading: "Services",
      links: [
        { href: routes.services, label: "All services" },
        ...services.map((service) => ({
          href: routes.service(service.slug),
          label: service.shortName || service.name,
        })),
      ],
    },
    {
      heading: "Service areas",
      links: [
        { href: routes.serviceAreas, label: "All service areas" },
        ...cities.map((city) => ({
          href: routes.city(city.slug),
          label: city.name,
        })),
      ],
    },
    {
      heading: "Articles",
      links: [
        { href: routes.blog, label: "All articles" },
        ...posts.map((post) => ({
          href: routes.post(post.slug),
          label: post.title || post.slug,
        })),
      ],
    },
    {
      heading: "Legal",
      links: [
        { href: routes.privacy, label: "Privacy Policy" },
        { href: routes.terms, label: "Terms of Use" },
      ],
    },
  ];

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Site Map" },
  ];
  const pageUrl = absoluteUrl(SITEMAP_PATH);

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          founderNode(),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs trail={trail} className="mb-8" />

        <SectionHeading
          as="h1"
          eyebrow="Everything in one place"
          title="Site map"
          description="A plain list of every page on the site. Looking for the machine-readable version? That lives at /sitemap.xml."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-muted hover:text-accent-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <CTABand />
    </>
  );
}
