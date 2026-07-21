import type { JsonLdNode } from "@/lib/schema";

/*
  Injects a JSON-LD script tag. Server component: the markup is serialized once
  at build time. The lone "<" is escaped so a string value can never close the
  script element early.
*/
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
