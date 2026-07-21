import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle lift on hover, for cards that link somewhere. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]",
        interactive &&
          "transition-shadow duration-150 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
