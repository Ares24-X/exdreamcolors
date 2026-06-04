import Link from "next/link";

export default function ZhToolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">调色板生成器</h1>
      <p className="text-lg text-gray-600 mb-8">此工具的中文版本正在开发中。请使用英文版：</p>
      <Link href="/palette-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
        🇺🇸 使用英文版 调色板生成器
      </Link>
    </div>
  );
}
