import Link from 'next/link'

export default function ToolsPage() {
  const tools = [
    {
      href: '/color-picker',
      icon: '🎨',
      title: 'Color Picker',
      description: 'Pick any color and get HEX, RGB, HSL values instantly',
      category: 'Basics',
      color: 'blue'
    },
    {
      href: '/palette-generator',
      icon: '🎭',
      title: 'Palette Generator',
      description: 'Generate beautiful color schemes based on color theory',
      category: 'Basics',
      color: 'purple'
    },
    {
      href: '/image-extractor',
      icon: '🖼️',
      title: 'Image Color Extractor',
      description: 'Extract colors from any image automatically',
      category: 'Advanced',
      color: 'green'
    },
    {
      href: '/gradient-generator',
      icon: '🌈',
      title: 'Gradient Generator',
      description: 'Create beautiful CSS gradients with live preview',
      category: 'Advanced',
      color: 'pink'
    },
    {
      href: '/contrast-checker',
      icon: '♿',
      title: 'Contrast Checker',
      description: 'Check color contrast for WCAG accessibility compliance',
      category: 'Accessibility',
      color: 'yellow'
    },
    {
      href: '/tailwind-color-generator',
      icon: '💻',
      title: 'Tailwind Color Generator',
      description: 'Generate complete Tailwind CSS colors and config-ready palettes',
      category: 'Developer',
      color: 'cyan'
    }
  ]

  const categories = [...new Set(tools.map(tool => tool.category))]

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
              <Link href="/tools" className="text-gray-900 font-medium">Tools</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="tool-container">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Color Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional color tools for developers and designers. No registration, no fees. Just click and use.
          </p>
        </div>

        {/* Tools by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="card hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 bg-${tool.color}-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                        <p className="text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        {/* Features */}
        <div className="bg-white rounded-2xl p-8 mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Use exdreamcolors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                No loading, no registration. Get your colors and code immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
              <p className="text-gray-600">
                Code-first output. CSS, Tailwind, JavaScript - ready to copy and use.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">♿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p className="text-gray-600">
                Built-in WCAG compliance checking. Make colors work for everyone.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2026 exdreamcolors. Free online color tools for developers and designers.
          </p>
        </div>
      </footer>
    </div>
  )
}
