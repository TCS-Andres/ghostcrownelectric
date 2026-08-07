"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

/*
  Three step lead form for Ghost Crown Electric.

  Step 1 asks what the visitor needs, step 2 asks where they are, step 3 collects
  how to reach them. The copy stays warm and plain, never pushy. A hidden honeypot
  field catches simple bots, and the whole payload is posted to /api/lead. We only
  ever show a calm confirmation back; the API never echoes the submission.

  The service and city options are passed in from the server so this stays a small
  client component and the content still lives in one place.
*/

export interface LeadFormCity {
  slug: string;
  name: string;
}

interface LeadFormProps {
  services: string[];
  cities: LeadFormCity[];
  phoneDisplay: string;
  phoneTel: string;
  className?: string;
  /** When set, renders a dark panel header above the form (used in the hero). */
  title?: string;
  subtitle?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const OTHER_SERVICE = "Something else / not sure";
const OTHER_CITY = "Other";

const STEPS = ["Service", "Location", "Contact"] as const;

export function LeadForm({
  services,
  cities,
  phoneDisplay,
  phoneTel,
  className,
  title,
  subtitle,
}: LeadFormProps) {
  const baseId = useId();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Field state.
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [locationDetail, setLocationDetail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot. A real person never fills this; bots often do.
  const [company, setCompany] = useState("");

  const serviceOptions = [...services, OTHER_SERVICE];
  const cityOptions = [...cities.map((c) => c.name), OTHER_CITY];

  function next() {
    setMessage("");
    if (step === 0 && !service) {
      setMessage("Pick the closest match, or choose not sure. We will sort it out.");
      return;
    }
    if (step === 1 && !city) {
      setMessage("Let us know roughly where the work is so we can plan the trip.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setMessage("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !phone.trim()) {
      setMessage("We just need a name and a phone number so we can call you back.");
      return;
    }
    if (!consent) {
      setMessage("Please check the box so we know it is okay to contact you.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service,
          city,
          locationDetail,
          name,
          phone,
          email,
          description,
          consent,
          company,
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // Optional dark panel header, shared by the form and its success state, so the
  // form reads as a "request service" panel in the hero.
  const panelHeader = title ? (
    <div className="bg-navy px-6 py-5 text-ink-on-dark">
      <div className="flex items-center gap-2 text-accent-bright">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
        {subtitle ? (
          <span className="text-xs font-semibold uppercase tracking-[0.16em]">
            {subtitle}
          </span>
        ) : null}
      </div>
      <p className="mt-1 font-heading text-xl font-bold text-ink-on-dark">
        {title}
      </p>
    </div>
  ) : null;

  const shellClass = title
    ? "overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-lift)]"
    : "glass rounded-2xl p-6 sm:p-7";
  const bodyClass = title ? "glass p-6 sm:p-7" : undefined;

  if (status === "success") {
    return (
      <div
        className={cn(title ? shellClass : "glass rounded-2xl p-6", className)}
        role="status"
        aria-live="polite"
      >
        {panelHeader}
        <div className={bodyClass}>
          <h3 className="font-heading text-xl font-semibold text-ink">
            Thank you. We have your request.
          </h3>
          <p className="mt-3 text-ink-muted">
            We will reach out to talk through what is going on. If it is urgent,
            do not wait on us. Call {phoneDisplay}, day or night.
          </p>
          <Button
            href={`tel:${phoneTel}`}
            variant="primary"
            size="md"
            className="mt-5"
          >
            Call {phoneDisplay}
          </Button>
        </div>
      </div>
    );
  }

  const onLastStep = step === STEPS.length - 1;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(shellClass, className)}
      noValidate
    >
      {panelHeader}
      <div className={bodyClass}>
      {/* Progress indicator */}
      <ol className="mb-6 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((label, index) => {
          const state =
            index === step ? "current" : index < step ? "done" : "upcoming";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  state === "current" && "bg-accent text-accent-ink",
                  state === "done" && "bg-navy text-ink-on-dark",
                  state === "upcoming" && "bg-surface-2 text-ink-muted",
                )}
                aria-current={state === "current" ? "step" : undefined}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  state === "current" ? "font-semibold text-ink" : "text-ink-muted",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Honeypot: visually hidden and off the tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${baseId}-company`}>Company (leave this blank)</label>
        <input
          id={`${baseId}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {/* Step 1: service */}
      {step === 0 ? (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-heading text-lg font-semibold text-ink">
            What is going on?
          </legend>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-service`}
              className="text-sm font-medium text-ink"
            >
              What do you need help with?
            </label>
            <select
              id={`${baseId}-service`}
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
            >
              <option value="">Choose the closest match</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      ) : null}

      {/* Step 2: location */}
      {step === 1 ? (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-heading text-lg font-semibold text-ink">
            Where is the work?
          </legend>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-city`}
              className="text-sm font-medium text-ink"
            >
              City or area
            </label>
            <select
              id={`${baseId}-city`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
            >
              <option value="">Choose your area</option>
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-location-detail`}
              className="text-sm font-medium text-ink"
            >
              Street or neighborhood <span className="text-ink-muted">(optional)</span>
            </label>
            <input
              id={`${baseId}-location-detail`}
              type="text"
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              autoComplete="address-level2"
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
              placeholder="Helps us plan the trip"
            />
          </div>
        </fieldset>
      ) : null}

      {/* Step 3: contact */}
      {step === 2 ? (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-heading text-lg font-semibold text-ink">
            How can we reach you?
          </legend>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-name`}
              className="text-sm font-medium text-ink"
            >
              Your name
            </label>
            <input
              id={`${baseId}-name`}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-phone`}
              className="text-sm font-medium text-ink"
            >
              Phone
            </label>
            <input
              id={`${baseId}-phone`}
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-email`}
              className="text-sm font-medium text-ink"
            >
              Email <span className="text-ink-muted">(optional)</span>
            </label>
            <input
              id={`${baseId}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-11 rounded-md border border-mist-300 bg-surface px-3 text-ink"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`${baseId}-description`}
              className="text-sm font-medium text-ink"
            >
              Tell us a little more <span className="text-ink-muted">(optional)</span>
            </label>
            <textarea
              id={`${baseId}-description`}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-md border border-mist-300 bg-surface px-3 py-2 text-ink"
              placeholder="What is happening, when it started, anything you have noticed"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              id={`${baseId}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-mist-300 accent-accent"
            />
            <label htmlFor={`${baseId}-consent`} className="text-sm text-ink-muted">
              I agree to be contacted by call or text about this request. Message
              and data rates may apply. We will never use it for marketing spam.
            </label>
          </div>
        </fieldset>
      ) : null}

      {/* Inline message for validation and errors */}
      {message ? (
        <p className="mt-4 text-sm text-ink" role="alert">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-ink" role="alert">
          Something went wrong sending that. Please try again, or call{" "}
          {phoneDisplay}, day or night.
        </p>
      ) : null}

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" size="md" onClick={back}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {onLastStep ? (
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send request"}
          </Button>
        ) : (
          <Button type="button" variant="primary" size="md" onClick={next}>
            Continue
          </Button>
        )}
      </div>
      </div>
    </form>
  );
}
