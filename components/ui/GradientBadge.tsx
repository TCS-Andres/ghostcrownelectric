import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/*
  Shared colorful badge used site-wide for checklists and numbered steps. It
  replaces the old flat pale-blue circles with a gradient squircle that lifts on
  hover. Tones cycle cyan to blue to gold (the brand palette, echoing the
  coverage map county colors) so a list of items reads lively rather than
  uniform. Pass a number or icon as children; it defaults to a checkmark.
*/

const TONES = {
  cyan: "from-cyan-300 to-cyan-600 text-white",
  blue: "from-accent to-navy text-white",
  gold: "from-gold-300 to-gold-600 text-navy",
} as const;

export type BadgeTone = keyof typeof TONES;
// Cycle order for lists: use BADGE_TONES[i % BADGE_TONES.length].
export const BADGE_TONES: BadgeTone[] = ["cyan", "blue", "gold"];

const SIZES = {
  sm: "h-8 w-8 rounded-lg text-[0.8125rem]",
  md: "h-10 w-10 rounded-xl text-base",
  lg: "h-12 w-12 rounded-2xl text-lg",
} as const;

export function GradientBadge({
  children,
  tone = "cyan",
  size = "sm",
  className,
}: {
  children?: ReactNode;
  tone?: BadgeTone;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-gradient-to-br font-heading font-bold shadow-sm ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-md",
        SIZES[size],
        TONES[tone],
        className,
      )}
    >
      {children ?? <CheckMark />}
    </span>
  );
}

export function CheckMark() {
  return (
    <svg
      width="60%"
      height="60%"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
  );
}
