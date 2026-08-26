"use client";

import { useEffect, useRef, useState } from "react";

/*
  Animated count-up for stat values. Takes the final display string, finds a
  leading integer (as in "286" or "10 years"), and counts up to it the first
  time the element scrolls into view. Values with no leading number, visitors
  who prefer reduced motion, and the server render all just show the final
  string, so nothing on the page depends on the animation running.
*/

const DURATION_MS = 1400;

export function StatValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        io.disconnect();
        // A hidden document never services requestAnimationFrame, so the
        // counter would sit on its start value. Show the final number instead.
        if (document.visibilityState !== "visible") return;
        const t0 = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - t0) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(`0${suffix}`);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
