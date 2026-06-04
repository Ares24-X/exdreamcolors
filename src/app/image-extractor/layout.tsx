import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Color Extractor - Extract Colors from Images Online | exdreamcolors',
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
  return <>{children}</>;
}
