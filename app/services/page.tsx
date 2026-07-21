import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { firstSentence, groupServices } from "@/lib/links";
import {
  breadcrumbListNode,
  electricianNode,
  founderNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrical Services in Broward County | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrical service, repair, and restoration across Broward County and South Florida. Owner led from the first call to the final inspection.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.services,
  });
}

export default function ServicesIndexPage() {
  const services = getServices();
  const groups = groupServices(services);

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
          description="Every job is run by the owner, from the first call to the final inspection. Find what you need below, and if you are not sure, call and we will point you the right way."
        />

        {services.length === 0 ? (
          <p className="mt-10 text-ink-muted">
            Our service pages are being finalized. Call us and we will tell you
            plainly whether we can help.
          </p>
        ) : (
          <div className="mt-12 flex flex-col gap-14">
            {groups.map((group) => (
              <section key={group.tier}>
                <SectionHeading
                  as="h2"
                  title={group.label}
                  description={group.blurb}
                  className="mb-6"
                />
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={routes.service(service.slug)}
                        className="group block h-full focus-visible:outline-none"
                      >
                        <Card interactive className="flex h-full flex-col">
                          <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-accent-hover">
                            {service.shortName || service.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-ink-muted">
                            {firstSentence(service.intro)}
                          </p>
                          <span className="mt-4 text-sm font-semibold text-accent">
                            View service
                          </span>
                        </Card>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>

      <CTABand />
    </>
  );
}
