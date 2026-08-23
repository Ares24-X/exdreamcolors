// Shared markdown renderer for article content.
//
// The article content in src/data/article-content.ts is authored in markdown and
// includes data tables, internal links, bullet lists and horizontal rules. The
// previous inline renderers only handled **bold** and paragraph breaks, so tables
// shipped to production as raw "| --- |" pipe text and internal links shipped as
// literal "[Label](/slug/)" strings — losing both readability and internal link equity.
//
// This renderer handles the markdown subset actually used by the content set:
//   - tables (with alignment row, including right-aligned "---:" columns)
//   - internal + external links
//   - bold / inline code
//   - unordered lists and ordered lists
//   - h3/h4 headings
//   - horizontal rules
//   - paragraphs
//
// Output is trusted-by-construction: content is first-party, authored in-repo, and
// escaped before inline formatting is applied, so it is safe for dangerouslySetInnerHTML.

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Inline formatting: code, bold, italic, links. Input must already be escaped. */
function inline(text: string): string {
  return text
    .replace(/`([^`]+?)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-slate-800 text-[0.9em]">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+?)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>")
    // [label](target) — internal links get plain styling, external links get rel attrs
    .replace(/\[([^\]]+?)\]\(([^)\s]+?)\)/g, (_m, label: string, href: string) => {
      const external = /^https?:\/\//.test(href);
      const attrs = external
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${href}" class="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800"${attrs}>${label}</a>`;
    });
}

type Align = "left" | "right" | "center";

function parseAlign(cell: string): Align {
  const t = cell.trim();
  if (t.startsWith(":") && t.endsWith(":")) return "center";
  if (t.endsWith(":")) return "right";
  return "left";
}

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

const isTableRow = (line: string) => line.trim().startsWith("|") && line.trim().endsWith("|");
const isAlignRow = (line: string) =>
  isTableRow(line) && splitRow(line).every((c) => /^:?-{2,}:?$/.test(c));

const alignClass: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

function renderTable(header: string[], aligns: Align[], rows: string[][]): string {
  const th = header
    .map(
      (c, i) =>
        `<th scope="col" class="border border-slate-300 bg-slate-100 px-3 py-2 font-semibold ${
          alignClass[aligns[i] ?? "left"]
        }">${inline(escapeHtml(c))}</th>`
    )
    .join("");

  const body = rows
    .map((row) => {
      const tds = row
        .map(
          (c, i) =>
            `<td class="border border-slate-200 px-3 py-2 align-top ${
              alignClass[aligns[i] ?? "left"]
            }">${inline(escapeHtml(c))}</td>`
        )
        .join("");
      return `<tr class="even:bg-slate-50">${tds}</tr>`;
    })
    .join("");

  return (
    '<div class="my-6 overflow-x-auto">' +
    '<table class="w-full border-collapse text-sm">' +
    `<thead>${`<tr>${th}</tr>`}</thead><tbody>${body}</tbody>` +
    "</table></div>"
  );
}

/**
 * Render the markdown subset used by article content into HTML.
 */
export function renderMarkdown(text: string | undefined | null): string {
  if (!text) return "";

  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const joined = paragraph.join(" ").trim();
    if (joined) out.push(`<p>${inline(escapeHtml(joined))}</p>`);
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // blank line ends a paragraph
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // fenced code block
    if (/^```/.test(trimmed)) {
      flushParagraph();
      const body: string[] = [];
      let j = i + 1;
      while (j < lines.length && !/^\s*```/.test(lines[j])) {
        body.push(lines[j]);
        j++;
      }
      out.push(
        '<pre class="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-slate-100">' +
          `<code>${escapeHtml(body.join("\n"))}</code>` +
          "</pre>"
      );
      i = j;
      continue;
    }

    // horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      out.push('<hr class="my-8 border-slate-200" />');
      continue;
    }

    // table: header row followed by an alignment row
    if (isTableRow(trimmed) && i + 1 < lines.length && isAlignRow(lines[i + 1])) {
      flushParagraph();
      const header = splitRow(trimmed);
      const aligns = splitRow(lines[i + 1]).map(parseAlign);
      const rows: string[][] = [];
      let j = i + 2;
      while (j < lines.length && isTableRow(lines[j]) && !isAlignRow(lines[j])) {
        rows.push(splitRow(lines[j]));
        j++;
      }
      out.push(renderTable(header, aligns, rows));
      i = j - 1;
      continue;
    }

    // headings (h3/h4 — h1/h2 are owned by the page shell)
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length <= 3 ? 3 : 4;
      const cls =
        level === 3
          ? "text-xl font-bold text-slate-900 mt-8 mb-3"
          : "text-lg font-semibold text-slate-900 mt-6 mb-2";
      out.push(`<h${level} class="${cls}">${inline(escapeHtml(heading[2]))}</h${level}>`);
      continue;
    }

    // unordered list
    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      let j = i;
      while (j < lines.length && /^\s*[-*+]\s+/.test(lines[j])) {
        items.push(lines[j].replace(/^\s*[-*+]\s+/, "").trim());
        j++;
      }
      out.push(
        '<ul class="my-4 list-disc pl-6 space-y-2">' +
          items.map((it) => `<li>${inline(escapeHtml(it))}</li>`).join("") +
          "</ul>"
      );
      i = j - 1;
      continue;
    }

    // ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      let j = i;
      while (j < lines.length && /^\s*\d+[.)]\s+/.test(lines[j])) {
        items.push(lines[j].replace(/^\s*\d+[.)]\s+/, "").trim());
        j++;
      }
      out.push(
        '<ol class="my-4 list-decimal pl-6 space-y-2">' +
          items.map((it) => `<li>${inline(escapeHtml(it))}</li>`).join("") +
          "</ol>"
      );
      i = j - 1;
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return out.join("");
}

/**
 * Render inline markdown only (no block elements).
 * Use for short strings rendered inside an existing element, e.g. pro tips and intros.
 */
export function renderInlineMarkdown(text: string | undefined | null): string {
  if (!text) return "";
  return inline(escapeHtml(text.trim()));
}

/**
 * Render a list item / tip that is usually a single inline string but occasionally
 * carries block content such as a table or a nested list. Falls back to the full
 * block renderer when block syntax is detected so embedded tables do not leak as
 * raw pipe text.
 */
export function renderTipMarkdown(text: string | undefined | null): string {
  if (!text) return "";
  const hasBlock =
    /\n\s*\|/.test(text) || /\n\s*[-*+]\s+/.test(text) || /\n\s*\d+[.)]\s+/.test(text) || /```/.test(text);
  return hasBlock ? renderMarkdown(text) : renderInlineMarkdown(text);
}
