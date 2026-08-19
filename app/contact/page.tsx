import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { getBusiness, getServices, primaryLicenseNumber } from "@/lib/content";
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
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Contact Ghost Crown Electric | Broward County Electrician";
const DESCRIPTION =
  "Reach Ghost Crown Electric, a licensed Broward County electrician. Call day or night or send a note, and we will tell you plainly what it takes.";

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
  const licenseNumber = primaryLicenseNumber(business);

  const contactMethods = [
    {
      label: "Phone",
      icon: <BrandIcon name="call-day-or-night" size={20} />,
      value: (
        <a
          href={`tel:${business.phoneTel}`}
          className="font-semibold text-ink hover:text-accent-hover"
        >
          {business.phoneDisplay}
        </a>
      ),
      note: "We answer day or night.",
    },
    {
      label: "Email",
      icon: <Mail size={20} aria-hidden="true" />,
      value: (
        <a
          href={`mailto:${business.email}`}
          className="break-all text-ink hover:text-accent-hover"
        >
          {business.email}
        </a>
      ),
    },
    {
      label: "Based in",
      icon: <BrandIcon name="service-area-pin" size={20} />,
      value: `${business.address.locality}, ${business.address.region}`,
    },
    {
      label: "Hours",
      icon: <BrandIcon name="book-a-visit" size={20} />,
      value: business.hours,
    },
    {
      label: "Service area",
      icon: <BrandIcon name="service-truck" size={20} />,
      value: business.serviceArea,
    },
  ];

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
          description="We answer, price the job, and meet the inspector. Call, send a note, or use the form and we will get right back to you."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact details from business.json */}
          <div className="flex flex-col gap-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactMethods.map((method, index) => (
                <li
                  key={method.label}
                  className="group flex items-start gap-3.5 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
                >
                  <GradientBadge
                    tone={BADGE_TONES[index % BADGE_TONES.length]}
                    size="md"
                  >
                    {method.icon}
                  </GradientBadge>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                      {method.label}
                    </p>
                    <div className="mt-1 text-ink">{method.value}</div>
                    {method.note ? (
                      <p className="mt-0.5 text-sm text-ink-muted">
                        {method.note}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            {/* Licensing labels with the live state license number */}
            <div className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-2 p-6">
              <GradientBadge tone="blue" size="md">
                <BrandIcon name="licensed-shield" size={20} />
              </GradientBadge>
              <div>
                <h2 className="font-heading text-base font-semibold text-ink">
                  Licensed and Accountable
                </h2>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {business.licenses.map((license) => {
                    const hasNumber =
                      license.number && license.number !== "PLACEHOLDER";
                    return (
                      <li key={license.label} className="text-sm text-ink">
                        {license.label}
                        {hasNumber ? (
                          <span className="font-semibold">
                            {" "}
                            #{license.number}
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-sm text-ink-muted">
                  {licenseNumber
                    ? "Licensed and local from the first call to the final inspection."
                    : "License numbers available on request. Licensed and local from the first call to the final inspection."}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Send Us the Details
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
