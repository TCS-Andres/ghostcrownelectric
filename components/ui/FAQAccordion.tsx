"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

// ARIA-correct disclosure accordion. Each question is a real button that toggles
// its answer panel. Multiple panels may be open at once. Keyboard and screen
// reader users get proper expanded state and panel labelling.
export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());

  if (items.length === 0) return null;

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={index}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink hover:text-accent-hover"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-accent transition-transform duration-150",
                    isOpen && "rotate-45",
                  )}
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-ink-muted"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="10" y1="4" x2="10" y2="16" />
      <line x1="4" y1="10" x2="16" y2="10" />
    </svg>
  );
}
