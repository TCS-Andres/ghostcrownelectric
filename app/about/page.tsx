import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { getBusiness } from "@/lib/content";
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
import { Media } from "@/components/ui/Media";
import { CTABand } from "@/components/ui/CTABand";
import { HeroTrust } from "@/components/sections/HeroTrust";
import { CallToActions } from "@/components/sections/CallToActions";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "About Ghost Crown Electric | South Florida Electrician";
const DESCRIPTION =
  "Ghost Crown Electric is a licensed electrical service and repair company serving South Florida. Ten years, 286 permitted jobs on public record.";

// Plain-language values, framed around the customer's peace of mind. The client
// is the hero here; the company is the guide.
const VALUES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Trust comes first",
    body: "If you cannot trust the company working in your panel, nothing else matters.",
    icon: <BrandIcon name="licensed-shield" size={20} />,
  },
  {
    title: "We show up when we say we will",
    body: "A time we give you is a promise. Day or night, we come.",
    icon: <BrandIcon name="call-day-or-night" size={20} />,
  },
  {
    title: "Do it right so you can forget about it",
    body: "Done right the first time, so you stop thinking about it after we leave.",
    icon: <BrandIcon name="five-star-work" size={20} />,
  },
  {
    title: "Price it once, price it right",
    body: "One honest number, and we stand behind it. No surprises once work has started.",
    icon: <BrandIcon name="one-honest-number" size={20} />,
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.about,
  });
}

export default function AboutPage() {
  const business = getBusiness();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "About" },
  ];
  const pageUrl = absoluteUrl(routes.about);

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      {/* Breadcrumbs above the dark hero */}
      <div className="container-page pt-6">
        <Breadcrumbs trail={trail} />
      </div>

      {/* Hero: the company in one honest paragraph */}
      <section className="relative isolate mt-6 overflow-hidden bg-surface-dark text-ink-on-dark">
        <div
          aria-hidden="true"
          className="glow-ambient pointer-events-none absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] opacity-50"
        />
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-bright">
                  About the company
                </span>
                <h1 className="mt-3 text-3xl text-ink-on-dark sm:text-4xl md:text-5xl">
                  The Licensed Team Behind the Work
                </h1>
                <p className="mt-5 text-lg text-ink-muted-on-dark">
                  A licensed electrical service, repair, and restoration
                  company based in North Lauderdale, serving South Florida. We take the call, price the job, and
                  meet the inspector in person. We would rather do the work
                  right once than come back twice.
                </p>
              </div>
              <HeroTrust className="mt-8" />
              <CallToActions className="mt-8" />
            </div>
            <div className="hidden lg:block">
              <Media
                src="/images/truck-branded-lift.jpg"
                alt="The Ghost Crown Electric bucket truck with its boom fully extended to a parking lot pole light at a South Florida plaza"
                priority
                sizes="(min-width: 1024px) 45vw, 0px"
                className="aspect-[4/3] rounded-2xl border border-navy-600"
              >
                <div className="absolute inset-x-4 bottom-4">
                  <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-accent-bright"
                    />
                    <span className="text-sm font-medium text-ink-on-dark">
                      286 permitted projects on public record
                    </span>
                  </span>
                </div>
              </Media>
            </div>
          </div>
        </div>
      </section>

      {/* The record: approved trust anchors as a stat strip */}
      <section className="border-b border-border bg-surface-2">
        <div className="container-page">
          <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-2 py-8 text-center">
              <dt className="sr-only">Permitted projects on public record</dt>
              <dd className="font-heading text-3xl font-bold text-ink">286</dd>
              <p className="mt-1 text-sm text-ink-muted">
                Permitted projects on public record
              </p>
            </div>
            <div className="px-2 py-8 text-center">
              <dt className="sr-only">Years actively operating</dt>
              <dd className="font-heading text-3xl font-bold text-ink">
                10 years
              </dd>
              <p className="mt-1 text-sm text-ink-muted">
                Actively operating in South Florida
              </p>
            </div>
            <div className="px-2 py-8 text-center">
              <dt className="sr-only">Florida permit quality</dt>
              <dd className="font-heading text-3xl font-bold text-ink">
                Top tier
              </dd>
              <p className="mt-1 text-sm text-ink-muted">
                Florida permit quality ranking
              </p>
            </div>
          </dl>
        </div>
      </section>

      {/* The origin */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-2xl">
            <SectionHeading
              as="h2"
              eyebrow="Where we started"
              title="Built on lighting, moved to the work that lasts"
            />
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
              <p>
                We started ten years ago retrofitting South Florida lighting
                to LED. Good work, until price became the only thing that
                mattered. So we moved to the work that still needs a
                licensed hand: service rebuilds, panel and meter
                replacement, power restoration, and emergency response.
              </p>
            </div>
          </div>
          <Media
            src="/images/commercial-lighting-night.jpg"
            alt="A commercial storefront sign fully lit at night after a Ghost Crown Electric relight"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] rounded-2xl border border-border shadow-[var(--shadow-card)]"
          />
        </div>
      </section>

      {/* Licensed ownership: accountability framed around the company */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Media
              src="/images/work-service-subpanels.jpg"
              alt="A completed Ghost Crown Electric residential service: new meter can, main panel, disconnects, and battery backup"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/3] rounded-2xl border border-border shadow-[var(--shadow-card)]"
            />
            <div>
              <SectionHeading
                as="h2"
                eyebrow="How we are built"
                title="Licensed Ownership on Every Job"
              />
              <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
                <p>
                  Ghost Crown Electric is owner-operated and licensed at the top:
                  a Florida Certified Electrical Contractor and a South Florida
                  Master Electrician. Nobody here is behind a desk. The same
                  company that takes your call walks the property, prices the job,
                  does the work, pulls the permit, and meets the inspector.
                </p>
                <p className="border-l-2 border-accent pl-5 font-heading text-xl font-semibold text-ink">
                  &ldquo;We treat every property like it is our own family&rsquo;s.
                  You are trusting us with where people live, and that is not a job
                  we hand off.&rdquo;
                </p>
                <p>
                  That is why a real person answers, why you get the truth even
                  when it is not the easy sell, and why a first-time customer gets
                  the same crew as one we have looked after for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values in plain language */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="How we work"
            title="What we stand on"
            description="The reasons people call us back and send us to their neighbors."
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <li key={value.title}>
                <Card as="div" className="group h-full">
                  <GradientBadge
                    tone={BADGE_TONES[index % BADGE_TONES.length]}
                    size="md"
                  >
                    {value.icon}
                  </GradientBadge>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{value.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The crew */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Media
            src="/images/work-service-upgrade.jpg"
            alt="The Ghost Crown Electric crew rebuilding a residential electrical service"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="order-last aspect-[4/3] rounded-2xl border border-border shadow-[var(--shadow-card)] lg:order-first"
          />
          <div className="max-w-2xl">
            <SectionHeading as="h2" eyebrow="The crew" title="Small on purpose" />
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
              <p>
                Our own in-house crew, with bucket truck services available,
                so your work never gets handed to a subcontractor we do not
                know. One crew member has been with us more than eight years.
                We keep the team small on purpose so the quality stays
                consistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTABand
        headline="Work with the electrician who answers"
        body="Tell us what is going on. We will tell you what it takes, what it costs, and when we can be there."
      />
    </>
  );
}
