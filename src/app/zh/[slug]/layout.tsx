import { Metadata } from "next";
import { articleDatabase, articleSlugs } from "@/data/article-database";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articleDatabase[params.slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://exdreamcolors.win/${params.slug}`,
      languages: { "en": `https://exdreamcolors.win/${params.slug}`, "zh-CN": `https://exdreamcolors.win/zh/${params.slug}` },
    },
  };
}

export default function ZhArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
