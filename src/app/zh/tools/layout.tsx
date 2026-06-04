import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '在线颜色工具 - 取色器、调色板、渐变色',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
