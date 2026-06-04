import Link from "next/link";

export default function ZhHomePage() {
  const tools = [
    { href: "/zh/color-picker", icon: "🎨", name: "取色器", desc: "从色轮中选取任意颜色，一键复制HEX/RGB/HSL代码。" },
    { href: "/zh/palette-generator", icon: "🎯", name: "调色板", desc: "生成漂亮的和谐配色方案，支持多种配色规则。" },
    { href: "/zh/gradient-generator", icon: "🌈", name: "渐变生成器", desc: "创建惊艳的CSS渐变色，可视化编辑器。" },
    { href: "/zh/contrast-checker", icon: "⚡", name: "对比度检查", desc: "检查色彩对比度是否满足WCAG无障碍标准。" },
    { href: "/zh/image-extractor", icon: "🖼️", name: "图片取色", desc: "从任意图片中提取主色调和配色方案。" },
    { href: "/zh/tailwind-generator", icon: "💨", name: "Tailwind色系", desc: "从基础色生成完整的Tailwind CSS色系。" },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            免费在线颜色工具
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            取色器、调色板、渐变色、对比度检查等免费工具，浏览器本地运行，无需注册。
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/zh/color-picker" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              开始使用
            </Link>
            <Link href="/zh/blog" className="px-6 py-3 border border-gray-300 rounded-lg hover:border-blue-500 text-gray-700 font-medium">
              浏览教程
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">六款免费颜色工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="block p-6 border rounded-xl hover:border-blue-400 hover:shadow-lg transition-all">
                <span className="text-3xl">{tool.icon}</span>
                <h3 className="text-lg font-semibold mt-3">{tool.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
