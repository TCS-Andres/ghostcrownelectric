import Link from "next/link";
import { getBusiness } from "@/lib/content";
import { routes } from "@/lib/routes";

// Mobile-only bottom bar. Always within thumb reach: browse all services or
// call the team directly. Hidden on large screens where the header handles it.
export function StickyCallBar() {
  const business = getBusiness();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-surface-dark/80 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-2">
        <Link
          href={routes.services}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-ink-on-dark"
        >
          <GridIcon />
          All Services
        </Link>
        <a
          href={`tel:${business.phoneTel}`}
          className="flex items-center justify-center gap-2 bg-accent py-3.5 text-sm font-semibold text-accent-ink"
        >
          <PhoneIcon />
          Call Now
        </a>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="5.5" height="5.5" rx="1" />
      <rect x="10.5" y="2" width="5.5" height="5.5" rx="1" />
      <rect x="2" y="10.5" width="5.5" height="5.5" rx="1" />
      <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.6 2.2 3.3 2.6C2.7 2.7 2.3 3.3 2.4 3.9c.6 5 4.7 9.1 9.7 9.7.6.1 1.2-.3 1.3-.9l.4-2.3c.1-.5-.2-1-.7-1.2l-2.3-.9c-.4-.2-.9 0-1.2.3l-.8.9C7.3 8.7 6.3 7.7 5.5 6.2l.9-.8c.3-.3.5-.8.3-1.2l-.9-2.3c-.1-.5-.6-.8-1.1-.7Z" />
    </svg>
  );
}
