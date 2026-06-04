import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图片取色器 - 从图片提取颜色',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
