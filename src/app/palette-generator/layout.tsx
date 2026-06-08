import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'Palette Generator - Create Beautiful Color Schemes Online',
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
  return (
    <>
      {children}
      <ToolPageContent
        title="Free Color Palette Generator for Consistent Visual Systems"
        description="Create balanced color schemes with this free online palette generator built for designers and developers who need faster decisions around harmony, hierarchy, and brand consistency. Explore complementary, analogous, triadic, and other palette structures in the browser, then turn strong color relationships into practical references for UI design, illustrations, style guides, and code."
        howToSteps={[
          'Choose a starting color or paste a brand color you want to build around.',
          'Switch between palette types to explore different harmony rules and visual directions.',
          'Copy the colors you like and apply them to interfaces, presentations, marketing assets, or code.',
        ]}
        features={[
          'Free online palette creation with no registration required.',
          'Runs in the browser for quick experimentation during design and development.',
          'Real-time palette previews as you change the source color or harmony type.',
          'Supports multiple color formats for smooth design-to-code handoff.',
          'Useful for mood boards, UI systems, branding, and component theming.',
        ]}
        faqs={[
          {
            question: 'What palette types can help me choose better combinations?',
            answer:
              'Different palette rules solve different design problems. Complementary palettes create strong contrast, analogous palettes feel smooth and cohesive, and triadic palettes offer more energy while staying balanced. For designers and developers, switching between these structures is a fast way to evaluate whether a color system feels calm, bold, playful, or product-ready.',
          },
          {
            question: 'Can I use this for UI design and design systems?',
            answer:
              'Yes. This generator is especially useful when you need a repeatable palette rather than a single color. Designers can explore accent, background, and support colors together, while developers can use the generated scheme as a starting point for tokens, component states, chart colors, or theme variants in an application.',
          },
          {
            question: 'How is this different from picking random colors manually?',
            answer:
              'Manual selection can work, but it often leads to inconsistent relationships between colors. A palette generator uses color theory patterns to give you combinations that are more likely to feel intentional. That saves time during concept exploration and reduces the amount of trial and error when building coherent screens, slides, or branded experiences.',
          },
          {
            question: 'Do I need to install anything or sign up?',
            answer:
              'No. The tool is free, works directly in the browser, and does not require an account. That makes it convenient for quick ideation sessions, client workshops, design reviews, or development tasks where you need palette options immediately and do not want to interrupt your workflow with downloads or registration steps.',
          },
          {
            question: 'Can these palettes help with collaboration between designers and developers?',
            answer:
              'Definitely. A shared palette gives both sides a common reference for primary, secondary, accent, and support colors. Designers can communicate visual intent more clearly, and developers can map those choices into variables, themes, or utility classes. That reduces ambiguity, speeds up implementation, and makes future updates easier to manage across the product.',
          },
        ]}
      />
    </>
  );
}
