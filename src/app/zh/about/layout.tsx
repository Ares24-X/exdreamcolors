import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于 exdreamcolors - 免费在线颜色工具',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
