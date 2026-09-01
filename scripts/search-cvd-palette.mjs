#!/usr/bin/env node
/**
 * search-cvd-palette.mjs
 *
 * Throwaway search harness (not wired into the build) used to derive a 6-colour
 * chart palette whose worst-case CIEDE2000 under protanopia, deuteranopia and
 * tritanopia stays above a target floor, while also keeping a usable greyscale
 * L* separation and enough contrast against both a white and a dark surface.
 *
 * Run: node scripts/search-cvd-palette.mjs
 */

import {} from "node:process";

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
const TYPES = ["normal", "protanopia", "deuteranopia", "tritanopia"];

const srgbToLinear = (c8) => {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const linearToSrgb = (l) => {
  const c = l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(c * 255)));
};
const parseHex = (h) => h.replace("#", "").match(/.{2}/g).map((p) => parseInt(p, 16));
const toHex = (arr) =>
  "#" + arr.map((v) => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();

function relLum(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) {
  const la = relLum(a), lb = relLum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
function lstar(Y) {
  return Y <= 216 / 24389 ? Y * (24389 / 27) : 116 * Math.cbrt(Y) - 16;
}
function simulate(hex, type) {
  if (type === "normal") return hex;
  const m = CVD_MATRICES[type];
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  return toHex(m.map(([a, bb, c]) => a * r + bb * g + c * b).map(linearToSrgb));
}
function hexToLab(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  const X = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const Y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const Z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const fx = f(X / 0.95047), fy = f(Y / 1.0), fz = f(Z / 1.08883);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}
function oklchL(hex) {
  const [r, g, b] = parseHex(hex).map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s) * 100;
}
function ciede2000(lab1, lab2) {
  const deg = Math.PI / 180;
  const C1 = Math.hypot(lab1.a, lab1.b), C2 = Math.hypot(lab2.a, lab2.b);
  const Cbar = (C1 + C2) / 2, Cbar7 = Math.pow(Cbar, 7);
  const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + Math.pow(25, 7))));
  const a1p = (1 + G) * lab1.a, a2p = (1 + G) * lab2.a;
  const C1p = Math.hypot(a1p, lab1.b), C2p = Math.hypot(a2p, lab2.b);
  const h1p = C1p === 0 ? 0 : ((Math.atan2(lab1.b, a1p) / deg) + 360) % 360;
  const h2p = C2p === 0 ? 0 : ((Math.atan2(lab2.b, a2p) / deg) + 360) % 360;
  const dLp = lab2.L - lab1.L, dCp = C2p - C1p;
  let dhp;
  if (C1p * C2p === 0) dhp = 0;
  else if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
  else if (h2p - h1p > 180) dhp = h2p - h1p - 360;
  else dhp = h2p - h1p + 360;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * deg) / 2);
  const Lbarp = (lab1.L + lab2.L) / 2, Cbarp = (C1p + C2p) / 2;
  let hbarp;
  if (C1p * C2p === 0) hbarp = h1p + h2p;
  else if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
  else if (h1p + h2p < 360) hbarp = (h1p + h2p + 360) / 2;
  else hbarp = (h1p + h2p - 360) / 2;
  const T = 1 - 0.17 * Math.cos((hbarp - 30) * deg) + 0.24 * Math.cos(2 * hbarp * deg)
    + 0.32 * Math.cos((3 * hbarp + 6) * deg) - 0.20 * Math.cos((4 * hbarp - 63) * deg);
  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
  const Cbarp7 = Math.pow(Cbarp, 7);
  const RC = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + Math.pow(25, 7)));
  const SL = 1 + (0.015 * Math.pow(Lbarp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbarp - 50, 2));
  const SC = 1 + 0.045 * Cbarp, SH = 1 + 0.015 * Cbarp * T;
  const RT = -Math.sin(2 * dTheta * deg) * RC;
  return Math.sqrt(Math.pow(dLp / SL, 2) + Math.pow(dCp / SC, 2) + Math.pow(dHp / SH, 2)
    + RT * (dCp / SC) * (dHp / SH));
}

