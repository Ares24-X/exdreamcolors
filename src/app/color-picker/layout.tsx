import { Metadata } from 'next';

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
  return <>{children}</>;
}
