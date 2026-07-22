import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content";
import { routes } from "@/lib/routes";
import { serviceImage } from "@/lib/imagery";

interface ServiceCardProps {
  service: Service;
  /** Heading level for correct document outline. Defaults to h3. */
  titleAs?: "h3" | "h4";
}

// Image-filled service tile with a frosted glass caption floating at the base.
// The image is category illustration; the label carries the meaning.
export function ServiceCard({ service, titleAs: Title = "h3" }: ServiceCardProps) {
  const image = serviceImage(service.slug);

  return (
    <Link
      href={routes.service(service.slug)}
      className="group relative block h-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] w-full bg-surface-dark-2">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Scrim keeps the caption legible over any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
        {/* Frosted glass caption */}
        <div className="absolute inset-x-3 bottom-3">
          <div className="glass-dark flex items-center justify-between gap-3 rounded-xl px-4 py-3">
            <Title className="font-heading text-base font-semibold leading-tight text-ink-on-dark">
              {service.shortName || service.name}
            </Title>
            <span
              aria-hidden="true"
              className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 9h10M10 5l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
