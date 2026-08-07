import type { Metadata } from "next";
import Link from "next/link";
import { getBusiness } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks } from "@/lib/links";
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

const TITLE = "Electrician Service Areas in Broward County | Ghost Crown";
const DESCRIPTION =
  "Licensed electrician serving Broward County and South Florida, from West Palm Beach down to North Miami. Find your city and reach out today.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.serviceAreas,
  });
}

export default function ServiceAreasIndexPage() {
  const business = getBusiness();
  const cities = cityLinks();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Service Areas" },
  ];
  const pageUrl = absoluteUrl(routes.serviceAreas);

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
          eyebrow="Where we work"
          title="Serving Broward County and South Florida"
          description="We run from West Palm Beach down to North Miami, with the Broward County core as our home ground. The owner takes the call, prices the job, and meets the inspector, wherever you are in the service area."
        />

        {/* Corridor block */}
        <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-8">
          <h2 className="font-heading text-xl font-semibold text-ink">
            The West Palm Beach to North Miami corridor
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
            {business.serviceArea}. Our three trucks let us keep three jobs
            moving at once across that stretch, so a call from Broward gets the
            same licensed, accountable attention whether it is a panel that
            failed its 4-point inspection or a pool that needs its bonding
            checked. If your
            town is not listed below, call anyway. We will tell you honestly
            whether we reach you.
          </p>
        </div>

        {/* City grid */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="group block h-full"
              >
                <Card interactive className="flex h-full flex-col">
                  <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-accent-hover">
                    {city.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-muted">
                    Licensed electrical service, repair, and restoration in{" "}
                    {city.name} and nearby.
                  </p>
                  <span className="mt-4 text-sm font-semibold text-accent">
                    View {city.name}
                  </span>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CTABand />
    </>
  );
}
