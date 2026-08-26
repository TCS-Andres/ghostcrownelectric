import Link from "next/link";
import { cn } from "@/lib/cn";

// A single crumb. The last item in a trail is the current page and should omit
// href. This shape is intentionally clean so worker W2 can build breadcrumb
// JSON-LD from the exact same trail without reshaping anything.
export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  trail: Crumb[];
  /** Set true when the trail sits on a navy surface so the colors invert. */
  onDark?: boolean;
  className?: string;
}

// Purely visual breadcrumbs. No structured data here (that is W2's job).
export function Breadcrumbs({ trail, onDark = false, className }: BreadcrumbsProps) {
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
          onDark ? "text-ink-muted-on-dark" : "text-ink-muted",
        )}
      >
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className={onDark ? "hover:text-accent-bright" : "hover:text-accent-hover"}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast && "font-medium",
                    isLast && (onDark ? "text-ink-on-dark" : "text-ink"),
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={onDark ? "text-navy-600" : "text-mist-300"}
                >
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
