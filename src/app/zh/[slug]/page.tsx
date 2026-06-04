import Link from "next/link";
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

export default function ZhArticlePage({ params }: { params: { slug: string } }) {
  const article = articleDatabase[params.slug];
  if (!article) notFound();

  const content = getContent(params.slug);
  const displayTitle = article.title.split(" | ")[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-500 mb-6" aria-label="面包屑">
        <Link href="/zh/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/zh/blog" className="hover:text-blue-600">博客</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{displayTitle}</span>
        <span className="ml-4">
          <Link href={`/${params.slug}`} className="text-blue-500 hover:text-blue-700 text-xs">🇺🇸 English</Link>
        </span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          {displayTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>阅读时间 8 分钟</span>
          <span aria-hidden="true">|</span>
          <span>更新于 {new Date().toISOString().split("T")[0]}</span>
        </div>
      </header>

      {/* 英文内容 + 中文导航说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-sm text-blue-800">
        📘 本文内容为英文原文，提供最准确的技术信息。中文解读和实操指南正在完善中。你也可以使用页面顶部的翻译工具。
      </div>

      <div className="text-lg leading-relaxed text-slate-700 mb-10">
        {content.intro.split("\n\n").map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
        ))}
      </div>

      {content.sectionFlow.map((section, idx) => (
        <ZhSectionRenderer key={section} type={section} content={content} index={idx} />
      ))}

      {content.toolsMention && content.toolsMention.length > 0 && (
        <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h2 className="text-xl font-bold text-slate-900 mb-4">免费工具推荐</h2>
          <p className="text-slate-600 mb-4">用这些免费工具实操你学到的知识：</p>
          <div className="flex flex-wrap gap-3">
            {content.toolsMention.map(tool => (
              <Link key={tool} href={`/zh/${tool}`} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium hover:border-blue-400 hover:shadow-md transition-all text-sm">
                {tool === "color-picker" ? "🎨 取色器" :
                 tool === "palette-generator" ? "🎯 调色板生成器" :
                 tool === "gradient-generator" ? "🌈 渐变生成器" :
                 tool === "contrast-checker" ? "⚡ 对比度检查器" :
                 tool === "tailwind-generator" ? "💨 Tailwind色系" :
                 tool === "image-extractor" ? "🖼️ 图片取色器" : tool}
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link href="/zh/blog" className="text-blue-600 hover:text-blue-800 font-medium">← 返回博客</Link>
          <Link href="/blog" className="text-slate-500 hover:text-blue-600 text-sm">🇺🇸 English Blog</Link>
        </div>
      </footer>
    </div>
  );
}

// Chinese section renderer (uses English content + Chinese labels)
function ZhSectionRenderer({ type, content, index }: { type: string; content: ContentBlock; index: number }) {
  const zhLabels: Record<string, string> = {
    realWorldExamples: "真实案例",
    real_world: "真实案例",
    examples: "真实案例",
    industry_examples: "行业案例",
    real_palettes: "真实配色",
    how_it_works: "原理详解",
    color_wheel: "色轮原理",
    foundation: "基础原理",
    math: "数学原理",
    science: "科学原理",
    the_five_patterns: "五大配色模式",
    cultural_context: "文化背景",
    culture_matrix: "文化矩阵",
    history: "历史背景",
    key_trends: "趋势分析",
    trends: "趋势分析",
    wcag_levels: "WCAG标准解读",
    testing: "测试方法",
    testing_methods: "测试方法",
    simulation: "模拟测试",
    format_comparison: "格式对比",
    function_reference: "函数参考",
    types_of_gradients: "渐变类型",
    pro_tips: "高手技巧",
    practical: "实操指南",
    practicalApps: "实操指南",
    next_steps: "下一步",
    developer_perspective: "开发者视角",
    performance_tips: "性能优化",
    tools: "工具推荐",
    tools_walkthrough: "工具详解",
    comparison: "对比分析",
    code_patterns: "代码示例",
    code: "代码示例",
  };

  const label = zhLabels[type] || type.replace(/_/g, " ");

  // For most section types, the content is in English since it's technical
  if (type === "code_patterns" || type === "code") {
    return content.codeSnippet ? (
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.codeSnippet.label}</h2>
        <pre className="bg-slate-900 text-slate-100 p-4 md:p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
          <code>{content.codeSnippet.code}</code>
        </pre>
        <p className="text-slate-500 text-sm mt-2">复制粘贴到项目即可使用。</p>
      </section>
    ) : null;
  }

  if (type === "pro_tips" || type === "practical" || type === "practicalApps" || type === "next_steps") {
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 {label}</h2>
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
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{label}</h2>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-3"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content.realWorldExamples || "") }} />
    </section>
  );
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
