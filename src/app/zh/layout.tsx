import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'exdreamcolors - 免费在线颜色工具',
    template: '%s | exdreamcolors',
  },
  description: '取色器、调色板、渐变色、对比度检查等免费在线颜色工具，无需注册。',
};

export default function ZhRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
