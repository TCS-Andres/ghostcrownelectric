import type { Metadata } from "next";
import { getBusiness, getServices } from "@/lib/content";
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
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Contact Ghost Crown Electric | Broward County Electrician";
const DESCRIPTION =
  "Reach Ghost Crown Electric, a licensed Broward County electrician. Call day or night or send a note, and Damean will tell you plainly what it takes.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.contact,
  });
}

export default function ContactPage() {
  const business = getBusiness();
  const services = getServices();
  const cities = cityLinks();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Contact" },
  ];
  const pageUrl = absoluteUrl(routes.contact);

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(business),
          founderNode(business),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs trail={trail} className="mb-8" />

        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Talk to the electrician who takes the call"
          description="Damean answers, prices the job, and meets the inspector himself. Call, send a note, or use the form and we will get right back to you."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact details from business.json */}
          <div className="flex flex-col gap-8">
            <dl className="flex flex-col gap-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  Phone
                </dt>
                <dd className="mt-1 text-lg">
                  <a
                    href={`tel:${business.phoneTel}`}
                    className="font-semibold text-ink hover:text-accent-hover"
                  >
                    {business.phoneDisplay}
                  </a>
                </dd>
                <p className="mt-1 text-sm text-ink-muted">
                  We answer day or night.
                </p>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all text-ink hover:text-accent-hover"
                  >
                    {business.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  Based in
                </dt>
                <dd className="mt-1 text-ink">
                  {business.address.locality}, {business.address.region}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  Hours
                </dt>
                <dd className="mt-1 text-ink">{business.hours}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  Service area
                </dt>
                <dd className="mt-1 text-ink">{business.serviceArea}</dd>
              </div>
            </dl>

            {/* Licensing labels, numbers held per PLACEHOLDERS.md */}
            <div className="rounded-xl border border-border bg-surface-2 p-6">
              <h2 className="font-heading text-base font-semibold text-ink">
                Licensed and accountable
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {business.licenses.map((license) => (
                  <li key={license.label} className="flex items-start gap-2 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {license.label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted">
                License numbers available on request. The work is owner led from
                the first call to the final inspection.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Send us the details
            </h2>
            <p className="mt-3 text-ink-muted">
              Tell us what is going on and how to reach you. If it is urgent,
              call instead and we will pick up.
            </p>
            <LeadForm
              className="mt-6"
              services={services.map((service) => service.shortName || service.name)}
              cities={cities}
              phoneDisplay={business.phoneDisplay}
              phoneTel={business.phoneTel}
            />
          </div>
        </div>
      </div>
    </>
  );
}
