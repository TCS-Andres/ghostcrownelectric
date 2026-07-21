import { getBusiness } from "@/lib/content";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

/*
  The dual call to action used in page heroes: Request Service, which points at
  the booking flow, and a real phone link that renders the number from
  business.json. Never hard-code the phone number here.
*/
export function CallToActions({
  onDark = true,
  size = "lg",
  className,
}: {
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const business = getBusiness();
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button href={routes.book} variant="primary" size={size}>
        Request Service
      </Button>
      <Button
        href={`tel:${business.phoneTel}`}
        variant={onDark ? "outlineOnDark" : "outline"}
        size={size}
      >
        Call {business.phoneDisplay}
      </Button>
    </div>
  );
}
