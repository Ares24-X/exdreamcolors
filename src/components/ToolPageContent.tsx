import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface ReferenceTable {
  heading: string;
  intro?: string;
  headers: string[];
  rows: string[][];
  footnote?: string;
}

interface RelatedGuide {
  href: string;
  badge: string;
  title: string;
  desc: string;
}

interface ToolPageContentProps {
  title: string;
  description: string;
  howToSteps: string[];
  features: string[];
  faqs: FAQ[];
  /** Emit FAQPage structured data for rich results. Off by default. */
  faqSchema?: boolean;
  /** Optional data table rendered above the FAQ block. */
  referenceTable?: ReferenceTable;
  /** Optional internal-link cluster rendered after the FAQ block. */
  relatedGuides?: RelatedGuide[];
  relatedGuidesHeading?: string;
}

export default function ToolPageContent({
  title,
  description,
  howToSteps,
  features,
  faqs,
  faqSchema = false,
  referenceTable,
  relatedGuides,
  relatedGuidesHeading = "Related guides",
}: ToolPageContentProps) {
  const jsonLd = faqSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How to Use
          </h3>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-gray-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Features
          </h3>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex gap-2 text-gray-700">
                <span className="text-green-500 flex-shrink-0">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {referenceTable && (
        <div className="bg-white rounded-2xl shadow-lg p-8 my-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{referenceTable.heading}</h3>
          {referenceTable.intro && <p className="text-gray-600 mb-4">{referenceTable.intro}</p>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {referenceTable.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`px-4 py-3 ${i === 0 ? "rounded-l-lg" : ""} ${
                        i === referenceTable.headers.length - 1 ? "rounded-r-lg" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referenceTable.rows.map((row, r) => (
                  <tr key={r} className="bg-white border-b">
                    {row.map((cell, c) => (
                      <td key={c} className="px-4 py-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {referenceTable.footnote && <p className="text-xs text-gray-500 mt-3">{referenceTable.footnote}</p>}
        </div>
      )}

      {relatedGuides && relatedGuides.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{relatedGuidesHeading}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedGuides.map((guide, i) => (
              <Link
                key={i}
                href={guide.href}
                className="block rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all bg-gradient-to-r from-white to-gray-50"
              >
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full mb-2">
                  {guide.badge}
                </span>
                <h4 className="font-semibold text-gray-900">{guide.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                {faq.question}
              </summary>
              <p className="px-4 pb-4 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
