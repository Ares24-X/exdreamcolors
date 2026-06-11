'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#3B82F6')
  const [color2, setColor2] = useState('#8B5CF6')
  const [angle, setAngle] = useState(135)
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  const [copied, setCopied] = useState<string | null>(null)

  const getGradient = () => {
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`
    } else {
      return `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const presets = [
    { name: 'Ocean', colors: ['#667eea', '#764ba2'] },
    { name: 'Sunset', colors: ['#f093fb', '#f5576c'] },
    { name: 'Forest', colors: ['#11998e', '#38ef7d'] },
    { name: 'Fire', colors: ['#ff416c', '#ff4b2b'] },
    { name: 'Ice', colors: ['#00c6fb', '#005bea'] },
    { name: 'Gold', colors: ['#f7971e', '#ffd200'] },
  ]

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CSS Gradient Generator</h1>
          <p className="text-lg text-gray-600">
            Create beautiful CSS gradients with live preview. Linear and radial gradients supported.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings */}
          <div className="space-y-6">
            {/* Gradient Preview */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div
                className="w-full h-64 rounded-lg shadow-inner"
                style={{ background: getGradient() }}
              ></div>
            </div>

            {/* Type Selection */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Gradient Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gradientType === 'linear'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">➖</div>
                  <div className="font-medium">Linear</div>
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    gradientType === 'radial'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">⭕</div>
                  <div className="font-medium">Radial</div>
                </button>
              </div>
            </div>

            {/* Color Inputs */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Colors</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color1.toUpperCase()}
                      onChange={(e) => setColor1(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color2.toUpperCase()}
                      onChange={(e) => setColor2(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Angle (for linear) */}
            {gradientType === 'linear' && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Angle: {angle}°</h2>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0°</span>
                  <span>90°</span>
                  <span>180°</span>
                  <span>270°</span>
                  <span>360°</span>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Presets</h2>
              <div className="grid grid-cols-3 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setColor1(preset.colors[0])
                      setColor2(preset.colors[1])
                    }}
                    className="relative h-16 rounded-lg overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${preset.colors[0]} 0%, ${preset.colors[1]} 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-6">
            {/* CSS Code */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">CSS Code</h2>
              <pre className="code-block whitespace-pre-wrap">
{`background: ${getGradient()};`}
              </pre>
              <button
                onClick={() => copyToClipboard(`background: ${getGradient()};`, 'css')}
                className="btn btn-primary mt-4 w-full"
              >
                {copied === 'css' ? '✓ Copied!' : 'Copy CSS'}
              </button>
            </div>

            {/* Full CSS Example */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Full CSS Example</h2>
              <pre className="code-block">
{`.gradient-bg {
  background: ${getGradient()};
  /* For modern browsers */
  background: -webkit-${getGradient()};
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `.gradient-bg {\n  background: ${getGradient()};\n  /* For modern browsers */\n  background: -webkit-${getGradient()};\n}`,
                  'full-css'
                )}
                className="btn btn-secondary mt-4 w-full"
              >
                {copied === 'full-css' ? '✓ Copied!' : 'Copy Full CSS'}
              </button>
            </div>

            {/* Tailwind */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Tailwind Classes</h2>
              <pre className="code-block">
{`<!-- Using arbitrary values -->
<div className="bg-[${getGradient()}]">
  Your Content
</div>`}
              </pre>
              <button
                onClick={() => copyToClipboard(
                  `<!-- Using arbitrary values -->\n<div className="bg-[${getGradient()}]">\n  Your Content\n</div>`,
                  'tailwind'
                )}
                className="btn btn-secondary mt-4 w-full"
              >
                {copied === 'tailwind' ? '✓ Copied!' : 'Copy Tailwind'}
              </button>
            </div>

            {/* Use Cases */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
              <div className="space-y-3">
                <div>
                  <div className="font-medium mb-1">Button</div>
                  <button
                    className="w-full py-3 rounded-lg text-white font-medium shadow-lg hover:opacity-90 transition-opacity"
                    style={{ background: getGradient() }}
                  >
                    Gradient Button
                  </button>
                </div>
                <div>
                  <div className="font-medium mb-1">Card</div>
                  <div
                    className="p-6 rounded-lg text-white"
                    style={{ background: getGradient() }}
                  >
                    <h3 className="font-semibold text-lg">Card Title</h3>
                    <p className="opacity-90">Card content goes here</p>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Text Gradient</div>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      background: getGradient(),
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Gradient Text
                  </div>
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
              <p className="text-sm text-gray-600">Pick individual colors</p>
            </Link>
            <Link href="/palette-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎭 Palette Generator</h3>
              <p className="text-sm text-gray-600">Generate color schemes</p>
            </Link>
            <Link href="/tailwind-color-generator" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">💻 Tailwind Color Generator</h3>
              <p className="text-sm text-gray-600">Create Tailwind CSS colors</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
