import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Users, BadgeDollarSign, Clock, Phone, Zap } from "lucide-react";
import { getServices, getBusiness } from "@/lib/content";
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
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrical Services in Broward County | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrical service, repair, and restoration across Broward County and South Florida. One accountable team from the first call to the final inspection.";

// Short assurances shown above the grid. Plain promises, no hype.
const ASSURANCES: { text: string; icon: ReactNode }[] = [
  {
    text: "One licensed crew, from the first call to the final inspection",
    icon: <Users size={18} aria-hidden="true" />,
  },
  {
    text: "One honest price before any bigger work, so there are no surprises",
    icon: <BadgeDollarSign size={18} aria-hidden="true" />,
  },
  {
    text: "We answer day or night, and we meet the inspector in person",
    icon: <Clock size={18} aria-hidden="true" />,
  },
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
  const business = getBusiness();

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
          description="Our core services cover nearly everything we are called for, from panels and service upgrades to commercial lighting, pool electrical, and everyday repairs. Not sure which fits? Call and we will point you the right way."
        />

        {services.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
            {ASSURANCES.map((item, index) => (
              <li key={item.text} className="group flex items-start gap-3">
                <GradientBadge
                  tone={BADGE_TONES[index % BADGE_TONES.length]}
                  size="sm"
                >
                  {item.icon}
                </GradientBadge>
                <span className="text-sm leading-snug text-ink-muted">
                  {item.text}
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
            {/* The service count leaves a gap in the last grid row; fill it with
                the two main calls to action. */}
            <li className="sm:col-span-2">
              <div className="relative flex h-full min-h-[13rem] flex-col justify-center overflow-hidden rounded-2xl bg-surface-dark p-8 text-ink-on-dark">
                <div
                  aria-hidden="true"
                  className="glow-ambient pointer-events-none absolute -right-16 -top-16 -z-0 h-72 w-72 opacity-40"
                />
                <div className="relative">
                  <h2 className="font-heading text-2xl font-bold text-ink-on-dark sm:text-3xl">
                    Not Sure Which Service You Need?
                  </h2>
                  <p className="mt-2 max-w-xl text-ink-muted-on-dark">
                    Call and a licensed electrician will point you the right way,
                    or send a request and we will get back to you. No obligation,
                    day or night.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={`tel:${business.phoneTel}`}
                      variant="primary"
                      size="md"
                    >
                      <Phone size={18} aria-hidden="true" />
                      Call {business.phoneDisplay}
                    </Button>
                    <Button
                      href={routes.book}
                      variant="outlineOnDark"
                      size="md"
                    >
                      <Zap size={18} aria-hidden="true" />
                      Request Service
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>

      <CTABand />
    </>
  );
}
