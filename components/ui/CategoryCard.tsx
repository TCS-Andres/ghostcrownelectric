import Image from "next/image";
import Link from "next/link";
import { imagePath, imageAlt } from "@/lib/imagery";
import type { CategoryWithServices } from "@/lib/categories";

interface CategoryCardProps {
  category: CategoryWithServices;
  /** Heading level for correct document outline. Defaults to h3. */
  titleAs?: "h2" | "h3";
}

// Image-filled category tile: the image sets the category, a darkened base holds
// the label, a one-line blurb, and a count. Links to that section of the full
// services index.
export function CategoryCard({
  category,
  titleAs: Title = "h3",
}: CategoryCardProps) {
  const count = category.services.length;

  return (
    <Link
      href={`/services#${category.id}`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] w-full bg-surface-dark-2">
        <Image
          src={imagePath(category.image)}
          alt={imageAlt(category.image)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/5" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
            {count} {count === 1 ? "service" : "services"}
          </p>
          <Title className="mt-1.5 font-heading text-xl font-bold leading-tight text-ink-on-dark">
            {category.label}
          </Title>
          <p className="mt-1.5 text-sm text-ink-muted-on-dark">
            {category.blurb}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright">
            View services
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M4 9h10M10 5l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
