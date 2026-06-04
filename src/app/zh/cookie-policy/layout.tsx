import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie 政策 - exdreamcolors',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
