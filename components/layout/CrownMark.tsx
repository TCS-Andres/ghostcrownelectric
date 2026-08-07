import Image from "next/image";
import { cn } from "@/lib/cn";
import crownIcon from "../../public/brand/crown-icon.png";

// Ghost Crown Electric brand mark: the gold crown + electric-blue bolt icon,
// shown beside the wordmark in the header and footer. It reads cleanly on both
// the light header and the dark footer. The full lockup lives at
// public/brand/logo-full.png; favicons are app/icon.png and app/apple-icon.png.
export function CrownMark({ className }: { className?: string }) {
  return (
    <Image
      src={crownIcon}
      alt=""
      aria-hidden="true"
      priority
      sizes="44px"
      className={cn("h-8 w-auto", className)}
    />
  );
}
