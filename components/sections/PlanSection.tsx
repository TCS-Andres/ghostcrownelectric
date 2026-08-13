import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToActions } from "@/components/sections/CallToActions";

/*
  The Master Brain three step plan, rendered as a consistent pre-footer band on
  every page (mounted in the root layout). This is the StoryBrand conversion
  path: call, assess and quote, do the work and close it out. The copy lives
  here once so every page tells the same story and always ends in a call to
  action.
*/

const PLAN_STEPS: { title: string; body: string }[] = [
  {
    title: "Call us",
    body: "We talk it through before we ever pull up, so we arrive already understanding the problem. Day or night, you reach a licensed electrician, not a call center.",
  },
  {
    title: "We assess and quote",
    body: "We come to the site, see what actually needs to be done, and give you one honest number before any work begins.",
  },
  {
    title: "We do the work and close it out",
    body: "Our crew executes, the inspection passes, and we follow up to make sure you are happy. Then you go back to never thinking about your electrical.",
  },
];

export function PlanSection() {
  return (
    <section className="border-t border-border bg-surface-2">
      <div className="container-page py-14 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="The plan"
          title="Three steps, start to finish"
          description="No mystery and no moving numbers. This is how every Ghost Crown job runs."
        />
        <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLAN_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-ink"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <CallToActions onDark={false} size="md" />
          <p className="text-sm font-medium text-ink-muted">
            Call Ghost Crown Electric. Day or night.
          </p>
        </div>
      </div>
    </section>
  );
}
