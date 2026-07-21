import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small overline label above the title, in gold. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Set true when placed on a charcoal surface so colors invert. */
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  onDark = false,
  className,
}: SectionHeadingProps) {
  const Heading = Tag as ElementType;
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "text-3xl sm:text-4xl",
          onDark ? "text-ink-on-dark" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg",
            onDark ? "text-ink-muted-on-dark" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
