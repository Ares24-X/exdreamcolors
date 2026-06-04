import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '调色板生成器 - 创建和谐配色方案',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
