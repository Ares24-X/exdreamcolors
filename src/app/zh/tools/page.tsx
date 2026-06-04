import Link from "next/link";

const tools = [
  { href: "/zh/color-picker", name: "取色器", desc: "从色轮中选取任意颜色，一键复制HEX/RGB/HSL代码。无需注册，完全免费。", icon: "🎨" },
  { href: "/zh/palette-generator", name: "调色板生成器", desc: "生成漂亮的和谐配色方案。支持互补色、类似色、三角色等多种配色规则。", icon: "🎯" },
  { href: "/zh/gradient-generator", name: "渐变生成器", desc: "创建惊艳的CSS渐变。可视化编辑器，即时复制CSS代码到你的项目。", icon: "🌈" },
  { href: "/zh/contrast-checker", name: "对比度检查器", desc: "检查色彩对比度是否满足WCAG 2.1 AA/AAA无障碍标准。", icon: "⚡" },
  { href: "/zh/image-extractor", name: "图片取色器", desc: "上传任意图片，自动提取主色调和完整配色方案。", icon: "🖼️" },
  { href: "/zh/tailwind-generator", name: "Tailwind色系", desc: "从基础色自动生成完整的Tailwind CSS色系，包含50-950所有色阶。", icon: "💨" },
];

export default function ZhToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">在线颜色工具</h1>
      <p className="text-xl text-gray-600 text-center mb-4">全部免费，浏览器本地运行，无需上传任何数据</p>
      <p className="text-center mb-12">
        <Link href="/tools" className="text-blue-500 text-sm">🇺🇸 English</Link>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map(t => (
          <Link key={t.href} href={t.href} className="block p-6 border rounded-xl hover:border-blue-400 hover:shadow-lg transition-all">
            <span className="text-3xl">{t.icon}</span>
            <h2 className="text-xl font-bold mt-3">{t.name}</h2>
            <p className="text-gray-600 mt-2">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
