#!/usr/bin/env node
/**
 * verify-cvd-palette.mjs
 *
 * Guards the chart-palette claims made in the accessible-data-visualization
 * article. That page publishes a 6-colour chart palette and asserts it is
 * separable under all three dichromacies. This script proves or disproves that
 * by actually simulating the palette and measuring it.
 *
 * Pipeline per colour:
 *   sRGB -> linear RGB -> Machado 2009 CVD matrix (severity 1.0) -> sRGB
 *   sRGB -> XYZ(D65) -> CIELAB -> CIEDE2000 pairwise distance
 *   sRGB -> WCAG relative luminance -> grayscale separation
 *   sRGB -> Oklab -> OKLCH lightness (for the published "L:" annotations)
 *
 * Machado 2009 is the same model Chrome DevTools uses for
 * "Emulate vision deficiencies", so every number here is reproducible by a
 * reader in their own browser. That is the point: the article tells people to
 * verify in DevTools, so the published numbers must come from the same model.
 *
 * Usage:
 *   node scripts/verify-cvd-palette.mjs           # verify, exit 1 on drift
 *   node scripts/verify-cvd-palette.mjs --report  # print full markdown tables
 *
 * Thresholds encoded below:
 *   CIEDE2000 >= 20  -> safely distinguishable without a backup signal
 *   CIEDE2000 >= 10  -> distinguishable but wants a pattern/label backup
 *   grayscale dL     -> WCAG-luminance-derived L* gap; >= 8 survives desaturation
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ARTICLE_FILE = join(ROOT, "src/data/article-content.ts");

/* ── The published palettes. Must match the article's tables and snippet. ──
 * LIGHT_PALETTE: every series clears 3:1 on #FFFFFF (SC 1.4.11 graphical objects)
 * DARK_PALETTE:  every series clears 3:1 on #111827
 * A single palette cannot satisfy both floors at once — proven in the article.
 */
const LIGHT_PALETTE = [
  { hex: "#002024", label: "Ink Teal" },
  { hex: "#3D2A00", label: "Bronze" },
  { hex: "#2800C1", label: "Ultramarine" },
  { hex: "#00675A", label: "Pine" },
  { hex: "#866C02", label: "Olive" },
  { hex: "#028AD6", label: "Azure" },
];

const DARK_PALETTE = [
  { hex: "#0B758A", label: "Deep Cyan" },
  { hex: "#8D8307", label: "Brass" },
  { hex: "#A57AFE", label: "Periwinkle" },
  { hex: "#FE8798", label: "Rose" },
  { hex: "#D7D209", label: "Citron" },
  { hex: "#DEE3FD", label: "Pale Lilac" },
];

/* The palette this file previously guarded, kept so the regression stays visible.
 * Published across the web as "CVD-safe"; it is not. Orange/Red collapses to
 * CIEDE2000 7.5 under deuteranopia. Referenced by the article's failure table. */
const LEGACY_PALETTE = [
  { hex: "#1B4F72", label: "Deep Blue" },
  { hex: "#E67E22", label: "Orange" },
  { hex: "#27AE60", label: "Green" },
  { hex: "#8E44AD", label: "Purple" },
  { hex: "#F1C40F", label: "Yellow" },
  { hex: "#E74C3C", label: "Red" },
];

/* ── sRGB <-> linear ─────────────────────────────────────────────────────── */
function srgbToLinear(c8) {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(l) {
  const c = l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(c * 255)));
}

function parseHex(hex) {
  return hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((p) => parseInt(p, 16));
}

function toHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/* ── WCAG relative luminance (same formula as verify-contrast.mjs) ───────── */
function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Perceptual lightness of a WCAG luminance, i.e. what the eye reads after a
 * greyscale screenshot. CIE L* transfer applied to relative luminance.
 */
function luminanceToLstar(Y) {
  return Y <= 216 / 24389 ? Y * (24389 / 27) : 116 * Math.cbrt(Y) - 16;
}

/* ── Machado et al. 2009 dichromacy matrices, severity 1.0 ───────────────── */
const CVD_MATRICES = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.011820, 0.042940, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.303900],
  ],
};

function simulateCvd(hex, type) {
  if (type === "normal") return hex.toUpperCase();
  const m = CVD_MATRICES[type];
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  const out = m.map(([a, bb, c]) => a * r + bb * g + c * b);
  return toHex(out.map(linearToSrgb));
}

/* ── sRGB -> XYZ(D65) -> CIELAB ──────────────────────────────────────────── */
const D65 = { X: 0.95047, Y: 1.0, Z: 1.08883 };

