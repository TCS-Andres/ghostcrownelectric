import type { Metadata } from "next";
import { getServices } from "@/lib/content";
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
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrical Services in Broward County | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrical service, repair, and restoration across Broward County and South Florida. One accountable team from the first call to the final inspection.";

// Short assurances shown above the grid. Plain promises, no hype.
const ASSURANCES = [
  "One licensed crew, from the first call to the final inspection",
  "A $240 service call, and one honest price before any bigger work",
  "We answer day or night, and we meet the inspector in person",
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.services,
  });
}

export default function ServicesIndexPage() {
  const services = getServices();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Services" },
  ];
  const pageUrl = absoluteUrl(routes.services);

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
          eyebrow="What we do"
          title="Electrical services for Broward County and South Florida"
          description="Eight core services cover nearly everything we are called for, from panels and service upgrades to pool electrical and backup power. Not sure which fits? Call and we will point you the right way."
        />

        {services.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckIcon />
                <span className="text-sm leading-snug text-ink-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {services.length === 0 ? (
          <p className="mt-10 text-ink-muted">
            Our service pages are being finalized. Call us and we will tell you
            plainly whether we can help.
          </p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} titleAs="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <CTABand />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-accent"
    >
      <path d="M4 10.5 L8 14.5 L16 5.5" />
    </svg>
  );
}
