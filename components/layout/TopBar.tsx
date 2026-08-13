import { getBusiness } from "@/lib/content";

/*
  Thin utility bar above the sticky header. Coverage line on the left (desktop
  only), emergency availability and the phone number on the right. It scrolls
  away with the page while the header below it stays stuck, so it costs no
  vertical space once the visitor starts reading.
*/
export function TopBar() {
  const business = getBusiness();

  return (
    <div className="bg-navy text-ink-on-dark">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-xs sm:text-[0.8125rem]">
        <p className="hidden items-center gap-2 font-medium text-ink-muted-on-dark md:flex">
          <BoltIcon />
          Licensed electricians serving Broward and Palm Beach Counties
        </p>
        <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
          <span className="font-semibold uppercase tracking-[0.08em] text-accent-bright">
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