function hexToLab(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  const X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const Y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const Z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const fx = f(X / D65.X);
  const fy = f(Y / D65.Y);
  const fz = f(Z / D65.Z);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

/* ── Oklab / OKLCH lightness (Ottosson) ──────────────────────────────────── */
function hexToOklchL(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  return (0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_) * 100;
}

/* ── CIEDE2000 ───────────────────────────────────────────────────────────── */
function ciede2000(lab1, lab2) {
  const kL = 1;
  const kC = 1;
  const kH = 1;
  const deg = Math.PI / 180;

  const C1 = Math.hypot(lab1.a, lab1.b);
  const C2 = Math.hypot(lab2.a, lab2.b);
  const Cbar = (C1 + C2) / 2;
  const Cbar7 = Math.pow(Cbar, 7);
  const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + Math.pow(25, 7))));

  const a1p = (1 + G) * lab1.a;
  const a2p = (1 + G) * lab2.a;
  const C1p = Math.hypot(a1p, lab1.b);
  const C2p = Math.hypot(a2p, lab2.b);

  const h1p = C1p === 0 ? 0 : ((Math.atan2(lab1.b, a1p) / deg) + 360) % 360;
  const h2p = C2p === 0 ? 0 : ((Math.atan2(lab2.b, a2p) / deg) + 360) % 360;

  const dLp = lab2.L - lab1.L;
  const dCp = C2p - C1p;

  let dhp;
  if (C1p * C2p === 0) dhp = 0;
  else if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
  else if (h2p - h1p > 180) dhp = h2p - h1p - 360;
  else dhp = h2p - h1p + 360;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * deg) / 2);

  const Lbarp = (lab1.L + lab2.L) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp;
  if (C1p * C2p === 0) hbarp = h1p + h2p;
  else if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
  else if (h1p + h2p < 360) hbarp = (h1p + h2p + 360) / 2;
  else hbarp = (h1p + h2p - 360) / 2;

  const T =
    1 -
    0.17 * Math.cos((hbarp - 30) * deg) +
    0.24 * Math.cos(2 * hbarp * deg) +
    0.32 * Math.cos((3 * hbarp + 6) * deg) -
    0.20 * Math.cos((4 * hbarp - 63) * deg);

  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
  const Cbarp7 = Math.pow(Cbarp, 7);
  const RC = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + Math.pow(25, 7)));
  const SL =
    1 + (0.015 * Math.pow(Lbarp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbarp - 50, 2));
  const SC = 1 + 0.045 * Cbarp;
  const SH = 1 + 0.015 * Cbarp * T;
  const RT = -Math.sin(2 * dTheta * deg) * RC;

  return Math.sqrt(
    Math.pow(dLp / (kL * SL), 2) +
      Math.pow(dCp / (kC * SC), 2) +
      Math.pow(dHp / (kH * SH), 2) +
      RT * (dCp / (kC * SC)) * (dHp / (kH * SH))
  );
}

/* ── Analysis ────────────────────────────────────────────────────────────── */
const CVD_TYPES = ["normal", "protanopia", "deuteranopia", "tritanopia"];

function pairwise(items) {
  const out = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) out.push([items[i], items[j], i + 1, j + 1]);
  }
  return out;
}

function analyse(palette) {
  const rows = [];
  for (const type of CVD_TYPES) {
    for (const [a, b, ia, ib] of pairwise(palette)) {
      const sa = simulateCvd(a.hex, type);
      const sb = simulateCvd(b.hex, type);
      rows.push({
        type,
        pair: `${ia}-${ib}`,
        labels: `${a.label} / ${b.label}`,
        de: ciede2000(hexToLab(sa), hexToLab(sb)),
      });
    }
  }
  return rows;
}

function worstPerType(rows) {
  const out = {};
  for (const type of CVD_TYPES) {
    const subset = rows.filter((r) => r.type === type).sort((a, b) => a.de - b.de);
    out[type] = subset[0];
  }
  return out;
}

/** Worst-case CIEDE2000 across the three dichromacies (excludes normal vision). */
function worstCvd(palette) {
  const rows = analyse(palette).filter((r) => r.type !== "normal");
  return rows.reduce((m, r) => (r.de < m.de ? r : m), rows[0]);
}

function minOklchGap(palette) {
  const Ls = palette.map((c) => hexToOklchL(c.hex)).sort((a, b) => a - b);
  return Math.min(...Ls.slice(1).map((v, i) => v - Ls[i]));
}

function minGrayGap(palette) {
  const gs = palette
    .map((c) => luminanceToLstar(relativeLuminance(c.hex)))
    .sort((a, b) => a - b);
  return Math.min(...gs.slice(1).map((v, i) => v - gs[i]));
}

function minRatioAgainst(palette, surface) {
  return Math.min(...palette.map((c) => contrastRatio(c.hex, surface)));
}

