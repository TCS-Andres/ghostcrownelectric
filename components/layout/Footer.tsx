import Link from "next/link";
import { getBusiness, getCities, getServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import { CrownMark } from "./CrownMark";

// Renders a license line. Labels always show. The number shows only once it is a
// real value; while it is still the "PLACEHOLDER" sentinel we show a calm
// available-on-request line instead of a fake number.
function LicenseLine({ label, number }: { label: string; number: string }) {
  const hasRealNumber = number && number !== "PLACEHOLDER";
  return (
    <li className="text-sm text-ink-muted-on-dark">
      <span className="text-ink-on-dark">{label}</span>
      <br />
      {hasRealNumber ? (
        <span>License #{number}</span>
      ) : (
        <span>License number available on request</span>
      )}
    </li>
  );
}

export function Footer() {
  const business = getBusiness();
  const services = getServices().slice(0, 6);
  const cities = getCities().slice(0, 6);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-ink-on-dark">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand block */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <CrownMark />
            <span className="font-heading text-lg font-bold text-ink-on-dark">
              {business.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-muted-on-dark">
            Licensed electrical service, repair, and restoration for South
            Florida homes and properties. Owner led from the first call to the
            final inspection.
          </p>
          <p className="mt-4 font-heading text-base font-semibold text-accent">
            {business.tagline}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {business.licenses.map((license) => (
              <LicenseLine
                key={license.label}
                label={license.label}
                number={license.number}
              />
            ))}
          </ul>
        </div>

        {/* Services column */}
        <nav aria-label="Services">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink-on-dark">
            Services
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={routes.service(service.slug)}
                  className="text-sm text-ink-muted-on-dark hover:text-accent"
                >
                  {service.shortName || service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={routes.services}
                className="text-sm font-semibold text-accent hover:text-gold-300"
              >
                View all services
              </Link>
            </li>
          </ul>
        </nav>

        {/* Service areas column */}
        <nav aria-label="Service areas">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink-on-dark">
            Service Areas
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={routes.city(city.slug)}
                  className="text-sm text-ink-muted-on-dark hover:text-accent"
                >
                  {city.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={routes.serviceAreas}
                className="text-sm font-semibold text-accent hover:text-gold-300"
              >
                View all service areas
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact block */}
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink-on-dark">
            Contact
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-muted-on-dark">
            <li>
              <a
                href={`tel:${business.phoneTel}`}
                className="hover:text-accent"
              >
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${business.email}`}
                className="break-all hover:text-accent"
              >
                {business.email}
              </a>
            </li>
            <li>
              {business.address.locality}, {business.address.region}
            </li>
            <li>{business.hours}</li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border-dark">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-ink-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"©"} {year} {business.legalName}. Serving West Palm Beach to
            North Miami.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link href={routes.blog} className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link href={routes.privacy} className="hover:text-accent">
                Privacy
              </Link>
            </li>
            <li>
              <Link href={routes.terms} className="hover:text-accent">
                Terms
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-accent">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
