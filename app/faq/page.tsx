import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import type { Faq } from "@/lib/content";
import { routes } from "@/lib/routes";
import { titleCase } from "@/lib/text";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbListNode,
  electricianNode,
  faqPageNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBadge, BADGE_TONES } from "@/components/ui/GradientBadge";
import { CTABand } from "@/components/ui/CTABand";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrician FAQ | Ghost Crown Electric";
const DESCRIPTION =
  "Straight answers on our electrical work, pricing, service area, and licensing in South Florida. Read the FAQ, then call when you are ready.";

// Grouped questions for the visible page. The same items, flattened, feed the
// FAQPage JSON-LD so the markup and the page match exactly. This is the only
// page allowed to carry the solar and build-out denials.
const GROUPS: { heading: string; icon: ReactNode; items: Faq[] }[] = [
  {
    heading: "About the work",
    icon: <BrandIcon name="service-truck" size={20} />,
    items: [
      {
        question: "Do you work on both commercial and residential properties?",
        answer:
          "Yes. Property managers, homeowners, and general contractors who sub the electrical work in, on both commercial and residential buildings. Most of our work is service, repair, and restoration.",
      },
      {
        question: "Do you handle emergencies?",
        answer:
          "Yes, day or night. Tell us what is happening and we will say honestly whether it needs someone tonight or whether it can wait for morning.",
      },
      {
        question: "My insurance company says my panel is a problem. Can you help?",
        answer:
          "Yes. Zinsco and Federal Pacific panels are work we do every week. We pull the permit, do the install, and meet the inspector, so you have the paperwork your insurer wants.",
      },
      {
        question: "Can you install an EV charger?",
        answer:
          "Yes, once we know your home can carry it. A charger is a real load, so we start with an honest look at your service and panel capacity, and tell you what it would take if the answer is no.",
      },
      {
        question: "Do you handle smaller jobs like lighting, fans, and outlets?",
        answer:
          "Yes. Recessed lighting, ceiling fans, outlets, switches, dimmers, and smart home devices are steady work for us. Same licensed crew, and we will group your whole list into one visit at one price.",
      },
      {
        question: "Do you offer surge protection?",
        answer:
          "Yes. A panel-mounted surge protective device is the first line of defense for the whole home. We will explain what it does and does not cover, so you know exactly what you are getting.",
      },
      {
        question: "Do you work on pools?",
        answer:
          "Yes, and it is work many contractors avoid. Pool electrical repair, grounding and bonding correction, bonding testing, safety breaker replacement, and full rebuilds, permitted and closed out.",
      },
      {
        question: "How often should my electrical system be inspected?",
        answer:
          "About once every five years for most homes, since codes change on a multi-year cycle. A pool is different: once a year, ideally before heater season.",
      },
      {
        question: "Do you do new construction or build-outs?",
        answer:
          "No. We are a service, repair, and restoration contractor and we stay in that lane on purpose. New construction would compromise the fast local response our clients rely on.",
      },
      {
        question: "Do you do solar?",
        answer:
          "No. Solar, photovoltaic, and battery storage are not services we offer. Older solar permits tied to our history reflect work under a program that has since left the market.",
      },
    ],
  },
  {
    heading: "Pricing",
    icon: <BrandIcon name="one-honest-number" size={20} />,
    items: [
      {
        question: "How does a service call work?",
        answer:
          "You reach a licensed electrician, not a call center, and we start with an on-site visit. If the job turns out to be bigger, you get one price before any further work begins.",
      },
      {
        question: "Is the rate different after hours?",
        answer:
          "Yes. After-hours and emergency visits carry a premium, and we name it before we head out. You decide whether it happens tonight or waits for regular hours.",
      },
      {
        question: "What does a service rebuild cost?",
        answer:
          "Every property is different, so we quote it after we see it, never over the phone. One honest number for your specific property, before any work begins.",
      },
      {
        question: "Will the price change once work starts?",
        answer:
          "No. We price it before work begins and stand behind that number. The only time it changes is if you ask for something different, and we would agree on that with you first.",
      },
    ],
  },
  {
    heading: "Service area",
    icon: <BrandIcon name="service-area-pin" size={20} />,
    items: [
      {
        question: "What areas do you serve?",
        answer:
          "All of South Florida's Tri-County area, as far south as North Miami Beach. North Lauderdale is home base, so that is where we are quickest. If your town is not listed, call anyway and we will tell you honestly whether we reach you.",
      },
    ],
  },
  {
    heading: "Licensing",
    icon: <BrandIcon name="licensed-shield" size={20} />,
    items: [
      {
        question: "Are you licensed?",
        answer:
          "Yes. Florida Certified Electrical Contractor #EC13010704, with statewide authority, and a South Florida Master Electrician license.",
      },
      {
        question: "Who actually does the work?",
        answer:
          "Our own in-house crew, with bucket truck services available. We do not hand your job to a subcontractor we do not know. The people at your property are our people.",
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
          {GROUPS.map((group, index) => (
            <section key={group.heading}>
              <div className="mb-5 flex items-center gap-3">
                <GradientBadge
                  tone={BADGE_TONES[index % BADGE_TONES.length]}
                  size="md"
                >
                  {group.icon}
                </GradientBadge>
                <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
                  {titleCase(group.heading)}
                </h2>
              </div>
              <FAQAccordion items={group.items} />
            </section>
          ))}
        </div>
      </div>

      <CTABand />
    </>
  );
}
