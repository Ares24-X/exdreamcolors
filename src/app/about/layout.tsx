import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About exdreamcolors - Free Color Tools for Developers & Designers',
  description: 'Learn about exdreamcolors — free online color tools built for developers and designers. No registration, no fees. Just click and use.',
  keywords: ['about exdreamcolors', 'color tools', 'developer tools', 'design tools', 'free color tools'],
  openGraph: {
    title: 'About exdreamcolors - Free Color Tools for Developers & Designers',
    description: 'Free online color tools built for developers and designers.',
    url: 'https://exdreamcolors.win/about/',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
