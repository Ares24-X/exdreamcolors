import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款 - exdreamcolors',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
