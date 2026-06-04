import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms | exdreamcolors',
  description: 'Terms page for exdreamcolors - free online color tools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
