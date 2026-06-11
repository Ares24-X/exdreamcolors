'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HexColorPicker } from 'react-colorful'
import { generatePalette, PaletteType } from '@/lib/paletteGenerator'
import { getContrastRatio, checkWCAGContrast } from '@/lib/colorUtils'

export default function PaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [paletteType, setPaletteType] = useState<PaletteType>('complementary')
  const [copied, setCopied] = useState<string | null>(null)

  const palette = generatePalette(baseColor, paletteType)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const paletteTypes: { value: PaletteType; label: string; description: string }[] = [
    { value: 'complementary', label: 'Complementary', description: 'Opposite colors on the wheel' },
    { value: 'analogous', label: 'Analogous', description: 'Adjacent colors' },
    { value: 'triadic', label: 'Triadic', description: 'Three evenly spaced colors' },
    { value: 'split-complementary', label: 'Split Complementary', description: 'Base + two adjacent to complement' },
    { value: 'tetradic', label: 'Tetradic', description: 'Four colors in rectangle' },
    { value: 'monochromatic', label: 'Monochromatic', description: 'Variations of one color' },
  ]

  const copyAllAsJSON = () => {
    const json = JSON.stringify({
      colors: palette.map(c => ({
        hex: c.hex,
        name: c.name,
        role: c.role
      }))
    }, null, 2)
    copyToClipboard(json, 'all-json')
  }

  const copyAllAsCSS = () => {
    const css = palette.map(c => `  --color-${c.role}: ${c.hex};`).join('\n')
    const full = `:root {\n${css}\n}`
    copyToClipboard(full, 'all-css')
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Color Palette Generator</h1>
          <p className="text-lg text-gray-600">
            Generate beautiful color palettes based on color theory. Choose a base color and harmony type.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Base Color</h2>
              <HexColorPicker color={baseColor} onChange={setBaseColor} style={{ width: '100%', height: '200px' }} />
              <div className="mt-4">
                <input
                  type="text"
                  value={baseColor.toUpperCase()}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Harmony Type</h2>
              <div className="space-y-2">
                {paletteTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPaletteType(type.value)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      paletteType === type.value
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Palette Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Color Swatches */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Palette</h2>
                <div className="flex gap-2">
                  <button onClick={copyAllAsCSS} className="btn btn-secondary text-sm">
                    {copied === 'all-css' ? '✓ Copied!' : 'Copy CSS'}
                  </button>
                  <button onClick={copyAllAsJSON} className="btn btn-secondary text-sm">
                    {copied === 'all-json' ? '✓ Copied!' : 'Copy JSON'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="h-32 rounded-lg shadow-inner cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, `color-${index}`)}
                      title="Click to copy"
                    ></div>
                    <div className="text-center">
                      <div className="font-mono text-sm font-medium">{color.hex.toUpperCase()}</div>
                      <div className="text-xs text-gray-500">{color.name}</div>
                      {copied === `color-${index}` && (
                        <div className="text-xs text-green-600">✓ Copied!</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed View */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Color Details</h2>
              <div className="space-y-3">
                {palette.map((color, index) => {
                  const contrastWithWhite = getContrastRatio(color.hex, '#FFFFFF')
                  const contrastWithBlack = getContrastRatio(color.hex, '#000000')
                  const wcag = checkWCAGContrast(contrastWithWhite)

                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4 mb-2">
                        <div
                          className="w-16 h-16 rounded-lg shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="flex-1">
                          <div className="font-semibold">{color.name}</div>
                          <code className="text-sm text-gray-600">{color.hex.toUpperCase()}</code>
                        </div>
                        <button
                          onClick={() => copyToClipboard(color.hex, `detail-${index}`)}
                          className="btn btn-primary"
                        >
                          {copied === `detail-${index}` ? '✓' : 'Copy'}
                        </button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-gray-600">vs White: </span>
                            <span className="font-medium">{contrastWithWhite.toFixed(2)}:1</span>
                            {wcag.AA.normal ? (
                              <span className="ml-2 text-green-600">✓ AA</span>
                            ) : (
                              <span className="ml-2 text-red-600">✗</span>
                            )}
                          </div>
                          <div>
                            <span className="text-gray-600">vs Black: </span>
                            <span className="font-medium">{contrastWithBlack.toFixed(2)}:1</span>
                            {contrastWithBlack >= 4.5 ? (
                              <span className="ml-2 text-green-600">✓</span>
                            ) : (
                              <span className="ml-2 text-yellow-600">⚠</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CSS Variables */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
              <pre className="code-block overflow-x-auto">
{`:root {
${palette.map(c => `  --color-${c.role}: ${c.hex};`).join('\n')}
}`}
              </pre>
              <button
                onClick={copyAllAsCSS}
                className="btn btn-primary mt-4 w-full"
              >
                {copied === 'all-css' ? '✓ Copied!' : 'Copy All CSS Variables'}
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
              <p className="text-sm text-gray-600">Pick individual colors</p>
            </Link>
            <Link href="/gradient-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🌈 Gradient Generator</h3>
              <p className="text-sm text-gray-600">Create gradients from palette</p>
            </Link>
            <Link href="/tailwind-color-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">💻 Tailwind Color Generator</h3>
              <p className="text-sm text-gray-600">Create a full Tailwind palette</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
