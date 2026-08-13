"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/*
  Interactive expanding gallery. Cards sit as slim columns (rows on mobile) and
  the active one expands to reveal its image in full color plus an icon, title,
  and description. Hover, focus, or tap activates a card. Adapted for this
  codebase: next/image, the site's tokens and heading font, and cn from
  @/lib/cn.
*/

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  /** Descriptive alt text; falls back to the title. */
  alt?: string;
  icon: React.ReactNode;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    const tracks = items
      .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
      .join(" ");
    return isDesktop
      ? { gridTemplateColumns: tracks }
      : { gridTemplateRows: tracks };
  }, [activeIndex, items, isDesktop]);

  return (
    <ul
      className={cn(
        "grid w-full gap-2",
        "h-[560px] md:h-[440px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-dark-2 shadow-[var(--shadow-card)]",
            "md:min-w-[80px]",
          )}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          tabIndex={0}
          data-active={activeIndex === index}
          aria-label={item.title}
        >
          <Image
            src={item.imgSrc}
            alt={item.alt ?? item.title}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="scale-110 object-cover grayscale transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4 sm:p-5">
            <h3 className="hidden origin-left rotate-90 font-heading text-sm font-semibold uppercase tracking-wider text-ink-on-dark/80 transition-all duration-300 ease-out group-data-[active=true]:opacity-0 md:block">
              {item.title}
            </h3>

            <div className="text-accent-bright opacity-0 transition-all delay-75 duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="font-heading text-xl font-bold text-ink-on-dark opacity-0 transition-all delay-150 duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="max-w-xs text-sm text-ink-on-dark/85 opacity-0 transition-all delay-200 duration-300 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
