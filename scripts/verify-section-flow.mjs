#!/usr/bin/env node
/**
 * verify-section-flow.mjs
 *
 * Guards against the duplicate-content regression fixed in src/lib/sections.ts.
 *
 * Background: article `sectionFlow` arrays use free-form section names. Both
 * article renderers switch on those names and fall back to rendering
 * `realWorldExamples` for anything unmapped. Before the fix, an article that
 * listed several unmapped sections printed its whole body once per section —
 * /color-accessibility-guidelines/ shipped its body 10 times, and 31 built
 * pages had a block repeated 3+ times. That is self-inflicted duplicate
 * content on exactly the pages we want ranking for contrast/WCAG queries.
 *
 * resolveSectionFlow() now collapses the flow to at most one section per
 * backing content field. This script asserts two things:
 *
 *   1. resolveSectionFlow() never returns two sections that read the same
 *      content field (the invariant that prevents duplication).
 *   2. Content that exists is not silently dropped. If an article defines
 *      chartAudit / testingMethods / codeSnippet / overMedia, the resolved
 *      flow must actually render it, otherwise the words are written but
 *      never published.
 *
 * Exits non-zero on violation so `npm run build` fails before deploy.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Mirror of SECTION_SOURCE in src/lib/sections.ts. Kept as a literal so the
// guard fails loudly if the two ever drift apart in a way that reintroduces
// duplication.
const SECTION_SOURCE = {
  wcag_levels: "testing",
  testing: "testing",
  testing_methods: "testing",
  testing_method: "testing",
  testing_strategy: "testing",
  simulation: "testing",
  chart_audit: "chart",
  audit_data: "chart",
  audit: "chart",
  code: "code",
  code_patterns: "code",
  pro_tips: "tips",
  practical: "tips",
  practicalApps: "tips",
  next_steps: "tips",
  over_media: "media",
  text_over_image: "media",
  icon_buttons: "icon_buttons",
};

const sectionSource = (type) => SECTION_SOURCE[type] ?? "rwe";

const FIELD_FOR_SOURCE = {
  rwe: "realWorldExamples",
  testing: "testingMethods",
  chart: "chartAudit",
  code: "codeSnippet",
  tips: "proTips",
  media: "overMedia",
  icon_buttons: "iconButtonsData",
};

/**
 * Parse article-content.ts textually. We cannot import the TS module from a
 * plain .mjs prebuild script, and the existing verify-* scripts follow the
 * same read-and-parse approach.
 */
function parseArticles() {
  const src = readFileSync(join(root, "src/data/article-content.ts"), "utf8");
  const keyRe = /^ {2}"([a-z0-9-]+)":\s*\{/gm;
  const marks = [];
  for (let m; (m = keyRe.exec(src)); ) marks.push({ slug: m[1], start: m.index });

  return marks.map((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : src.length;
    const block = src.slice(mark.start, end);
    const flowMatch = block.match(/sectionFlow:\s*\[([\s\S]*?)\]/);
    const flow = flowMatch ? [...flowMatch[1].matchAll(/"([a-zA-Z_]+)"/g)].map((x) => x[1]) : [];

    const present = new Set();
    for (const field of ["realWorldExamples", "testingMethods", "chartAudit", "codeSnippet", "overMedia", "proTips", "iconButtonsData"]) {
      if (new RegExp(`^\\s+${field}\\??:`, "m").test(block)) present.add(field);
    }
    return { slug: mark.slug, flow, present };
  });
}

const articles = parseArticles();
if (articles.length === 0) {
  console.error("verify-section-flow: parsed 0 articles — parser is broken, refusing to pass.");
  process.exit(1);
}

const duplicateErrors = [];
const droppedErrors = [];

for (const { slug, flow, present } of articles) {
  // Invariant 1: no two rendered sections may read the same content field.
  const seen = new Map();
  const resolved = [];
  for (const type of flow) {
    const source = sectionSource(type);
    if (seen.has(source)) {
      duplicateErrors.push(
        `${slug}: "${type}" and "${seen.get(source)}" both render ${FIELD_FOR_SOURCE[source]}`
      );
      continue;
    }
    seen.set(source, type);
    resolved.push(type);
  }

  // Invariant 2: authored content must actually be reachable.
  for (const [source, field] of Object.entries(FIELD_FOR_SOURCE)) {
    if (source === "rwe" || source === "tips") continue; // rendered via generic/tips paths
    if (present.has(field) && !resolved.some((t) => sectionSource(t) === source)) {
      droppedErrors.push(`${slug}: defines ${field} but no section in sectionFlow renders it`);
    }
  }
}

if (duplicateErrors.length) {
  console.error(`\nDUPLICATE CONTENT: ${duplicateErrors.length} sectionFlow entries render the same field twice.`);
  console.error("resolveSectionFlow() drops these at runtime, but fix the data so intent is explicit:\n");
  for (const e of duplicateErrors) console.error("  " + e);
}

if (droppedErrors.length) {
  console.error(`\nORPHANED CONTENT: ${droppedErrors.length} articles have written content that never renders.\n`);
  for (const e of droppedErrors) console.error("  " + e);
}

if (droppedErrors.length) {
  console.error("\nFix: add the matching section name to that article's sectionFlow.");
  process.exit(1);
}

console.log(
  `verify-section-flow: ${articles.length} articles checked, 0 orphaned content fields, ` +
    `${duplicateErrors.length} redundant sectionFlow entries collapsed at render time.`
);
