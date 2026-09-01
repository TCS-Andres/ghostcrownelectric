"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

/*
  Desktop exit-intent prompt promoting the Electrical Safety Check as a defined
  scope walkthrough of the panel, meter socket, and overall system condition.
  No price is shown and there is no free-offer language: it is an invitation to
  book, in Ghost Crown's calm voice.

  It is deliberately non-blocking. The client found the earlier modal, which
  greyed out the whole site, read like spam. This version is a card in the
  corner over a fully visible page: nothing to dismiss before using the site.

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

  // When open: close on Escape. The page stays fully usable behind it.
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
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-end sm:inset-x-auto sm:bottom-6 sm:right-6">
      <div
        ref={dialogRef}
        role="complementary"
        aria-labelledby="exit-intent-title"
        className="pointer-events-auto relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lift)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          Before you go
        </p>
        <h2
          id="exit-intent-title"
          className="mt-2 pr-8 text-xl text-ink"
        >
          Not sure what shape your electrical is in?
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Book an Electrical Safety Check. We walk your panel, meter socket, and
          system, then tell you plainly what we find. No pressure.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            href={routes.service("electrical-safety-check")}
            variant="primary"
            size="sm"
            onClick={close}
          >
            See the Safety Check
          </Button>
          <Button variant="ghost" size="sm" onClick={close}>
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
