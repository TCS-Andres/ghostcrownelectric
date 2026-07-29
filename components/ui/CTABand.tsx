import Image from "next/image";
import { getBusiness } from "@/lib/content";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

interface CTABandProps {
  headline?: string;
  body?: string;
  className?: string;
}

// Final call-to-action band. Warm, plain spoken, calm. Renders the phone number
// from business.json, never a hard-coded value.
export function CTABand({
  headline = "Talk to the electrician who takes the call",
  body = "Damean answers, prices the job, and meets the inspector himself. Reach out and we will tell you plainly what it takes and what it costs.",
  className,
}: CTABandProps) {
  const business = getBusiness();

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-surface-dark text-ink-on-dark",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/cta-texture-blue.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/85 to-surface-dark/45" />
      </div>
      <div className="container-page flex flex-col items-start gap-6 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl text-ink-on-dark sm:text-3xl">{headline}</h2>
          <p className="mt-3 text-ink-muted-on-dark">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={routes.book} variant="primary" size="lg">
            Book Now
          </Button>
          <Button
            href={`tel:${business.phoneTel}`}
            variant="outlineOnDark"
            size="lg"
          >
            Call {business.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
