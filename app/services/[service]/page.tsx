import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices, type Service } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks, firstSentence } from "@/lib/links";
import { serviceImage, serviceGallery } from "@/lib/imagery";
import {
  breadcrumbListNode,
  electricianNode,
  faqPageNode,
  graph,
  howToNode,
  serviceNode,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Media } from "@/components/ui/Media";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { StatValue } from "@/components/ui/StatValue";
import { BrandIcon, serviceBrandIcon } from "@/components/ui/BrandIcon";
import { HeroTrust } from "@/components/sections/HeroTrust";
import { CallToActions } from "@/components/sections/CallToActions";
import { MidPageCTA } from "@/components/sections/MidPageCTA";
import { WorkPhotos } from "@/components/sections/WorkPhotos";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

// Rotating icon sets so no two cards in a row carry the same glyph. Symptoms
// lean on the warning icons, benefits on the trust icons.
const SYMPTOM_ICONS = [
  "emergency-247",
  "surge-protection",
  "safety-inspection",
  "panel-upgrades",
] as const;

const BENEFIT_ICONS = [
  "licensed-shield",
  "five-star-work",
  "one-honest-number",
  "book-a-visit",
] as const;

const LOCAL_ICONS = ["service-area-pin", "service-truck"] as const;

// The three record stats read as scope, quality, and accountability, so each
// gets its own glyph rather than three copies of the service icon.
const STAT_ICONS = ["crown-bolt", "five-star-work", "licensed-shield"] as const;

