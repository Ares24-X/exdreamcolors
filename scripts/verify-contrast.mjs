#!/usr/bin/env node
/**
 * verify-contrast.mjs
 *
 * Guards the site's core credibility claim: every contrast ratio printed in an
 * article table must be the real WCAG 2.x ratio for the two hex values in that row.
 *
 * Scans src/data/article-content.ts for markdown table rows that contain exactly
 * two distinct hex colors and exactly one "N.N:1" ratio cell, recomputes the ratio,
 * and reports any row where the printed value drifts from the computed value.
 *
 * Usage:
 *   node scripts/verify-contrast.mjs          # report only, exit 1 on drift
 *   node scripts/verify-contrast.mjs --fix    # rewrite printed ratios in place
 *
 * Tolerance is 0.06 to allow for legitimate rounding at one decimal place.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { globSync } from "glob";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOLERANCE = 0.06;

/**
 * Files scanned. Article bodies live in the data module; several high-traffic
 * pages hardcode their own ratio tables, so route files are scanned too.
 */
function targetFiles() {
  return [
    join(ROOT, "src/data/article-content.ts"),
    ...globSync("src/app/**/page.tsx", { cwd: ROOT, absolute: true }),
  ];
}

/** sRGB channel -> linear light. WCAG 2.x relative luminance. */
function channelToLinear(int8) {
  const c = int8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex) {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((pair) => channelToLinear(parseInt(pair, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Round the way the articles print ratios: one decimal place. */
function printOneDecimal(ratio) {
  return `${ratio.toFixed(1)}:1`;
}

const HEX = /#[0-9A-Fa-f]{6}\b/g;
const RATIO_CELL = /\b\d+(?:\.\d+)?:1/g;

/**
 * Named dark/light surfaces used in the CSS token snippets, so comments like
 * `--text-muted: #9CA3AF;  /* 5.6:1 on base *\/` can be verified too. These
 * mirror the surface stack declared in the same snippets.
 */
const NAMED_SURFACES = {
  base: "#111827",
  raised: "#1F2937",
  overlay: "#374151",
  highest: "#4B5563",
  white: "#FFFFFF",
};

const TOKEN_COMMENT = /:\s*(#[0-9A-Fa-f]{6});\s*\/\*\s*(\d+(?:\.\d+)?):1\s*on\s*(\w+)/;

/**
 * Audit wide matrix rows: one foreground hex followed by N ratio cells, where the
 * header row names the surface hex for each column. Catches per-surface token
 * tables that the single-ratio pass deliberately skips.
 */
function auditMatrixRows(source) {
  const lines = source.split("\n");
  const findings = [];
  let surfaces = null;

  lines.forEach((line, index) => {
    if ((line.match(/\|/g) || []).length < 3) {
      surfaces = null;
      return;
    }

    const cells = line.split("|").map((c) => c.trim());

    // A header row defines the surface for each column.
    const headerHexes = cells.map((c) => (c.match(HEX) || [])[0] || null);
    const namedCount = headerHexes.filter(Boolean).length;
    if (namedCount >= 2 && !/\d+(?:\.\d+)?:1/.test(line)) {
      surfaces = headerHexes;
      return;
    }
    if (!surfaces) return;

    // A data row: first cell carries the foreground token hex.
    const fg = (cells[1]?.match(HEX) || [])[0];
    if (!fg) return;

    cells.forEach((cell, col) => {
      const bg = surfaces[col];
      if (!bg) return;
      const printedRaw = (cell.match(/(\d+(?:\.\d+)?):1/) || [])[1];
      if (!printedRaw) return;

      const printed = parseFloat(printedRaw);
      const actual = contrastRatio(fg, bg);
      if (Math.abs(printed - actual) <= TOLERANCE) return;

      findings.push({
        line: index + 1,
        column: col,
        pair: `${fg} on ${bg}`,
        printed: `${printedRaw}:1`,
        corrected: printOneDecimal(actual),
        raw: line,
      });
    });
  });

  return findings;
}

/** Audit `/* N.N:1 on <surface> *\/` comments inside code snippets. */
function auditTokenComments(source) {
  const lines = source.split("\n");
  const findings = [];

  lines.forEach((line, index) => {
    const match = line.match(TOKEN_COMMENT);
    if (!match) return;

    const [, fg, printedRaw, surfaceName] = match;
    const bg = NAMED_SURFACES[surfaceName.toLowerCase()];
    if (!bg) return;

    const printed = parseFloat(printedRaw);
    const actual = contrastRatio(fg, bg);
    if (Math.abs(printed - actual) <= TOLERANCE) return;

    findings.push({
      line: index + 1,
      pair: `${fg} on ${surfaceName} (${bg})`,
      printed: `${printedRaw}:1`,
      corrected: printOneDecimal(actual),
      raw: line,
    });
  });

  return findings;
}

function auditSource(source) {
  const lines = source.split("\n");
  const findings = [];

  lines.forEach((line, index) => {
    // Only markdown table rows.
    if ((line.match(/\|/g) || []).length < 3) return;

    const hexes = [...new Set((line.match(HEX) || []).map((h) => h.toLowerCase()))];
    if (hexes.length !== 2) return;

    const ratios = line.match(RATIO_CELL) || [];
    // Exactly one printed ratio, otherwise the row mixes measured values with
    // thresholds ("3:1 required") and needs a human.
    if (ratios.length !== 1) return;

    const printed = parseFloat(ratios[0]);
    const actual = contrastRatio(hexes[0], hexes[1]);
    if (Math.abs(printed - actual) <= TOLERANCE) return;

    findings.push({
      line: index + 1,
      pair: `${hexes[0]} on ${hexes[1]}`,
      printed: ratios[0],
      corrected: printOneDecimal(actual),
      raw: line,
    });
  });

  return findings;
}

function applyFixes(source, findings) {
  const lines = source.split("\n");
  for (const finding of findings) {
    const i = finding.line - 1;

    // Matrix findings carry a column index: rewrite only that cell, because the
    // same printed ratio can legitimately appear more than once in one row.
    if (typeof finding.column === "number") {
      const cells = lines[i].split("|");
      cells[finding.column] = cells[finding.column].replace(
        finding.printed,
        finding.corrected,
      );
      lines[i] = cells.join("|");
      continue;
    }

    lines[i] = lines[i].replace(finding.printed, finding.corrected);
  }
  return lines.join("\n");
}

const shouldFix = process.argv.includes("--fix");
let totalFindings = 0;
let totalFixed = 0;

for (const file of targetFiles()) {
  const source = readFileSync(file, "utf8");
  const findings = [
    ...auditSource(source),
    ...auditTokenComments(source),
    ...auditMatrixRows(source),
  ].sort((a, b) => a.line - b.line);

  if (findings.length === 0) continue;

  totalFindings += findings.length;
  const label = relative(ROOT, file);
  console.log(`\n${label}: ${findings.length} drifting ratio(s)`);
  for (const f of findings) {
    console.log(`  line ${f.line}: ${f.pair}  printed ${f.printed} -> actual ${f.corrected}`);
  }

  if (shouldFix) {
    writeFileSync(file, applyFixes(source, findings), "utf8");
    totalFixed += findings.length;
  }
}

if (totalFindings === 0) {
  console.log("contrast audit: all printed ratios match computed values");
  process.exit(0);
}

if (shouldFix) {
  console.log(`\nrewrote ${totalFixed} ratio(s)`);
  process.exit(0);
}

console.log(`\ncontrast audit failed: ${totalFindings} drifting ratio(s)`);
console.log("run with --fix to correct these in place");
process.exit(1);
