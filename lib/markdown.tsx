import type { ReactNode } from "react";

/*
  A small, dependency-free Markdown renderer for blog article bodies.

  It supports the common subset a marketing article uses: headings, paragraphs,
  bold and italic, inline code, links, ordered and unordered lists, blockquotes,
  fenced code blocks, and horizontal rules. Output is real React nodes, so there
  is no dangerouslySetInnerHTML on author content. Anything it does not
  recognize renders as plain text, which fails safe.

  Article headings start at h2 because the page title is the h1.
*/

// Inline emphasis, code, and links. Underscores are intentionally not treated as
// emphasis so identifiers and URLs are left alone.
function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const patterns: { type: string; re: RegExp }[] = [
    { type: "code", re: /`([^`]+)`/ },
    { type: "bold", re: /\*\*([^*]+)\*\*/ },
    { type: "link", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
    { type: "italic", re: /\*([^*]+)\*/ },
  ];

  const nodes: ReactNode[] = [];
  let remaining = text;
  let counter = 0;

  while (remaining.length > 0) {
    let best: { type: string; match: RegExpExecArray } | null = null;
    for (const pattern of patterns) {
      const match = pattern.re.exec(remaining);
      if (match && (best === null || match.index < best.match.index)) {
        best = { type: pattern.type, match };
      }
    }

    if (!best) {
      nodes.push(remaining);
      break;
    }

    const { type, match } = best;
    if (match.index > 0) nodes.push(remaining.slice(0, match.index));

    const key = `${keyPrefix}-${counter++}`;
    if (type === "code") {
      nodes.push(
        <code
          key={key}
          className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.9em]"
        >
          {match[1]}
        </code>,
      );
    } else if (type === "bold") {
      nodes.push(
        <strong key={key} className="font-semibold text-ink">
          {parseInline(match[1], key)}
        </strong>,
      );
    } else if (type === "italic") {
      nodes.push(<em key={key}>{parseInline(match[1], key)}</em>);
    } else if (type === "link") {
      const href = match[2];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          className="text-accent-hover underline underline-offset-2 hover:text-accent"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {parseInline(match[1], key)}
        </a>,
      );
    }

    remaining = remaining.slice(match.index + match[0].length);
  }

  return nodes;
}

const HEADING_CLASS: Record<number, string> = {
  2: "mt-10 text-2xl text-ink sm:text-3xl",
  3: "mt-8 text-xl text-ink sm:text-2xl",
  4: "mt-6 text-lg text-ink",
};

export function renderMarkdown(markdown: string): ReactNode {
  if (!markdown || markdown.trim().length === 0) return null;

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const isBlank = (line: string) => line.trim().length === 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      i++;
      continue;
    }

    // Fenced code block
    const fence = line.match(/^```/);
    if (fence) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].match(/^```/)) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing fence
      blocks.push(
        <pre
          key={`b-${key++}`}
          className="mt-4 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const rawLevel = heading[1].length;
      const level = rawLevel <= 1 ? 2 : rawLevel >= 4 ? 4 : rawLevel + 1;
      const content = parseInline(heading[2].trim(), `b-${key}`);
      const className = HEADING_CLASS[level];
      if (level === 2) {
        blocks.push(
          <h2 key={`b-${key++}`} className={className}>
            {content}
          </h2>,
        );
      } else if (level === 3) {
        blocks.push(
          <h3 key={`b-${key++}`} className={className}>
            {content}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 key={`b-${key++}`} className={className}>
            {content}
          </h4>,
        );
      }
      i++;
      continue;
    }

    // Horizontal rule
    if (line.match(/^(-{3,}|\*{3,}|_{3,})\s*$/)) {
      blocks.push(<hr key={`b-${key++}`} className="my-10 border-border" />);
      i++;
      continue;
    }

    // Blockquote
    if (line.match(/^>\s?/)) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].match(/^>\s?/)) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={`b-${key++}`}
          className="mt-6 border-l-4 border-accent pl-4 text-ink italic"
        >
          {parseInline(quoteLines.join(" ").trim(), `b-${key}`)}
        </blockquote>,
      );
      continue;
    }

    // Unordered list
    if (line.match(/^\s*[-*+]\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*[-*+]\s+/)) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul
          key={`b-${key++}`}
          className="mt-4 list-disc space-y-2 pl-6 text-ink-muted"
        >
          {items.map((item, index) => (
            <li key={index}>{parseInline(item.trim(), `b-${key}-${index}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\s*\d+\.\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s+/)) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol
          key={`b-${key++}`}
          className="mt-4 list-decimal space-y-2 pl-6 text-ink-muted"
        >
          {items.map((item, index) => (
            <li key={index}>{parseInline(item.trim(), `b-${key}-${index}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Paragraph: gather consecutive plain lines
    const paragraph: string[] = [];
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !lines[i].match(/^```/) &&
      !lines[i].match(/^>\s?/) &&
      !lines[i].match(/^\s*[-*+]\s+/) &&
      !lines[i].match(/^\s*\d+\.\s+/) &&
      !lines[i].match(/^(-{3,}|\*{3,}|_{3,})\s*$/)
    ) {
      paragraph.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={`b-${key++}`} className="mt-4 leading-relaxed text-ink-muted">
        {parseInline(paragraph.join(" "), `b-${key}`)}
      </p>,
    );
  }

  return blocks;
}
