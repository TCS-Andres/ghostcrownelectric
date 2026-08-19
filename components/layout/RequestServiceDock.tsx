"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { LeadForm, type LeadFormCity } from "@/components/forms/LeadForm";

/*
  Sticky bottom dock with the two main calls to action, call and request
  service. It slides up once the visitor scrolls past the hero and tucks away
  again at the very bottom so it never covers the footer. "Request Service"
  opens the lead form in a modal, so a visitor can submit from anywhere on the
  page without scrolling back to the top. Mounted once in the root layout.
*/
interface RequestServiceDockProps {
  services: string[];
  cities: LeadFormCity[];
  phoneDisplay: string;
  phoneTel: string;
}

export function RequestServiceDock({
  services,
  cities,
  phoneDisplay,
  phoneTel,
}: RequestServiceDockProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // Show after scrolling past the hero, hide near the very bottom (footer).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >=
        document.documentElement.scrollHeight - 90;
      setVisible(y > 520 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll and close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out",
          visible && !open ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!visible || open}
      >
        <div className="border-t border-white/10 bg-surface-dark/90 backdrop-blur-xl">
          <div className="container-page flex items-center justify-between gap-3 py-3">
            <p className="hidden text-sm font-semibold text-ink-on-dark sm:block">
              Ready when you are, day or night.
            </p>
            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
              <Button
                href={`tel:${phoneTel}`}
                variant="outlineOnDark"
                size="md"
              >
                <BrandIcon name="call-day-or-night" size={18} />
                Call
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setOpen(true)}
              >
                <BrandIcon name="book-a-visit" size={18} />
                Request Service
              </Button>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Request service"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-0 cursor-default bg-navy/70 backdrop-blur-sm"
          />
          <div className="relative z-10 max-h-[94dvh] w-full max-w-lg overflow-y-auto px-4 pb-4 pt-10 sm:p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close request form"
              className="absolute right-6 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-navy/80 text-ink-on-dark ring-1 ring-white/20 transition hover:bg-navy sm:right-9 sm:top-9"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <LeadForm
              services={services}
              cities={cities}
              phoneDisplay={phoneDisplay}
              phoneTel={phoneTel}
              title="Request Service"
              subtitle="We answer day or night"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
