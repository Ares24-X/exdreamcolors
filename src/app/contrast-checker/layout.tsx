import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Checker - WCAG Color Contrast Checker | exdreamcolors',
  description: 'Free online WCAG contrast checker. Test color combinations for accessibility compliance. AA and AAA level checks. Instant results.',
  keywords: ['contrast checker', 'WCAG contrast checker', 'color contrast', 'accessibility checker', 'AA contrast', 'AAA contrast', 'web accessibility tool'],
  openGraph: {
    title: 'Contrast Checker - WCAG Color Contrast Checker',
    description: 'Test color contrast for WCAG AA and AAA compliance. Free online tool.',
    url: 'https://exdreamcolors.win/contrast-checker/',
    type: 'website',
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
