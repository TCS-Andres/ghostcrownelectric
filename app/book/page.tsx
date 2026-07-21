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

const TITLE = "Request Service | Ghost Crown Electric";
const DESCRIPTION =
  "Request licensed electrical service in Broward County. Tell us what is going on, get one honest price, and our in-house crew handles it start to finish.";

const PLAN: { title: string; body: string }[] = [
  {
    title: "Call us first",
    body: "We talk through what is happening before we ever pull up. Sometimes we can point you the right way on the phone.",
  },
  {
    title: "We assess and quote",
    body: "We come see it, forecast the job honestly, and give you one number. No moving targets, no mid-job changes.",
  },
  {
    title: "We do the work and close it out",
    body: "Our in-house crew does the work, the inspection passes, and Damean follows up personally to make sure you are set.",
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.book,
  });
}

export default function BookPage() {
  const business = getBusiness();
  const services = getServices();
  const cities = cityLinks();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Request Service" },
  ];
  const pageUrl = absoluteUrl(routes.book);

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
          eyebrow="Request service"
          title="Tell us what is going on"
          description="Fill this out and Damean or the crew will follow up to talk it through. Nothing automated, no pressure. If it is urgent, do not wait on us. Call, day or night."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <LeadForm
              services={services.map((service) => service.shortName || service.name)}
              cities={cities}
              phoneDisplay={business.phoneDisplay}
              phoneTel={business.phoneTel}
            />
            <p className="mt-4 text-sm text-ink-muted">
              For anything urgent, call{" "}
              <a
                href={`tel:${business.phoneTel}`}
                className="font-semibold text-ink hover:text-accent-hover"
              >
                {business.phoneDisplay}
              </a>
              , day or night.
            </p>
          </div>

          <div className="lg:pt-2">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              How it works
            </h2>
            <p className="mt-3 text-ink-muted">
              Three steps, start to finish, with the same person on the call and
              at the inspection.
            </p>
            <ol className="mt-8 flex flex-col gap-6">
              {PLAN.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-base font-bold text-accent-ink"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
