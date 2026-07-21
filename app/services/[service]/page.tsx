import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices, type Service } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { cityLinks, firstSentence } from "@/lib/links";
import { serviceImage } from "@/lib/imagery";
import {
  breadcrumbListNode,
  electricianNode,
  faqPageNode,
  founderNode,
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
import { HeroTrust } from "@/components/sections/HeroTrust";
import { CallToActions } from "@/components/sections/CallToActions";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

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

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
  const cities = cityLinks();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Services", href: routes.services },
    { label: service.shortName || service.name },
  ];
  const pageUrl = absoluteUrl(routes.service(slug));

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          founderNode(),
          serviceNode(service, pageUrl),
          howToNode(service, pageUrl),
          faqPageNode(service.faqs, pageUrl),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      {/* Breadcrumbs on the light page, above the dark hero */}
      <div className="container-page pt-6">
        <Breadcrumbs trail={trail} />
      </div>

      {/* Hero */}
      <section className="mt-6 bg-surface-dark text-ink-on-dark">
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="max-w-2xl">
                <h1 className="text-3xl text-ink-on-dark sm:text-4xl md:text-5xl">
                  {service.h1}
                </h1>
                <p className="mt-5 text-lg text-ink-muted-on-dark">
                  {service.intro}
                </p>
              </div>
              <HeroTrust className="mt-8" />
              <CallToActions className="mt-8" />
            </div>
            <div className="hidden lg:block">
              <Media
                src={heroImage.src}
                alt={heroImage.alt}
                priority
                sizes="(min-width: 1024px) 45vw, 0px"
                className="aspect-[4/3] rounded-2xl border border-charcoal-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      {service.stats.length > 0 ? (
        <section className="border-b border-border bg-surface-2">
          <div className="container-page">
            <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {service.stats.map((stat) => (
                <div key={stat.label} className="px-2 py-8 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-3xl font-bold text-ink">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Definition with related-service links */}
      <section className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
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
      </section>

      {/* Signs you need this */}
      {service.symptoms.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading
              as="h2"
              eyebrow="Signs to watch for"
              title="Signs you need this"
              description="If any of these sound familiar, it is worth a call. We will tell you plainly whether it is urgent or something to schedule."
            />
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.symptoms.map((symptom) => (
                <li key={symptom.title}>
                  <Card as="div" className="h-full">
                    <h3 className="font-heading text-lg font-semibold text-ink">
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

      {/* How we work */}
      {service.process.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="How we work"
            title="From your first call to the final inspection"
            description="The owner takes the call, prices the job, and meets the inspector. Here is how a job goes."
          />
          <ol className="mt-10 flex flex-col gap-6">
            {service.process.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-ink"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
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
              {service.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <Card as="div" className="h-full">
                    <h3 className="font-heading text-base font-semibold text-ink">
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

      {/* Local sections */}
      {service.localSections.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="South Florida reality"
            title="What this work looks like down here"
          />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {service.localSections.map((local) => (
              <div key={local.heading} className="max-w-2xl">
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {local.heading}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {local.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Definitive guide */}
      {service.guide.sections.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <div className="max-w-3xl">
              <SectionHeading
                as="h2"
                eyebrow="The complete guide"
                title={service.guide.title}
              />
              {service.guide.sections.length > 2 ? (
                <nav
                  aria-label="Guide contents"
                  className="mt-8 rounded-xl border border-border bg-surface p-6"
                >
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                    On this page
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {service.guide.sections.map((section) => (
                      <li key={section.heading}>
                        <a
                          href={`#${slugifyHeading(section.heading)}`}
                          className="text-sm text-ink-muted hover:text-accent-hover"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
              <div className="mt-10 flex flex-col gap-10">
                {service.guide.sections.map((section) => (
                  <div
                    key={section.heading}
                    id={slugifyHeading(section.heading)}
                    className="scroll-mt-24"
                  >
                    <h3 className="font-heading text-xl font-semibold text-ink sm:text-2xl">
                      {section.heading}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Pricing note */}
      {service.pricing?.display ? (
        <section className="container-page py-14 sm:py-20">
          <div className="max-w-3xl rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Straight talk on price
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold text-ink">
              {service.pricing.display}
            </p>
            {service.pricing.notes ? (
              <p className="mt-3 leading-relaxed text-ink-muted">
                {service.pricing.notes}
              </p>
            ) : null}
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
          title={`Where we provide ${service.shortName || service.name}`}
          description="We cover Broward County and South Florida, from West Palm Beach down to North Miami. Pick your city or call and we will confirm we reach you."
        />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-accent hover:text-accent-hover"
              >
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
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={routes.service(item.slug)}
                    className="group block h-full"
                  >
                    <Card interactive className="flex h-full flex-col">
                      <h3 className="font-heading text-base font-semibold text-ink group-hover:text-accent-hover">
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
