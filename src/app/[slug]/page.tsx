import Link from "next/link";
import ArticleSeoLinks from "@/components/ArticleSeoLinks";
import { articleDatabase, articleSlugs } from "@/data/article-database";
import { articleContent, getDefaultContent, type ContentBlock } from "@/data/article-content";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

function getContent(slug: string): ContentBlock {
  return articleContent[slug] || getDefaultContent(slug);
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articleDatabase[params.slug];
  if (!article) notFound();

  const content = getContent(params.slug);
  const displayTitle = article.title.split(" | ")[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{displayTitle}</span>
        <span className="ml-4">
          <Link href={`/zh/${params.slug}`} className="text-blue-500 hover:text-blue-700 text-xs">🇨🇳 中文</Link>
        </span>
      </nav>

      {/* Article header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          {displayTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>8 min read</span>
          <span aria-hidden="true">|</span>
          <span>Updated {new Date().toISOString().split("T")[0]}</span>
        </div>
      </header>

      {/* Unique intro — different for every article */}
      <div className="text-lg leading-relaxed text-slate-700 mb-10">
        {content.intro.split("\n\n").map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
        ))}
      </div>

      {/* Dynamic section flow — NOT the same for every article */}
      {content.sectionFlow.map((section, idx) => (
        <SectionRenderer key={section} type={section} content={content} index={idx} />
      ))}

      {/* Tools recommendation */}
      {content.toolsMention && content.toolsMention.length > 0 && (
        <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Try It Yourself</h2>
          <p className="text-slate-600 mb-4">Use these free tools to apply what you learned:</p>
          <div className="flex flex-wrap gap-3">
            {content.toolsMention.map(tool => (
              <Link key={tool} href={`/${tool}`} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium hover:border-blue-400 hover:shadow-md transition-all text-sm">
                {tool === "color-picker" ? "🎨 Color Picker" :
                 tool === "palette-generator" ? "🎯 Palette Generator" :
                 tool === "gradient-generator" ? "🌈 Gradient Generator" :
                 tool === "contrast-checker" ? "⚡ Contrast Checker" :
                 tool === "tailwind-color-generator" ? "💨 Tailwind Generator" :
                 tool === "image-extractor" ? "🖼️ Image Extractor" : tool}
              </Link>
            ))}
          </div>
        </section>
      )}

      <ArticleSeoLinks slug={params.slug} />

      {/* Related links */}
      <footer className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Blog</Link>
          <Link href="/zh/blog" className="text-slate-500 hover:text-blue-600 text-sm">🇨🇳 中文博客</Link>
        </div>
      </footer>
    </div>
  );
}

// Dynamic section renderer — produces unique layouts per article
function SectionRenderer({ type, content, index }: { type: string; content: ContentBlock; index: number }) {
  switch (type) {
    case "realWorldExamples":
    case "real_world":
    case "examples":
    case "industry_examples":
    case "real_palettes":
    case "realWorldExamples":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Real-World Examples</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
        </section>
      );

    case "the_five_patterns":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The 5 Color Harmony Patterns</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
        </section>
      );

    case "how_it_works":
    case "color_wheel":
    case "foundation":
    case "math":
    case "science":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
            {content.realWorldExamples && (
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
            )}
          </div>
        </section>
      );

    case "cultural_context":
    case "culture_matrix":
    case "history":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Cultural & Historical Context</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
        </section>
      );

    case "key_trends":
    case "trends":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Trends</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
        </section>
      );

    case "wcag_levels":
    case "testing":
    case "testing_methods":
    case "simulation":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Testing & Standards</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.testingMethods || content.realWorldExamples) }} />
        </section>
      );

    case "format_comparison":
    case "function_reference":
    case "types_of_gradients":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison & Reference</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
        </section>
      );

    case "pro_tips":
    case "practical":
    case "practicalApps":
    case "next_steps":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pro Tips</h2>
          <ul className="space-y-3">
            {content.proTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-slate-700">
                <span className="text-blue-500 font-bold flex-shrink-0">▸</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "developer_perspective":
    case "performance_tips":
    case "tools":
    case "tools_walkthrough":
    case "comparison":
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Developer Perspective</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3">
            {content.realWorldExamples && (
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
            )}
            <div className="space-y-2">
              {content.proTips.slice(0, 2).map((tip, i) => (
                <p key={i} className="flex gap-2"><span className="text-blue-500">▸</span> {tip}</p>
              ))}
            </div>
          </div>
        </section>
      );

    case "chart_audit":
    case "audit_data":
      return content.chartAudit ? (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Chart Accessibility Audit Data</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content.chartAudit) }} />
        </section>
      ) : null;

    case "code_patterns":
    case "code":
      return content.codeSnippet ? (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.codeSnippet.label}</h2>
          <pre className="bg-slate-900 text-slate-100 p-4 md:p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
            <code>{content.codeSnippet.code}</code>
          </pre>
          <p className="text-slate-500 text-sm mt-2">Copy and paste into your project — free to use.</p>
        </section>
      ) : null;

    default:
      // Generic section for uncategorized flows
      return (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 capitalize">{type.replace(/_/g, " ")}</h2>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
            {content.realWorldExamples && (
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples) }} />
            )}
            {!content.realWorldExamples && (
              <p>This section covers practical techniques that professional designers and developers use daily. Understanding these concepts will help you make better design decisions and produce more polished work.</p>
            )}
          </div>
        </section>
      );
  }
}

// Simple markdown bold/italic renderer
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
