import { Metadata } from "next";
import { articleDatabase } from "@/data/article-database";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articleDatabase[params.slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
