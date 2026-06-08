interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageContentProps {
  title: string;
  description: string;
  howToSteps: string[];
  features: string[];
  faqs: FAQ[];
}

export default function ToolPageContent({
  title,
  description,
  howToSteps,
  features,
  faqs,
}: ToolPageContentProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
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

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg">
                <summary className="cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                  {faq.question}
                </summary>
                <p className="px-4 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
