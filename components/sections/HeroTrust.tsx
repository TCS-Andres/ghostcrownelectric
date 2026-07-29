import { getBusiness } from "@/lib/content";
import { cn } from "@/lib/cn";

/*
  A calm row of trust chips for page heroes: the two license labels and the
  approved day or night availability line. Labels come from business.json so
  they stay in one place. Built for a dark hero surface by default.
*/

function Chip({ children, onDark }: { children: React.ReactNode; onDark: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
        onDark
          ? "border-navy-600 text-ink-on-dark"
          : "border-border text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      />
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
      {business.licenses.map((license) => (
        <li key={license.label}>
          <Chip onDark={onDark}>{license.label}</Chip>
        </li>
      ))}
      <li>
        <Chip onDark={onDark}>Available day or night</Chip>
      </li>
    </ul>
  );
}
