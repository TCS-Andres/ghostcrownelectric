import { getBusiness, primaryLicenseNumber } from "@/lib/content";
import { BrandIcon } from "@/components/ui/BrandIcon";

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
          <BrandIcon
            name="crown-bolt"
            size={15}
            className="text-accent-bright"
          />
          Licensed electricians serving Broward and Palm Beach Counties
        </p>
        <div className="flex w-full items-center justify-between gap-3 sm:gap-5 lg:w-auto lg:justify-end">
          {licenseNumber ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-muted-on-dark">
              <BrandIcon
                name="licensed-shield"
                size={14}
                className="text-accent-bright"
              />
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
