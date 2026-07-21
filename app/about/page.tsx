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
import { CTABand } from "@/components/ui/CTABand";
import { HeroTrust } from "@/components/sections/HeroTrust";
import { CallToActions } from "@/components/sections/CallToActions";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "About Ghost Crown Electric | Broward Electrician";
const DESCRIPTION =
  "Meet Ghost Crown Electric, a licensed, owner led electrical service and repair company serving Broward County and South Florida. Ten years, 286 permitted jobs.";

// Plain-language values, framed around the customer's peace of mind. The client
// is the hero here; the company is the guide.
const VALUES: { title: string; body: string }[] = [
  {
    title: "Trust comes first",
    body: "Before price, before speed, before anything, we lead with trust and licensing. If you cannot trust the person working in your panel, nothing else really matters.",
  },
  {
    title: "We show up when we say we will",
    body: "A time we give you is a promise. Day or night, when we say we are coming, we come. That is the whole reputation, and we protect it.",
  },
  {
    title: "Do it right so you can forget about it",
    body: "The goal is simple. Do the work right the first time so you are not thinking about it after we leave. Peace of mind is the real deliverable.",
  },
  {
    title: "Give more than you pay for",
    body: "We would rather hand a customer more than they paid for than nickel and dime a job. Electricity is something we do not see, we only feel the effect.",
  },
  {
    title: "We stay in our lane",
    body: "We do service, repair, and restoration, and we do it well. We do not chase every job. Staying focused is why we are fast and why we are good.",
  },
  {
    title: "Price it once, price it right",
    body: "We look at the whole situation, give you one honest number, and stand behind it. There are no surprises after the work has started.",
  },
  {
    title: "Grow slow, grow safe",
    body: "We grow at a pace we can stand behind, so every job still gets the owner's attention. Bigger is not the goal. Better is the goal.",
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
      <section className="mt-6 bg-surface-dark text-ink-on-dark">
        <div className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              About the company
            </span>
            <h1 className="mt-3 text-3xl text-ink-on-dark sm:text-4xl md:text-5xl">
              The licensed hand behind the work
            </h1>
            <p className="mt-5 text-lg text-ink-muted-on-dark">
              Ghost Crown Electric is a licensed electrical service, repair, and
              restoration company based in North Lauderdale, serving Broward
              County and South Florida. The owner takes your first call, prices
              the job, and meets the inspector himself. We stay in our lane, we
              show up when we say we will, and we would rather do the work right
              once than come back twice.
            </p>
          </div>
          <HeroTrust className="mt-8" />
          <CallToActions className="mt-8" />
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
              The company was built about ten years ago servicing South
              Florida&apos;s commercial and residential move away from metal
              halide and high pressure sodium lighting toward LED. That was good
              work, and for a while there was plenty of it.
            </p>
            <p>
              Over time it commoditized. Anyone could sell a retrofit, and price
              became the only thing that mattered. So we made a deliberate
              choice. We moved the center of gravity of the business to the work
              that still needs a licensed, experienced hand: service rebuilds,
              panel and meter equipment replacement, power restoration, and
              emergency response. That is the work we are known for now, and it
              is the work we are built to do well.
            </p>
          </div>
        </div>
      </section>

      {/* The owner block */}
      <section className="bg-surface-2">
        <div className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <SectionHeading
              as="h2"
              eyebrow="The owner"
              title="The owner takes the call"
            />
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
              <p>
                {ownerName} is a working owner and {ownerTitle}. He is not behind
                a desk. He takes the first call, walks the property, prices the
                job, does the work with his crew, pulls the permit, and meets
                the inspector when it is time to close it out. Then he makes the
                follow-up call to be sure you are settled.
              </p>
              <p className="border-l-2 border-accent pl-5 font-heading text-xl font-semibold text-ink">
                &ldquo;I am the opener and the closer.&rdquo;
              </p>
              <p>
                When you hire Ghost Crown Electric, you are hiring the person who
                is accountable for the result, from the first call to the final
                inspection. That is a rare thing in this trade, and it is the
                heart of how we work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The record, in words */}
      <section className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
          <SectionHeading
            as="h2"
            eyebrow="The record"
            title="Written down, in public"
          />
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Electrical work is inspected work, and the permit record is where a
              contractor&apos;s history gets written down in public. Ours shows
              286 permitted projects, and it places us in the top tier of Florida
              contractors by permit quality.
            </p>
            <p>
              We hold a Florida Certified Electrical Contractor license with
              statewide authority and a Broward County Master Electrician
              license. We have been actively operating for ten years, and twelve
              since the company was formed. None of that is marketing. It is on
              the record, and you are welcome to check it.
            </p>
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
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              Ghost Crown Electric runs three trucks and a three person, in-house
              crew. That lets us keep three jobs moving at once across the
              service area without ever handing your work to a subcontractor we
              do not know. One member of the crew has been with the company more
              than eight years.
            </p>
            <p>
              The people who show up at your property are our people, trained the
              way we work. We keep the team small on purpose, because that is how
              the quality stays consistent and the owner stays close to every
              job.
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
