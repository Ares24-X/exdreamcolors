import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'Contrast Checker - WCAG Color Contrast Checker',
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
  return (
    <>
      {children}
      <ToolPageContent
        title="WCAG Contrast Checker for Accessible Design Decisions"
        description="Check text and background combinations with this free online contrast checker made for designers and developers who need faster accessibility validation during product work. Test colors in the browser, see whether they meet WCAG guidance, and make better decisions for interfaces, design systems, dashboards, and marketing pages without registration or extra software."
        howToSteps={[
          'Enter or pick your foreground and background colors to compare the combination.',
          'Review the contrast ratio and the pass or fail results for WCAG compliance levels.',
          'Adjust the colors until the pairing supports both your visual goals and accessibility needs.',
        ]}
        features={[
          'Free accessibility tool with no registration or login required.',
          'Runs fully in the browser for quick checks during design and development.',
          'Real-time contrast feedback as soon as either color changes.',
          'Supports common color formats for smooth testing across workflows.',
          'Helps teams validate AA and AAA goals before shipping interfaces.',
        ]}
        faqs={[
          {
            question: 'Why is a contrast checker important for designers and developers?',
            answer:
              'Color contrast has a direct effect on readability, usability, and accessibility compliance. Designers use it to avoid attractive but hard-to-read combinations, while developers use it to confirm that product decisions still work in real interfaces. A quick contrast check helps teams catch issues early instead of finding them late during QA or accessibility review.',
          },
          {
            question: 'What does it mean if a color pair passes AA but not AAA?',
            answer:
              'A pass at AA means the combination meets a commonly accepted accessibility threshold for many text scenarios, while AAA is stricter and aims for even stronger readability. In practice, teams often target AA as a baseline and use AAA where possible for critical content, dense interfaces, or audiences that benefit from higher visual clarity.',
          },
          {
            question: 'Can I use this when building a design system?',
            answer:
              'Yes, and it is especially valuable there. Contrast checking helps validate primary text colors, secondary labels, status badges, links, and themed surfaces before those choices spread across many components. Designers can create more reliable tokens, and developers can map approved combinations into reusable variables or utility classes with greater confidence.',
          },
          {
            question: 'Does the tool replace manual accessibility testing?',
            answer:
              'Not entirely. It is an excellent first check for color contrast, but accessibility also depends on factors like text size, weight, spacing, context, and interaction patterns. Teams should use the tool as part of a broader workflow that includes design review, implementation testing, and, when possible, real user feedback or formal accessibility audits.',
          },
          {
            question: 'Do I need to upload any files or create an account?',
            answer:
              'No. The checker is free, browser-based, and available without registration. That makes it easy to use during everyday design and development work, whether you are reviewing a mockup, testing a CSS update, or checking brand colors before publishing a new landing page or product feature.',
          },
        ]}
      />
    </>
  );
}
