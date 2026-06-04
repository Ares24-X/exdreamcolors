import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '对比度检查器 - WCAG无障碍检测',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
