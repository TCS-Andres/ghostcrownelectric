import { CallToActions } from "@/components/sections/CallToActions";

/*
  A compact conversion strip dropped into the middle of long templates, so a
  reader who is already convinced never has to scroll to the end of the page to
  act. Defaults keep the copy on-voice; pass a title and body to localize it.
*/
export function MidPageCTA({
  title = "Not sure yet? Talk it through with us.",
  body = "You reach a licensed electrician, not a call center. Day or night.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-page py-2">
      <div className="relative isolate overflow-hidden rounded-3xl bg-surface-dark px-6 py-8 sm:px-8">
        <div
          aria-hidden="true"
          className="glow-ambient pointer-events-none absolute -top-24 right-0 -z-10 h-[20rem] w-[30rem] opacity-40"
        />
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="font-heading text-xl font-bold text-ink-on-dark">
              {title}
            </p>
            <p className="mt-1 text-sm text-ink-muted-on-dark">{body}</p>
          </div>
          <CallToActions size="md" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
