import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';

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

export default function ColorAccessibilityHubPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
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

      <section className="rounded-2xl border border-slate-200 p-6 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Fast WCAG checklist before shipping</h2>
        <ul className="space-y-3 text-slate-700">
          <li>• Body text clears 4.5:1 minimum, preferably 7:1 for long reading.</li>
          <li>• Large headings clear 3:1, but thin fonts get tested like normal text.</li>
          <li>• Buttons pass in default, hover, active, disabled, and focus states.</li>
          <li>• Error messages use text, icons, and layout cues, not red alone.</li>
          <li>• Charts use labels, patterns, and safe spacing, not only hue differences.</li>
          <li>• Dark mode has its own token set instead of inverted light-mode colors.</li>
        </ul>
      </section>
    </main>
  );
}
