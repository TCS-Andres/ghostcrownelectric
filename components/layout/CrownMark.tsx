import { cn } from "@/lib/cn";

// Placeholder brand mark: a simple inline crown in crown gold. Swap for the real
// Ghost Crown Electric logo when it arrives (tracked in PLACEHOLDERS.md).
export function CrownMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 28"
      role="img"
      aria-label="Ghost Crown Electric crown mark"
      className={cn("h-7 w-8 text-accent", className)}
      fill="currentColor"
    >
      <path d="M2 9 L8 15 L16 4 L24 15 L30 9 L27 24 L5 24 Z" />
      <rect x="4" y="25" width="24" height="2.4" rx="1.2" />
    </svg>
  );
}