/* ── Reporting ───────────────────────────────────────────────────────────── */
function reportOne(name, palette) {
  console.log(`\n\n========== ${name} ==========`);
  console.log("\n### Palette measurements (computed)\n");
  console.log("| # | Label | Hex | OKLCH L% | Greyscale L* | Ratio vs #FFFFFF | Ratio vs #111827 |");
  console.log("| ---: | --- | --- | ---: | ---: | ---: | ---: |");
  palette.forEach((c, i) => {
    const Y = relativeLuminance(c.hex);
    console.log(
      `| ${i + 1} | ${c.label} | \`${c.hex}\` | ${hexToOklchL(c.hex).toFixed(1)} | ${luminanceToLstar(Y).toFixed(1)} | ${contrastRatio(c.hex, "#FFFFFF").toFixed(2)}:1 | ${contrastRatio(c.hex, "#111827").toFixed(2)}:1 |`
    );
  });

  const Ls = palette.map((c) => hexToOklchL(c.hex)).sort((a, b) => a - b);
  console.log(`\nOKLCH L% sorted: ${Ls.map((v) => v.toFixed(1)).join(", ")}`);
  console.log(`  min adjacent OKLCH L gap: ${minOklchGap(palette).toFixed(1)}`);
  console.log(`  min adjacent greyscale L* gap: ${minGrayGap(palette).toFixed(1)}`);
  console.log(`  min ratio vs #FFFFFF: ${minRatioAgainst(palette, "#FFFFFF").toFixed(2)}:1`);
  console.log(`  min ratio vs #111827: ${minRatioAgainst(palette, "#111827").toFixed(2)}:1`);

  const rows = analyse(palette);
  console.log("\n### Simulated hexes per CVD type\n");
  console.log("| # | Label | Normal | Protanopia | Deuteranopia | Tritanopia |");
  console.log("| ---: | --- | --- | --- | --- | --- |");
  palette.forEach((c, i) => {
    console.log(
      `| ${i + 1} | ${c.label} | \`${c.hex}\` | \`${simulateCvd(c.hex, "protanopia")}\` | \`${simulateCvd(c.hex, "deuteranopia")}\` | \`${simulateCvd(c.hex, "tritanopia")}\` |`
    );
  });

  console.log("\n### CIEDE2000 pairwise distances (15 pairs x 4 vision models)\n");
  console.log("| Pair | Series | Normal | Protanopia | Deuteranopia | Tritanopia | Worst CVD |");
  console.log("| --- | --- | ---: | ---: | ---: | ---: | ---: |");
  for (const [a, b, ia, ib] of pairwise(palette)) {
    const vals = CVD_TYPES.map(
      (t) => rows.find((r) => r.type === t && r.pair === `${ia}-${ib}`).de
    );
    console.log(
      `| ${ia}-${ib} | ${a.label} / ${b.label} | ${vals.map((v) => v.toFixed(1)).join(" | ")} | ${Math.min(...vals.slice(1)).toFixed(1)} |`
    );
  }

  console.log("\n### Worst pair per vision model\n");
  const worst = worstPerType(rows);
  console.log("| Vision model | Closest pair | CIEDE2000 | Verdict |");
  console.log("| --- | --- | ---: | --- |");
  for (const type of CVD_TYPES) {
    const w = worst[type];
    const verdict = w.de >= 20 ? "separable unaided" : w.de >= 10 ? "needs backup signal" : "FAIL";
    console.log(`| ${type} | ${w.labels} | ${w.de.toFixed(1)} | ${verdict} |`);
  }
}

function reportPalette() {
  reportOne("LIGHT-SURFACE PALETTE (3:1 floor on #FFFFFF)", LIGHT_PALETTE);
  reportOne("DARK-SURFACE PALETTE (3:1 floor on #111827)", DARK_PALETTE);
  reportOne("LEGACY PALETTE (widely published, fails)", LEGACY_PALETTE);

  console.log("\n\n========== CROSS-SURFACE IMPOSSIBILITY ==========\n");
  console.log("| Palette | Worst CVD CIEDE2000 | Min ratio vs #FFFFFF | Min ratio vs #111827 | Serves both surfaces? |");
  console.log("| --- | ---: | ---: | ---: | --- |");
  for (const [name, p] of [
    ["Light-surface", LIGHT_PALETTE],
    ["Dark-surface", DARK_PALETTE],
    ["Legacy", LEGACY_PALETTE],
  ]) {
    const w = worstCvd(p);
    const mw = minRatioAgainst(p, "#FFFFFF");
    const md = minRatioAgainst(p, "#111827");
    console.log(
      `| ${name} | ${w.de.toFixed(1)} | ${mw.toFixed(2)}:1 | ${md.toFixed(2)}:1 | ${mw >= 3 && md >= 3 ? "yes" : "no"} |`
    );
  }
  console.log("");
}

