import type { Metadata } from "next";
import type { Faq } from "@/lib/content";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbListNode,
  electricianNode,
  faqPageNode,
  founderNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician FAQ | Ghost Crown Electric";
const DESCRIPTION =
  "Straight answers on our electrical work, pricing, service area, and licensing in Broward County and South Florida. Read the FAQ, then call when you are ready.";

// Grouped questions for the visible page. The same items, flattened, feed the
// FAQPage JSON-LD so the markup and the page match exactly. This is the only
// page allowed to carry the solar and build-out denials.
const GROUPS: { heading: string; items: Faq[] }[] = [
  {
    heading: "About the work",
    items: [
      {
        question: "Do you work on both commercial and residential properties?",
        answer:
          "Yes. We serve property managers, homeowners, and general contractors who sub the electrical work in, on both commercial and residential buildings. Most of our work is service, repair, and restoration. If you are not sure whether your situation is something we handle, call and we will tell you plainly.",
      },
      {
        question: "Do you handle emergencies?",
        answer:
          "Yes. We answer whenever you call, day or night. Electricity is something we do not see, we only feel the effect, so when something is wrong it can feel urgent. Tell us what is happening and we will let you know honestly whether it needs someone tonight or whether it can wait for morning.",
      },
      {
        question: "My insurance company says my panel is a problem. Can you help?",
        answer:
          "Yes. Zinsco and Federal Pacific panels are exactly the kind of work we do every week. If your carrier has flagged your panel, replacing it with a modern, properly installed panel is core work for us. We pull the permit, do the install, and meet the inspector, so you have the paperwork your insurer wants.",
      },
      {
        question: "Can you install an EV charger?",
        answer:
          "Yes, once we know your home can carry it. A charger is a real load, so the first step is an honest look at your electrical service and panel capacity. If your service can take it, we install it right. If it cannot, we will tell you what it would take first, rather than overload a system that is not ready.",
      },
      {
        question: "Do you install generators?",
        answer:
          "Yes. Generator work is quoted per property, because the right setup depends on your home, your panel, and what you want backed up when the power goes out. We will walk the property, talk through what matters to you, and give you one honest price before any work begins.",
      },
      {
        question: "Do you offer surge protection?",
        answer:
          "Yes. A panel-mounted surge protective device is the first line of defense for the whole home, and it is work we do often. Proper protection looks after your family, your home, and your investment as a whole. We will explain what it does and does not cover so you know exactly what you are getting.",
      },
      {
        question: "Do you work on pools?",
        answer:
          "Yes, and it is work many contractors avoid. We handle pool electrical repair, grounding and bonding correction, equipotential bonding testing, safety breaker replacement, and full pool electrical rebuilds. We take the work on, pull the permit, and close it out with the building department. Around water, correct bonding is what keeps everyone safe.",
      },
      {
        question: "How often should my electrical system be inspected?",
        answer:
          "For most homes, a whole-home electrical checkup about once every five years is plenty, since codes change on a multi-year cycle and newer homes are already well protected. A pool is different: have the pool electrical inspected once a year, ideally before heater season. We will never tell you to do more than you need.",
      },
      {
        question: "Do you do new construction or build-outs?",
        answer:
          "No. We are a service, repair, and restoration contractor, and we stay in that lane on purpose. Taking on new construction and tenant build-outs would slow us down and compromise the fast, local response our clients rely on. When you call us, that focus is exactly what you are paying for.",
      },
      {
        question: "Do you do solar?",
        answer:
          "No. Solar, photovoltaic, and battery storage are not services we offer. If you find older solar permits tied to our history, those reflect work done under a solar contractor's program that has since left the market. Today our work is electrical service, repair, and restoration, and that is where we stay.",
      },
    ],
  },
  {
    heading: "Pricing",
    items: [
      {
        question: "How does a service call work?",
        answer:
          "You reach a licensed electrician, not a call center, and we start with an on-site visit to see the problem in person. You are paying for the experience of an electrician who can tell you what is wrong and what it takes to fix it. If the job turns out to be bigger, you get one price before any further work begins.",
      },
      {
        question: "Is the rate different after hours?",
        answer:
          "Yes. After-hours and emergency visits carry a premium, because getting a licensed crew to you day or night costs more to provide. We will always be upfront about that before we head out, so there are no surprises. You decide whether it needs to happen tonight or whether it can wait for regular hours.",
      },
      {
        question: "What does a service rebuild cost?",
        answer:
          "Every property is different, so we quote it after we see it, never over the phone. The site visit always comes first. We look at the whole picture, then give you one honest number for your specific property before any work begins.",
      },
      {
        question: "Will the price change once work starts?",
        answer:
          "No. We forecast the job and price it before the work begins, then we stand behind that number. Price it once, price it right. The only time a price would change is if you ask us to do something different, and even then we would stop, explain it, and agree on it with you first.",
      },
    ],
  },
  {
    heading: "Service area",
    items: [
      {
        question: "What areas do you serve?",
        answer:
          "We cover all of Broward and Palm Beach counties, and we reach as far south as North Miami Beach. North Lauderdale is home base, so Broward is where we are quickest, and we run north through Palm Beach every week. Three trucks let us keep jobs moving across that stretch. If your town is not listed on the site, call anyway and we will tell you honestly whether we reach you.",
      },
    ],
  },
  {
    heading: "Licensing",
    items: [
      {
        question: "Are you licensed?",
        answer:
          "Yes. Ghost Crown Electric holds a Florida Certified Electrical Contractor license with statewide authority and a Broward County Master Electrician license. Licensing is where we start every conversation, because it is what stands behind the work. We are glad to provide license numbers on request.",
      },
      {
        question: "Who actually does the work?",
        answer:
          "Our own three-person, in-house crew does the work. We do not hand your job to a subcontractor we do not know. We take the first call, price the job, pull the permit, and meet the inspector. The people at your property are our people.",
      },
    ],
  },
];

// Flatten every question in page order for the FAQPage structured data.
const ALL_FAQS: Faq[] = GROUPS.flatMap((group) => group.items);

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.faq,
  });
}

export default function FaqPage() {
  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "FAQ" },
  ];
  const pageUrl = absoluteUrl(routes.faq);

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          founderNode(),
          faqPageNode(ALL_FAQS, pageUrl),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs trail={trail} className="mb-8" />

        <SectionHeading
          as="h1"
          eyebrow="Questions"
          title="Answers, in plain language"
          description="The questions we hear most, answered the way we would answer them on the phone. If yours is not here, call and we will talk it through."
        />

        <div className="mt-12 flex flex-col gap-14">
          {GROUPS.map((group) => (
            <section key={group.heading}>
              <SectionHeading as="h2" title={group.heading} className="mb-4" />
              <FAQAccordion items={group.items} />
            </section>
          ))}
        </div>
      </div>

      <CTABand />
    </>
  );
}
