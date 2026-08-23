import Link from "next/link";
import { articleContent } from "@/data/article-content";
import { articleDatabase } from "@/data/article-database";
import { renderMarkdown, renderInlineMarkdown, renderTipMarkdown } from "@/lib/markdown";

const article = articleDatabase["ui-color-hierarchy-guide"];
const content = articleContent["ui-color-hierarchy-guide"];

export const metadata = {
  title: `${article.title} | ExDreamColors`,
  description: article.description,
};

export default function UiColorHierarchyGuidePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-500 mb-6"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/blog">Blog</Link><span className="mx-2">/</span><span>{article.title}</span></nav>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{article.title}</h1>
      <p className="text-sm text-slate-500 mb-10">Updated 2026-06-16 · 8 min read</p>
      <section className="text-lg leading-relaxed text-slate-700 mb-10">{content.intro.split("\n\n").map((paragraph, index) => (<p key={index} className={index ? "mt-4" : ""} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(paragraph) }} />))}</section>
      <section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">How Hierarchy Works</h2><div className="prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} /></section>
      {content.codeSnippet && <section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">{content.codeSnippet.label}</h2><pre className="bg-slate-900 text-slate-100 p-5 rounded-xl overflow-x-auto text-sm"><code>{content.codeSnippet.code}</code></pre></section>}
      <section className="mb-10"><h2 className="text-2xl font-bold text-slate-900 mb-4">Review Checklist</h2><ul className="space-y-3">{content.proTips.map((tip, index) => (<li key={index} className="flex gap-3 text-slate-700"><span className="text-blue-500 font-bold">▸</span><div className="min-w-0 flex-1" dangerouslySetInnerHTML={{ __html: renderTipMarkdown(tip) }} /></li>))}</ul></section>
      <section className="mb-10 p-6 bg-slate-50 rounded-xl text-slate-700"><strong>Key stat:</strong> {content.keyStat}</section>
      <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"><h2 className="text-xl font-bold text-slate-900 mb-3">Try It Yourself</h2><p className="text-slate-600 mb-4">Tune the hierarchy with ExDreamColors tools.</p><div className="flex flex-wrap gap-3"><Link href="/color-picker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Color Picker</Link><Link href="/contrast-checker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Contrast Checker</Link><Link href="/palette-generator" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Palette Generator</Link></div></section>
    </main>
  );
}
