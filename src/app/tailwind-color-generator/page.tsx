'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HexColorPicker } from 'react-colorful'
import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb } from '@/lib/colorUtils'

const paletteExamples = [
  { name: 'SaaS Blue', colors: ['#eff6ff', '#bfdbfe', '#3b82f6', '#1d4ed8', '#172554'] },
  { name: 'Emerald Dashboard', colors: ['#ecfdf5', '#a7f3d0', '#10b981', '#047857', '#064e3b'] },
  { name: 'Indigo Product UI', colors: ['#eef2ff', '#c7d2fe', '#6366f1', '#4338ca', '#312e81'] },
  { name: 'Rose Marketing', colors: ['#fff1f2', '#fecdd3', '#f43f5e', '#be123c', '#4c0519'] },
  { name: 'Amber Commerce', colors: ['#fffbeb', '#fde68a', '#f59e0b', '#b45309', '#451a03'] },
]

const faqs = [
  {
    question: 'What is a Tailwind color generator?',
    answer: 'A Tailwind color generator turns one base HEX color into a full 50-900 shade scale you can paste into tailwind.config.js, CSS variables, or design tokens.',
  },
  {
    question: 'How do I add generated colors to Tailwind CSS?',
    answer: 'Copy the Tailwind Config block, paste it under theme.extend.colors, restart your dev server, then use classes like bg-primary-500, text-primary-700, and border-primary-200.',
  },
  {
    question: 'Can I use this as a Tailwind palette generator for a brand color?',
    answer: 'Yes. Pick your brand color as the 500-style midpoint, generate the scale, then adjust any shade that needs stronger contrast or a closer brand match.',
  },
  {
    question: 'Is this different from a Tailwind color picker?',
    answer: 'A Tailwind color picker helps choose a single color. This page generates a complete Tailwind CSS colors scale, so developers can use consistent hover, border, background, and text states.',
  },
  {
    question: 'Should I check accessibility after generating colors?',
    answer: 'Yes. Generated shades are a fast starting point, but production UI still needs contrast checks for text, buttons, alerts, and disabled states.',
  },
]

