import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { coverageByCounty, coverageTotals } from "@/lib/coverage";
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
import { CoverageMap } from "@/components/ui/CoverageMap";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician Service Areas in South Florida | Ghost Crown";
const DESCRIPTION =
  "Licensed electrician serving all of Broward and Palm Beach counties, south to North Miami Beach. Find your city and reach out day or night.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.serviceAreas,
  });
}

export default function ServiceAreasIndexPage() {
  const coverage = coverageByCounty();
  const totals = coverageTotals(coverage);

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
          title="Serving all of South Florida"
          description={`Our licensed crew covers ${totals.cities} cities across ${totals.counties} counties, all of Broward and Palm Beach and as far south as North Miami Beach. North Lauderdale is home base, so Broward is where we respond fastest, and we run north through Palm Beach every week. We take the call, price the job, and meet the inspector, wherever you are in the service area.`}
        />

        {/* Coverage map */}
        <CoverageMap groups={coverage} className="mt-10" />

        {/* Cities by county */}
        <div className="mt-14 flex flex-col gap-12">
          {coverage.map((group) => (
            <section key={group.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-xl font-semibold text-ink">
                  {group.name}
                </h2>
                <span className="text-sm text-ink-muted">
                  {group.cities.length} cities
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">
                {group.blurb}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.cities.map((city) => (
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
            </section>
          ))}
        </div>

        <p className="mt-12 max-w-3xl leading-relaxed text-ink-muted">
          If your town is not listed, call anyway. If you are within range we
          will be there, and if the drive is longer we will quote it honestly by
          distance, so there are no surprises.
        </p>
      </div>

      <CTABand />
    </>
  );
}
