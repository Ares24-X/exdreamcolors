import Link from 'next/link'

export default function AboutPage() {
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
              <Link href="/about" className="text-gray-900 font-medium">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="tool-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About exdreamcolors</h1>
          
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 mb-8">
              exdreamcolors provides free online color tools for developers and designers.
              No registration, no fees, no ads interrupting your workflow.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe color tools should be simple, fast, and accessible to everyone. 
              That's why we built exdreamcolors - to give developers and designers a suite 
              of professional-grade color tools without the complexity.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Color Picker with multiple format outputs</li>
              <li>Palette Generator based on color theory</li>
              <li>Image Color Extractor</li>
              <li>CSS Gradient Generator</li>
              <li>WCAG Contrast Checker</li>
              <li>Tailwind CSS Color Generator</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">⚡ Instant Results</h3>
                <p className="text-sm text-gray-600">No loading, no registration. Get your colors immediately.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">💻 Developer Friendly</h3>
                <p className="text-sm text-gray-600">Code-first output in CSS, Tailwind, and JavaScript formats.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">♿ Accessible</h3>
                <p className="text-sm text-gray-600">Built-in WCAG compliance checking for all color combinations.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">🎨 Comprehensive</h3>
                <p className="text-sm text-gray-600">All the color tools you need in one place.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
            <p className="text-gray-600">
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2026 exdreamcolors. Free online color tools for everyone.
          </p>
        </div>
      </footer>
    </div>
  )
}
