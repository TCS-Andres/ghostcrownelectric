import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCities, getCity, getServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { groupServices } from "@/lib/links";
import { cityImage } from "@/lib/imagery";
import {
  breadcrumbListNode,
  cityElectricianNode,
  cityServiceNode,
  faqPageNode,
  founderNode,
  graph,
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
  return getCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: routes.city(slug),
    imageAlt: `Ghost Crown Electric, electrician in ${city.name}, FL`,
    geo: {
      placename: `${city.name}, FL`,
      lat: city.lat,
      lng: city.lng,
    },
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const heroImage = cityImage(slug);

  // All services, ordered money and pool first, then safety and core.
  const orderedServices = groupServices(getServices()).flatMap(
    (group) => group.services,
  );

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Service Areas", href: routes.serviceAreas },
    { label: city.name },
  ];
  const pageUrl = absoluteUrl(routes.city(slug));

  return (
    <>
      <JsonLd
        data={graph([
          cityElectricianNode(city, pageUrl),
          founderNode(),
          cityServiceNode(city, pageUrl),
          faqPageNode(city.faqs, pageUrl),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page pt-6">
        <Breadcrumbs trail={trail} />
      </div>

      {/* Hero */}
      <section className="relative isolate mt-6 overflow-hidden bg-surface-dark text-ink-on-dark">
        <div
          aria-hidden="true"
          className="glow-gold pointer-events-none absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] opacity-50"
        />
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="max-w-2xl">
                <h1 className="text-3xl text-ink-on-dark sm:text-4xl md:text-5xl">
                  {city.h1}
                </h1>
                <p className="mt-5 text-lg text-ink-muted-on-dark">{city.intro}</p>
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
              >
                <div className="absolute inset-x-4 bottom-4">
                  <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-accent"
                    />
                    <span className="text-sm font-medium text-ink-on-dark">
                      Serving {city.name}, day or night
                    </span>
                  </span>
                </div>
              </Media>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      {orderedServices.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <SectionHeading
            as="h2"
            eyebrow="What we do here"
            title={`Electrical services in ${city.name}`}
            description="Every job below is run by the owner, from the first call to the final inspection. Panel and service work and pool electrical are what we are called for most."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedServices.map((service) => {
              const emphasized =
                service.tier === "money" || service.tier === "pool";
              return (
                <li key={service.slug}>
                  <Link
                    href={routes.service(service.slug)}
                    className="group block h-full"
                  >
                    <Card
                      interactive
                      className={
                        emphasized
                          ? "flex h-full items-center gap-3 border-l-4 border-l-accent"
                          : "flex h-full items-center gap-3"
                      }
                    >
                      <span className="font-heading text-base font-semibold text-ink group-hover:text-accent-hover">
                        {service.shortName || service.name}
                      </span>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* Challenges */}
      {city.challenges.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading
              as="h2"
              eyebrow="Local reality"
              title={`Electrical challenges in ${city.name}`}
            />
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {city.challenges.map((challenge) => (
                <li key={challenge.heading}>
                  <Card as="div" className="h-full">
                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {challenge.heading}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {challenge.body}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Neighborhoods */}
      {city.neighborhoods.length > 0 ? (
        <section className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <SectionHeading
              as="h2"
              eyebrow="Coverage"
              title={`Neighborhoods we cover in ${city.name}`}
              description={`We work throughout ${city.name}, in older and newer pockets alike. If you do not see your neighborhood, call us. The list below is a start, not a limit.`}
            />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {city.neighborhoods.map((neighborhood) => (
              <li
                key={neighborhood}
                className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink"
              >
                {neighborhood}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Housing notes */}
      {city.housingNotes ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <div className="max-w-3xl">
              <SectionHeading
                as="h2"
                eyebrow="Housing stock"
                title={`Homes in ${city.name} and what that means for your wiring`}
              />
              <p className="mt-4 leading-relaxed text-ink-muted">
                {city.housingNotes}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Permit reality */}
      {city.permitNote ? (
        <section className="container-page py-14 sm:py-20">
          <div className="max-w-3xl rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Permits and inspections
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-ink">
              Permitting in {city.name}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {city.permitNote}
            </p>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {city.faqs.length > 0 ? (
        <section className="bg-surface-2">
          <div className="container-page py-14 sm:py-20">
            <div className="max-w-3xl">
              <SectionHeading
                as="h2"
                eyebrow="Questions"
                title={`Common questions from ${city.name}`}
              />
              <FAQAccordion items={city.faqs} className="mt-8" />
            </div>
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}