export function generateStaticParams() {
  return getServices().map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: routes.service(slug),
    imageAlt: `${service.name} by Ghost Crown Electric`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related: Service[] = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is Service => item !== null);

  const heroImage = serviceImage(service.slug);
  const gallery = serviceGallery(service.slug);
  // The first supporting photo sits beside the definition copy; the rest fill
  // the captioned band further down the page.
  // Meter bank replacement carries the burned nine-meter bank as a before and
  // after slider beside the definition, so its full gallery goes to the band.
  const showSlider = service.slug === "meter-bank-replacement";
  const detailPhoto = showSlider ? null : gallery[0];
  const bandPhotos = showSlider ? gallery : gallery.slice(1);
  const cities = cityLinks();
  const shortName = service.shortName || service.name;

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Services", href: routes.services },
    { label: shortName },
  ];
  const pageUrl = absoluteUrl(routes.service(slug));

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          serviceNode(service, pageUrl),
          howToNode(service, pageUrl),
          faqPageNode(service.faqs, pageUrl),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      {/*
        Hero: the service photograph runs full bleed behind the copy at every
        breakpoint, under a navy scrim that stays heavy on the text side and
        opens up on the right so the picture reads on wide screens.
      */}
      <section className="relative isolate overflow-hidden bg-surface-dark text-ink-on-dark">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-navy/88 lg:bg-gradient-to-r lg:from-navy lg:from-30% lg:via-navy/82 lg:via-58% lg:to-navy/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy to-transparent"
        />
        <div
          aria-hidden="true"
          className="glow-ambient pointer-events-none absolute -left-40 -top-40 -z-10 h-[32rem] w-[32rem] opacity-40"
        />

        <div className="container-page pb-24 pt-6 sm:pb-28 lg:pb-32">
          <Breadcrumbs trail={trail} onDark />

          <div className="mt-10 max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-accent-bright backdrop-blur-sm">
              <BrandIcon name={serviceBrandIcon(service.slug)} size={16} />
              {shortName}
            </span>
            <h1 className="mt-5 text-3xl text-ink-on-dark sm:text-4xl md:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 text-lg text-ink-muted-on-dark">
              {service.intro}
            </p>
            <HeroTrust className="mt-8" />
            <CallToActions className="mt-8" />
          </div>
        </div>
      </section>

      {/* The record, lifted onto a card that overlaps the hero */}
      {service.stats.length > 0 ? (
        <section className="relative z-10 -mt-14 sm:-mt-16">
          <div className="container-page">
            <dl className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lift)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {service.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-4 py-7 text-center"
                >
                  <GradientBadge
                    tone={BADGE_TONES[index % BADGE_TONES.length]}
                    size="sm"
                    className="mb-3"
                  >
                    <BrandIcon
                      name={STAT_ICONS[index % STAT_ICONS.length]}
                      size={16}
                    />
                  </GradientBadge>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-3xl font-bold text-ink">
                    <StatValue value={stat.value} />
                  </dd>
                  <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Definition, with a supporting photo alongside it */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <SectionHeading as="h2" title={service.definition.heading} />
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {service.definition.body}
            </p>
            {related.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-ink">Related:</span>
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={routes.service(item.slug)}
                    className="rounded-full border border-border px-3 py-1 text-ink-muted hover:border-accent hover:text-accent-hover"
                  >
                    {item.shortName || item.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {showSlider ? (
            <figure className="lg:justify-self-end">
              <BeforeAfterSlider
                beforeSrc="/images/meter-burnout-before.jpg"
                afterSrc="/images/meter-burnout-after.jpg"
                beforeAlt="Nine electrical meters melted and burned out of their sockets after a fire"
                afterAlt="The same wall with a new nine-meter bank installed and back in service"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[3/4] w-full rounded-2xl border border-border shadow-[var(--shadow-card)]"
              />
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">
                Drag the slider. Nine meters melted out of their sockets, and the
                same wall back in service. A Ghost Crown job.
              </figcaption>
            </figure>
          ) : detailPhoto ? (
            <figure className="lg:justify-self-end">
              <Media
                src={detailPhoto.src}
                alt={detailPhoto.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-2xl border border-border shadow-[var(--shadow-card)]"
              >
                {detailPhoto.real ? (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-bright ring-1 ring-white/15 backdrop-blur-sm">
                    <BrandIcon name="crown-bolt" size={13} />
                    Our Work
                  </span>
                ) : null}
              </Media>
              <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">
                {detailPhoto.caption}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      {/* Signs you need this */}
      {service.symptoms.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading
              as="h2"
              eyebrow="Signs to watch for"
              title="Signs you need this"
              description="If any of these sound familiar, it is worth a call. We will tell you whether it is urgent or something to schedule."
            />
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.symptoms.map((symptom, index) => (
                <li key={symptom.title}>
                  <Card as="div" className="group h-full">
                    <GradientBadge
                      tone={BADGE_TONES[index % BADGE_TONES.length]}
                      size="md"
                    >
                      <BrandIcon
                        name={SYMPTOM_ICONS[index % SYMPTOM_ICONS.length]}
                        size={20}
                      />
                    </GradientBadge>
                    <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                      {symptom.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {symptom.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* How we work: the steps run across on wide screens with a connecting rail */}
      {service.process.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="How we work"
            title="From your first call to the final inspection"
            description="We take the call, price the job, and meet the inspector. Here is how a job goes."
          />
          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-mist-200 to-transparent lg:block"
            />
            <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {service.process.map((step, index) => (
                <li key={step.title} className="group flex flex-col">
                  <div className="flex items-center gap-3">
                    <GradientBadge
                      tone={BADGE_TONES[index % BADGE_TONES.length]}
                      size="lg"
                    >
                      {index + 1}
                    </GradientBadge>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-mist-200 lg:hidden"
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Benefits */}
      {service.benefits.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading
              as="h2"
              eyebrow="What you get"
              title="Why this work is worth doing right"
            />
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.benefits.map((benefit, index) => (
                <li key={benefit.title}>
                  <Card as="div" className="group h-full">
                    <GradientBadge
                      tone={BADGE_TONES[(index + 1) % BADGE_TONES.length]}
                      size="md"
                    >
                      <BrandIcon
                        name={BENEFIT_ICONS[index % BENEFIT_ICONS.length]}
                        size={20}
                      />
                    </GradientBadge>
                    <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {benefit.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* The captioned photo band: what this work actually looks like */}
      <WorkPhotos
        photos={bandPhotos}
        eyebrow="See the work"
        title={`${shortName}, up close`}
        description={
          bandPhotos.some((photo) => photo.real)
            ? "Real conditions we run into, and the finished work. Photos marked with the crown are our jobs."
            : "Real conditions we run into, and what the finished work looks like."
        }
        onDark
      />

      {/* Mid-page conversion strip */}
      <MidPageCTA />

      {/* Local sections */}
      {service.localSections.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="South Florida reality"
            title="What this work looks like down here"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {service.localSections.map((local, index) => (
              <div
                key={local.heading}
                className="group flex gap-4 rounded-2xl border border-border bg-surface-2 p-6"
              >
                <GradientBadge
                  tone={BADGE_TONES[index % BADGE_TONES.length]}
                  size="md"
                  className="shrink-0"
                >
                  <BrandIcon
                    name={LOCAL_ICONS[index % LOCAL_ICONS.length]}
                    size={20}
                  />
                </GradientBadge>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    {local.heading}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">
                    {local.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Good to know: the deeper detail, collapsed so the page stays scannable
          while the full text stays in the document for search engines. */}
      {service.guide.sections.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <div className="max-w-3xl">
              <SectionHeading
                as="h2"
                eyebrow="Good to know"
                title={service.guide.title}
              />
              <FAQAccordion
                items={service.guide.sections.map((section) => ({
                  question: section.heading,
                  answer: section.body,
                }))}
                className="mt-8"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {service.faqs.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <div className="max-w-3xl">
              <SectionHeading
                as="h2"
                eyebrow="Questions"
                title="Common questions, answered plainly"
              />
              <FAQAccordion items={service.faqs} className="mt-8" />
            </div>
          </div>
        </section>
      ) : null}

      {/* Where we provide this service */}
      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="Service area"
          title={`Where we provide ${shortName}`}
          description="All of South Florida's Tri-County area, south to North Miami Beach. Pick your city, or call and we will confirm."
        />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-accent hover:text-accent-hover"
              >
                <span className="text-accent">
                  <BrandIcon name="service-area-pin" size={14} />
                </span>
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Related services */}
      {related.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading as="h2" eyebrow="Related work" title="You may also need" />
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Link
                    href={routes.service(item.slug)}
                    className="group block h-full"
                  >
                    <Card interactive className="flex h-full flex-col">
                      <GradientBadge
                        tone={BADGE_TONES[index % BADGE_TONES.length]}
                        size="md"
                      >
                        <BrandIcon
                          name={serviceBrandIcon(item.slug)}
                          size={20}
                        />
                      </GradientBadge>
                      <h3 className="mt-4 font-heading text-base font-semibold text-ink group-hover:text-accent-hover">
                        {item.shortName || item.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-ink-muted">
                        {firstSentence(item.intro)}
                      </p>
                      <span className="mt-4 text-sm font-semibold text-accent">
                        View service
                      </span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <CTABand headline={service.cta.headline} body={service.cta.body} />
    </>
  );
}
