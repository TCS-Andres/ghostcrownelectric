import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Clock, MessageSquare, BadgeDollarSign, Zap, Cable } from "lucide-react";
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
import { Card } from "@/components/ui/Card";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Reviews and Referrals | Ghost Crown Electric";
const DESCRIPTION =
  "Ten years of licensed electrical work in Broward County, built on referrals. Read how we work, the jobs that tell our story, and how to leave an honest review.";

// The recurring themes we hear in referrals, stated as themes, not as quotes we
// put in anyone's mouth. No names, no star ratings, no invented testimonials.
const THEMES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "We show up when we say we will",
    body: "The time we give you is a promise. People notice when a contractor keeps it, and they remember it.",
    icon: <Clock size={20} aria-hidden="true" />,
  },
  {
    title: "We explain it plainly, then fix it",
    body: "You get the problem in everyday language, what it takes to fix, and what it costs, without being talked down to.",
    icon: <MessageSquare size={20} aria-hidden="true" />,
  },
  {
    title: "The number we quote is the number you pay",
    body: "We price the job once, before the work starts, and we stand behind it. No surprises at the end.",
    icon: <BadgeDollarSign size={20} aria-hidden="true" />,
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
  const business = getBusiness();
  const ownerName = business.founder.name;

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
          founderNode(),
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
            telling a neighbor. We have never leaned on star ratings to win work.
            As we bring the company&apos;s story online, we are gathering our
            reviews in one place. This page is honest about where that stands. We
            would rather show you nothing than show you something invented.
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
                <Zap size={20} aria-hidden="true" />
              </GradientBadge>
              <h3 className="font-heading text-xl font-semibold text-ink">
                A nine-meter bank, back to life after a fire
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A fire took out a nine-meter meter bank at a multi-unit property
                and left the whole building dark, with tenants without power for
                a week. That is the kind of call that does not wait for morning.
                We rebuilt the electrical, cleaned up and repaired the
                fire-damaged wall around it, pulled the permit, and had families
                back on their own power within two weeks of the fire.
                Restoration work like this is exactly why we moved the business
                toward the jobs that need a licensed, experienced hand.
              </p>
            </Card>
            <Card as="article" className="flex h-full flex-col">
              <GradientBadge tone="gold" size="md" className="mb-4">
                <Cable size={20} aria-hidden="true" />
              </GradientBadge>
              <h3 className="font-heading text-xl font-semibold text-ink">
                A 150-foot pool rewire, and a handshake from the inspector
              </h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                An older pool needed its electrical run rewired, about 150 feet
                of it, with the grounding and bonding brought up to code. It is
                detailed, safety-critical work that a lot of contractors would
                rather not touch. We took it on, did it right, and pulled the
                permit. When the inspector signed off, he shook {ownerName}
                &apos;s hand. That handshake is the review that matters most to
                us.
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
          description="We are not going to put quotation marks around words no one said. But across ten years of referrals, the same few things come up again and again, and we are comfortable telling you what they are."
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
              If Ghost Crown Electric has done work at your home or property, a
              few honest words from you go a long way. A review helps your
              neighbors find licensed, permitted electrical work instead of
              guessing. It is one of the kindest things a past customer can do
              for the next one. Mention it next time we talk, or reach out any
              time and we will point you to the right place.
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
