import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'WCAG Contrast Checker - Free Color Contrast Ratio Tool (AA & AAA)',
  description: 'Free WCAG contrast checker. Test any color pair against the 4.5:1, 3:1, and 7:1 thresholds for text, buttons, and focus indicators. Instant AA and AAA results, no signup.',
  keywords: ['contrast checker', 'WCAG contrast checker', 'color contrast checker', 'color contrast ratio', 'accessibility checker', 'AA contrast', 'AAA contrast', 'web accessibility tool', '4.5:1 contrast ratio', 'WCAG 2.2 contrast', 'focus indicator contrast', 'accessible color checker'],
  alternates: {
    canonical: 'https://exdreamcolors.win/contrast-checker/',
  },
  openGraph: {
    title: 'WCAG Contrast Checker - Free Color Contrast Ratio Tool',
    description: 'Test color contrast against WCAG 2.2 AA and AAA thresholds for text, buttons, and focus rings. Free, browser-based, no signup.',
    url: 'https://exdreamcolors.win/contrast-checker/',
    type: 'website',
  },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolPageContent
        faqSchema
        title="WCAG Contrast Checker for Accessible Design Decisions"
        description="Check text and background combinations against the WCAG 2.2 thresholds that auditors actually cite: 4.5:1 for normal text (SC 1.4.3), 3:1 for large text and UI components (SC 1.4.11), 7:1 for AAA, and 3:1 for focus indicators (SC 2.4.13). Everything runs in the browser with no signup, so you can validate tokens during design review, before a PR merges, or while responding to an accessibility audit."
        howToSteps={[
          'Enter or pick your foreground and background colors to compare the combination.',
          'Read the ratio, then check it against the threshold for that element: 4.5:1 normal text, 3:1 large text and UI components, 7:1 for AAA.',
          'If it fails, adjust lightness rather than hue. Darkening the text usually costs less brand identity than shifting the color.',
          'Re-test every interactive state separately: hover, active, focus ring, and disabled. Default state passing does not mean the component passes.',
          'Repeat the whole pass on your dark theme surface. Inverted light-mode tokens frequently fail on dark backgrounds.',
        ]}
        features={[
          'Free accessibility tool with no registration or login required.',
          'Runs fully in the browser for quick checks during design and development.',
          'Real-time contrast feedback as soon as either color changes.',
          'Reports AA and AAA results separately for normal and large text, so you can cite the exact success criterion in an audit response.',
          'Shows HEX, RGB, and HSL values for both colors, which makes it easy to log the failing token and its replacement.',
          'Includes a swap control for testing the same pair in reverse polarity, useful when the same token is used for both text and background.',
        ]}
        referenceTable={{
          heading: 'Common gray text tokens: measured ratios on white',
          intro:
            'Muted and secondary text is the single most common contrast failure in production UI. These are the default gray scales most teams reach for, measured against #FFFFFF with the WCAG 2.2 relative luminance formula. Anything below 4.5:1 cannot carry body text.',
          headers: ['Token', 'Hex', 'Ratio on white', 'Normal text (4.5:1)', 'Safe use'],
          rows: [
            ['gray-300', '#D1D5DB', '1.47:1', 'Fail', 'Borders on dark surfaces only, never text'],
            ['gray-400', '#9CA3AF', '2.54:1', 'Fail', 'Decorative dividers, disabled non-essential text'],
            ['gray-500', '#6B7280', '4.83:1', 'Pass (AA)', 'Placeholder and helper text, minimum safe gray'],
            ['gray-600', '#4B5563', '7.56:1', 'Pass (AAA)', 'Muted body copy and secondary labels'],
            ['blue-600', '#2563EB', '5.17:1', 'Pass (AA)', 'Links, primary button fill, focus rings'],
            ['red-500', '#EF4444', '3.76:1', 'Fail', 'Icon fills only, not error message text'],
            ['red-700', '#B91C1C', '6.47:1', 'Pass (AA)', 'Error text and danger button fills'],
          ],
          footnote:
            'Ratios computed with the WCAG 2.2 relative luminance formula against #FFFFFF. gray-400 at 2.54:1 is the token that most often ships as "subtle" body text and fails audit. Verify your own surface color above, since a tinted background changes every value.',
        }}
        relatedGuidesHeading="Go deeper on color accessibility"
        relatedGuides={[
          {
            href: '/color-accessibility-hub/',
            badge: 'HUB',
            title: 'Color Accessibility Hub',
            desc: 'Start here. A 10-point audit checklist mapped to WCAG success criteria, plus copy-paste token fixes for the most common failures.',
          },
          {
            href: '/wcag-contrast-ratio-for-text/',
            badge: 'TEXT',
            title: 'WCAG Contrast Ratio for Text',
            desc: 'Why 4.5:1 exists, how text size and weight change the threshold, and how to fix muted text without losing your brand palette.',
          },
          {
            href: '/wcag-contrast-checker-for-buttons/',
            badge: 'BUTTONS',
            title: 'WCAG Contrast Checker for Buttons',
            desc: 'Measured button ratios from 60 component libraries. Hover, focus, and disabled states cause 89% of button failures, not the default.',
          },
          {
            href: '/wcag-contrast-checker-for-dark-mode/',
            badge: 'DARK MODE',
            title: 'WCAG Contrast Checker for Dark Mode',
            desc: 'Dark themes fail when teams invert light tokens. Build a separate dark token set and test each surface/state independently.',
          },
          {
            href: '/accessible-data-visualization/',
            badge: 'DATA VIZ',
            title: 'Accessible Data Visualization',
            desc: 'Charts and graphs that pass WCAG 1.4.1 and 1.4.3. Use lightness-separated palettes, patterns, and direct labeling.',
          },
          {
            href: '/accessible-color-token-system/',
            badge: 'DESIGN SYSTEM',
            title: 'Accessible Color Token System',
            desc: 'A token-level approach to preventing contrast failures. Enforce ratios in CI, audit across themes, and ship with confidence.',
          },
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
          {
            question: 'My gray text token is gray-400 (#9CA3AF) — why does it fail?',
            answer:
              'It measures 2.54:1 against white, which is below the 4.5:1 threshold for normal text (WCAG 2.2 SC 1.4.3). This is the most common gray in design systems and the #1 token that ships as "subtle" body text and fails audits. If your background surface is not pure white, test your exact pair above. Otherwise, replace gray-400 with gray-500 (#6B7280) or gray-600 (#4B5563) for body text, and keep gray-400 for decorative dividers or non-essential disabled states.',
          },
          {
            question: 'What ratio do focus indicators need?',
            answer:
              'WCAG 2.2 SC 2.4.13 Focus Appearance requires focus indicators to have at least 3:1 contrast against adjacent colors and a minimum area equal to a 2px perimeter around the component. The focus ring color should be distinct from the fill (not an opacity variant) and should never rely on color alone to indicate focus. Test your focus ring with the checker by placing the ring color in the foreground and the surface color in the background.',
          },
          {
            question: 'Do I need different contrast in dark mode?',
            answer:
              'The WCAG ratios (4.5:1, 3:1) apply equally to dark and light mode, but most dark-mode failures happen because teams simply invert light-mode tokens. Build a separate dark token set and test each state independently. Common failure: a light-mode gray that passes on white becomes invisible on a dark surface when inverted. Verify each token pair against the actual background color, not a placeholder.',
          },
          {
            question: 'I got a notice from the accessibility team — how do I fix it fast?',
            answer:
              'Three-layer rapid response. First, run Chrome DevTools → More tools → CSS Overview → Capture → Colors section to export every text/background combination sorted by lowest contrast. Second, use the Contrast Checker above to measure and find replacements for failing pairs — adjust lightness, not hue, to preserve brand. Third, add the approved pairs to your design tokens and commit them as a PR. If the report mentions specific pages, audit them with axe DevTools or Stark before shipping. Most organizations accept a 48-hour fix window for contrast failures if you can show a clear audit trail.',
          },
        ]}
      />
    </>
  );
}
