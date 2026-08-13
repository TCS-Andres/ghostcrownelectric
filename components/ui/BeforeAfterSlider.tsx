"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Classes for the framing box: aspect ratio, rounding, border. */
  className?: string;
  sizes?: string;
  /** Starting divider position, 0-100. */
  initial?: number;
}

// Interactive before/after comparison. The "after" image is the base; the
// "before" image is layered on top and clipped to the left of the divider.
// A full-bleed range input drives the divider, so it works with pointer drag,
// touch, keyboard (arrows/Home/End) and screen readers out of the box.
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  initial = 50,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(initial);
  const labelId = useId();

  return (
    <div
      className={cn(
        "relative select-none overflow-hidden bg-surface-dark-2",
        className,
      )}
    >
      {/* After (base) */}
      <Image src={afterSrc} alt={afterAlt} fill sizes={sizes} className="object-cover" />
      {/* Before (clipped to the left of the divider) */}
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-on-dark backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-on-dark backdrop-blur">
        {afterLabel}
      </span>

      {/* Divider line + handle (purely visual; the input below is the control) */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -ml-[1.5px] w-[3px] bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.35)]" />
        <div className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          <ArrowsIcon />
        </div>
      </div>

      <span id={labelId} className="sr-only">
        Drag to compare the before and after photos
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-labelledby={labelId}
        aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100"
      />
    </div>
  );
}

function ArrowsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 7 4 12l5 5" />
      <path d="m15 7 5 5-5 5" />
    </svg>
  );
}
