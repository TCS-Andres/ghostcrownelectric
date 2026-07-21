import Link from "next/link";
import type { Service } from "@/lib/content";
import { routes } from "@/lib/routes";
import { serviceImage } from "@/lib/imagery";
import { firstSentence } from "@/lib/links";
import { Media } from "./Media";

interface ServiceCardProps {
  service: Service;
  /** Heading level for correct document outline. Defaults to h3. */
  titleAs?: "h3" | "h4";
}

// Image-topped service card used on the home grid and the services index. The
// image reads as category illustration; the label and hook carry the meaning.
export function ServiceCard({ service, titleAs: Title = "h3" }: ServiceCardProps) {
  const image = serviceImage(service.slug);

  return (
    <Link
      href={routes.service(service.slug)}
      className="group block h-full focus-visible:outline-none"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)] transition-shadow duration-150 hover:shadow-[var(--shadow-lift)]">
        <Media
          src={image.src}
          alt={image.alt}
          className="aspect-[16/10]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="flex flex-1 flex-col p-6">
          <Title className="font-heading text-lg font-semibold text-ink group-hover:text-accent-hover">
            {service.shortName || service.name}
          </Title>
          <p className="mt-2 flex-1 text-sm text-ink-muted">
            {firstSentence(service.intro)}
          </p>
          <span className="mt-4 text-sm font-semibold text-accent">
            View service
          </span>
        </div>
      </article>
    </Link>
  );
}
