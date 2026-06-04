import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tailwind Color Generator - Generate Tailwind CSS Colors',
  description: 'Free Tailwind CSS color generator. Generate complete Tailwind color configurations from a base color. Copy ready-to-use code. Perfect for developers.',
  keywords: ['tailwind generator', 'Tailwind CSS colors', 'Tailwind color palette', 'Tailwind config', 'Tailwind color shades', 'CSS framework'],
  openGraph: {
    title: 'Tailwind Color Generator - Generate Tailwind CSS Colors',
    description: 'Generate Tailwind CSS color configurations from any base color. Developer-friendly.',
    url: 'https://exdreamcolors.win/tailwind-generator/',
    type: 'website',
  },
};

export default function TailwindGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
