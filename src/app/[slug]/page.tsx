import Link from "next/link";
import { articleDatabase, articleSlugs } from "@/data/article-database";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articleDatabase[params.slug];
  if (!article) notFound();

  const titleParts = article.title.split(" | ");
  const displayTitle = titleParts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{displayTitle}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{displayTitle}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>5 min read</span>
          <span>|</span>
          <span>Updated {new Date().toISOString().split("T")[0]}</span>
        </div>
      </header>

      <article className="prose prose-lg max-w-none">
        <h2>What is {displayTitle}?</h2>
        <p>
          {displayTitle} is a fundamental concept in color theory and web design that every designer and developer should understand.
          This comprehensive guide will walk you through everything you need to know, from basic principles to advanced techniques.
        </p>
        <p>
          Whether you are building a new website, creating a brand identity, or working on a design project,
          mastering {displayTitle.toLowerCase()} will help you make better visual decisions.
        </p>

        <h2>Why {displayTitle} Matters</h2>
        <p>Understanding {displayTitle.toLowerCase()} is essential because:</p>
        <ul>
          <li><strong>Better User Experience:</strong> Proper use of color improves readability and engagement</li>
          <li><strong>Brand Consistency:</strong> Consistent color usage builds brand recognition</li>
          <li><strong>Accessibility:</strong> Good color choices ensure your content is accessible to everyone</li>
          <li><strong>Conversion Optimization:</strong> The right colors can significantly impact conversion rates</li>
        </ul>

        <h2>Key Concepts</h2>
        <h3>1. The Basics</h3>
        <p>
          At its core, {displayTitle.toLowerCase()} involves understanding how colors interact with each other and how they
          affect human perception. Colors can evoke emotions, create hierarchy, and guide user attention.
        </p>

        <h3>2. Practical Applications</h3>
        <p>Here are some common use cases:</p>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`:root {
  --primary-color: #3B82F6;
  --secondary-color: #8B5CF6;
  --text-color: #1F2937;
  --background-color: #FFFFFF;
}

.button {
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}`}
        </pre>

        <h3>3. Best Practices</h3>
        <ol>
          <li><strong>Start with a purpose:</strong> Define what emotion or action you want to evoke</li>
          <li><strong>Test contrast:</strong> Always check readability with a contrast checker</li>
          <li><strong>Consider context:</strong> Colors look different on various screens and in different lighting</li>
          <li><strong>Stay consistent:</strong> Use a limited color palette throughout your design</li>
          <li><strong>Test with users:</strong> Get feedback from real users when possible</li>
        </ol>

        <h2>Common Mistakes to Avoid</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
          <ul className="space-y-2">
            <li>Ignoring color blindness and accessibility guidelines</li>
            <li>Using too many colors in a single design</li>
            <li>Choosing colors based purely on personal preference</li>
            <li>Neglecting mobile and dark mode considerations</li>
            <li>Forgetting to test across different browsers</li>
          </ul>
        </div>

        <h2>Tools to Help You</h2>
        <p>Use these free tools to implement {displayTitle.toLowerCase()} in your projects:</p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <Link href="/color-picker" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>Color Picker</strong>
            <p className="text-sm text-gray-600">Find the perfect colors</p>
          </Link>
          <Link href="/contrast-checker" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>Contrast Checker</strong>
            <p className="text-sm text-gray-600">Ensure accessibility</p>
          </Link>
          <Link href="/palette-generator" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>Palette Generator</strong>
            <p className="text-sm text-gray-600">Create harmonious palettes</p>
          </Link>
          <Link href="/gradient-generator" className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md">
            <strong>Gradient Generator</strong>
            <p className="text-sm text-gray-600">Design beautiful gradients</p>
          </Link>
        </div>

        <h2>Conclusion</h2>
        <p>
          {displayTitle} is a powerful tool in your design toolkit. By understanding and applying these principles,
          you can create more effective, accessible, and visually appealing designs.
        </p>
        <p>
          Start experimenting today with our free color tools and see the difference proper color choices can make!
        </p>
      </article>
    </div>
  );
}
