import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palette Generator - Create Beautiful Color Schemes Online | exdreamcolors',
  description: 'Free online color palette generator. Create beautiful color schemes based on color theory. Complementary, analogous, triadic, and more palette types. Instant preview.',
  keywords: ['palette generator', 'color palette generator', 'color scheme generator', 'color harmony', 'color combinations', 'online palette tool'],
  openGraph: {
    title: 'Palette Generator - Create Beautiful Color Schemes Online',
    description: 'Free color palette generator based on color theory. Instant preview and code export.',
    url: 'https://exdreamcolors.win/palette-generator/',
    type: 'website',
  },
};

export default function PaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
