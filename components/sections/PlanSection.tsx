import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToActions } from "@/components/sections/CallToActions";
import type { ReactNode } from "react";

/*
  The Master Brain three step plan, rendered on every page. On the home page it
  is placed inline between the emergency strip and the FAQ; everywhere else the
  root layout renders it before the footer (see PlanGate). This is the
  StoryBrand conversion path: call, assess and quote, do the work and close it
  out. Copy lives here once so every page tells the same story and ends in a
  call to action.

  Each step carries its own gradient badge and icon (phone, quote, bolt) in a
  cyan to gold progression, so the plan reads as a journey rather than three
  identical blue circles.
*/

interface PlanStep {
  title: string;
  body: string;
  badge: string;
  glow: string;
  iconClass: string;
  icon: ReactNode;
}

const PLAN_STEPS: PlanStep[] = [
  {
    title: "Call Us",
    body: "We talk it through before we ever pull up, so we arrive already understanding the problem. Day or night, you reach a licensed electrician, not a call center.",
    badge: "from-cyan-300 to-cyan-600",
    glow: "bg-cyan",
    iconClass: "text-white",
    icon: <PhoneIcon />,
  },
  {
    title: "We Assess and Quote",
    body: "We come to the site, see what actually needs to be done, and give you one honest number before any work begins.",
    badge: "from-accent to-navy",
    glow: "bg-accent",
    iconClass: "text-white",
    icon: <QuoteIcon />,
  },
  {
    title: "We Do the Work and Close It Out",
    body: "Our crew executes, the inspection passes, and we follow up to make sure you are happy. Then you go back to never thinking about your electrical.",
    badge: "from-gold-300 to-gold-600",
    glow: "bg-gold",
    iconClass: "text-navy",
    icon: <BoltIcon />,
  },
];

export function PlanSection() {
  return (
    <section className="border-t border-border bg-surface-2">
      <div className="container-page py-14 sm:py-20">
        <SectionHeading
          as="h2"
          eyebrow="The Plan"
          title="Three Steps, Start to Finish"
          description="No mystery and no moving numbers. This is how every Ghost Crown job runs."
        />
        <ol className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLAN_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative w-fit">
                {/* Soft colored glow behind the badge. */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-2xl opacity-40 blur-xl transition duration-300 group-hover:opacity-70 ${step.glow}`}
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.badge} ${step.iconClass}`}
                >
                  {step.icon}
                </div>
                {/* Step number chip. */}
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-xs font-bold text-ink shadow ring-1 ring-border">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
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

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.5 3 4.4 3.5c-.8.2-1.4 1-1.3 1.9C3.9 12 8 16.1 14.6 16.9c.9.1 1.7-.5 1.9-1.3l.5-3.1c.1-.7-.3-1.4-1-1.7l-3.1-1.2c-.6-.2-1.2 0-1.6.4l-1 1.2C9 10.4 7.6 9 6.4 6.7l1.2-1C8 5.3 8.2 4.7 8 4.1L6.8 1c-.3-.7-1-1.1-1.7-1L7.5 3Z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3h6a1 1 0 0 1 1 1v1h1.5A1.5 1.5 0 0 1 19 6.5v12A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-12A1.5 1.5 0 0 1 6.5 5H8V4a1 1 0 0 1 1-1Z" />
      <path d="M9 5h6" />
      <path d="m8.5 12.5 2 2 4-4.5" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
