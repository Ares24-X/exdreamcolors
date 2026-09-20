// Section flow resolution — prevents duplicate content in rendered articles.
//
// Why this exists: article `sectionFlow` arrays use free-form section names
// (e.g. "dark_mode", "workflow", "fixing_issues"). The renderers switch on those
// names, and any name without an explicit case fell through to a default branch
// that re-rendered `realWorldExamples`. An article listing six unmapped sections
// therefore printed its entire body six times — real duplicate content that
// search engines see, and that dilutes the page for its target query.
//
// resolveSectionFlow() maps every section name to the content field it actually
// reads, drops sections whose backing field is empty, and keeps only the first
// section per field. Headings and ordering are otherwise preserved.

import type { ContentBlock } from "@/data/article-content";

/** The ContentBlock field a section renders from. */
export type SectionSource = "rwe" | "testing" | "chart" | "code" | "tips" | "media" | "icon_buttons";

/**
 * Explicit section-name -> content-field map. Any name absent from this map
 * renders from `realWorldExamples`, matching the renderers' default branch.
 */
const SECTION_SOURCE: Record<string, SectionSource> = {
  // Sections backed by `testingMethods`
  wcag_levels: "testing",
  testing: "testing",
  testing_methods: "testing",
  testing_method: "testing",
  testing_strategy: "testing",
  simulation: "testing",

  // Sections backed by `chartAudit`
  chart_audit: "chart",
  audit_data: "chart",
  audit: "chart",

  // Sections backed by `codeSnippet`
  code: "code",
  code_patterns: "code",

  // Sections backed by `proTips`
  pro_tips: "tips",
  practical: "tips",
  practicalApps: "tips",
  next_steps: "tips",

  // Sections backed by `overMedia`
  over_media: "media",
  text_over_image: "media",

  // Sections backed by `iconButtonsData`
  icon_buttons: "icon_buttons",
};

export function sectionSource(type: string): SectionSource {
  return SECTION_SOURCE[type] ?? "rwe";
}

function hasContent(source: SectionSource, content: ContentBlock): boolean {
  switch (source) {
    case "testing":
      return Boolean(content.testingMethods?.trim());
    case "chart":
      return Boolean(content.chartAudit?.trim());
    case "code":
      return Boolean(content.codeSnippet?.code?.trim());
    case "tips":
      return Boolean(content.proTips?.length);
    case "media":
      return Boolean(content.overMedia?.trim());
    case "icon_buttons":
      return Boolean(content.iconButtonsData?.trim());
    case "rwe":
    default:
      return Boolean(content.realWorldExamples?.trim());
  }
}

/**
 * Returns the section names that should actually render: at most one per
 * content field, in original order, skipping sections with no backing content.
 */
export function resolveSectionFlow(flow: string[] | undefined, content: ContentBlock): string[] {
  if (!flow?.length) return [];

  const used = new Set<SectionSource>();
  const resolved: string[] = [];

  for (const type of flow) {
    const source = sectionSource(type);
    if (used.has(source)) continue;
    if (!hasContent(source, content)) continue;
    used.add(source);
    resolved.push(type);
  }

  return resolved;
}
