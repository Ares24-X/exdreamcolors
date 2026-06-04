import Link from "next/link";
import { articleDatabase, articleSlugs } from "@/data/article-database";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export default function ZhArticlePage({ params }: { params: { slug: string } }) {
  const article = articleDatabase[params.slug];
  if (!article) notFound();

  const titleParts = article.title.split(" | ");
  const displayTitle = titleParts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/zh/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/zh/blog" className="hover:text-blue-600">博客</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{displayTitle}</span>
        <span className="ml-4">
          <Link href={`/${params.slug}`} className="text-blue-500 hover:text-blue-700 text-xs">🇺🇸 English</Link>
        </span>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{displayTitle}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>阅读时间 5 分钟</span>
          <span>|</span>
          <span>更新于 {new Date().toISOString().split("T")[0]}</span>
        </div>
      </header>

      <article className="prose prose-lg max-w-none">
        <h2>什么是{displayTitle}？</h2>
        <p>
          {displayTitle}是色彩理论和网页设计中的基础概念，每位设计师和开发者都应该掌握。
          本指南将带你全面了解相关知识，从基本原理到高级技巧。
        </p>
        <p>
          无论你是在建网站、做品牌设计还是进行设计项目，
          掌握{displayTitle.toLowerCase()}将帮助你做出更好的视觉决策。
        </p>

        <h2>为什么{displayTitle}很重要？</h2>
        <p>理解{displayTitle.toLowerCase()}至关重要，原因如下：</p>
        <ul>
          <li><strong>更好的用户体验：</strong>合理使用色彩可以提高可读性和用户参与度</li>
          <li><strong>品牌一致性：</strong>统一的色彩使用能建立品牌认知</li>
          <li><strong>无障碍访问：</strong>良好的色彩选择确保内容对所有用户友好</li>
          <li><strong>转化率优化：</strong>正确的颜色可以显著影响转化率</li>
        </ul>

        <h2>核心概念</h2>
        <h3>1. 基本原理</h3>
        <p>
          {displayTitle.toLowerCase()}的核心是理解色彩如何相互作用以及如何影响人的感知。
          色彩可以唤起情感、创建层次结构并引导用户注意力。
        </p>

        <h3>2. 实际应用</h3>
        <p>以下是一些常见的使用场景：</p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`:root {
  --primary-color: #3B82F6;
  --secondary-color: #8B5CF6;
  --text-color: #1F2937;
  --background-color: #FFFFFF;
}

.button {
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}`}
        </pre>

        <h3>3. 最佳实践</h3>
        <ol>
          <li><strong>明确目标：</strong>确定你想要唤起的情感或行动</li>
          <li><strong>测试对比度：</strong>始终使用对比度检查器验证可读性</li>
          <li><strong>考虑场景：</strong>颜色在不同屏幕和光线条件下看起来不同</li>
          <li><strong>保持一致：</strong>在整个设计中使用有限的调色板</li>
          <li><strong>用户测试：</strong>尽可能获取真实用户的反馈</li>
        </ol>

        <h2>常见误区</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
          <ul className="space-y-2">
            <li>忽视色盲和无障碍访问指南</li>
            <li>在单个设计中使用过多颜色</li>
            <li>仅凭个人喜好选择颜色</li>
            <li>忽略移动端和暗黑模式的考虑</li>
            <li>忘记在不同浏览器中测试</li>
          </ul>
        </div>

        <h2>实用工具推荐</h2>
        <p>使用以下免费工具在你的项目中实践{displayTitle.toLowerCase()}：</p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <Link href="/zh/color-picker" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>取色器</strong>
            <p className="text-sm text-gray-600">找到完美的颜色</p>
          </Link>
          <Link href="/zh/contrast-checker" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>对比度检查器</strong>
            <p className="text-sm text-gray-600">确保无障碍访问</p>
          </Link>
          <Link href="/zh/palette-generator" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>调色板生成器</strong>
            <p className="text-sm text-gray-600">创建和谐配色</p>
          </Link>
          <Link href="/zh/gradient-generator" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>渐变生成器</strong>
            <p className="text-sm text-gray-600">设计精美渐变</p>
          </Link>
        </div>

        <h2>总结</h2>
        <p>
          {displayTitle}是你设计工具箱中的强大工具。通过理解和运用这些原则，
          你可以创建更有效、更易访问、更美观的设计。
        </p>
        <p>
          立即使用我们的免费颜色工具开始实验，看看正确的色彩选择能带来多大不同！
        </p>
      </article>
    </div>
  );
}
