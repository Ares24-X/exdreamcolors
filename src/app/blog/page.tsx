import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Blog | Color Theory, Design Tips & Tools',
  description: 'Free color design blog with 50+ articles. Learn color theory, palette creation, accessibility, CSS colors, and design best practices.',
  keywords: ['color blog', 'color theory', 'color palette', 'design tips', 'CSS colors', 'color tools'],
  openGraph: {
    title: 'Blog | Color Theory, Design Tips & Tools',
    description: 'Free color design blog with 50+ articles. Learn color theory, palette creation, and more.',
    type: 'website',
  },
};

const CATEGORIES = [
  'All',
  'Color Theory',
  'Color Palettes',
  'Technical',
  'Guides',
  'Accessibility',
  'Color Psychology',
  'Marketing',
  'Trends',
  'Design Tips',
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">exdreamcolors</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/tools" className="text-gray-600 hover:text-gray-900">Tools</Link>
              <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Color Design Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {articles.length}+ articles about color theory, palette creation, CSS colors, accessibility, and design best practices.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-left">
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">Start here</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Color Accessibility Hub</h2>
          <p className="text-gray-700 mb-4">
            A practical path through WCAG contrast, accessible palettes, form validation colors, dashboards, and color tokens.
          </p>
          <Link href="/color-accessibility-hub/" className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
            Open the hub →
          </Link>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? articles.length : articles.filter(a => a.cat === cat).length;
            return (
              <a
                key={cat}
                href={cat === 'All' ? '#all' : `#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {cat} ({count})
              </a>
            );
          })}
        </div>

        {/* Articles by Category */}
        {CATEGORIES.slice(1).map((cat) => {
          const catArticles = articles.filter(a => a.cat === cat);
          if (catArticles.length === 0) return null;
          return (
            <section key={cat} id={cat.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {cat}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${article.slug}`}
                    className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mb-2">
                      {article.cat}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* All Articles Quick List */}
        <section id="all" className="border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles ({articles.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${article.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </span>
                <span className="text-xs text-gray-400 ml-auto hidden sm:inline">{article.cat}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2026 exdreamcolors. Free online color tools for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
