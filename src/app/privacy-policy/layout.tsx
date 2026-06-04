import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | exdreamcolors',
  description: 'Privacy Policy page for exdreamcolors - free online color tools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