/* ── Guard: article claims must match computed reality ───────────────────── */
function verify() {
  const src = readFileSync(ARTICLE_FILE, "utf8");
  const problems = [];

  // 1. Every published palette hex must still appear in the article.
  for (const [name, palette] of [
    ["light", LIGHT_PALETTE],
    ["dark", DARK_PALETTE],
  ]) {
    for (const c of palette) {
      if (!src.includes(c.hex)) {
        problems.push(`${name} palette hex ${c.hex} (${c.label}) is missing from article-content.ts`);
      }
    }
  }

  // 2. Any "oklch(NN% ...)" annotation printed next to a palette hex must match
  //    the real OKLCH lightness of that hex.
  for (const c of [...LIGHT_PALETTE, ...DARK_PALETTE]) {
    const re = new RegExp(`${c.hex}[^\\n]*?oklch\\((\\d+(?:\\.\\d+)?)%`, "i");
    const m = src.match(re);
    if (m) {
      const printed = parseFloat(m[1]);
      const actual = hexToOklchL(c.hex);
      if (Math.abs(printed - actual) > 1.5) {
        problems.push(
          `${c.hex} (${c.label}) prints oklch(${printed}% ...) but real OKLCH L is ${actual.toFixed(1)}%`
        );
      }
    }
  }

  // 3. Published worst-case CIEDE2000 floors must actually hold.
  const lightWorst = worstCvd(LIGHT_PALETTE);
  const darkWorst = worstCvd(DARK_PALETTE);
  const legacyWorst = worstCvd(LEGACY_PALETTE);

  const floorClaims = [
    ...src.matchAll(/worst-case (?:CIEDE2000|ΔE)[^.\n]*?(\d+(?:\.\d+)?)/gi),
  ].map((m) => parseFloat(m[1]));
  const trueFloor = Math.min(lightWorst.de, darkWorst.de);
  for (const printed of floorClaims) {
    // A claim may legitimately reference the legacy failure figure.
    if (Math.abs(printed - legacyWorst.de) < 0.5) continue;
    if (printed > trueFloor + 0.5) {
      problems.push(
        `article claims a worst-case CIEDE2000 of ${printed} but the published palettes bottom out at ${trueFloor.toFixed(1)}`
      );
    }
  }

  // 4. SC 1.4.11 floor: each palette must clear 3:1 on the surface it is sold for.
  const lightOnWhite = minRatioAgainst(LIGHT_PALETTE, "#FFFFFF");
  if (lightOnWhite < 3) {
    problems.push(
      `light-surface palette drops to ${lightOnWhite.toFixed(2)}:1 on #FFFFFF, below the 3:1 SC 1.4.11 floor`
    );
  }
  const darkOnDark = minRatioAgainst(DARK_PALETTE, "#111827");
  if (darkOnDark < 3) {
    problems.push(
      `dark-surface palette drops to ${darkOnDark.toFixed(2)}:1 on #111827, below the 3:1 SC 1.4.11 floor`
    );
  }

  // 5. The cross-surface impossibility claim must remain true: neither published
  //    palette may clear 3:1 on both surfaces at once. If a future edit makes one
  //    do so, the article's central argument is wrong and must be rewritten.
  for (const [name, palette] of [
    ["light-surface", LIGHT_PALETTE],
    ["dark-surface", DARK_PALETTE],
  ]) {
    if (
      minRatioAgainst(palette, "#FFFFFF") >= 3 &&
      minRatioAgainst(palette, "#111827") >= 3
    ) {
      problems.push(
        `${name} palette now clears 3:1 on BOTH surfaces, which contradicts the article's dual-palette argument`
      );
    }
  }

  // 6. The legacy palette must still fail, since the article's premise is that it does.
  if (legacyWorst.de >= 10) {
    problems.push(
      `legacy palette now scores ${legacyWorst.de.toFixed(1)}; the article presents it as a failure below 10`
    );
  }

  if (problems.length) {
    console.error("\nverify-cvd-palette: FAIL\n");
    problems.forEach((p) => console.error(`  - ${p}`));
    console.error(
      "\nRun `node scripts/verify-cvd-palette.mjs --report` to see the computed values.\n"
    );
    process.exit(1);
  }

  console.log(
    `verify-cvd-palette: OK - light floor ${lightWorst.de.toFixed(1)} (${lightWorst.type} ${lightWorst.pair}), ` +
      `dark floor ${darkWorst.de.toFixed(1)} (${darkWorst.type} ${darkWorst.pair}), ` +
      `legacy ${legacyWorst.de.toFixed(1)}, ` +
      `light on white ${lightOnWhite.toFixed(2)}:1, dark on base ${darkOnDark.toFixed(2)}:1`
  );
}

if (process.argv.includes("--report")) reportPalette();
else verify();
