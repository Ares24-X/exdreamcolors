'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HexColorPicker } from 'react-colorful'
import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb } from '@/lib/colorUtils'

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tailwind CSS Color Generator</h1>
          <p className="text-lg text-gray-600">
            Generate Tailwind CSS color configurations from a base color. Get complete shade palettes.
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
