import type { Metadata } from "next";
import Link from "next/link";
import {
  getBusiness,
  getServices,
  type Service,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks, groupServices } from "@/lib/links";
import { formatPostDate } from "@/lib/blog";
import { getPosts } from "@/lib/content";
import {
  electricianNode,
  faqPageNode,
  founderNode,
  graph,
  type JsonLdNode,
} from "@/lib/schema";
import type { Faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToActions } from "@/components/sections/CallToActions";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician in Broward County, FL | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrician serving Broward County and South Florida, day or night. Owner led from the first call to the final inspection. Call for honest pricing.";

// The six FAQs previewed on the home page. Written once and used for both the
// visible accordion and the FAQPage schema so the markup matches the page.
const HOME_FAQS: Faq[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We run Broward County top to bottom, from West Palm Beach down to North Miami. That covers North Lauderdale, Fort Lauderdale, and the cities around them. If you sit a little outside that ring, call us anyway. We will be honest about it and quote the trip based on distance, so there are no surprises.",
  },
  {
    question: "Do you handle both commercial and residential work?",
    answer:
      "Yes. We work in homes and in commercial and managed properties every week. Panels, meters, service rebuilds, pool electrical, and repairs are all in our lane. If it is electrical and it sits inside our service area, tell us what is going on and we will let you know plainly whether we are the right fit.",
  },
  {
    question: "Can you help in an emergency?",
    answer:
      "Yes. We answer the phone day or night. If your power is out, a panel feels warm, or something is not safe, call and we will talk it through right away. After-hours and emergency visits carry a premium, because you are paying for real availability, and we tell you that up front before we head your way.",
  },
  {
    question: "How does the service call work?",
    answer:
      "The service call is $240. That covers roughly two hours, including travel, arrival, and diagnosis. If we can solve it on the spot in that window, there is no separate return charge. If the job is bigger, you get one honest price before any further work begins, so you always know the number before we start.",
  },
  {
    question: "My insurance company flagged my panel. Can you help?",
    answer:
      "Often, yes. Carriers frequently flag older panels like Zinsco and Federal Pacific. We come out, look at what you actually have, and tell you honestly whether it needs replacing and what that involves. Proper grounding and a sound panel protect your family, your home, and your investment as a whole. We document the work for your carrier.",
  },
  {
    question: "Are you licensed?",
    answer:
      "Yes. Ghost Crown Electric is a Florida Certified Electrical Contractor with statewide authority, and Damean is a Broward County Master Electrician. He pulls the permits himself and personally meets the inspector on every job. With 286 permitted projects on public record, the work is documented and verifiable, not just a promise.",
  },
];

const SERVED_LANES: { title: string; body: string }[] = [
  {
    title: "Property managers",
    body: "You need someone who picks up, prices it so an owner will sign off, and gets it inspected without drama. We give you licensed accountability, honest numbers, and one point of contact who has already met your inspector.",
  },
  {
    title: "Homeowners",
    body: "We treat your home the way we would treat family. We explain what is wrong in plain language, what it takes to fix, and what it costs, then we do it cleanly. No fear, no upsell, just peace of mind and a home that is safe.",
  },
  {
    title: "General contractors",
    body: "Sub the electrical to a crew that will not cost you a callback. Licensed execution, permits pulled correctly, and inspections that pass the first time. We stay in our lane so you can stay on schedule.",
  },
];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.home,
  });
}

