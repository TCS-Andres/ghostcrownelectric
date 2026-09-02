"use client";

import { useCallback, useEffect, useState } from "react";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

/*
  A small timed prompt for the Electrical Safety Check. It appears five seconds
  into a visit as a compact card in the corner, over a fully visible page: no
  overlay, nothing to dismiss before using the site. The client's earlier
  version greyed out the whole page and, on phones, covered it, so this one is
  deliberately small, sits above the mobile request dock, and closes from a
  large X or Escape.

  Frequency: once per session, and not again for 14 days after a close or a
  click through (localStorage).
*/

const STORAGE_KEY = "gce_safety_check_prompt_until";
const SUPPRESS_DAYS = 14;
const DELAY_MS = 5000;

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  const suppress = useCallback(() => {
    try {
      const until = Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
      window.localStorage.setItem(STORAGE_KEY, String(until));
    } catch {
      // localStorage may be unavailable (private mode). Nothing to do.
    }
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    suppress();
  }, [suppress]);

  useEffect(() => {
    try {
      const until = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
      if (until && Date.now() < until) return;
    } catch {
      // Ignore storage errors and continue.
    }
    const timer = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, close]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[60] sm:bottom-6 sm:right-6">
      <div
        role="complementary"
        aria-labelledby="safety-prompt-title"
        className="pointer-events-auto relative w-[min(19rem,calc(100vw-2rem))] rounded-xl border border-border bg-surface p-4 pr-11 shadow-[var(--shadow-lift)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon />
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Electrical Safety Check
        </p>
        <h2 id="safety-prompt-title" className="mt-1 text-base leading-snug text-ink">
          Not sure what shape your electrical is in?
        </h2>
        <p className="mt-1.5 text-sm leading-snug text-ink-muted">
          We walk your panel, meter, and wiring, then tell you plainly what we
          find.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Button
            href={routes.service("electrical-safety-check")}
            variant="primary"
            size="sm"
            onClick={close}
          >
            See the Safety Check
          </Button>
          <button
            type="button"
            onClick={close}
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="5" x2="15" y2="15" />
      <line x1="15" y1="5" x2="5" y2="15" />
    </svg>
  );
}
