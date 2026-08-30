import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToActions } from "@/components/sections/CallToActions";
import { BrandIcon } from "@/components/ui/BrandIcon";
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
    body: "Day or night, you reach a licensed electrician, not a call center.",
    badge: "from-cyan-300 to-cyan-600",
    glow: "bg-cyan",
    iconClass: "text-white",
    icon: <BrandIcon name="call-day-or-night" size={24} />,
  },
  {
    title: "We Assess and Quote",
    body: "We see what actually needs doing and give you one number before any work begins.",
    badge: "from-accent to-navy",
    glow: "bg-accent",
    iconClass: "text-white",
    icon: <BrandIcon name="one-honest-number" size={24} />,
  },
  {
    title: "We Do the Work and Close It Out",
    body: "Our crew executes, the inspection passes, and we follow up. Then you go back to never thinking about it.",
    badge: "from-gold-300 to-gold-600",
    glow: "bg-gold",
    iconClass: "text-navy",
    icon: <BrandIcon name="service-truck" size={24} />,
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
