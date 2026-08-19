import type { ReactNode } from "react";
import { getBusiness } from "@/lib/content";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/ui/BrandIcon";

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
            <Chip
              onDark={onDark}
              icon={<BrandIcon name="licensed-shield" size={15} />}
            >
              {license.label}
              {hasNumber ? (
                <span className="font-semibold">{" "}#{license.number}</span>
              ) : null}
            </Chip>
          </li>
        );
      })}
      <li>
        <Chip
          onDark={onDark}
          icon={<BrandIcon name="call-day-or-night" size={15} />}
        >
          Available day or night
        </Chip>
      </li>
    </ul>
  );
}

