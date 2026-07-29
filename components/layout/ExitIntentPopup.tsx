"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

/*
  Desktop exit-intent popup promoting the Electrical Safety Check as a defined
  scope walkthrough of the panel, meter socket, and overall system condition.
  No price is shown and there is no free-offer language: it is an invitation to
  book, in Damean's calm voice.

  Frequency cap: once a visitor closes it or follows the link, we do not show it
  again for 14 days (stored in localStorage). It also shows at most once per
  session and only on wide screens with a fine pointer, where exit intent via
  the mouse leaving the top of the window is meaningful.
*/

const STORAGE_KEY = "gce_safety_check_prompt_until";
const SUPPRESS_DAYS = 14;

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shownThisSession = useRef(false);

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
    // Only desktop pointers, and only if not recently suppressed.
    const canShow = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    ).matches;
    if (!canShow) return;

    try {
      const until = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
      if (until && Date.now() < until) return;
    } catch {
      // Ignore storage errors and continue.
    }

    function onMouseOut(event: MouseEvent) {
      if (shownThisSession.current) return;
      // Pointer left through the top edge of the viewport.
      if (event.relatedTarget === null && event.clientY <= 0) {
        shownThisSession.current = true;
        setVisible(true);
      }
    }

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, []);

  // When open: focus the dialog, close on Escape, keep Tab focus inside.
  useEffect(() => {
    if (!visible) return;
    const node = dialogRef.current;
    node?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, close]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/50 bg-surface/85 p-8 shadow-[var(--shadow-lift)] backdrop-blur-2xl focus:outline-none"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          Before you go
        </p>
        <h2
          id="exit-intent-title"
          className="mt-2 text-2xl text-ink"
        >
          Not sure what shape your electrical is in?
        </h2>
        <p className="mt-3 text-ink-muted">
          Book an Electrical Safety Check. We walk your panel, your meter
          socket, and the overall condition of your system, then tell you
          plainly what we find. No pressure, just a clear picture so you can
          sleep easy.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            href={routes.service("electrical-safety-check")}
            variant="primary"
            size="md"
            onClick={close}
          >
            See the Safety Check
          </Button>
          <Button variant="ghost" size="md" onClick={close}>
            Maybe later
          </Button>
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
