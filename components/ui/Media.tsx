import Image from "next/image";
import { cn } from "@/lib/cn";

interface MediaProps {
  src: string;
  alt: string;
  /** Classes for the framing box: aspect ratio, rounding, border. */
  className?: string;
  /** Classes passed to the image itself, e.g. object position or hover zoom. */
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

// A framed, cover-fit image. The box controls shape (aspect, rounding); the
// image fills it. Used for cards and hero visuals so imagery stays consistent.
export function Media({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-dark-2", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
