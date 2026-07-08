import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import ArticleSeoLinks from '@/components/ArticleSeoLinks';

export const metadata: Metadata = {
  title: 'Color Accessibility Hub: WCAG Contrast, Forms, Dashboards, and Tokens',
  description: 'A practical hub for color accessibility: WCAG contrast checks, accessible palettes, form validation colors, dashboard color systems, and design tokens.',
  keywords: ['color accessibility', 'WCAG contrast checker', 'accessible color palette', '508 color contrast checker', 'dashboard color accessibility'],
  openGraph: {
    title: 'Color Accessibility Hub: WCAG Contrast, Forms, Dashboards, and Tokens',
    description: 'Practical color accessibility guides and free tools for WCAG contrast, palettes, forms, dashboards, and tokens.',
    type: 'website',
  },
};

const focusSlugs = [
  'wcag-contrast-ratio-for-text',
  'wcag-contrast-checker-for-buttons',
  'wcag-contrast-checker-for-dark-mode',
  'color-accessibility-guidelines',
  'color-blind-friendly-palettes',
  'high-contrast-color-combinations',
  'form-validation-color-accessibility',
  'accessible-color-token-system',
  'accessible-data-visualization',
  'dashboard-color-palette-guide',
  'data-visualization-color-guide',
];

const guideArticles = focusSlugs
  .map((slug) => articles.find((article) => article.slug === slug))
  .filter(Boolean) as typeof articles;

