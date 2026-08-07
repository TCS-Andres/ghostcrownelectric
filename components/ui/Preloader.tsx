"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../public/brand/logo-lockup-ondark.png";

/*
  Branded page preloader. Shows a short logo animation on the initial load and
  on every in-site navigation (client direction). Kept deliberately quick so it
  reads as a premium moment without slowing anyone down on the way to the phone
  number. Honors prefers-reduced-motion, and a <noscript> style hides it
  entirely when JavaScript is off so content is never blocked.

  Navigation is detected three ways: capture-phase clicks on internal links
  (covers next/link), a wrapped history.pushState (covers programmatic
  router.push), and popstate (covers back and forward). The overlay then holds
  for a fixed beat and fades out; on this fully static site pages are ready well
  within that beat.
*/

type Phase = "active" | "leaving" | "hidden";

const HOLD_FIRST = 1100; // initial load, a touch longer for the first impression
const HOLD_NAV = 650; // in-site navigations, snappy
const HOLD_REDUCED = 220; // prefers-reduced-motion
const FADE = 450; // must match the CSS opacity transition

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("active");
  const timers = useRef<number[]>([]);
  const reduced = useRef(false);
  const firstShown = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const show = useCallback(() => {
    clearTimers();
    setPhase("active");
    const hold = reduced.current
      ? HOLD_REDUCED
      : firstShown.current
        ? HOLD_NAV
        : HOLD_FIRST;
    firstShown.current = true;
    const fade = reduced.current ? 200 : FADE;
    timers.current.push(window.setTimeout(() => setPhase("leaving"), hold));
    timers.current.push(window.setTimeout(() => setPhase("hidden"), hold + fade));
  }, [clearTimers]);

  // Initial load: read the motion preference, then run the first reveal.
  useEffect(() => {
    reduced.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    show();
    return clearTimers;
  }, [show, clearTimers]);

  // Navigation-start detection.
  useEffect(() => {
    const origPush = history.pushState;
    history.pushState = function (
      this: History,
      ...args: Parameters<History["pushState"]>
    ) {
      try {
        const url = args[2];
        if (url != null) {
          const next = new URL(String(url), location.href);
          if (next.pathname !== location.pathname) show();
        }
      } catch {
        // ignore malformed URLs
      }
      return origPush.apply(this, args);
    };

    const onPop = () => show();

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      let next: URL;
      try {
        next = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (next.origin !== location.origin) return;
      if (next.pathname === location.pathname) return; // same page or in-page hash
      show();
    };

    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick, true);
    return () => {
      history.pushState = origPush;
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick, true);
    };
  }, [show]);

  if (phase === "hidden") return null;

  return (
    <>
      <noscript>
        {/* No JS: never block the page. */}
        <style>{`#gce-preloader{display:none !important}`}</style>
      </noscript>
      <div id="gce-preloader" className="gce-preloader" data-phase={phase} aria-hidden="true">
        <div className="gce-preloader__glow" />
        <div className="gce-preloader__inner">
          <Image
            src={logo}
            alt=""
            priority
            sizes="280px"
            className="gce-preloader__logo"
          />
          <div className="gce-preloader__bar">
            <span />
          </div>
        </div>
      </div>
    </>
  );
}
