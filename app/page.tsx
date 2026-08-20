import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Gauge,
  PlugZap,
  Cable,
  SquareStack,
  Truck,
  CircuitBoard,
  House,
} from "lucide-react";
import { getBusiness, getServices, getPosts } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks } from "@/lib/links";
import { coverageByCounty } from "@/lib/coverage";
import { imageAlt, imagePath, postImage } from "@/lib/imagery";
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
import { StatValue } from "@/components/ui/StatValue";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import { Media } from "@/components/ui/Media";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CoverageMap } from "@/components/ui/CoverageMap";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CallToActions } from "@/components/sections/CallToActions";
import { PlanSection } from "@/components/sections/PlanSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician in Broward County, FL | Ghost Crown Electric";
const DESCRIPTION =
  "Licensed electrician serving Broward County and South Florida, day or night. One accountable team from the first call to the final inspection. Call for honest pricing.";

// Real job photos from the field, shown in the interactive "Recent work"
// gallery. Each card carries a short note on what the job was and its own icon.
const WORK_ITEMS: CardItem[] = [
  {
    id: "service-rebuild",
    title: "Service Entrance Rebuild",
    description:
      "A full exterior service entrance rebuilt with new conduit, weatherhead, and wiring, then permitted and inspected.",
    imgSrc: "/images/work-service-rebuild.jpg",
    alt: "An exterior electrical service entrance rebuilt with new conduit and wiring",
    icon: <Zap size={24} aria-hidden="true" />,
  },
  {
    id: "meter-bank",
    title: "Multi-Meter Service",
    description:
      "A multi-tenant meter bank serviced on a building exterior, keeping a whole building's power safe and up to code.",
    imgSrc: "/images/work-meter-bank.jpg",
    alt: "A multi-tenant electrical meter bank on a building exterior",
    icon: <Gauge size={24} aria-hidden="true" />,
  },
  {
    id: "service-upgrade",
    title: "Service Upgrade",
    description:
      "Upgrading an exterior service to carry a modern home's load, from air conditioning to EV charging.",
    imgSrc: "/images/work-service-upgrade.jpg",
    alt: "A Ghost Crown Electric electrician upgrading an exterior electrical service",
    icon: <PlugZap size={24} aria-hidden="true" />,
  },
  {
    id: "panel-rewire",
    title: "Panel Rewire",
    description:
      "An electrical panel rewired with every circuit cleanly routed and clearly labeled.",
    imgSrc: "/images/work-panel-rewire.jpg",
    alt: "An electrical panel rewired with neatly routed circuits",
    icon: <Cable size={24} aria-hidden="true" />,
  },
  {
    id: "subpanels",
    title: "Meter, Service & Subpanels",
    description:
      "A new meter, service disconnect, and subpanels set clean on a stucco wall.",
    imgSrc: "/images/work-service-subpanels.jpg",
    alt: "A new exterior meter, service disconnect, and subpanels on a stucco wall",
    icon: <SquareStack size={24} aria-hidden="true" />,
  },
  {
    id: "bucket-truck",
    title: "Our Bucket Truck On Site",
    description:
      "Our own bucket truck on the job, so overhead service and sign work happens on our schedule, not a rental company's.",
    imgSrc: "/images/work-bucket-truck.jpg",
    alt: "The Ghost Crown Electric bucket truck at a job site",
    icon: <Truck size={24} aria-hidden="true" />,
  },
  {
    id: "panel-replace",
    title: "Panel Replacement",
    description:
      "A residential panel replaced with a modern, code-compliant one, often the fix an insurer wants to see.",
    imgSrc: "/images/work-panel-replace.jpg",
    alt: "A residential electrical panel being replaced",
    icon: <CircuitBoard size={24} aria-hidden="true" />,
  },
  {
    id: "residential-dusk",
    title: "Residential Service, Broward",
    description:
      "A Broward County home at dusk after a completed service upgrade, back to full, reliable power.",
    imgSrc: "/images/work-residential-dusk.jpg",
    alt: "A South Florida home at dusk after an electrical service upgrade",
    icon: <House size={24} aria-hidden="true" />,
  },
];

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
      "You reach a licensed electrician, not a call center. We start with an on-site visit to see the problem in person and diagnose it. If the job is bigger, you get one honest price before any further work begins, so you always know the number before we start.",
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
const WHY_FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Licensed and certified",
    body: "Florida Certified Electrical Contractor and Broward County Master Electrician, in a market full of unlicensed labor.",
    icon: <BrandIcon name="licensed-shield" size={18} />,
  },
  {
    title: "One honest price",
    body: "We forecast the job, quote it once, and never change the number mid job. No surprises when the work is done.",
    icon: <BrandIcon name="one-honest-number" size={18} />,
  },
  {
    title: "Day or night",
    body: "Power does not wait for business hours. We answer the phone and show up when we say we will.",
    icon: <BrandIcon name="call-day-or-night" size={18} />,
  },
  {
    title: "A documented record",
    body: "286 permitted projects on public record, ranked in the top tier of Florida contractors by permit quality.",
    icon: <BrandIcon name="five-star-work" size={18} />,
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
  // The top services (commercial lighting included). The uneven last grid row is
  // filled by a call-to-action card below.
  const featuredServices = services.slice(0, 7);
  const cities = cityLinks();
  const coverage = coverageByCounty();
  const posts = getPosts().slice(0, 3);
  const pageUrl = absoluteUrl(routes.home);

  // The value stack under the hero: the two license credentials (with the state
  // license number on the one that carries it) and the day-or-night line, each
  // with its own icon.
  const valueStack: { label: string; icon: ReactNode }[] = [
    ...business.licenses.map((license, index) => ({
      label:
        license.number && license.number !== "PLACEHOLDER"
          ? `${license.label} #${license.number}`
          : license.label,
      icon:
        index === 0 ? (
          <BrandIcon name="licensed-shield" size={18} />
        ) : (
          <BrandIcon name="crown-bolt" size={18} />
        ),
    })),
    {
      label: "Available day or night",
      icon: <BrandIcon name="call-day-or-night" size={18} />,
    },
  ];

  const nodes: JsonLdNode[] = [
    electricianNode(business),
    founderNode(business),
    faqPageNode(HOME_FAQS, pageUrl),
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
            preload="auto"
            poster="/images/hero-video-poster.jpg"
          >
            <source src="/videos/gce-ambient-web-v3.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark on the left for legibility, lighter on the right so the video shows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/25"
        />

        <div className="container-page flex min-h-[40rem] flex-col justify-center py-16 sm:py-20 lg:min-h-[48rem] lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-bright">
                Residential &amp; Commercial Electrical Services
              </p>

              <h1 className="mt-4 text-4xl text-ink-on-dark sm:text-5xl lg:text-6xl">
                Electrician in Broward County,{" "}
                <span className="text-accent-bright">on Call Day or Night.</span>
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
                title="Request Service"
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

      {/* 2. Value stack: the thin credentials strip under the hero video */}
      <section className="border-b border-border bg-surface">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 py-6 sm:grid-cols-3">
            {valueStack.map((item, index) => (
              <li key={item.label} className="group flex items-center gap-2.5">
                <GradientBadge
                  tone={BADGE_TONES[index % BADGE_TONES.length]}
                  size="sm"
                >
                  {item.icon}
                </GradientBadge>
                <span className="text-sm font-semibold text-ink">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Services */}
      <section className="bg-surface-2">
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              as="h2"
              eyebrow="What we do"
              title="The electrical work we are called for most"
              description="From panels and service upgrades to pool electrical and everyday lighting and repairs, one licensed crew handles it from the first call to the final inspection."
            />
            <Link
              href={routes.services}
              className="text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View all services
            </Link>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} titleAs="h3" />
              </li>
            ))}
            {/* The seventh card leaves a gap in the last row; fill it with the
                two main calls to action. */}
            <li className="sm:col-span-2">
              <div className="relative flex h-full min-h-[13rem] flex-col justify-center overflow-hidden rounded-2xl bg-surface-dark p-8 text-ink-on-dark">
                <div
                  aria-hidden="true"
                  className="glow-ambient pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-40"
                />
                <div className="relative">
                  <h3 className="font-heading text-2xl font-bold text-ink-on-dark sm:text-3xl">
                    Need Help Choosing a Service?
                  </h3>
                  <p className="mt-2 max-w-xl text-ink-muted-on-dark">
                    Call and a licensed electrician will point you the right way,
                    or send a request and we will get back to you. No obligation,
                    day or night.
                  </p>
                  <CallToActions className="mt-6" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Why Ghost Crown */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Media
            src="/images/damean-owner-truck.jpg"
            alt="Damean Callum, owner of Ghost Crown Electric, in front of the company bucket truck"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] rounded-2xl border border-border shadow-[var(--shadow-card)]"
          />
          <div>
            <SectionHeading
              as="h2"
              eyebrow="Why Ghost Crown"
              title="The licensed hand you want in your panel"
              description="You cannot see your electrical system, so you are trusting the person who works on it. Here is why property managers and homeowners keep calling us back."
            />
            <ul className="mt-8 flex flex-col gap-5">
              {WHY_FEATURES.map((feature, index) => (
                <li key={feature.title} className="group flex gap-3.5">
                  <GradientBadge
                    tone={BADGE_TONES[index % BADGE_TONES.length]}
                    size="sm"
                    className="mt-0.5"
                  >
                    {feature.icon}
                  </GradientBadge>
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
            eyebrow="How we price"
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
                  <p className="font-heading text-2xl font-bold text-cyan-300">
                    On site
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink-on-dark">
                    We start in person
                  </h3>
                  <p className="mt-2 text-ink-muted-on-dark">
                    We come out and diagnose the problem in person, not with a
                    guess over the phone. You meet a licensed electrician who
                    tells you what is actually going on.
                  </p>
                </div>
              </li>
              <li>
                <div className="glass-dark flex h-full flex-col rounded-2xl p-6">
                  <p className="font-heading text-2xl font-bold text-cyan-300">
                    Up front
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink-on-dark">
                    One honest price
                  </h3>
                  <p className="mt-2 text-ink-muted-on-dark">
                    For any bigger job, you get a single price before the work
                    begins, forecast from what we actually see, so you always
                    know the number first.
                  </p>
                </div>
              </li>
              <li>
                <div className="glass-dark flex h-full flex-col rounded-2xl p-6">
                  <p className="font-heading text-2xl font-bold text-cyan-300">
                    Locked in
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink-on-dark">
                    No moving numbers
                  </h3>
                  <p className="mt-2 text-ink-muted-on-dark">
                    The number we quote is the number you pay. We do not change
                    it in the middle of the job. If something truly hidden turns
                    up, you decide before we go on.
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
            <div>
              <BeforeAfterSlider
                beforeSrc="/images/meter-fire-before.jpg"
                afterSrc="/images/meter-fire-after.jpg"
                beforeAlt="A nine-meter service bank and the surrounding wall with heavy fire and soot damage"
                afterAlt="The same nine-meter service bank and wall fully restored, cleaned, and repainted"
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="aspect-[3/4] rounded-2xl border border-navy-600"
              />
              <p className="mt-3 text-sm text-ink-muted-on-dark">
                Drag the slider: the nine-meter bank and the fire-damaged
                wall around it, fully restored.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6">
              <li>
                <div className="h-full rounded-2xl border border-navy-600 bg-surface-dark-2 p-6 sm:p-7">
                  <h3 className="font-heading text-lg font-semibold text-ink-on-dark">
                    A nine-meter bank, back to life after a fire
                  </h3>
                  <p className="mt-3 text-ink-muted-on-dark">
                    A fire took out a nine-meter meter bank and left the whole
                    building dark. Tenants had been without power for a week. We
                    got in, rebuilt the electrical, cleaned up and repaired the
                    wall around it, and had the building back online within two
                    weeks of the fire. That is the kind of situation you want
                    handled by someone who has done it before.
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

      {/* 6a. Recent work gallery: real job photos from the field */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="Recent work"
          title="Straight from our trucks"
          description="Real panels, meter banks, and service upgrades our crew has handled across Broward County and South Florida. Hover or tap a photo to see the job."
        />
        <ExpandingCards items={WORK_ITEMS} className="mt-10" />
      </section>

      {/* 6b. Commercial lighting, told with real job photos */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            as="h2"
            eyebrow="Commercial lighting"
            title="Your Sign Is Your Storefront After Dark"
            description="Signs, parking lot pole lights, and building lighting for South Florida businesses. Our crew runs its own bucket truck, so high work happens on our schedule, not a rental company's."
          />
          <Link
            href={routes.service("commercial-lighting")}
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            Explore commercial lighting
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { name: "commercial-lighting-before", label: "Before" },
            { name: "commercial-lighting-after", label: "After" },
            { name: "commercial-lighting-night", label: "After, at night" },
          ].map((photo) => (
            <li key={photo.name}>
              <Media
                src={imagePath(photo.name)}
                alt={imageAlt(photo.name)}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-[4/5] rounded-2xl border border-border shadow-[var(--shadow-card)]"
              >
                <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-on-dark backdrop-blur">
                  {photo.label}
                </span>
              </Media>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-ink-muted">
          A recent storefront sign relight by our crew: from damaged and dark to
          every letter burning bright. If your sign or your lot has gone dark,
          call and we will get eyes on it fast.
        </p>
      </section>

      {/* 7. Emergency strip */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan text-accent-bright-ink">
        <div className="container-page flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <BrandIcon
              name="emergency-247"
              size={44}
              className="mt-0.5 shrink-0"
            />
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Power Out, or Something That Does Not Feel Safe?
              </h2>
              <p className="mt-1.5 font-medium text-accent-bright-ink/80">
                Call day or night. We will talk it through right away and head
                your way.
              </p>
            </div>
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

      {/* 7b. The three step plan, right after the emergency hook */}
      <PlanSection />

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
                  <StatValue value={stat.value} />
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M5.6 2.2 3.3 2.6C2.7 2.7 2.3 3.3 2.4 3.9c.6 5 4.7 9.1 9.7 9.7.6.1 1.2-.3 1.3-.9l.4-2.3c.1-.5-.2-1-.7-1.2l-2.3-.9c-.4-.2-.9 0-1.2.3l-.8.9C7.3 8.7 6.3 7.7 5.5 6.2l.9-.8c.3-.3.5-.8.3-1.2l-.9-2.3c-.1-.5-.6-.8-1.1-.7Z" />
    </svg>
  );
}
