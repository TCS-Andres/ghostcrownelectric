import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBusiness, getServices, getPosts } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks } from "@/lib/links";
import { categorizeServices } from "@/lib/categories";
import { coverageByCounty } from "@/lib/coverage";
import { postImage } from "@/lib/imagery";
import { formatPostDate } from "@/lib/blog";
import {
  electricianNode,
  faqPageNode,
  founderNode,
  graph,
  type JsonLdNode,
} from "@/lib/schema";
import type { Faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { CoverageMap } from "@/components/ui/CoverageMap";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToActions } from "@/components/sections/CallToActions";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician in Broward County, FL | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrician serving Broward County and South Florida, day or night. One accountable team from the first call to the final inspection. Call for honest pricing.";

// The six FAQs previewed on the home page. Written once and used for both the
// visible accordion and the FAQPage schema so the markup matches the page.
const HOME_FAQS: Faq[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We cover all of Broward and Palm Beach counties, and we reach as far south as North Miami Beach. Broward is home base, so that is where we are quickest, but we run north through Palm Beach every week. North Miami Beach is about as far into Miami-Dade as we go. If you sit right at the edge, call us anyway and we will be honest about it, quoting the trip by distance so there are no surprises.",
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
      "Yes. Ghost Crown Electric is a Florida Certified Electrical Contractor with statewide authority and holds a Broward County Master Electrician license. We pull the permits and meet the inspector on every job. With 286 permitted projects on public record, the work is documented and verifiable, not just a promise.",
  },
];

