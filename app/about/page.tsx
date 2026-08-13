import type { Metadata } from "next";
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
import { Media } from "@/components/ui/Media";
import { CTABand } from "@/components/ui/CTABand";
import { HeroTrust } from "@/components/sections/HeroTrust";
import { CallToActions } from "@/components/sections/CallToActions";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "About Ghost Crown Electric | Broward Electrician";
const DESCRIPTION =
  "Meet Ghost Crown Electric, a licensed, local electrical service and repair company serving Broward County and South Florida. Ten years, 286 permitted jobs.";

// Plain-language values, framed around the customer's peace of mind. The client
// is the hero here; the company is the guide.
const VALUES: { title: string; body: string }[] = [
  {
    title: "Trust comes first",
    body: "We lead with trust and licensing. If you cannot trust the person working in your panel, nothing else matters.",
  },
  {
    title: "We show up when we say we will",
    body: "A time we give you is a promise. Day or night, when we say we are coming, we come.",
  },
  {
    title: "Do it right so you can forget about it",
    body: "We do the work right the first time, so you are not thinking about it after we leave. Peace of mind is the real deliverable.",
  },
  {
    title: "Price it once, price it right",
    body: "We look at the whole situation, give you one honest number, and stand behind it. No surprises once work has started.",
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
  const { name: ownerName, title: ownerTitle } = business.founder;

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
          founderNode(),
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
                  Ghost Crown Electric is a licensed electrical service, repair, and
                  restoration company based in North Lauderdale, serving Broward
                  County and South Florida. We take your first call, price the job,
                  and meet the inspector in person. We stay in our lane, we show up
                  when we say we will, and we would rather do the work right once
                  than come back twice.
                </p>
              </div>
              <HeroTrust className="mt-8" />
              <CallToActions className="mt-8" />
            </div>
            <div className="hidden lg:block">
              <Media
                src="/images/damean-blueprints.jpg"
                alt="A Ghost Crown Electric electrician reviewing plans with the crew on a South Florida job site"
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
        <div className="max-w-3xl">
          <SectionHeading
            as="h2"
            eyebrow="Where we started"
            title="Built on lighting, moved to the work that lasts"
          />
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
            <p>
              We started about ten years ago retrofitting South Florida lighting
              to LED. Good work, until it commoditized and price became the only
              thing that mattered. So we moved the business to the work that
              still needs a licensed, experienced hand: service rebuilds, panel
              and meter replacement, power restoration, and emergency response.
              That is what we are known for now, and what we are built to do
              well.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the owner: one contained section about Damean */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Media
              src="/images/damean-warehouse.jpg"
              alt={`${ownerName}, owner and ${ownerTitle} at Ghost Crown Electric`}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/3] rounded-2xl border border-border shadow-[var(--shadow-card)]"
            />
            <div>
              <SectionHeading
                as="h2"
                eyebrow="Meet the owner"
                title="A working owner who leads the crew"
              />
              <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
                <p>
                  {ownerName} is a working owner and {ownerTitle}. He is not
                  behind a desk. He leads a licensed crew that takes the first
                  call, walks the property, prices the job, does the work, pulls
                  the permit, and meets the inspector when it is time to close it
                  out.
                </p>
                <p className="border-l-2 border-accent pl-5 font-heading text-xl font-semibold text-ink">
                  &ldquo;I am the opener and the closer.&rdquo;
                </p>
                <p>
                  When you hire Ghost Crown Electric, you are hiring one
                  accountable company, answerable for the result from the first
                  call to the final inspection.
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
            description="These are not slogans on a wall. They are the reasons people call us back and send us to their neighbors."
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value.title}>
                <Card as="div" className="h-full">
                  <h3 className="font-heading text-lg font-semibold text-ink">
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
        <div className="max-w-3xl">
          <SectionHeading
            as="h2"
            eyebrow="The crew"
            title="Small on purpose"
          />
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Ghost Crown Electric runs three trucks and a three person in-house
              crew, so we keep three jobs moving at once without handing your
              work to a subcontractor we do not know. One member of the crew has
              been with us more than eight years. The people who show up are our
              people, trained the way we work, and we keep the team small on
              purpose so the quality stays consistent.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTABand
        headline="Work with the electrician who answers"
        body="Tell us what is going on. We will tell you plainly what it takes, what it costs, and when we can be there. Day or night."
      />
    </>
  );
}
