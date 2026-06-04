import Link from "next/link";

export default function ZhAboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <h1>关于 exdreamcolors</h1>
      <p>
        <Link href="/about" className="text-blue-500 text-sm">🇺🇸 English</Link>
      </p>
      <p>exdreamcolors 是一组免费的浏览器端颜色工具，专为网页开发者、UI/UX设计师和所有与颜色打交道的人设计。</p>
      <p>所有工具完全在你的浏览器中运行——不会上传任何数据到服务器，确保你的隐私和安全。</p>
      
      <h2>我们的工具</h2>
      <ul>
        <li><strong>取色器</strong> — 直观的色轮，一键复制HEX/RGB/HSL颜色代码</li>
        <li><strong>调色板生成器</strong> — 生成和谐配色方案，支持多种配色规则</li>
        <li><strong>渐变生成器</strong> — 可视化CSS渐变编辑器</li>
        <li><strong>对比度检查器</strong> — WCAG 2.1 无障碍标准检测</li>
        <li><strong>图片取色器</strong> — 从图片中提取主色调</li>
        <li><strong>Tailwind色系生成器</strong> — 一键生成完整Tailwind色系</li>
      </ul>
      
      <h2>技术栈</h2>
      <p>使用 Next.js 和 Tailwind CSS 构建，部署在 Cloudflare Pages 上，全球CDN加速，国内腾讯云镜像同步。</p>
      
      <h2>隐私优先</h2>
      <p>我们重视你的隐私。所有工具处理均在本地浏览器完成，不上传任何数据到服务器。</p>
    </div>
  );
}
