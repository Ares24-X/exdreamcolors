'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HexColorPicker } from 'react-colorful'
import { getContrastRatio, checkWCAGContrast, hexToRgb, rgbToHsl } from '@/lib/colorUtils'

export default function ContrastCheckerPage() {
  const [foreground, setForeground] = useState('#000000')
  const [background, setBackground] = useState('#FFFFFF')
  const [copied, setCopied] = useState<string | null>(null)

  const contrastRatio = getContrastRatio(foreground, background)
  const wcag = checkWCAGContrast(contrastRatio)
  const fgRgb = hexToRgb(foreground)
  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b)
  const bgRgb = hexToRgb(background)
  const bgHsl = rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const swapColors = () => {
    const temp = foreground
    setForeground(background)
    setBackground(temp)
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contrast Checker</h1>
          <p className="text-lg text-gray-600">
            Check color contrast ratios for accessibility. Ensure your colors meet WCAG guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Color Selection */}
          <div className="space-y-6">
            {/* Foreground Color */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Foreground (Text)</h2>
              <HexColorPicker color={foreground} onChange={setForeground} style={{ width: '100%', height: '200px' }} />
              <div className="mt-4">
                <input
                  type="text"
                  value={foreground.toUpperCase()}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 text-sm text-gray-600">
                  RGB: rgb({fgRgb.r}, {fgRgb.g}, {fgRgb.b})
                </div>
                <div className="text-sm text-gray-600">
                  HSL: hsl({fgHsl.h}, {fgHsl.s}%, {fgHsl.l}%)
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <button onClick={swapColors} className="btn btn-secondary w-full">
              ⇅ Swap Colors
            </button>

            {/* Background Color */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Background</h2>
              <HexColorPicker color={background} onChange={setBackground} style={{ width: '100%', height: '200px' }} />
              <div className="mt-4">
                <input
                  type="text"
                  value={background.toUpperCase()}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 text-sm text-gray-600">
                  RGB: rgb({bgRgb.r}, {bgRgb.g}, {bgRgb.b})
                </div>
                <div className="text-sm text-gray-600">
                  HSL: hsl({bgHsl.h}, {bgHsl.s}%, {bgHsl.l}%)
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div
                className="w-full p-12 rounded-lg text-center"
                style={{ backgroundColor: background }}
              >
                <div
                  className="text-4xl font-bold mb-4"
                  style={{ color: foreground }}
                >
                  Large Text (24px+)
                </div>
                <div
                  className="text-lg mb-4"
                  style={{ color: foreground }}
                >
                  Normal text looks like this. Make sure it's readable!
                </div>
                <button
                  className="px-6 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: foreground, color: background }}
                >
                  Sample Button
                </button>
              </div>
            </div>

            {/* Contrast Ratio */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Contrast Ratio</h2>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: foreground }}>
                  {contrastRatio.toFixed(2)}:1
                </div>
                <div className="text-gray-600">WCAG Contrast Ratio</div>
              </div>
            </div>

            {/* WCAG Results */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">WCAG Compliance</h2>
              <div className="space-y-4">
                {/* AA Level */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">WCAG AA</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      wcag.AA.normal && wcag.AA.large 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {wcag.AA.normal && wcag.AA.large ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Normal Text (under 18px):</span>
                      <span className={wcag.AA.normal ? 'text-green-600' : 'text-red-600'}>
                        {wcag.AA.normal ? '✓ Pass (4.5:1+)' : '✗ Fail (need 4.5:1)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Large Text (18px+ or 14px bold):</span>
                      <span className={wcag.AA.large ? 'text-green-600' : 'text-red-600'}>
                        {wcag.AA.large ? '✓ Pass (3:1+)' : '✗ Fail (need 3:1)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AAA Level */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">WCAG AAA</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      wcag.AAA.normal && wcag.AAA.large 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {wcag.AAA.normal && wcag.AAA.large ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Normal Text:</span>
                      <span className={wcag.AAA.normal ? 'text-green-600' : 'text-red-600'}>
                        {wcag.AAA.normal ? '✓ Pass (7:1+)' : '✗ Fail (need 7:1)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Large Text:</span>
                      <span className={wcag.AAA.large ? 'text-green-600' : 'text-red-600'}>
                        {wcag.AAA.large ? '✓ Pass (4.5:1+)' : '✗ Fail (need 4.5:1)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Quick Fixes</h2>
              <div className="space-y-3">
                {!wcag.AA.normal && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">Need better contrast</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      Try making the foreground darker or background lighter.
                    </div>
                  </div>
                )}
                {wcag.AA.normal && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800">✓ Good contrast!</div>
                    <div className="text-sm text-green-700 mt-1">
                      This color combination passes WCAG AA standards.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Code Output */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">CSS Code</h2>
              <pre className="code-block">
{`/* Text Color */
color: ${foreground};

/* Background Color */
background-color: ${background};

/* Contrast Ratio */
${contrastRatio.toFixed(2)}:1`}
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `/* Text Color */\ncolor: ${foreground};\n\n/* Background Color */\nbackground-color: ${background};\n\n/* Contrast Ratio */\n${contrastRatio.toFixed(2)}:1`,
                  'css'
                )}
                className="btn btn-primary mt-4 w-full"
              >
                {copied === 'css' ? '✓ Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/color-picker" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎨 Color Picker</h3>
              <p className="text-sm text-gray-600">Pick colors for testing</p>
            </Link>
            <Link href="/palette-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎭 Palette Generator</h3>
              <p className="text-sm text-gray-600">Generate accessible palettes</p>
            </Link>
            <Link href="/tailwind-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">💻 Tailwind Generator</h3>
              <p className="text-sm text-gray-600">Export as Tailwind config</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
