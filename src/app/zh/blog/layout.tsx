import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客 - 色彩理论、设计技巧与工具',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
