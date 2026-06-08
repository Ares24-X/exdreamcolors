import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'Color Picker - Pick HEX, RGB, HSL Colors Online',
  description: 'Free online color picker tool. Pick any color and get HEX, RGB, and HSL values instantly. Copy color codes with one click. No registration required.',
  keywords: ['color picker', 'HEX color picker', 'RGB picker', 'HSL picker', 'color code picker', 'online color tool'],
  openGraph: {
    title: 'Color Picker - Pick HEX, RGB, HSL Colors Online',
    description: 'Free online color picker. Get HEX, RGB, HSL values instantly. Copy with one click.',
    url: 'https://exdreamcolors.win/color-picker/',
    type: 'website',
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolPageContent
        title="Professional Online Color Picker for Design and Development"
        description="Use this free online color picker to identify precise HEX, RGB, and HSL values in seconds while you design interfaces, prepare brand assets, or build front-end components. It is made for designers and developers who need dependable color references, instant copying, and a fast browser-based workflow without registration, downloads, or setup."
        howToSteps={[
          'Select a color with the picker or enter an existing code to start from a known value.',
          'Review the generated HEX, RGB, and HSL formats in real time as you adjust the color.',
          'Copy the format you need and paste it directly into your design file, style guide, or codebase.',
        ]}
        features={[
          'Free online tool with no registration or account required.',
          'Browser-based color processing that keeps your workflow fast and simple.',
          'Real-time preview while adjusting hue, saturation, brightness, and opacity.',
          'Supports multiple color formats including HEX, RGB, and HSL.',
          'One-click copying for faster handoff between designers and developers.',
        ]}
        faqs={[
          {
            question: 'Who is this color picker best for?',
            answer:
              'This tool is useful for both designers and developers who need accurate color values without opening heavy software. Designers can match interface elements, refine brand tones, or test visual ideas quickly. Developers can grab production-ready HEX, RGB, or HSL values for CSS, design tokens, and component libraries right inside the browser.',
          },
          {
            question: 'Can I use the picked colors directly in CSS or design systems?',
            answer:
              'Yes. The output formats are ready for practical use in front-end development and design documentation. You can copy HEX values for brand guides, RGB values for effects with alpha channels, or HSL values when you want more intuitive control over lightness and saturation in CSS variables and token systems.',
          },
          {
            question: 'Does the tool work without creating an account?',
            answer:
              'Absolutely. The color picker is completely free to use and does not require sign-up, registration, or installation. That makes it convenient for quick tasks, shared team workflows, and agency environments where people need to test colors fast without adding friction to the process or storing unnecessary account data.',
          },
          {
            question: 'Why would I use HSL instead of HEX?',
            answer:
              'HSL is often easier when you want to reason about color adjustments in a systematic way. Designers and developers can shift hue for variants, reduce saturation for muted UI states, or change lightness for dark mode more predictably. HEX is compact, but HSL can be much more practical during iterative design and theming work.',
          },
          {
            question: 'Is any color data uploaded to a server?',
            answer:
              'The workflow is designed to happen directly in your browser, which is ideal for privacy and speed. For design and development teams, that means you can experiment with color values, copy results, and compare formats instantly without relying on a separate desktop app or sending sensitive project context through a signup-based service.',
          },
        ]}
      />
    </>
  );
}
