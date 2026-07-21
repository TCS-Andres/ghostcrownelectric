import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusiness, getService, type Service } from "@/lib/content";
import { loadAllPosts, loadPost, formatPostDate } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { firstSentence } from "@/lib/links";
import {
  articleNode,
  breadcrumbListNode,
  electricianNode,
  founderNode,
  graph,
} from "@/lib/schema";
import { renderMarkdown } from "@/lib/markdown";
import type { Crumb } from "@/components/layout/Breadcrumbs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) return {};
  const business = getBusiness();
  return buildMetadata({
    title: `${post.title} | ${business.name}`,
    description: post.description,
    path: routes.post(slug),
    type: "article",
    publishedTime: post.date || undefined,
    imageAlt: post.title,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) notFound();

  const business = getBusiness();

  const related: Service[] = post.relatedServices
    .map((serviceSlug) => getService(serviceSlug))
    .filter((item): item is Service => item !== null);

  const trail: Crumb[] = [
    { label: "Home", href: routes.home },
    { label: "Blog", href: routes.blog },
    { label: post.title },
  ];
  const pageUrl = absoluteUrl(routes.post(slug));

  return (
    <>
      <JsonLd
        data={graph([
          electricianNode(),
          founderNode(),
          articleNode(post, post.title, post.description, pageUrl),
          breadcrumbListNode(trail, pageUrl),
        ])}
      />

      <div className="container-page pt-6">
        <Breadcrumbs trail={trail} />
      </div>

      <article className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Article header */}
          <header>
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              <span className="font-semibold uppercase tracking-[0.1em] text-accent">
                {business.name}
              </span>
              {post.date ? (
                <>
                  <span aria-hidden="true">/</span>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl text-ink sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                {post.description}
              </p>
            ) : null}
          </header>

          <hr className="mt-8 border-border" />

          {/* Article body */}
          <div className="mt-2">{renderMarkdown(post.body)}</div>

          {/* Related services */}
          {related.length > 0 ? (
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Services mentioned in this article
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={routes.service(item.slug)}
                      className="group block h-full"
                    >
                      <Card interactive className="flex h-full flex-col">
                        <h3 className="font-heading text-base font-semibold text-ink group-hover:text-accent-hover">
                          {item.shortName || item.name}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-ink-muted">
                          {firstSentence(item.intro)}
                        </p>
                        <span className="mt-4 text-sm font-semibold text-accent">
                          View service
                        </span>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Back to all articles */}
          <div className="mt-12">
            <Link
              href={routes.blog}
              className="text-sm font-semibold text-accent hover:text-accent-hover"
            >
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <CTABand />
    </>
  );
}
