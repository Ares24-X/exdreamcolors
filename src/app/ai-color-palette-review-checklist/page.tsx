import Link from "next/link";
import { articleContent } from "@/data/article-content";

const content = articleContent["ai-color-palette-review-checklist"];

export const metadata = {
  title: "AI Color Palette Review Checklist | ExDreamColors",
  description: "Review AI-generated color palettes for contrast, roles, dark mode, brand fit, and production-ready design systems.",
};

export default function AiColorPaletteReviewChecklistPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-500 mb-6"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/blog">Blog</Link><span className="mx-2">/</span><span>AI Color Palette Review</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">AI Color Palette Review Checklist</h1>
      <p className="text-sm text-slate-500 mb-10">Updated 2026-06-14 · 8 min read</p>
      <section className="text-lg leading-relaxed text-slate-700 mb-10">{content.intro.split("\n\n").map((paragraph, index) => (<p key={index} className={index ? "mt-4" : ""}>{paragraph}</p>))}</section>
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10"><h2 className="text-xl font-bold text-slate-900 mb-3">Fast Review Order</h2><ol className="list-decimal pl-5 space-y-2 text-slate-700"><li>Assign each color a real interface job.</li><li>Check foreground and background contrast pairs.</li><li>Test grayscale, dark mode, and chart use.</li><li>Write one short note for every risky color.</li></ol></section>
      <section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">Where AI Palettes Usually Break</h2><div className="prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: content.realWorldExamples.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>") }} /></section>
      <section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">Checklist</h2><ul className="space-y-3">{content.proTips.map((tip, index) => (<li key={index} className="flex gap-3 text-slate-700"><span className="text-blue-500 font-bold">▸</span><span>{tip}</span></li>))}</ul></section>
      {content.codeSnippet && (<section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">{content.codeSnippet.label}</h2><pre className="bg-slate-900 text-slate-100 p-5 rounded-xl overflow-x-auto text-sm"><code>{content.codeSnippet.code}</code></pre></section>)}
      <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><h2 className="text-xl font-bold text-slate-900 mb-3">Try It Yourself</h2><p className="text-slate-600 mb-4">Generate, test, and tune palettes with ExDreamColors tools.</p><div className="flex flex-wrap gap-3"><Link href="/palette-generator" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Palette Generator</Link><Link href="/contrast-checker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Contrast Checker</Link><Link href="/color-picker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Color Picker</Link></div></section>
    </main>
  );
}
