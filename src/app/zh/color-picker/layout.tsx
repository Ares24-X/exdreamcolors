import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '取色器 - 在线选取RGB、HEX、HSL颜色',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
