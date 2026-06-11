import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'Tailwind Color Generator - Tailwind CSS Colors',
  description: 'Tailwind Color Generator for complete Tailwind CSS colors. Create palettes, copy config-ready code, and build UI themes fast.',
  keywords: ['tailwind color generator', 'Tailwind CSS colors', 'tailwind palette generator', 'tailwind color picker', 'Tailwind color shades', 'CSS framework'],
  openGraph: {
    title: 'Tailwind Color Generator - Tailwind CSS Colors',
    description: 'Create complete Tailwind CSS colors from any base color and copy production-ready config code.',
    url: 'https://exdreamcolors.win/tailwind-color-generator/',
    type: 'website',
  },
};

export default function TailwindGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolPageContent
        title="Tailwind Color Generator for Faster Theme Setup"
        description="Generate structured Tailwind CSS color scales with this free online tool built for developers and designers who want cleaner handoff from brand color to implementation. Start with a base color, preview a usable range of shades in the browser, and copy configuration-ready output for Tailwind projects, design tokens, component libraries, and product themes without registration."
        howToSteps={[
          'Enter your base color or pick one that matches the brand or interface direction.',
          'Review the generated shade scale and check how lighter and darker values relate.',
          'Copy the Tailwind-ready output and add it to your config, theme, or token setup.',
        ]}
        features={[
          'Free online Tailwind helper with no registration required.',
          'Browser-based generation for rapid design-to-code iteration.',
          'Real-time preview of color scales and shade relationships.',
          'Supports multiple color formats alongside Tailwind-friendly output.',
          'Useful for theme building, component libraries, and design token workflows.',
        ]}
        faqs={[
          {
            question: 'Why use a Tailwind color generator instead of defining shades by hand?',
            answer:
              'Creating a full shade scale manually takes time and often leads to uneven jumps between steps. A generator helps you start with a more consistent set of values that feels intentional across backgrounds, borders, text, and interactive states. That saves developers time and gives designers a clearer system to review before implementation spreads through the product.',
          },
          {
            question: 'Can designers use this tool too, or is it only for developers?',
            answer:
              'Designers can absolutely use it. Even though the final output is useful for Tailwind projects, the generated scale helps designers see how a single brand color behaves across lighter and darker surfaces. That makes it easier to discuss hover states, emphasis levels, dark mode choices, and token naming with the development team.',
          },
          {
            question: 'Is the generated output ready for a Tailwind configuration file?',
            answer:
              'That is the goal. The tool is meant to produce values that are easy to copy into a Tailwind configuration or adjacent theming workflow. Developers can use the result as a strong starting point, then fine-tune individual shades if a product needs stricter accessibility targets, stronger visual hierarchy, or alignment with an existing design system.',
          },
          {
            question: 'How does this help when building a reusable design system?',
            answer:
              'A structured shade scale gives teams a more stable foundation for buttons, alerts, cards, links, forms, and semantic states. Instead of inventing colors component by component, designers and developers can refer to a shared scale. That improves consistency, speeds up review cycles, and makes future refactoring or theming much easier to manage.',
          },
          {
            question: 'Do I need to register or install anything to use it?',
            answer:
              'No. The generator is free, runs in the browser, and does not require sign-up. It fits well into quick prototyping, design reviews, and day-to-day development work where you want a practical Tailwind color scale immediately without leaving your current workflow or adding another dependency to the project.',
          },
        ]}
      />
    </>
  );
}
