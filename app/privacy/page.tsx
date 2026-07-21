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

const TITLE = "Privacy Policy | Ghost Crown Electric";
const DESCRIPTION =
  "How Ghost Crown Electric handles the information you share through our contact form, including call and text consent. We do not sell your data. Read on.";
const LAST_UPDATED = "Last updated July 2026";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.privacy,
  });
}

export default function PrivacyPage() {
  const business = getBusiness();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Privacy Policy" },
  ];
  const pageUrl = absoluteUrl(routes.privacy);

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
          <SectionHeading as="h1" eyebrow="Legal" title="Privacy Policy" />
          <p className="mt-4 text-sm text-ink-muted">{LAST_UPDATED}</p>

          <div className="mt-10 flex flex-col gap-10 leading-relaxed text-ink-muted">
            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                What we collect
              </h2>
              <p className="mt-3">
                When you reach out through our contact form, we collect your
                name, your phone number, your email address, and the details you
                share about the electrical work you need. That is the
                information we ask for, and we ask for it so we can help you.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                How we use it
              </h2>
              <p className="mt-3">
                We use what you share to respond to your request, to understand
                and price the work, and to follow up with you about it. We do
                not use it for anything you did not contact us about.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Call and text consent
              </h2>
              <p className="mt-3">
                By submitting the form or giving us your number, you consent to
                be contacted about your request by phone call or text message.
                Message and data rates may apply. You can opt out at any time by
                telling us to stop, and we will. We do not add you to marketing
                lists, and we do not send promotional blasts.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                We do not sell your data
              </h2>
              <p className="mt-3">
                We do not sell, rent, or trade your personal information to
                anyone. The information you share with us stays with us and is
                used only to serve you.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Website analytics
              </h2>
              <p className="mt-3">
                We may use basic website analytics to understand how visitors
                find and use the site, so we can make it more helpful. Any such
                analytics are used in aggregate and are not sold or used to
                identify you personally.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-ink">
                Questions
              </h2>
              <p className="mt-3">
                If you have any question about your information, reach out
                through our{" "}
                <Link
                  href={routes.contact}
                  className="font-semibold text-accent hover:text-accent-hover"
                >
                  contact page
                </Link>{" "}
                or call {business.phoneDisplay}. We are glad to help.
              </p>
            </section>
          </div>
        </div>
      </div>

      <CTABand />
    </>
  );
}
