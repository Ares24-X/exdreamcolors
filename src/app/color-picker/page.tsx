'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HexColorPicker } from 'react-colorful'
import { hexToRgb, rgbToHsl } from '@/lib/colorUtils'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3B82F6')
  const [copied, setCopied] = useState<string | null>(null)

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">exdreamcolors</span>
              </Link>
            </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Color Picker</h1>
          <p className="text-lg text-gray-600">
            Pick any color and instantly get HEX, RGB, and HSL values. Copy code with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Picker */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Select Color</h2>
            <div className="flex flex-col items-center">
              <HexColorPicker color={color} onChange={setColor} style={{ width: '100%', height: '300px' }} />
              <div className="mt-4 flex gap-4 w-full">
                <input
                  type="text"
                  value={color.toUpperCase()}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="#000000"
                />
                <button
                  onClick={() => copyToClipboard(color.toUpperCase(), 'hex')}
                  className="btn btn-primary whitespace-nowrap"
                >
                  {copied === 'hex' ? '✓ Copied!' : 'Copy HEX'}
                </button>
              </div>
            </div>
          </div>

          {/* Color Preview & Values */}
          <div className="space-y-6">
            {/* Large Preview */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div
                className="w-full h-48 rounded-lg shadow-inner"
                style={{ backgroundColor: color }}
              ></div>
            </div>

            {/* Color Values */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Color Values</h2>
              <div className="space-y-4">
                {/* HEX */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">HEX</div>
                    <code className="text-sm text-gray-600">{color.toUpperCase()}</code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(color.toUpperCase(), 'hex')}
                    className="btn btn-secondary text-sm"
                  >
                    {copied === 'hex' ? '✓' : 'Copy'}
                  </button>
                </div>

                {/* RGB */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">RGB</div>
                    <code className="text-sm text-gray-600">
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                    className="btn btn-secondary text-sm"
                  >
                    {copied === 'rgb' ? '✓' : 'Copy'}
                  </button>
                </div>

                {/* HSL */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">HSL</div>
                    <code className="text-sm text-gray-600">
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                    className="btn btn-secondary text-sm"
                  >
                    {copied === 'hsl' ? '✓' : 'Copy'}
                  </button>
                </div>

                {/* CSS Variable */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">CSS Variable</div>
                    <code className="text-sm text-gray-600">
                      --color-primary: {color.toUpperCase()}
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`--color-primary: ${color.toUpperCase()}`, 'css')}
                    className="btn btn-secondary text-sm"
                  >
                    {copied === 'css' ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Ready-to-Use Code</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CSS */}
              <div>
                <h3 className="font-medium mb-2">CSS</h3>
                <pre className="code-block">
{`.color-primary {
  color: ${color};
  background-color: ${color};
}`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`.color-primary {\n  color: ${color};\n  background-color: ${color};\n}`, 'css-code')}
                  className="btn btn-secondary mt-2 w-full"
                >
                  {copied === 'css-code' ? '✓ Copied!' : 'Copy CSS'}
                </button>
              </div>

              {/* Tailwind */}
              <div>
                <h3 className="font-medium mb-2">Tailwind Inline</h3>
                <pre className="code-block">
{`<div className="text-[${color}] bg-[${color}]">
  Your Content
</div>`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`<div className="text-[${color}] bg-[${color}]">\n  Your Content\n</div>`, 'tailwind-code')}
                  className="btn btn-secondary mt-2 w-full"
                >
                  {copied === 'tailwind-code' ? '✓ Copied!' : 'Copy Tailwind'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/palette-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎭 Palette Generator</h3>
              <p className="text-sm text-gray-600">Generate color schemes from your color</p>
            </Link>
            <Link href="/gradient-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🌈 Gradient Generator</h3>
              <p className="text-sm text-gray-600">Create gradients with your color</p>
            </Link>
            <Link href="/tailwind-color-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">💻 Tailwind Color Generator</h3>
              <p className="text-sm text-gray-600">Turn your color into Tailwind CSS colors</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
