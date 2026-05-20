'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { rgbToHex } from '@/lib/colorUtils'

export default function ImageExtractorPage() {
  const [image, setImage] = useState<string | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [extracting, setExtracting] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [colorCount, setColorCount] = useState(5)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setColors([])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setColors([])
      }
      reader.readAsDataURL(file)
    }
  }

  const extractColors = () => {
    if (!image || !canvasRef.current) return

    setExtracting(true)
    
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size (max 200px for performance)
      const maxSize = 200
      let width = img.width
      let height = img.height
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const pixels = imageData.data
      
      // Simple color quantization
      const colorMap: Map<string, number> = new Map()
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = Math.round(pixels[i] / 32) * 32
        const g = Math.round(pixels[i + 1] / 32) * 32
        const b = Math.round(pixels[i + 2] / 32) * 32
        
        // Skip very dark or very light colors
        const brightness = (r + g + b) / 3
        if (brightness < 20 || brightness > 235) continue
        
        const hex = rgbToHex(r, g, b)
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
      }

      // Sort by frequency and take top N
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([hex]) => hex)

      setColors(sortedColors)
      setExtracting(false)
    }
    img.src = image
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Color Extractor</h1>
          <p className="text-lg text-gray-600">
            Extract colors from any image. Upload or drag & drop an image to get its color palette.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {image ? (
                  <img src={image} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
                ) : (
                  <>
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-lg text-gray-600 mb-2">
                      Drag & drop an image here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, GIF, WebP
                    </p>
                  </>
                )}
              </div>
            </div>

            {image && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Extract Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Colors: {colorCount}
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      value={colorCount}
                      onChange={(e) => setColorCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>3</span>
                      <span>10</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={extractColors}
                    disabled={extracting}
                    className="btn btn-primary w-full"
                  >
                    {extracting ? 'Extracting...' : 'Extract Colors'}
                  </button>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Extracted Colors */}
          <div className="space-y-6">
            {colors.length > 0 ? (
              <>
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Extracted Colors</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div
                          className="w-20 h-20 rounded-lg shadow-inner cursor-pointer transition-transform hover:scale-105"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, `color-${index}`)}
                        ></div>
                        <div className="flex-1">
                          <div className="font-mono text-lg font-semibold">{color.toUpperCase()}</div>
                          <div className="text-sm text-gray-500">Click to copy</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(color, `color-${index}`)}
                          className="btn btn-primary"
                        >
                          {copied === `color-${index}` ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
                  <pre className="code-block">
{`:root {
${colors.map((c, i) => `  --extracted-color-${i + 1}: ${c.toUpperCase()};`).join('\n')}
}`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(
                      `:root {\n${colors.map((c, i) => `  --extracted-color-${i + 1}: ${c.toUpperCase()};`).join('\n')}\n}`,
                      'all-css'
                    )}
                    className="btn btn-primary mt-4 w-full"
                  >
                    {copied === 'all-css' ? '✓ Copied!' : 'Copy All CSS'}
                  </button>
                </div>

                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">JSON</h2>
                  <pre className="code-block">
{JSON.stringify({
  colors: colors.map((c, i) => ({
    name: `Color ${i + 1}`,
    hex: c.toUpperCase()
  }))
}, null, 2)}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(
                      JSON.stringify({
                        colors: colors.map((c, i) => ({
                          name: `Color ${i + 1}`,
                          hex: c.toUpperCase()
                        }))
                      }, null, 2),
                      'all-json'
                    )}
                    className="btn btn-primary mt-4 w-full"
                  >
                    {copied === 'all-json' ? '✓ Copied!' : 'Copy JSON'}
                  </button>
                </div>
              </>
            ) : (
              <div className="card h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎨</div>
                  <p>Upload an image to extract colors</p>
                </div>
              </div>
            )}
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
            <Link href="/contrast-checker" className="card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">♿ Contrast Checker</h3>
              <p className="text-sm text-gray-600">Check accessibility</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
