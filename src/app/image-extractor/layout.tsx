import { Metadata } from 'next';
import ToolPageContent from '@/components/ToolPageContent';

export const metadata: Metadata = {
  title: 'Image Color Extractor - Extract Colors from Images Online',
  description: 'Free online image color extractor. Upload or paste any image and extract its dominant colors automatically. Get HEX color codes for your palette.',
  keywords: ['image color extractor', 'extract colors from image', 'color palette from image', 'image to palette', 'color picker from photo', 'online image color tool'],
  openGraph: {
    title: 'Image Color Extractor - Extract Colors from Images Online',
    description: 'Upload any image and extract its dominant colors. Get HEX codes for your palette.',
    url: 'https://exdreamcolors.win/image-extractor/',
    type: 'website',
  },
};

export default function ImageExtractorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolPageContent
        title="Extract Dominant Colors from Images in Your Browser"
        description="Turn photos, screenshots, illustrations, and brand references into usable palettes with this free online image color extractor for designers and developers. Upload an image, let the browser analyze its dominant tones, and quickly collect practical color values for interface design, creative direction, presentations, mood boards, and front-end styling without registration."
        howToSteps={[
          'Upload an image or paste one into the tool to start the color extraction process.',
          'Review the dominant colors detected from the image and compare the resulting palette.',
          'Copy the color values you want to reuse in design files, brand assets, or code.',
        ]}
        features={[
          'Free online image palette extraction with no account required.',
          'Browser-side processing for a faster and more private workflow.',
          'Real-time results from uploaded visuals and reference images.',
          'Supports practical color formats for both design and development tasks.',
          'Helpful for branding, UI inspiration, photography, and product styling.',
        ]}
        faqs={[
          {
            question: 'What kinds of images work best with this extractor?',
            answer:
              'The tool works well with photos, UI screenshots, illustrations, product shots, posters, and brand references. Images with clear dominant tones usually produce the most useful results, but mixed scenes can also reveal helpful supporting colors. Designers often use it for inspiration, while developers use it to capture palette directions for themes and interfaces.',
          },
          {
            question: 'Can I use extracted colors for website or app design?',
            answer:
              'Yes. Extracted colors are often a strong starting point for interface themes, hero sections, feature cards, and campaign pages. Designers can derive mood and hierarchy from a reference image, and developers can convert those values into CSS variables, tokens, or utility classes. It is a practical bridge between visual inspiration and implementation.',
          },
          {
            question: 'Does the image need to be uploaded to a remote service?',
            answer:
              'The tool is designed around browser-based handling, which is ideal for speed and convenience. That setup is especially useful when you are working with draft visuals, internal mockups, or quick creative explorations and want a lightweight way to analyze colors without creating an account or switching into a heavier desktop workflow.',
          },
          {
            question: 'Why extract colors from an image instead of choosing them manually?',
            answer:
              'Manual picking can miss the overall balance of a visual reference. Extraction helps surface the dominant and supporting tones that make an image feel cohesive. For designers, that means faster mood board and brand exploration. For developers, it provides a more grounded starting point for themes, gradients, charts, and visual consistency across a product.',
          },
          {
            question: 'Can this help with branding or client presentations?',
            answer:
              'Definitely. Teams often use image-based palettes to present color directions tied to photography, packaging, interiors, seasonal campaigns, or competitor research. Extracted palettes make it easier to explain why a visual direction feels consistent. They also give developers a concrete set of values to test early in prototypes or landing page implementations.',
          },
        ]}
      />
    </>
  );
}
