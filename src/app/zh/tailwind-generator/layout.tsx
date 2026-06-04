import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '颜色 - Tailwind色系 - Tailwind CSS色彩生成器',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
