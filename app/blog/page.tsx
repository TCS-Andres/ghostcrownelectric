import type { Metadata } from "next";
import Link from "next/link";
import { getBusiness } from "@/lib/content";
import { loadAllPosts, formatPostDate } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  breadcrumbListNode,
  electricianNode,
  graph,
} from "@/lib/schema";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

const TITLE = "Electrical Advice for South Florida Homes | Ghost Crown Electric";
const DESCRIPTION =
  "Plain-spoken articles on panels, pool electrical, and service rebuilds from a licensed South Florida electrician. Practical guidance, no scare tactics.";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: routes.blog,
  });
}

export default function BlogIndexPage() {
  const business = getBusiness();
  const posts = loadAllPosts();

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Blog" },
  ];
  const pageUrl = absoluteUrl(routes.blog);

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs trail={trail} className="mb-8" />

        <SectionHeading
          as="h1"
          eyebrow="Straight talk"
          title="Electrical advice for South Florida homes"
          description="Short, honest reads on the electrical questions we hear most, written the way we would explain them at your kitchen table. No fear, no upselling, just what is going on and what it takes to make it right."
        />

        {posts.length === 0 ? (
          <p className="mt-10 text-ink-muted">
            New articles are on the way. In the meantime, call us and we will
            answer your question plainly.
          </p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={routes.post(post.slug)}
                  className="group block h-full"
                >
                  <Card interactive as="article" className="flex h-full flex-col">
                    <div className="flex items-center gap-2 text-xs text-ink-muted">
                      <span className="font-semibold uppercase tracking-[0.1em] text-accent">
                        {business.name}
                      </span>
                      {post.date ? (
                        <>
                          <span aria-hidden="true">/</span>
                          <time dateTime={post.date}>
                            {formatPostDate(post.date)}
                          </time>
                        </>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-semibold text-ink group-hover:text-accent-hover">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-ink-muted">
                      {post.description}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-accent">
                      Read article
                    </span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CTABand />
    </>
  );
}