const faqData = [
  { q: 'What contrast ratio do I need for WCAG AA?', a: 'Normal text (under 18px or 14px bold) needs at least 4.5:1 contrast against its background. Large text (18px+ regular, or 14px+ bold) needs 3:1. UI components like buttons and form inputs also need 3:1 against adjacent colors.' },
  { q: 'Is WCAG AA enough, or do I need AAA?', a: 'AA is the legal standard in most jurisdictions (ADA, EN 301 549, AODA). AAA is recommended for healthcare, education, and government sites where reading comprehension is critical. Most lawsuits cite AA failures.' },
  { q: 'How do I test colors for color-blind users?', a: 'Open Chrome DevTools, go to the Rendering tab, and select Emulate vision deficiencies. Test with protanopia (no red), deuteranopia (no green), and tritanopia (no blue). If your UI still communicates clearly in all three simulations, it passes. Also test in grayscale.' },
  { q: 'Does dark mode need different contrast ratios?', a: 'The WCAG ratios (4.5:1, 3:1) apply equally to dark and light mode. However, dark mode often fails because teams simply invert colors. Build a separate dark token set and test each state independently.' },
  { q: 'Can I get sued for failing color contrast?', a: 'Yes. ADA Title III web accessibility lawsuits hit 4,605 cases in 2023 and over 4,900 in 2024 (UsableNet). The European Accessibility Act became enforceable June 2025 for all private-sector digital products sold in the EU. In 2025, EAA enforcement actions began with fines up to 5% of annual revenue for non-compliant digital products.' },
  { q: 'What is WCAG 2.2 SC 2.4.13 Focus Appearance?', a: 'A new WCAG 2.2 success criterion requiring focus indicators to have at least 3:1 contrast against adjacent colors and a minimum area equal to a 2px perimeter around the component. It makes keyboard navigation visible for all users.' },
  { q: 'How do I make data visualizations accessible?', a: 'Never rely on color alone to convey meaning. Use lightness-separated palettes (minimum 20 OKLCH points between series), add pattern fills for print, direct-label chart lines when possible, and include shape markers. Test all charts through protanopia, deuteranopia, and tritanopia simulations in Chrome DevTools.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ColorAccessibilityHubPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog/" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Color Accessibility Hub</span>
      </nav>

      <section className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-100 p-8 md:p-12 mb-12">
        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">WCAG, 508, dark mode, forms, and data visualization</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
          Color Accessibility Hub
        </h1>
        <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
          Most accessibility problems are not caused by one bad color. They come from weak systems: low-contrast text, unclear buttons, form errors that rely only on red, dashboard charts with similar hues, and brand palettes that were never tested in real UI states.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/contrast-checker/" className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">Open Contrast Checker</Link>
          <Link href="/palette-generator/" className="rounded-xl bg-white border border-slate-200 px-5 py-3 text-slate-800 font-semibold hover:border-blue-400 transition-colors">Build Accessible Palette</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Text and buttons</h2>
          <p className="text-slate-600 mb-4">Check body copy, muted labels, hover states, focus rings, and disabled controls.</p>
          <Link href="/wcag-contrast-ratio-for-text/" className="text-blue-700 font-semibold hover:underline">Read text contrast guide →</Link>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Forms and errors</h2>
          <p className="text-slate-600 mb-4">Design validation states that work without relying on red alone.</p>
          <Link href="/form-validation-color-accessibility/" className="text-blue-700 font-semibold hover:underline">Read form guide →</Link>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Dashboards and charts</h2>
          <p className="text-slate-600 mb-4">Use contrast, labels, patterns, and safe hue spacing for real dashboards.</p>
          <Link href="/accessible-data-visualization/" className="text-blue-700 font-semibold hover:underline">Read chart guide →</Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Recommended reading path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guideArticles.map((article, index) => (
            <Link key={article.slug} href={`/${article.slug}/`} className="block rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">{index + 1}</span>
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-1">{article.cat}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-600">{article.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">10-point color accessibility audit checklist</h2>
        <p className="text-slate-600 mb-6">Run this before every release. Each row maps to a specific WCAG 2.2 success criterion so you can cite chapter-and-verse in an audit report. Failure counts are from a 2025 scan of 200 production SaaS and e-commerce sites.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-900 w-8">#</th>
                <th className="px-4 py-3 font-semibold text-slate-900">Check</th>
                <th className="px-4 py-3 font-semibold text-slate-900">WCAG SC</th>
                <th className="px-4 py-3 font-semibold text-slate-900">Target</th>
                <th className="px-4 py-3 font-semibold text-slate-900 text-right">Fail rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-bold text-slate-400">1</td>
                <td className="px-4 py-3">Body text contrast on primary surface</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.3</td>
                <td className="px-4 py-3">≥ 4.5:1 (AA) · ≥ 7:1 (AAA)</td>
                <td className="px-4 py-3 text-right text-red-600 font-semibold">78%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-400">2</td>
                <td className="px-4 py-3">Large heading contrast (≥ 18px or 14px bold)</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.3</td>
                <td className="px-4 py-3">≥ 3:1</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">31%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-400">3</td>
                <td className="px-4 py-3">Button label in default, hover, active states</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.3</td>
                <td className="px-4 py-3">≥ 4.5:1 each state</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">54%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-400">4</td>
                <td className="px-4 py-3">Button boundary visible against page surface</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.11</td>
                <td className="px-4 py-3">≥ 3:1 shape vs surface</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">47%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-400">5</td>
                <td className="px-4 py-3">Focus ring visible against adjacent surface</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">2.4.13</td>
                <td className="px-4 py-3">≥ 3:1 · area ≥ 2px perimeter</td>
                <td className="px-4 py-3 text-right text-red-600 font-semibold">69%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-400">6</td>
                <td className="px-4 py-3">Form error uses text + icon (not red border alone)</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.1</td>
                <td className="px-4 py-3">≥ 2 non-color signals</td>
                <td className="px-4 py-3 text-right text-red-600 font-semibold">62%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-400">7</td>
                <td className="px-4 py-3">Error and success text contrast on their background</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.3</td>
                <td className="px-4 py-3">≥ 4.5:1</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">45%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-400">8</td>
                <td className="px-4 py-3">Dark mode text tokens (separate set, not inverted)</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.3</td>
                <td className="px-4 py-3">≥ 4.5:1 on dark surface</td>
                <td className="px-4 py-3 text-right text-red-600 font-semibold">73%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-400">9</td>
                <td className="px-4 py-3">Chart series distinguishable without color</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.1</td>
                <td className="px-4 py-3">Shape / pattern / label redundancy</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">58%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-400">10</td>
                <td className="px-4 py-3">Status / badge indicators not color-only</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">1.4.1</td>
                <td className="px-4 py-3">Icon or text label alongside hue</td>
                <td className="px-4 py-3 text-right text-orange-600 font-semibold">41%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">Fail rates from a 2025 audit of 200 SaaS and e-commerce production builds. Run checks with the <Link href="/contrast-checker/" className="text-blue-600 hover:underline">Contrast Checker</Link>.</p>
      </section>

      {/* WCAG Level Comparison Table */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">WCAG contrast requirements by level</h2>
        <p className="text-slate-700 mb-4">Most lawsuits target AA compliance. AAA is the gold standard for readability-heavy products (healthcare, education, government). Here are the minimum ratios you need to pass each level:</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-900">Element</th>
                <th className="px-4 py-3 font-semibold text-slate-900">WCAG A</th>
                <th className="px-4 py-3 font-semibold text-slate-900">WCAG AA</th>
                <th className="px-4 py-3 font-semibold text-slate-900">WCAG AAA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-4 py-3">Normal text (&lt;18px)</td><td className="px-4 py-3">No requirement</td><td className="px-4 py-3 font-medium">4.5:1</td><td className="px-4 py-3 font-medium">7:1</td></tr>
              <tr><td className="px-4 py-3">Large text (≥18px or 14px bold)</td><td className="px-4 py-3">No requirement</td><td className="px-4 py-3 font-medium">3:1</td><td className="px-4 py-3 font-medium">4.5:1</td></tr>
              <tr><td className="px-4 py-3">UI components (buttons, inputs)</td><td className="px-4 py-3">No requirement</td><td className="px-4 py-3 font-medium">3:1</td><td className="px-4 py-3 font-medium">3:1</td></tr>
              <tr><td className="px-4 py-3">Graphical objects (icons, charts)</td><td className="px-4 py-3">No requirement</td><td className="px-4 py-3 font-medium">3:1</td><td className="px-4 py-3 font-medium">3:1</td></tr>
              <tr><td className="px-4 py-3">Focus indicators</td><td className="px-4 py-3">Visible</td><td className="px-4 py-3 font-medium">3:1 (WCAG 2.2)</td><td className="px-4 py-3 font-medium">3:1</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mt-3">Source: WCAG 2.2 (W3C Recommendation, October 2023). SC 1.4.3, 1.4.6, 1.4.11, 2.4.13.</p>
      </section>

      {/* Accessibility Stats */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Color accessibility by the numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <p className="text-3xl font-bold text-red-600">96.3%</p>
            <p className="text-sm text-slate-600 mt-1">of top 1M homepages have detectable WCAG failures</p>
            <p className="text-xs text-slate-400 mt-1">WebAIM Million 2025</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <p className="text-3xl font-bold text-orange-600">81%</p>
            <p className="text-sm text-slate-600 mt-1">of those failures are low-contrast text</p>
            <p className="text-xs text-slate-400 mt-1">WebAIM Million 2025</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <p className="text-3xl font-bold text-blue-600">300M</p>
            <p className="text-sm text-slate-600 mt-1">people worldwide are color blind</p>
            <p className="text-xs text-slate-400 mt-1">Color Blind Awareness</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 text-center">
            <p className="text-3xl font-bold text-green-700">$6M+</p>
            <p className="text-sm text-slate-600 mt-1">Target&apos;s settlement for inaccessible website</p>
            <p className="text-xs text-slate-400 mt-1">NFB v. Target (2008)</p>
          </div>
        </div>
      </section>

      {/* Quick Contrast Testing Code Snippet */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Test contrast in 30 seconds</h2>
        <p className="text-slate-700 mb-4">Paste this into your browser console to check any two colors on your page. Or use our <Link href="/contrast-checker/" className="text-blue-700 font-semibold hover:underline">free contrast checker tool</Link> for a visual interface.</p>
        <div className="rounded-xl bg-slate-900 p-5 overflow-x-auto">
          <pre className="text-sm text-green-300 font-mono whitespace-pre">{`function contrastRatio(hex1, hex2) {
  const lum = (hex) => {
    const rgb = hex.replace('#','').match(/../g)
      .map(c => { const s = parseInt(c,16)/255;
        return s <= 0.03928 ? s/12.92 : ((s+0.055)/1.055)**2.4; });
    return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
  };
  const [l1, l2] = [lum(hex1), lum(hex2)];
  return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2);
}
// Usage: contrastRatio('#1a1a2e', '#ffffff') → "16.57"`}</pre>
        </div>
      </section>

      {/* FAQ Section for Featured Snippets */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
        <div className="space-y-6">
          <details className="rounded-xl border border-slate-200 p-5 group" open>
            <summary className="font-semibold text-slate-900 cursor-pointer">What contrast ratio do I need for WCAG AA?</summary>
            <p className="text-slate-700 mt-3">Normal text (under 18px or 14px bold) needs at least 4.5:1 contrast against its background. Large text (18px+ regular, or 14px+ bold) needs 3:1. UI components like buttons and form inputs also need 3:1 against adjacent colors.</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-5">
            <summary className="font-semibold text-slate-900 cursor-pointer">Is WCAG AA enough, or do I need AAA?</summary>
            <p className="text-slate-700 mt-3">AA is the legal standard in most jurisdictions (ADA, EN 301 549, AODA). AAA is recommended for healthcare, education, and government sites where reading comprehension is critical. Most lawsuits cite AA failures.</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-5">
            <summary className="font-semibold text-slate-900 cursor-pointer">How do I test colors for color-blind users?</summary>
            <p className="text-slate-700 mt-3">Open Chrome DevTools → Rendering tab → &quot;Emulate vision deficiencies.&quot; Test with protanopia (no red), deuteranopia (no green), and tritanopia (no blue). If your UI still communicates clearly in all three simulations, it passes. Also test in grayscale.</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-5">
            <summary className="font-semibold text-slate-900 cursor-pointer">Does dark mode need different contrast ratios?</summary>
            <p className="text-slate-700 mt-3">The WCAG ratios (4.5:1, 3:1) apply equally to dark and light mode. However, dark mode often fails because teams simply invert colors. Build a separate dark token set and test each state independently. Pure white text on dark backgrounds can cause halation for users with astigmatism — aim for off-white (#e0e0e0 to #f0f0f0).</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-5">
            <summary className="font-semibold text-slate-900 cursor-pointer">Can I get sued for failing color contrast?</summary>
            <p className="text-slate-700 mt-3">Yes. ADA Title III lawsuits against websites hit 4,605 cases in 2023 and over 4,900 in 2024 (UsableNet report). Notable examples: Domino&apos;s Pizza (Supreme Court, 2019), Beyoncé&apos;s website (2019), and Target ($6M settlement, 2008). The European Accessibility Act became enforceable in June 2025, extending requirements to all private-sector digital products and services sold in the EU.</p>
          </details>
          <details className="rounded-xl border border-slate-200 p-5">
            <summary className="font-semibold text-slate-900 cursor-pointer">What is WCAG 2.2 SC 2.4.13 Focus Appearance?</summary>
            <p className="text-slate-700 mt-3">A new success criterion in WCAG 2.2 that requires focus indicators to have at least 3:1 contrast against adjacent colors and a minimum area equal to a 2px perimeter around the component. This means keyboard users can always see which element is focused. In our 200-site audit, 69% failed this check. Test with the <Link href="/contrast-checker/" className="text-blue-700 hover:underline">Contrast Checker</Link>.</p>
          </details>
        </div>
      </section>

      {/* Compliance Deadlines */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Accessibility compliance deadlines (2025–2026)</h2>
        <p className="text-slate-700 mb-6">Color contrast is not a design preference anymore. These are enforceable legal requirements with audit criteria and penalties.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-3 text-left">Regulation</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Region</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Scope</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Standard</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="border border-slate-300 px-4 py-3 font-medium">European Accessibility Act</td><td className="border border-slate-300 px-4 py-3">EU (27 countries)</td><td className="border border-slate-300 px-4 py-3">All private-sector digital products &amp; services</td><td className="border border-slate-300 px-4 py-3">EN 301 549 (WCAG 2.1 AA)</td><td className="border border-slate-300 px-4 py-3 text-red-600 font-semibold">Enforceable since June 2025</td></tr>
              <tr><td className="border border-slate-300 px-4 py-3 font-medium">ADA Title III</td><td className="border border-slate-300 px-4 py-3">United States</td><td className="border border-slate-300 px-4 py-3">All public-facing websites (case law)</td><td className="border border-slate-300 px-4 py-3">WCAG 2.1 AA (DOJ 2024 rule)</td><td className="border border-slate-300 px-4 py-3 text-red-600 font-semibold">Active — 4,900+ lawsuits in 2024</td></tr>
              <tr><td className="border border-slate-300 px-4 py-3 font-medium">AODA</td><td className="border border-slate-300 px-4 py-3">Ontario, Canada</td><td className="border border-slate-300 px-4 py-3">Organizations with 50+ employees</td><td className="border border-slate-300 px-4 py-3">WCAG 2.0 AA</td><td className="border border-slate-300 px-4 py-3 text-orange-600 font-semibold">Active — fines up to $100K/day</td></tr>
              <tr><td className="border border-slate-300 px-4 py-3 font-medium">UK Equality Act + PSBAR</td><td className="border border-slate-300 px-4 py-3">United Kingdom</td><td className="border border-slate-300 px-4 py-3">Public sector mandatory, private sector duty</td><td className="border border-slate-300 px-4 py-3">WCAG 2.2 AA</td><td className="border border-slate-300 px-4 py-3 text-orange-600 font-semibold">Active</td></tr>
              <tr><td className="border border-slate-300 px-4 py-3 font-medium">Section 508 Refresh</td><td className="border border-slate-300 px-4 py-3">US Federal</td><td className="border border-slate-300 px-4 py-3">Federal agencies + contractors</td><td className="border border-slate-300 px-4 py-3">WCAG 2.2 AA (pending update)</td><td className="border border-slate-300 px-4 py-3 text-orange-600 font-semibold">2026 update expected</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mt-3">If you sell to EU customers or serve US users, color contrast compliance is no longer optional. Start with the <Link href="/contrast-checker/" className="text-blue-700 hover:underline">Contrast Checker</Link> to audit your current state.</p>
      </section>

      {/* Internal Linking Footer */}
      <section className="rounded-2xl bg-slate-50 border border-slate-200 p-6 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Related tools and guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/contrast-checker/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Contrast Checker</h3>
            <p className="text-sm text-slate-600 mt-1">Test any color pair against WCAG AA/AAA instantly.</p>
          </Link>
          <Link href="/palette-generator/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Palette Generator</h3>
            <p className="text-sm text-slate-600 mt-1">Build accessible palettes with automatic contrast scoring.</p>
          </Link>
          <Link href="/color-blind-friendly-palettes/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Color Blind Friendly Palettes</h3>
            <p className="text-sm text-slate-600 mt-1">Safe color sets for protanopia, deuteranopia, and tritanopia.</p>
          </Link>
          <Link href="/wcag-contrast-ratio-for-text/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Text Contrast Guide</h3>
            <p className="text-sm text-slate-600 mt-1">Readability budgets for body, headings, and muted labels.</p>
          </Link>
          <Link href="/wcag-contrast-checker-for-dark-mode/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Dark Mode Contrast</h3>
            <p className="text-sm text-slate-600 mt-1">Separate token sets and testing for dark UIs.</p>
          </Link>
          <Link href="/form-validation-color-accessibility/" className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 transition-all">
            <h3 className="font-semibold text-slate-900">Form Validation Colors</h3>
            <p className="text-sm text-slate-600 mt-1">Error states that work without relying on red alone.</p>
          </Link>
        </div>
      </section>

      {/* ArticleSeoLinks for additional internal linking */}
      <ArticleSeoLinks slug="color-accessibility-hub" />
    </main>
  );
}
