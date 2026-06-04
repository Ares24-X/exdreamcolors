import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 - exdreamcolors',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
