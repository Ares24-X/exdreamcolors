import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gradient Generator - Create CSS Gradients Online',
  description: 'Free online CSS gradient generator. Create beautiful linear and radial gradients with live preview. Copy CSS code instantly. No registration required.',
  keywords: ['gradient generator', 'CSS gradient', 'linear gradient', 'radial gradient', 'gradient maker', 'online gradient tool'],
  openGraph: {
    title: 'Gradient Generator - Create CSS Gradients Online',
    description: 'Free CSS gradient generator with live preview. Create linear and radial gradients instantly.',
    url: 'https://exdreamcolors.win/gradient-generator/',
    type: 'website',
  },
};

export default function GradientGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