/* ── OKLCH -> sRGB so we can search in perceptual space ─────────────────── */
function oklchToHex(L, C, H) {
  const l_ = L / 100;
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l = Math.pow(l_ + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(l_ - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(l_ - 0.0894841775 * a - 1.2914855480 * b, 3);
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  if (Math.min(r, g, bb) < -0.002 || Math.max(r, g, bb) > 1.002) return null; // out of gamut
  return toHex([r, g, bb].map(linearToSrgb));
}

function evaluate(hexes) {
  const labs = {};
  for (const t of TYPES) labs[t] = hexes.map((h) => hexToLab(simulate(h, t)));
  let worst = Infinity, worstInfo = null;
  const perType = {};
  for (const t of TYPES) {
    let w = Infinity;
    for (let i = 0; i < hexes.length; i++)
      for (let j = i + 1; j < hexes.length; j++) {
        const d = ciede2000(labs[t][i], labs[t][j]);
        if (d < w) w = d;
        if (d < worst) { worst = d; worstInfo = `${t} ${i + 1}-${j + 1}`; }
      }
    perType[t] = w;
  }
  const Ls = hexes.map(oklchL).sort((a, b) => a - b);
  const minOkGap = Math.min(...Ls.slice(1).map((v, i) => v - Ls[i]));
  const gs = hexes.map((h) => lstar(relLum(h))).sort((a, b) => a - b);
  const minGrayGap = Math.min(...gs.slice(1).map((v, i) => v - gs[i]));
  const minWhite = Math.min(...hexes.map((h) => ratio(h, "#FFFFFF")));
  const minDark = Math.min(...hexes.map((h) => ratio(h, "#111827")));
  return { worst, worstInfo, perType, minOkGap, minGrayGap, minWhite, minDark };
}

/* ── Search: pick 6 hues, spread OKLCH lightness in fixed bands ─────────── */
// MODE=light -> every series must clear 3:1 against #FFFFFF (SC 1.4.11)
// MODE=dark  -> every series must clear 3:1 against #111827
// MODE=free  -> no surface floor
const MODE = process.argv[2] || "free";
const SURFACE = MODE === "dark" ? "#111827" : "#FFFFFF";
const SURFACE_FLOOR = MODE === "free" ? 0 : 3.0;

// Lightness bands differ per mode: a 3:1 floor on white caps how light a series
// can be, and a 3:1 floor on a dark base caps how dark it can be.
const BANDS =
  MODE === "light"
    ? [22, 30, 38, 46, 54, 61]
    : MODE === "dark"
      ? [52, 60, 68, 76, 84, 92]
      : [38, 50, 58, 66, 74, 86];
const HUES = [];
for (let h = 0; h < 360; h += 4) HUES.push(h);

function bestChromaFor(L, H) {
  for (let C = 0.30; C >= 0.02; C -= 0.005) {
    const hex = oklchToHex(L, C, H);
    if (hex) return { hex, C };
  }
  return null;
}

// Precompute a candidate colour per (band, hue), dropping any that cannot meet
// the surface floor for this mode.
const candidates = BANDS.map((L) =>
  HUES.map((H) => {
    const r = bestChromaFor(L, H);
    if (!r) return null;
    if (SURFACE_FLOOR && ratio(r.hex, SURFACE) < SURFACE_FLOOR) return null;
    return { hex: r.hex, L, H, C: r.C };
  }).filter(Boolean)
);

if (candidates.some((band) => band.length === 0)) {
  console.error(
    `MODE=${MODE}: a lightness band has no in-gamut colour clearing ${SURFACE_FLOOR}:1 on ${SURFACE}.`
  );
  candidates.forEach((band, i) => console.error(`  band L=${BANDS[i]}: ${band.length} candidates`));
  process.exit(1);
}

let best = null;
// Randomised restart hill-climb: assign one hue per band, maximise worst-case dE.
function score(s) {
  const hexes = s.map((c) => c.hex);
  const e = evaluate(hexes);
  let sc = e.worst;
  if (SURFACE_FLOOR) {
    const minSurface = Math.min(...hexes.map((h) => ratio(h, SURFACE)));
    if (minSurface < SURFACE_FLOOR) sc -= (SURFACE_FLOOR - minSurface) * 100;
  }
  if (e.minGrayGap < 6) sc -= (6 - e.minGrayGap) * 1.5;
  return { sc, e };
}

for (let restart = 0; restart < 60; restart++) {
  let sel = candidates.map((band) => band[Math.floor(Math.random() * band.length)]);
  let cur = score(sel);
  let improved = true;
  while (improved) {
    improved = false;
    for (let b = 0; b < BANDS.length; b++) {
      for (const cand of candidates[b]) {
        const trial = sel.slice();
        trial[b] = cand;
        const s = score(trial);
        if (s.sc > cur.sc + 1e-9) {
          sel = trial;
          cur = s;
          improved = true;
        }
      }
    }
  }
  if (!best || cur.sc > best.cur.sc) best = { sel, cur };
}

const { sel, cur } = best;
console.log(`\n=== BEST 6-COLOUR CVD-SAFE PALETTE (mode=${MODE}, floor ${SURFACE_FLOOR}:1 on ${SURFACE}) ===\n`);
console.log("| # | Hex | OKLCH | Greyscale L* | vs #FFFFFF | vs #111827 |");
console.log("| ---: | --- | --- | ---: | ---: | ---: |");
sel.forEach((c, i) => {
  console.log(
    `| ${i + 1} | \`${c.hex}\` | oklch(${c.L}% ${c.C.toFixed(3)} ${c.H}) | ${lstar(relLum(c.hex)).toFixed(1)} | ${ratio(c.hex, "#FFFFFF").toFixed(2)}:1 | ${ratio(c.hex, "#111827").toFixed(2)}:1 |`
  );
});
console.log("\nWorst-case CIEDE2000:", cur.e.worst.toFixed(1), `(${cur.e.worstInfo})`);
console.log("Per type:", Object.entries(cur.e.perType).map(([k, v]) => `${k}=${v.toFixed(1)}`).join("  "));
console.log("Min OKLCH L gap:", cur.e.minOkGap.toFixed(1));
console.log("Min greyscale L* gap:", cur.e.minGrayGap.toFixed(1));
console.log("Min ratio vs white:", cur.e.minWhite.toFixed(2), " vs dark:", cur.e.minDark.toFixed(2));

// Also report the 5-colour and 4-colour truncations (drop from the top).
for (const n of [5, 4, 3]) {
  const sub = sel.slice(0, n);
  const e = evaluate(sub.map((c) => c.hex));
  console.log(`\nFirst ${n} series only -> worst CIEDE2000 ${e.worst.toFixed(1)} (${e.worstInfo})`);
}
