import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbListNode,
  electricianNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Reviews and Referrals | Ghost Crown Electric";
const DESCRIPTION =
  "Ten years of licensed electrical work in Broward County, built on referrals. The jobs that tell our story, and how to leave an honest review.";

// The recurring themes we hear in referrals, stated as themes, not as quotes we
// put in anyone's mouth. No names, no star ratings, no invented testimonials.
const THEMES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "We show up when we say we will",
    body: "The time we give you is a promise. People notice when a contractor keeps it.",
    icon: <BrandIcon name="call-day-or-night" size={20} />,
  },
  {
    title: "We explain it plainly, then fix it",
    body: "The problem in everyday language, what it takes to fix, and what it costs.",
    icon: <BrandIcon name="five-star-work" size={20} />,
  },
  {
    title: "The number we quote is the number you pay",
    body: "Priced once, before the work starts. No surprises at the end.",
    icon: <BrandIcon name="one-honest-number" size={20} />,
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.reviews,
  });
}

export default function ReviewsPage() {

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Reviews" },
  ];
  const pageUrl = absoluteUrl(routes.reviews);

  return (
    <>
      {/* No review or aggregateRating markup. Nothing to prove yet, and we do
          not fabricate it. Only the standard identity and breadcrumb nodes. */}
      <JsonLd
        data={graph([
          electricianNode(),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs trail={trail} className="mb-8" />

        <SectionHeading
          as="h1"
          eyebrow="Reviews and referrals"
          title="Honest about where this stands"
        />

        <div className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
          <p>
            For ten years, Ghost Crown Electric has run almost entirely on
            referrals: one property manager telling another, one homeowner
            telling a neighbor. We are gathering those reviews in one place
            now. We would rather show you nothing than show you something
            invented.
          </p>
        </div>
      </div>

      {/* Two case proofs, told properly */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="Proof of work"
            title="Two jobs that tell the story"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card as="article" className="flex h-full flex-col">
              <GradientBadge tone="cyan" size="md" className="mb-4">
                <BrandIcon name="meter-bank" size={20} />
              </GradientBadge>
              <h3 className="font-heading text-xl font-semibold text-ink">
                A nine-meter bank, back to life after a fire
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A fire took out a nine-meter bank at a multi-unit property
                and left the whole building dark, tenants without power for
                a week. We rebuilt the electrical, repaired the fire-damaged
                wall, pulled the permit, and had families back on their own
                power within two weeks.
              </p>
            </Card>
            <Card as="article" className="flex h-full flex-col">
              <GradientBadge tone="gold" size="md" className="mb-4">
                <BrandIcon name="pool-spa-electrical" size={20} />
              </GradientBadge>
              <h3 className="font-heading text-xl font-semibold text-ink">
                A 150-foot pool rewire, and a handshake from the inspector
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                An older pool needed about 150 feet of electrical rewired,
                with the grounding and bonding brought up to code. It is
                detailed, safety-critical work a lot of contractors would rather
                not touch. We took it on, did it right, and pulled the permit.
                When the inspector signed off, he shook our electrician&apos;s
                hand. That handshake is the review that matters most to us.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What people tell us, framed as themes */}
      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="What we hear"
          title="What people tell us, and tell their neighbors"
          description="We will not put quotation marks around words no one said. But across ten years of referrals, the same few things come up again and again."
        />
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {THEMES.map((theme, index) => (
            <li key={theme.title}>
              <Card as="div" className="group h-full">
                <GradientBadge
                  tone={BADGE_TONES[index % BADGE_TONES.length]}
                  size="md"
                >
                  {theme.icon}
                </GradientBadge>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {theme.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{theme.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Invitation */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <SectionHeading
              as="h2"
              eyebrow="A small favor"
              title="If we have worked for you"
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              If we have done work at your home or property, a few honest
              words go a long way. A review helps your neighbors find
              licensed, permitted electrical work instead of guessing.
              Mention it next time we talk and we will point you to the
              right place.
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
