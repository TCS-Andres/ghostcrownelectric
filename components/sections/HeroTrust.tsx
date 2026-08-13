import type { ReactNode } from "react";
import { getBusiness } from "@/lib/content";
import { cn } from "@/lib/cn";

/*
  The value stack for page heroes: the two license credentials (with the state
  license number shown on the one that carries it) and the approved day or night
  availability line. Labels come from business.json so they stay in one place.
  Each chip leads with a small colored icon. Built for a dark hero surface by
  default.
*/

function Chip({
  children,
  icon,
  onDark,
}: {
  children: ReactNode;
  icon: ReactNode;
  onDark: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm",
        onDark
          ? "border-navy-600 bg-navy-800/40 text-ink-on-dark"
          : "border-border bg-surface text-ink",
      )}
    >
      <span
        className={cn(
          "shrink-0",
          onDark ? "text-accent-bright" : "text-accent",
        )}
      >
        {icon}
      </span>
      {children}
    </span>
  );
}

export function HeroTrust({
  onDark = true,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const business = getBusiness();
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {business.licenses.map((license) => {
        const hasNumber = license.number && license.number !== "PLACEHOLDER";
        return (
          <li key={license.label}>
            <Chip onDark={onDark} icon={<ShieldIcon />}>
              {license.label}
              {hasNumber ? (
                <span className="font-semibold">{" "}#{license.number}</span>
              ) : null}
            </Chip>
          </li>
        );
      })}
      <li>
        <Chip onDark={onDark} icon={<ClockIcon />}>
          Available day or night
        </Chip>
      </li>
    </ul>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 4.2 2.8 7.5 7 9 4.2-1.5 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