// The reasons to choose Ghost Crown, shown beside a photo of the work.
const WHY_FEATURES: { title: string; body: string }[] = [
  {
    title: "Licensed and certified",
    body: "Florida Certified Electrical Contractor and Broward County Master Electrician, in a market full of unlicensed labor.",
  },
  {
    title: "One honest price",
    body: "We forecast the job, quote it once, and never change the number mid job. No surprises when the work is done.",
  },
  {
    title: "Day or night",
    body: "Power does not wait for business hours. We answer the phone and show up when we say we will.",
  },
  {
    title: "A documented record",
    body: "286 permitted projects on public record, ranked in the top tier of Florida contractors by permit quality.",
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
  const { categories } = categorizeServices(services);
  const cities = cityLinks();
  const coverage = coverageByCounty();
  const posts = getPosts().slice(0, 3);
  const pageUrl = absoluteUrl(routes.home);

  const nodes: JsonLdNode[] = [
    electricianNode(business),
    founderNode(business),
    faqPageNode(HOME_FAQS, pageUrl),
  ];

  const trustItems = [
    ...business.licenses.map((license) => license.label),
    `${business.stats.permittedProjects} permitted projects`,
    "Available day or night",
  ];

  return (
    <>
      <JsonLd data={graph(nodes)} />

      {/* 1. Hero with ambient video background */}
      <section className="relative isolate overflow-hidden bg-surface-dark text-ink-on-dark">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-video-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-video-poster.jpg"
          >
            <source src="/videos/gce-ambient-web.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark on the left for legibility, lighter on the right so the video shows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
        />

        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-2xl">
              <ul className="flex flex-wrap gap-2 text-sm text-ink-muted-on-dark">
                {business.licenses.map((license) => (
                  <li key={license.label} className="inline-flex items-center gap-2">
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
                Licensed, local, and calm under pressure. We take your call, price
                the job, and meet the inspector on site. From a panel that keeps
                tripping to a house with no power, we show up when we say we will.
              </p>

              <CallToActions className="mt-8" />
            </div>

            {/* Request-service form, front and center in the hero */}
            <div id="request-service" className="scroll-mt-24">
              <LeadForm
                services={services.map(
                  (service) => service.shortName || service.name,
                )}
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

      {/* 2. Trust bar */}
      <section className="border-b border-border bg-surface">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 sm:grid-cols-4">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                >
                  <CheckIcon />
                </span>
                <span className="text-sm font-semibold text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Services by category */}
      <section className="bg-surface-2">
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              as="h2"
              eyebrow="What we do"
              title="Electrical work, sorted so you can find it fast"
              description="From panels and meters to pool electrical and backup power, this is the work we are called for most. Pick a category, or see the full list."
            />
            <Link
              href={routes.services}
              className="text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View all services
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryCard category={category} titleAs="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Why Ghost Crown */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Media
            src="/images/damean-switchgear.jpg"
            alt="A Ghost Crown Electric electrician testing commercial switchgear"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-square rounded-2xl border border-border shadow-[var(--shadow-card)]"
          />
          <div>
            <SectionHeading
              as="h2"
              eyebrow="Why Ghost Crown"
              title="The licensed hand you want in your panel"
              description="You cannot see your electrical system, so you are trusting the person who works on it. Here is why property managers and homeowners keep calling us back."
            />
            <ul className="mt-8 flex flex-col gap-5">
              {WHY_FEATURES.map((feature) => (
                <li key={feature.title} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                  >
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-ink-muted">{feature.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Straight pricing */}
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

      {/* 6. Proof from the field */}
      <section className="bg-surface-dark text-ink-on-dark">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h2"
            onDark
            eyebrow="From the field"
            title="Two jobs that tell you how we work"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <Media
              src="/images/damean-cabletray.jpg"
              alt="A Ghost Crown Electric electrician running cable in a commercial ceiling"
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="aspect-[4/3] rounded-2xl border border-navy-600 lg:aspect-auto lg:h-full"
            />
            <ul className="grid grid-cols-1 gap-6">
              <li>
                <div className="h-full rounded-2xl border border-navy-600 bg-surface-dark-2 p-6 sm:p-7">
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
                <div className="h-full rounded-2xl border border-navy-600 bg-surface-dark-2 p-6 sm:p-7">
                  <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                    A 150-foot pool feeder, and a handshake from the inspector
                  </h3>
                  <p className="mt-3 text-ink-muted-on-dark">
                    We ran a 150-foot pool feeder rewire and did it to the letter.
                    When the inspector came out, he looked it over and shook our
                    electrician's hand. Pool electrical is unforgiving work, and
                    getting the grounding and bonding right is how you protect the
                    water and everyone in it.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Emergency strip */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan text-accent-bright-ink">
        <div className="container-page flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Power out, or something that does not feel safe?
            </h2>
            <p className="mt-1.5 font-medium text-accent-bright-ink/80">
              Call day or night. We will talk it through right away and head your
              way.
            </p>
          </div>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-navy px-6 py-3.5 font-heading font-semibold text-ink-on-dark transition hover:bg-navy-800"
          >
            <PhoneIcon />
            Call {business.phoneDisplay}
          </a>
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
            title="Broward and Palm Beach, south to North Miami Beach"
            description="We are based in North Lauderdale and run Broward County as our home turf, cover all of Palm Beach County to the north, and reach as far south as North Miami Beach. Pick a county to see the cities we serve."
          />
          <CoverageMap groups={coverage} className="mt-10" />
          <p className="mt-6 text-ink-muted">
            Do not see your city? Call us. If you are within range we will be
            there, and if the drive is longer we will quote it honestly by
            distance.
          </p>
        </div>
      </section>

      {/* 10. The record */}
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
                value: "Licensed team",
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
              {posts.map((post) => {
                const image = postImage(post.slug);
                return (
                  <li key={post.slug}>
                    <Link
                      href={routes.post(post.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                    >
                      {image ? (
                        <Media
                          src={image.src}
                          alt={image.alt}
                          className="aspect-[16/9]"
                          sizes="(min-width: 768px) 33vw, 100vw"
                          imageClassName="transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="flex flex-1 flex-col p-6">
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
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 12. Final CTA */}
      <CTABand
        headline={business.tagline}
        body="That is the whole promise. We answer, price the job, do the work, and meet the inspector. Reach out and we will tell you plainly what it takes and what it costs."
      />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M5.6 2.2 3.3 2.6C2.7 2.7 2.3 3.3 2.4 3.9c.6 5 4.7 9.1 9.7 9.7.6.1 1.2-.3 1.3-.9l.4-2.3c.1-.5-.2-1-.7-1.2l-2.3-.9c-.4-.2-.9 0-1.2.3l-.8.9C7.3 8.7 6.3 7.7 5.5 6.2l.9-.8c.3-.3.5-.8.3-1.2l-.9-2.3c-.1-.5-.6-.8-1.1-.7Z" />
    </svg>
  );
}
