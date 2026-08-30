import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content";
import { routes } from "@/lib/routes";
import { serviceImage } from "@/lib/imagery";
import { firstSentence } from "@/lib/links";
import { BrandIcon, serviceBrandIcon } from "@/components/ui/BrandIcon";

interface ServiceCardProps {
  service: Service;
  /** Heading level for correct document outline. Defaults to h3. */
  titleAs?: "h2" | "h3";
}

// Service tile: a clean image header over a light body that carries the title,
// a one-line plain-English summary, and a clear call to read more. The image is
// on-brand trade photography or a real job photo; the words carry meaning.
export function ServiceCard({ service, titleAs: Title = "h3" }: ServiceCardProps) {
  const image = serviceImage(service.slug);
  const summary = firstSentence(service.intro);

  return (
    <Link
      href={routes.service(service.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dark-2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent"
        />
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy/85 text-accent-bright ring-1 ring-white/15 backdrop-blur-sm">
          <BrandIcon name={serviceBrandIcon(service.slug)} size={18} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Title className="font-heading text-lg font-bold leading-tight text-ink group-hover:text-accent-hover">
          {service.shortName || service.name}
        </Title>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Learn more
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
    </Link>
  );
}
