import type { Metadata } from "next";
import Link from "next/link";
import { getBusiness } from "@/lib/content";
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

const TITLE = "Terms of Use | Ghost Crown Electric";
const DESCRIPTION =
  "The terms for using the Ghost Crown Electric website. Site content is informational, and no work is guaranteed without an on-site assessment. Read the details.";
const LAST_UPDATED = "Last updated July 2026";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.terms,
  });
}

export default function TermsPage() {
  const business = getBusiness();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Terms of Use" },
  ];
  const pageUrl = absoluteUrl(routes.terms);

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

        <div className="max-w-3xl">
          <SectionHeading as="h1" eyebrow="Legal" title="Terms of Use" />
          <p className="mt-4 text-sm text-ink-muted">{LAST_UPDATED}</p>

          <div className="mt-10 flex flex-col gap-10 leading-relaxed text-ink-muted">
            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                About this site
              </h2>
              <p className="mt-3">
                The content on this website is provided for general information
                about Ghost Crown Electric and the electrical services we offer.
                It is not a quote, a diagnosis, or a promise of a specific
                result. Every property is different, and nothing here replaces a
                conversation with us.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                No guarantee without an on-site assessment
              </h2>
              <p className="mt-3">
                Every electrical situation is different. We do not guarantee a
                specific outcome, timeline, or price without first assessing your
                property in person. The site visit always comes first, and any
                numbers we discuss beforehand are general references, not a final
                price.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Pricing information
              </h2>
              <p className="mt-3">
                Any figures shown on this site are general references meant to
                give you a sense of what work involves. Your price is set after
                an on-site assessment, and we price the job once, before the work
                begins.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Licensing
              </h2>
              <p className="mt-3">
                Ghost Crown Electric is a licensed contractor. We hold the
                following licenses:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {business.licenses.map((license) => (
                  <li key={license.label} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      &bull;
                    </span>
                    <span>{license.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                License numbers are available on request. We are glad to provide
                them.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Contact
              </h2>
              <p className="mt-3">
                Questions about these terms? Reach out through our{" "}
                <Link
                  href={routes.contact}
                  className="font-semibold text-accent hover:text-accent-hover"
                >
                  contact page
                </Link>{" "}
                or call {business.phoneDisplay}.
              </p>
            </section>
          </div>
        </div>
      </div>

      <CTABand />
    </>
  );
}
