import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

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
  return (
    <>
      {children}
      <ToolPageContent
        title="CSS Gradient Generator for Modern Interfaces and Web Projects"
        description="Build polished backgrounds and visual transitions with this free online gradient generator designed for designers and developers who need fast experimentation and usable CSS output. Create linear or radial gradients in the browser, preview every change instantly, and copy production-friendly code for landing pages, hero sections, buttons, cards, and app surfaces without registration."
        howToSteps={[
          'Choose the gradient type and add the colors you want to blend together.',
          'Adjust angle, direction, and stop positions while watching the live preview update.',
          'Copy the generated CSS and paste it into your stylesheet, component, or design handoff notes.',
        ]}
        features={[
          'Free online gradient builder with no sign-up needed.',
          'Browser-based editing for quick visual testing and code generation.',
          'Real-time preview of gradient angles, color stops, and direction changes.',
          'Supports multiple output-ready color formats for design and development use.',
          'Instant CSS copying for faster implementation in websites and apps.',
        ]}
        faqs={[
          {
            question: 'Can I generate gradients that are ready to use in CSS?',
            answer:
              'Yes. The tool is built to help developers move directly from visual exploration to implementation. Once you adjust colors, angles, and stops, you can copy CSS-ready output and use it in stylesheets, inline styles, Tailwind extensions, or component files. It is a practical shortcut for production work, not just a visual demo.',
          },
          {
            question: 'When should I use linear gradients versus radial gradients?',
            answer:
              'Linear gradients are great for directional movement, such as hero backgrounds, buttons, overlays, or section dividers. Radial gradients work better when you want a focal glow, spotlight effect, or softer atmospheric background. Designers often use both during exploration, while developers compare which option better supports layout, readability, and performance goals.',
          },
          {
            question: 'Is this useful for UI design systems, not just marketing pages?',
            answer:
              'Absolutely. Gradients are often used for subtle surface treatments, chart fills, onboarding graphics, and emphasis states in product design. This tool helps teams experiment quickly while keeping implementation realistic. Designers can test visual hierarchy, and developers can evaluate whether the final gradient can be applied consistently across components and themes.',
          },
          {
            question: 'Do I need an account to create and copy gradients?',
            answer:
              'No. The generator is free and available directly in the browser without registration. That is especially useful for quick feedback loops in design reviews, prototyping sessions, or front-end tasks where you want to test several variations in a few minutes and move on without creating any extra workflow overhead.',
          },
          {
            question: 'How can I make sure a gradient still keeps text readable?',
            answer:
              'A good approach is to preview the gradient with the kind of text or UI layer that will sit on top of it. Designers should look for areas with enough visual stability, and developers should test contrast on multiple screen sizes. If readability drops, reduce saturation, smooth stop transitions, or add an overlay before implementation.',
          },
        ]}
      />
    </>
  );
}
