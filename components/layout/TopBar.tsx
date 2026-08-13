import { getBusiness, primaryLicenseNumber } from "@/lib/content";

/*
  Thin utility bar above the sticky header. Coverage line on the left (desktop
  only), then the state license number, 24/7 availability, and the phone number
  on the right. It scrolls away with the page while the header below it stays
  stuck, so it costs no vertical space once the visitor starts reading.
*/
export function TopBar() {
  const business = getBusiness();
  const licenseNumber = primaryLicenseNumber(business);

  return (
    <div className="bg-navy text-ink-on-dark">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-xs sm:text-[0.8125rem]">
        <p className="hidden items-center gap-2 font-medium text-ink-muted-on-dark lg:flex">
          <BoltIcon />
          Licensed electricians serving Broward and Palm Beach Counties
        </p>
        <div className="flex w-full items-center justify-between gap-3 sm:gap-5 lg:w-auto lg:justify-end">
          {licenseNumber ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-muted-on-dark">
              <ShieldIcon />
              License #{licenseNumber}
            </span>
          ) : null}
          <span className="hidden font-semibold uppercase tracking-[0.08em] text-accent-bright md:inline">
            24/7 emergency response
          </span>
          <a
            href={`tel:${business.phoneTel}`}
            className="font-semibold text-ink-on-dark transition hover:text-accent-bright"
          >
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

function BoltIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-accent-bright"
    >
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent-bright"
    >
      <path d="M12 3 5 6v5c0 4.2 2.8 7.5 7 9 4.2-1.5 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
