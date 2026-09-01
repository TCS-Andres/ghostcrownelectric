import {
  getBusiness,
  getServices,
  type Business,
  type City,
  type Faq,
  type Post,
  type Service,
} from "@/lib/content";
import { SITE_URL } from "@/lib/content";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { absoluteUrl, OG_IMAGE_PATH } from "@/lib/seo";

/*
  JSON-LD structured data builders.

  Every builder returns a plain node with no @context. Pages collect the nodes
  they need and pass them through graph() which wraps them in a single
  schema.org @graph, so nodes can cross reference each other by @id. The
  <JsonLd> component renders the result.

  Guardrails honored here: no aggregateRating, no review markup, and no sameAs
  (there are no social profiles yet). License labels are used, never the
  placeholder numbers. The name from business.json is used as is.
*/

export type JsonLdNode = Record<string, unknown>;

// Stable identifiers for the sitewide entities, referenced across pages.
export const ELECTRICIAN_ID = `${SITE_URL}/#electrician`;

function geoCircle(lat: number, lng: number, radiusMeters: number): JsonLdNode {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    geoRadius: radiusMeters,
  };
}

function postalAddress(business: Business): JsonLdNode {
  const address: JsonLdNode = {
    "@type": "PostalAddress",
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  };
  // Street stays out while it is a placeholder, matching the rest of the site.
  if (business.address.street && !business.address.streetIsPlaceholder) {
    address.streetAddress = business.address.street;
  }
  return address;
}

function credentials(business: Business): JsonLdNode[] {
  // Labels only. License numbers are placeholders and never published.
  return business.licenses.map((license) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: license.label,
  }));
}

// Reachable day or night, which is the approved availability anchor. Represented
// as full-day availability across the week rather than invented clock times.
function openingHours(): JsonLdNode[] {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ];
}

// The sitewide LocalBusiness identity. Injected on the main content pages and
// referenced by services, articles, and city pages through ELECTRICIAN_ID.
export function electricianNode(business: Business = getBusiness()): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "Electrician",
    "@id": ELECTRICIAN_ID,
    name: business.name,
    legalName: business.legalName,
    url: `${SITE_URL}/`,
    telephone: business.phoneTel,
    slogan: business.tagline,
    description:
      "Licensed electrical service, repair, and restoration for South Florida's Tri-County area, local and accountable from the first call to the final inspection.",
    address: postalAddress(business),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: geoCircle(business.geo.lat, business.geo.lng, 40000),
    openingHoursSpecification: openingHours(),
    hasCredential: credentials(business),
    knowsAbout: getServices().map((service) => service.name),
    image: absoluteUrl(OG_IMAGE_PATH),
  };
  if (business.email && !business.emailIsPlaceholder) {
    node.email = business.email;
  }
  return node;
}

// A Service offered by the business. No offers node: the on-site visit is the
// paid service call, so a free estimate offer would not be truthful and is
// omitted per the contract.
export function serviceNode(service: Service, pageUrl: string): JsonLdNode {
  const business = getBusiness();
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    provider: { "@id": ELECTRICIAN_ID },
    areaServed: geoCircle(business.geo.lat, business.geo.lng, 40000),
    url: pageUrl,
  };
}

// The five step process, rendered as a HowTo that mirrors the visible steps.
export function howToNode(service: Service, pageUrl: string): JsonLdNode {
  return {
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: `How we handle your ${service.shortName.toLowerCase()}`,
    description: `The way Ghost Crown Electric works a ${service.shortName.toLowerCase()} job, from your first call to the final inspection.`,
    step: service.process.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
    })),
  };
}

// A FAQPage built from the same faqs the accordion renders, so the markup and
// the visible page match exactly.
export function faqPageNode(faqs: Faq[], pageUrl: string): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// A BreadcrumbList built from the exact same Crumb trail the visual breadcrumbs
// use. The final crumb has no href in the trail, so the page URL fills it in.
export function breadcrumbListNode(
  trail: Crumb[],
  pageUrl: string,
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? absoluteUrl(crumb.href) : pageUrl,
    })),
  };
}

// A city scoped LocalBusiness node centered on the city with a 25km reach. Its
// @id is per city so each city page describes one local business cleanly.
export function cityElectricianNode(city: City, pageUrl: string): JsonLdNode {
  const business = getBusiness();
  const node: JsonLdNode = {
    "@type": "Electrician",
    "@id": `${pageUrl}#electrician`,
    name: business.name,
    legalName: business.legalName,
    url: pageUrl,
    telephone: business.phoneTel,
    slogan: business.tagline,
    description: `Licensed electrician serving ${city.name}, ${city.county} County, local and accountable from the first call to the final inspection.`,
    address: postalAddress(business),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: geoCircle(city.lat, city.lng, 25000),
    openingHoursSpecification: openingHours(),
    hasCredential: credentials(business),
    parentOrganization: { "@id": ELECTRICIAN_ID },
    image: absoluteUrl(OG_IMAGE_PATH),
  };
  if (business.email && !business.emailIsPlaceholder) {
    node.email = business.email;
  }
  return node;
}

// The electrical service offered in a specific city, reaching 25km around it.
export function cityServiceNode(city: City, pageUrl: string): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Electrician in ${city.name}, ${city.county} County`,
    serviceType: "Electrical service, repair, and restoration",
    description: city.metaDescription,
    provider: { "@id": `${pageUrl}#electrician` },
    areaServed: geoCircle(city.lat, city.lng, 25000),
    url: pageUrl,
  };
}

// A blog Article. The byline and publisher are the business itself.
export function articleNode(
  post: Post,
  title: string,
  description: string,
  pageUrl: string,
): JsonLdNode {
  const business = getBusiness();
  const node: JsonLdNode = {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: title,
    description,
    author: { "@type": "Organization", name: business.name, "@id": ELECTRICIAN_ID },
    publisher: {
      "@type": "Organization",
      name: business.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(OG_IMAGE_PATH),
      },
    },
    image: absoluteUrl(OG_IMAGE_PATH),
    mainEntityOfPage: pageUrl,
    url: pageUrl,
  };
  if (post.date) {
    node.datePublished = post.date;
    node.dateModified = post.date;
  }
  return node;
}

// Wrap a set of nodes in one schema.org graph for a single script tag.
export function graph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
