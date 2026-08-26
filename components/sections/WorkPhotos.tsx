import { cn } from "@/lib/cn";
import type { GalleryPhoto } from "@/lib/imagery";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";

/*
  A captioned photo band for the long templates. Each photo carries one line
  explaining what the reader is looking at, so the section teaches rather than
  decorates. Photos flagged `real` are genuine Ghost Crown job photography and
  get the crown badge; everything else is category illustration and says nothing
  about a specific job.
*/
export function WorkPhotos({
  photos,
  eyebrow = "See the work",
  title,
  description,
  onDark = false,
  className,
}: {
  photos: GalleryPhoto[];
  eyebrow?: string;
  title: string;
  description?: string;
  onDark?: boolean;
  className?: string;
}) {
  if (photos.length === 0) return null;

  return (
    <section
      className={cn(onDark ? "bg-surface-dark" : "bg-surface-2", className)}
    >
      <div className="container-page py-14 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow={eyebrow}
          title={title}
          description={description}
          onDark={onDark}
        />
        <ul
          className={cn(
            "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2",
            photos.length >= 3 && "lg:grid-cols-3",
          )}
        >
          {photos.map((photo) => (
            <li
              key={`${photo.src}${photo.caption}`}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
                onDark
                  ? "border-navy-600 bg-surface-dark-2"
                  : "border-border bg-surface",
              )}
            >
              <Media
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] w-full"
                imageClassName="transition-transform duration-500 group-hover:scale-105"
              >
                {photo.real ? (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-bright ring-1 ring-white/15 backdrop-blur-sm">
                    <BrandIcon name="crown-bolt" size={13} />
                    Our Work
                  </span>
                ) : null}
              </Media>
              <p
                className={cn(
                  "flex-1 p-5 text-sm leading-relaxed",
                  onDark ? "text-ink-muted-on-dark" : "text-ink-muted",
                )}
              >
                {photo.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
