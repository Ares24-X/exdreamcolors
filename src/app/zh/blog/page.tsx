import Link from "next/link";
import { articleDatabase } from "@/data/article-database";

export default function ZhBlogPage() {
  const articles = Object.values(articleDatabase);
  const categories = [...new Set(articles.map(a => {
    const slug = a.slug;
    if (slug.includes('color-palette') || slug.includes('palette')) return '配色方案';
    if (slug.includes('color-theory') || slug.includes('color-harmony') || slug.includes('color-scheme') || slug.includes('complementary') || slug.includes('monochromatic') || slug.includes('triadic') || slug.includes('tetradic') || slug.includes('split-complementary') || slug.includes('square-color')) return '色彩理论';
    if (slug.includes('contrast') || slug.includes('accessibility') || slug.includes('wcag') || slug.includes('color-blind')) return '无障碍';
    if (slug.includes('converter') || slug.includes('convert') || slug.includes('hex-to') || slug.includes('rgb-to') || slug.includes('css-color') || slug.includes('css-custom') || slug.includes('sass') || slug.includes('tailwind')) return '技术';
    if (slug.includes('guide') || slug.includes('how-to') || slug.includes('tips') || slug.includes('best-practices') || slug.includes('faq')) return '教程';
    if (slug.includes('marketing') || slug.includes('ecommerce') || slug.includes('landing') || slug.includes('brand')) return '营销';
    if (slug.includes('trend') || slug.includes('trends')) return '趋势';
    if (slug.includes('psychology') || slug.includes('meaning') || slug.includes('symbolism')) return '色彩心理学';
    return '设计技巧';
  }))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">博客</h1>
        <p className="text-xl text-gray-600">色彩理论、设计技巧与工具教程</p>
        <p className="mt-4">
          <Link href="/blog" className="text-blue-500 hover:text-blue-700 text-sm">🇺🇸 查看英文版</Link>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">全部</span>
        {categories.map(cat => (
          <span key={cat} className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">{cat}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => {
          const titleParts = article.title.split(" | ");
          return (
            <Link key={article.slug} href={`/zh/${article.slug}`} className="block p-6 border rounded-xl hover:border-blue-400 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-2">{titleParts[0]}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{titleParts[0]} - 全面指南、最佳实践和实用技巧，帮助你掌握{titleParts[0].toLowerCase().substring(0, 15)}...</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span>阅读时间 5 分钟</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
