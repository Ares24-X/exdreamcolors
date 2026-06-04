import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '渐变生成器 - 创建CSS渐变色',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
