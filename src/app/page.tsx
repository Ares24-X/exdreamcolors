import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">exdreamcolors</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-gray-600 hover:text-gray-900">Tools</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Free Color Tools for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developers & Designers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Color picker, palette generator, gradient maker, contrast checker, and more. 
            No registration, no fees, just click and use.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/color-picker" className="btn btn-primary">
              Start with Color Picker
            </Link>
            <Link href="/tools" className="btn btn-secondary">
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Free Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Color Picker */}
            <Link href="/color-picker" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Color Picker</h3>
              <p className="text-gray-600">Pick any color and get HEX, RGB, HSL values instantly. Copy code with one click.</p>
            </Link>

            {/* Palette Generator */}
            <Link href="/palette-generator" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Palette Generator</h3>
              <p className="text-gray-600">Generate beautiful color schemes based on color theory. Complementary, analogous, and more.</p>
            </Link>

            {/* Image Extractor */}
            <Link href="/image-extractor" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Image Color Extractor</h3>
              <p className="text-gray-600">Extract colors from any image. Upload or paste an image to get its color palette.</p>
            </Link>

            {/* Gradient Generator */}
            <Link href="/gradient-generator" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gradient Generator</h3>
              <p className="text-gray-600">Create beautiful CSS gradients. Linear, radial, and conic gradients with live preview.</p>
            </Link>

            {/* Contrast Checker */}
            <Link href="/contrast-checker" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">♿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contrast Checker</h3>
              <p className="text-gray-600">Check color contrast for accessibility. WCAG AA and AAA compliance testing.</p>
            </Link>

            {/* Tailwind Generator */}
            <Link href="/tailwind-generator" className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tailwind Generator</h3>
              <p className="text-gray-600">Generate Tailwind CSS color configurations. Copy and paste ready-to-use code.</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose exdreamcolors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">No loading time. No registration. Just pick your colors and copy the code.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
              <p className="text-gray-600">Code-first output. Get CSS, Tailwind, or JavaScript code ready to use.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">♿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p className="text-gray-600">Built-in accessibility checking. Make sure your colors work for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2026 exdreamcolors. Free online color tools for everyone.
          </p>
        </div>
      </footer>
    </div>
  )
}
