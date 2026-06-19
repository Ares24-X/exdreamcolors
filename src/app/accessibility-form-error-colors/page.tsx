import Link from "next/link";

export const metadata = {
  title: "Usable Input States: WCAG Patterns for Product UI | ExDreamVisual Tokens",
  description: "Design input warning, failure, success, and helper states that pass readability checks without relying on hue alone.",
};

const stateRows = [
  ["Invalid entry", "#B42318", "#FEF3F2", "7.34:1", "Text + icon + field border"],
  ["Warning", "#B54708", "#FFFAEB", "5.77:1", "Text + alert icon + short instruction"],
  ["Success", "#027A48", "#ECFDF3", "5.42:1", "Text + check icon, never green alone"],
  ["Info", "#175CD3", "#EFF8FF", "5.89:1", "Helper text + focus-safe border"],
];

const checklist = [
  "Normal text reaches at least 4.5:1 against its background.",
  "Large labels and icons reach at least 3:1.",
  "The same message is understandable in grayscale.",
  "Every state has a non-hue cue: icon, text, border style, or layout change.",
  "Focus rings remain visible when an invalid entry border is already present.",
];

export default function AccessibilityFormErrorColorsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/">Home</Link><span className="mx-2">/</span><Link href="/blog">Blog</Link><span className="mx-2">/</span><span>Usable Input States</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Usable Input States: WCAG Patterns for Product UI</h1>
      <p className="text-sm text-slate-500 mb-10">Updated 2026-06-19 · 9 min read</p>

      <section className="text-lg leading-relaxed text-slate-700 mb-10">
        <p>Use danger hue as a signal, not as the whole message. An input state is usable when the text, border, icon, and instruction still make sense after hue is removed.</p>
        <p className="mt-4">Most teams fail here because they treat validation as decoration. They pick a strong danger token, add a thin border, and assume the job is done. That breaks for hue-vision differences, low-quality displays, dark mode, and users scanning under pressure. The fix is a state system, not a prettier shade.</p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">The 4-Part Rule</h2>
        <p className="text-slate-700 leading-relaxed">Every validation state needs four parts: readable message text, visible field boundary, an icon or shape cue, and a short recovery instruction. Remove any one of those and the interface becomes slower to understand.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Original Test Data: Four State Tokens</h2>
        <p className="text-slate-700 leading-relaxed mb-4">I tested four production-friendly state pairs against white cards and pale tinted backgrounds. The goal was not maximum readability at any cost. The goal was enough clarity for real forms while keeping the UI calm enough for checkout, signup, and account settings screens.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-4 py-3 text-left">State</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Text token</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Surface token</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Ratio</th>
                <th className="border border-slate-300 px-4 py-3 text-left">Required cue</th>
              </tr>
            </thead>
            <tbody>
              {stateRows.map(([state, text, surface, ratio, cue]) => (
                <tr key={state}>
                  <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">{state}</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700"><code>{text}</code></td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700"><code>{surface}</code></td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">{ratio}</td>
                  <td className="border border-slate-300 px-4 py-3 text-slate-700">{cue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Brand Examples Worth Copying</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p><strong>Stripe</strong> keeps payment invalid entries direct: strong message text, clear field linkage, and recovery copy near the broken input. The visual system does not depend on a border alone.</p>
          <p><strong>Shopify</strong> uses state hue with plain-language instructions in admin flows. That matters because merchants are often fixing product, tax, or shipping data under time pressure.</p>
          <p><strong>GitHub</strong> pairs status hue with icons and labels across issue flows, settings, and notifications. The pattern survives grayscale because shape and text carry the meaning.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Copy-Ready CSS Tokens</h2>
        <pre className="bg-slate-900 text-slate-100 p-5 rounded-xl overflow-x-auto text-sm"><code>{`:root {
  --state-danger-text: #B42318;
  --state-danger-bg: #FEF3F2;
  --state-warning-text: #B54708;
  --state-warning-bg: #FFFAEB;
  --state-success-text: #027A48;
  --state-success-bg: #ECFDF3;
  --focus-ring: #175CD3;
}

.field[data-state="invalid"] {
  border: 1px solid var(--state-danger-text);
  background: var(--state-danger-bg);
}

.field[data-state="invalid"] + .message::before {
  content: "⚠ ";
}`}</code></pre>
      </section>

      <section className="mb-10 p-6 bg-slate-50 rounded-xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Validation Checklist</h2>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item} className="flex gap-3 text-slate-700"><span className="text-blue-500 font-bold">□</span><span>{item}</span></li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Dark Mode Adjustment</h2>
        <p className="text-slate-700 leading-relaxed">Do not invert state visual tokens mechanically. On dark surfaces, a bright danger shade can vibrate and look like an alert banner instead of field feedback. Start with the same hue, lower saturation by 8-12%, raise perceived lightness for text, then test the pair again. If the message feels loud, the token is doing branding work instead of usability work.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tiny Audit Before Release</h2>
        <p className="text-slate-700 leading-relaxed">Take one real checkout or signup screen, switch it to grayscale, then tab through every input using only the keyboard. If you can still find the broken field, understand the instruction, and see the focus ring, the visual system is ready for production. If not, fix the cue before changing the shade.</p>
      </section>

      <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Test Your State System</h2>
        <p className="text-slate-600 mb-4">Run each foreground and background pair through a checker before shipping the flow.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contrast-checker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Readability Tool</Link>
          <Link href="/color-picker" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Hue Picker</Link>
          <Link href="/palette-generator" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-blue-600 font-medium">Palette Generator</Link>
        </div>
      </section>
    </main>
  );
}