export default function HomePage() {
  const business = getBusiness();
  const services = getServices();
  const featuredGroups = groupServices(services).filter(
    (group) => group.tier === "money" || group.tier === "pool",
  );
  const cities = cityLinks();
  const posts = getPosts().slice(0, 3);
  const pageUrl = absoluteUrl(routes.home);

  const nodes: JsonLdNode[] = [
    electricianNode(business),
    founderNode(business),
    faqPageNode(HOME_FAQS, pageUrl),
  ];

  const heroChips = [
    ...business.licenses.map((license) => license.label),
    `${business.stats.permittedProjects} permitted projects`,
    "Day or night",
  ];

  return (
    <>
      <JsonLd data={graph(nodes)} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-surface-dark text-ink-on-dark">
        <div
          aria-hidden="true"
          className="glow-ambient pointer-events-none absolute -right-32 -top-24 -z-10 h-[38rem] w-[38rem] opacity-60"
        />
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-2xl">
            <ul className="flex flex-wrap gap-2 text-sm text-ink-muted-on-dark">
              {business.licenses.map((license) => (
                <li
                  key={license.label}
                  className="inline-flex items-center gap-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                  />
                  {license.label}
                </li>
              ))}
            </ul>

            <h1 className="mt-5 text-4xl text-ink-on-dark sm:text-5xl lg:text-6xl">
              Electrician in Broward County,{" "}
              <span className="text-accent-bright">on call day or night.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-ink-muted-on-dark">
              Licensed, owner led, and calm under pressure. Damean takes your
              call, prices the job himself, and meets the inspector on site.
              From a panel that keeps tripping to a house with no power, we show
              up when we say we will.
            </p>

            <CallToActions className="mt-8" />

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <li key={chip}>
                  <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-ink-on-dark">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright"
                    />
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
            </div>

            {/* Request-service form, front and center in the hero */}
            <div id="request-service" className="scroll-mt-24">
              <LeadForm
                services={services.map((service) => service.shortName || service.name)}
                cities={cities}
                phoneDisplay={business.phoneDisplay}
                phoneTel={business.phoneTel}
                title="Request service"
                subtitle="We answer day or night"
              />
              <p className="mt-4 text-center text-sm text-ink-muted-on-dark">
                Prefer to talk now? Call{" "}
                <a
                  href={`tel:${business.phoneTel}`}
                  className="font-semibold text-ink-on-dark hover:text-accent-bright"
                >
                  {business.phoneDisplay}
                </a>{" "}
                day or night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Documented record trust block */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="On the record"
          title="A track record you can look up, not just take our word for."
          description="Most of our work comes from referrals, but the proof is public. Here is what the record shows."
        />
        <div className="relative isolate mt-10 overflow-hidden rounded-3xl bg-surface-dark px-5 py-8 sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="glow-ambient pointer-events-none absolute -top-24 left-1/2 -z-10 h-[26rem] w-[44rem] -translate-x-1/2 opacity-40"
          />
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: String(business.stats.permittedProjects),
                label: "Permitted projects on public record",
              },
              {
                value: "Top tier",
                label: "Of Florida contractors by permit quality",
              },
              {
                value: `${business.stats.yearsActive} years`,
                label: "Actively in business",
              },
              {
                value: "Owner led",
                label: "From the first call to the final inspection",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-dark flex flex-col gap-2 rounded-2xl p-6"
              >
                <dt className="font-heading text-3xl font-bold text-cyan-300">
                  {stat.value}
                </dt>
                <dd className="text-sm text-ink-muted-on-dark">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. Services grid: money and pool */}
      <section className="bg-surface-2">
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              as="h2"
              eyebrow="What we do"
              title="The work carriers, inspectors, and owners ask about most"
              description="Panels, meters, and service rebuilds, plus the pool electrical that keeps the water and everyone in it safe."
            />
            <Link
              href={routes.services}
              className="text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View all services
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-12">
            {featuredGroups.map((group) => (
              <div key={group.tier}>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {group.label}
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((service: Service) => (
                    <li key={service.slug}>
                      <ServiceCard service={service} titleAs="h4" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Who we serve */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="Who we serve"
          title="Three kinds of people call us, and we speak to each plainly."
        />
        <ul className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVED_LANES.map((lane) => (
            <li key={lane.title}>
              <Card className="flex h-full flex-col">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {lane.title}
                </h3>
                <p className="mt-2 text-ink-muted">{lane.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Straight pricing */}
      <section className="bg-surface-2">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="Straight pricing"
            title="We price it once, and we price it right."
            description="No games and no moving numbers. Here is how it works before you ever call."
          />
          <div className="relative isolate mt-10 overflow-hidden rounded-3xl bg-surface-dark px-5 py-8 sm:px-8 sm:py-10">
            <div
              aria-hidden="true"
              className="glow-ambient pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-[26rem] w-[44rem] -translate-x-1/2 opacity-40"
            />
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <li>
                <div className="glass-dark flex h-full flex-col rounded-2xl p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                    The service call
                  </h3>
                  <p className="mt-2 font-heading text-3xl font-bold text-cyan-300">
                    $240
                  </p>
                  <p className="mt-2 text-ink-muted-on-dark">
                    That covers roughly two hours, including travel, arrival, and
                    diagnosis. If we can handle it on the spot in that window,
                    there is no separate return charge.
                  </p>
                </div>
              </li>
              <li>
                <div className="glass-dark flex h-full flex-col rounded-2xl p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                    After hours and emergencies
                  </h3>
                  <p className="mt-2 font-heading text-3xl font-bold text-cyan-300">
                    A premium
                  </p>
                  <p className="mt-2 text-ink-muted-on-dark">
                    When you need us in the middle of the night, that visit carries
                    a premium. You are paying for real availability, day or night,
                    and we tell you plainly before we roll.
                  </p>
                </div>
              </li>
              <li>
                <div className="glass-dark flex h-full flex-col rounded-2xl p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                    A residential service rebuild
                  </h3>
                  <p className="mt-2 font-heading text-3xl font-bold text-cyan-300">
                    $5,000 to $8,000
                  </p>
                  <p className="mt-2 text-ink-muted-on-dark">
                    A full residential electrical service rebuild typically lands
                    in this range. The exact number comes after we see the property,
                    and it is quoted per property.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p className="mt-8 max-w-2xl text-ink-muted">
            The number we quote is the number you pay. We forecast the job
            honestly, put one price on it, and we do not change it mid job. You
            are paying for the experience, and for the peace of mind that comes
            with it.
          </p>
        </div>
      </section>

      {/* 7. Case proof */}
      <section className="bg-surface-dark text-ink-on-dark">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h2"
            onDark
            eyebrow="From the field"
            title="Two jobs that tell you how we work"
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <li>
              <div className="h-full rounded-xl border border-navy-600 bg-surface-dark-2 p-6 sm:p-7">
                <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                  A ten-meter bank, back to life after a vehicle fire
                </h3>
                <p className="mt-3 text-ink-muted-on-dark">
                  A vehicle fire took out a ten-meter meter bank and left the
                  whole building dark. Tenants had been without power for a week.
                  We got in, rebuilt the electrical in a week, and the building
                  was back online within two weeks of the fire. That is the kind
                  of situation you want handled by someone who has done it before.
                </p>
              </div>
            </li>
            <li>
              <div className="h-full rounded-xl border border-navy-600 bg-surface-dark-2 p-6 sm:p-7">
                <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                  A 150-foot pool feeder, and a handshake from the inspector
                </h3>
                <p className="mt-3 text-ink-muted-on-dark">
                  We ran a 150-foot pool feeder rewire and did it to the letter.
                  When the inspector came out, he looked it over and shook
                  Damean's hand. Pool electrical is unforgiving work, and getting
                  the grounding and bonding right is how you protect the water
                  and everyone in it.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 8. FAQ preview */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="Good questions"
          title="Answers to what people ask us first"
        />
        <FAQAccordion items={HOME_FAQS} className="mt-8" />
        <p className="mt-8">
          <Link
            href={routes.faq}
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            Read more questions and answers
          </Link>
        </p>
      </section>

      {/* 9. Service area */}
      <section className="bg-surface-2">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="Where we work"
            title="Broward County at the core, and a little beyond"
            description="We are based in North Lauderdale and run Broward County as our home turf. We also reach up into southern Palm Beach County and down into northern Miami-Dade, from West Palm Beach to North Miami. These are the areas with a page so far. More are on the way."
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={routes.city(city.slug)}
                  className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink hover:text-accent-hover"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-muted">
            Do not see your city? Call us. If you are within range we will be
            there, and if the drive is longer we will quote it honestly by
            distance.
          </p>
        </div>
      </section>

      {/* 10. Reviews, honest launch state */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <SectionHeading
            as="h2"
            eyebrow="Reviews"
            title="Ten years of referral work, now being written down"
            description="We built this business almost entirely on referrals, one honest job leading to the next. We are gathering those stories into written reviews now. We would rather show you real ones than inflate a number, so this page will keep growing as they come in."
          />
          <p className="mt-8">
            <Link
              href={routes.reviews}
              className="text-sm font-semibold text-accent hover:text-accent-hover"
            >
              See our reviews
            </Link>
          </p>
        </div>
      </section>

      {/* 11. Blog preview */}
      {posts.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                as="h2"
                eyebrow="Straight talk"
                title="Reading worth your time"
                description="Short, honest explainers on the questions we hear most."
              />
              <Link
                href={routes.blog}
                className="text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Read the blog
              </Link>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={routes.post(post.slug)} className="group block h-full">
                    <Card interactive as="article" className="flex h-full flex-col bg-surface">
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <span className="font-semibold uppercase tracking-[0.1em] text-accent">
                          {business.name}
                        </span>
                        {post.date ? (
                          <>
                            <span aria-hidden="true">/</span>
                            <time dateTime={post.date}>
                              {formatPostDate(post.date)}
                            </time>
                          </>
                        ) : null}
                      </div>
                      <h3 className="mt-3 font-heading text-lg font-semibold text-ink group-hover:text-accent-hover">
                        {post.title ?? post.slug}
                      </h3>
                      {typeof post.description === "string" &&
                      post.description ? (
                        <p className="mt-2 flex-1 text-sm text-ink-muted">
                          {post.description}
                        </p>
                      ) : null}
                      <span className="mt-4 text-sm font-semibold text-accent">
                        Read article
                      </span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 12. Final CTA */}
      <CTABand
        headline={business.tagline}
        body="That is the whole promise. Damean answers, prices the job, does the work, and meets the inspector himself. Reach out and we will tell you plainly what it takes and what it costs."
      />
    </>
  );
}
