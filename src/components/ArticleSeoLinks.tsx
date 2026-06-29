import Link from "next/link";
import { articles } from "@/data/articles";

const toolLinks = [
  { href: "/contrast-checker/", title: "Contrast Checker", match: ["contrast", "wcag", "accessibility", "color blind", "form", "validation"] },
  { href: "/palette-generator/", title: "Palette Generator", match: ["palette", "harmony", "brand", "seasonal", "mood", "interior"] },
  { href: "/gradient-generator/", title: "Gradient Generator", match: ["gradient", "css", "web", "landing", "trend"] },
  { href: "/color-picker/", title: "Color Picker", match: ["picker", "hex", "rgb", "hsl", "oklch", "token"] },
  { href: "/image-extractor/", title: "Image Color Extractor", match: ["image", "photo", "mood", "extract"] },
  { href: "/tailwind-color-generator/", title: "Tailwind Color Generator", match: ["tailwind", "token", "design system", "css"] },
];

const hubs = [
  { href: "/color-accessibility-guidelines/", title: "Color Accessibility Guide", match: ["contrast", "wcag", "accessibility", "color blind", "form", "validation"] },
  { href: "/color-palette-generator-free/", title: "Color Palette Generator Guide", match: ["palette", "harmony", "brand", "mood", "seasonal"] },
  { href: "/css-color-variables/", title: "CSS Color Variables Guide", match: ["css", "token", "tailwind", "oklch", "developer"] },
  { href: "/data-visualization-color-guide/", title: "Data Visualization Color Guide", match: ["dashboard", "chart", "data", "visualization"] },
];

function score(current: typeof articles[number], candidate: typeof articles[number]) {
  if (current.slug === candidate.slug) return -100;
  const haystack = `${candidate.slug} ${candidate.title} ${candidate.desc} ${candidate.cat}`.toLowerCase();
  const words = `${current.slug} ${current.title} ${current.desc} ${current.cat}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !["color", "guide", "learn", "design", "colors", "2026"].includes(word));
  let s = current.cat === candidate.cat ? 4 : 0;
  for (const word of new Set(words)) {
    if (haystack.includes(word)) s += 1;
  }
  return s;
}

function pickWeightedLinks(text: string, links: typeof toolLinks) {
  const lower = text.toLowerCase();
  const matched = links.filter((link) => link.match.some((term) => lower.includes(term)));
  return (matched.length ? matched : links.slice(0, 4)).slice(0, 4);
}

export default function ArticleSeoLinks({ slug }: { slug: string }) {
  const current = articles.find((article) => article.slug === slug);
  if (!current) return null;

  const text = `${current.slug} ${current.title} ${current.desc} ${current.cat}`;
  const related = articles
    .map((article) => ({ article, score: score(current, article) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((item) => item.article);
  const tools = pickWeightedLinks(text, toolLinks);
  const hubLinks = pickWeightedLinks(text, hubs as typeof toolLinks);

  return (
    <aside className="mt-14 border-t border-slate-200 pt-8">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Apply this with free color tools</h2>
        <p className="text-slate-700 mb-4">
          Do not leave this as theory. Test the palette, contrast, or CSS output before you ship it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-xl bg-white border border-blue-100 px-4 py-3 font-medium text-blue-700 hover:border-blue-400 hover:shadow-sm transition-all">
              {tool.title} →
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Start from a complete guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hubLinks.map((hub) => (
            <Link key={hub.href} href={hub.href} className="block rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
              <h3 className="font-semibold text-slate-900">{hub.title}</h3>
              <p className="text-sm text-slate-600 mt-1">Use this as the main hub for deeper examples and linked workflows.</p>
            </Link>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related color guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((article) => (
              <Link key={article.slug} href={`/${article.slug}/`} className="block rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 rounded-full px-2 py-1">{article.cat}</span>
                <h3 className="font-semibold text-slate-900 mt-2 mb-1">{article.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{article.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