export default function TailwindGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [copied, setCopied] = useState<string | null>(null)

  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Generate Tailwind color shades
  const generateShades = (): { [key: string]: string } => {
    const shades: { [key: string]: string } = {}
    const tailwindShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    
    tailwindShades.forEach((shade, index) => {
      // Adjust lightness based on shade
      let targetLightness = 95 - (index * 8)
      if (shade >= 500) {
        targetLightness = 95 - (index * 6)
      }
      targetLightness = Math.max(5, Math.min(95, targetLightness))
      
      const newRgb = hslToRgb(hsl.h, hsl.s, targetLightness)
      shades[shade.toString()] = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    })
    
    return shades
  }

  const shades = generateShades()

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${Object.entries(shades).map(([shade, color]) => `          ${shade}: '${color}',`).join('\n')}
        }
      }
    }
  }
}`

  const cssVariables = `:root {
${Object.entries(shades).map(([shade, color]) => `  --color-primary-${shade}: ${color};`).join('\n')}
}`

  const javascriptObject = `const colors = {
  primary: {
${Object.entries(shades).map(([shade, color]) => `    ${shade}: '${color}',`).join('\n')}
  }
}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">exdreamcolors</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/tools" className="text-gray-600 hover:text-gray-900">Tools</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="tool-container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tailwind Color Generator</h1>
          <p className="text-lg text-gray-600">
            Generate Tailwind CSS colors from one base color. Build a complete 50-900 palette, copy config-ready code, and ship consistent UI tokens faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Selection */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Base Color</h2>
              <HexColorPicker color={baseColor} onChange={setBaseColor} style={{ width: '100%', height: '250px' }} />
              <div className="mt-4">
                <input
                  type="text"
                  value={baseColor.toUpperCase()}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Generated Shades */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Generated Shades</h2>
              <div className="space-y-2">
                {Object.entries(shades).map(([shade, color]) => (
                  <div key={shade} className="flex items-center gap-3">
                    <div
                      className="w-20 h-12 rounded-lg shadow-inner cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color, `shade-${shade}`)}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium">{shade}</div>
                      <code className="text-sm text-gray-600">{color.toUpperCase()}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(color, `shade-${shade}`)}
                      className="btn btn-secondary text-sm"
                    >
                      {copied === `shade-${shade}` ? '✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-6">
            {/* Tailwind Config */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tailwind Config</h2>
                <button
                  onClick={() => copyToClipboard(tailwindConfig, 'tailwind-config')}
                  className="btn btn-primary"
                >
                  {copied === 'tailwind-config' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="code-block overflow-x-auto text-sm">
                {tailwindConfig}
              </pre>
            </div>

            {/* CSS Variables */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">CSS Variables</h2>
                <button
                  onClick={() => copyToClipboard(cssVariables, 'css-vars')}
                  className="btn btn-secondary"
                >
                  {copied === 'css-vars' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="code-block overflow-x-auto text-sm">
                {cssVariables}
              </pre>
            </div>

            {/* JavaScript Object */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">JavaScript Object</h2>
                <button
                  onClick={() => copyToClipboard(javascriptObject, 'js-object')}
                  className="btn btn-secondary"
                >
                  {copied === 'js-object' ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="code-block overflow-x-auto text-sm">
                {javascriptObject}
              </pre>
            </div>

            {/* Usage Examples */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">HTML/Tailwind</h3>
                  <pre className="code-block text-sm">
{`<button className="bg-primary-500 text-white px-4 py-2 rounded">
  Primary Button
</button>

<div className="text-primary-700">Dark Text</div>

<div className="bg-primary-100 px-4 py-2 rounded">
  Light Background
</div>`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium mb-2">CSS</h3>
                  <pre className="code-block text-sm">
{`.btn {
  background-color: ${baseColor};
  color: white;
}

.text-primary {
  color: ${baseColor};
}

.bg-primary-light {
  background-color: ${shades[100]};
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Step-by-step guide */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How to use this Tailwind palette generator</h2>
            <p className="text-gray-600">Use it when a brand color needs to become practical Tailwind CSS colors for real components.</p>
          </div>
          <div className="lg:col-span-2 card">
            <ol className="space-y-4 list-decimal list-inside text-gray-700">
              <li><strong>Pick a base color.</strong> Use the Tailwind color picker above or paste a HEX value from your design file.</li>
              <li><strong>Review the generated scale.</strong> Use lighter shades for surfaces and darker shades for text, borders, and active states.</li>
              <li><strong>Copy the Tailwind config.</strong> Paste it into <code>theme.extend.colors</code> so classes like <code>bg-primary-500</code> work.</li>
              <li><strong>Export tokens if needed.</strong> Copy CSS variables for design systems, docs, or non-Tailwind components.</li>
              <li><strong>Check contrast.</strong> Validate key combinations before shipping buttons, alerts, forms, and navigation.</li>
            </ol>
            <pre className="code-block text-sm mt-6 overflow-x-auto">{`// Example usage after adding the generated scale
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Save changes
</button>
<div className="bg-primary-50 border border-primary-200 text-primary-900">
  Info message
</div>`}</pre>
          </div>
        </section>

        {/* Palette examples */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Tailwind color palette examples</h2>
          <p className="text-gray-600 mb-6">Use these examples as starting points for dashboards, landing pages, SaaS apps, and commerce UI.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {paletteExamples.map((example) => (
              <div key={example.name} className="card">
                <h3 className="font-semibold mb-3">{example.name}</h3>
                <div className="flex h-16 rounded-lg overflow-hidden mb-3">
                  {example.colors.map((color) => (
                    <div key={color} className="flex-1" style={{ backgroundColor: color }} title={color}></div>
                  ))}
                </div>
                <div className="space-y-1">
                  {example.colors.map((color) => (
                    <code key={color} className="block text-xs text-gray-600">{color}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO content and internal links */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Build Tailwind CSS colors that work in production</h2>
            <div className="space-y-4 text-gray-700">
              <p>A good Tailwind color generator should do more than create random tints. Developers need a predictable scale for backgrounds, borders, focus rings, hover states, and readable text.</p>
              <p>This tool creates a practical Tailwind palette generator workflow: choose one base color, inspect the shade ramp, then copy code for Tailwind, CSS variables, or JavaScript tokens.</p>
              <p>If you are comparing a Tailwind color picker, a generic palette tool, and a design-token workflow, start here for implementation-ready output.</p>
            </div>
          </div>
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Related color tools</h2>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="/color-picker" className="text-blue-600 hover:underline">Color Picker</Link> — choose an exact HEX base color before generating a Tailwind scale.</li>
              <li><Link href="/palette-generator" className="text-blue-600 hover:underline">Palette Generator</Link> — create multi-color schemes before turning one role into Tailwind shades.</li>
              <li><Link href="/contrast-checker" className="text-blue-600 hover:underline">Contrast Checker</Link> — test generated text and background combinations against WCAG.</li>
              <li><Link href="/gradient-generator" className="text-blue-600 hover:underline">Gradient Generator</Link> — combine generated colors into CSS gradients.</li>
              <li><Link href="/image-extractor" className="text-blue-600 hover:underline">Image Color Extractor</Link> — pull a brand color from screenshots, logos, or reference images.</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tailwind Color Generator FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/color-picker" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎨 Color Picker</h3>
              <p className="text-sm text-gray-600">Pick a base color</p>
            </Link>
            <Link href="/palette-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎭 Palette Generator</h3>
              <p className="text-sm text-gray-600">Generate color schemes</p>
            </Link>
            <Link href="/gradient-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🌈 Gradient Generator</h3>
              <p className="text-sm text-gray-600">Create gradients</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
