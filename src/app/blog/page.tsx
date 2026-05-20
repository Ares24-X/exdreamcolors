import Link from 'next/link'

export default function BlogPage() {
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
              <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="tool-container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Color theory tips, tool guides, and design resources.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="max-w-3xl mx-auto text-center py-16">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Posts Coming Soon!
          </h2>
          <p className="text-gray-600 mb-8">
            We're working on helpful articles about color theory, tool tutorials, and design tips.
          </p>
          <Link href="/tools" className="btn btn-primary">
            Explore Our Tools
          </Link>
        </div>

        {/* Preview Topics */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="font-semibold mb-2">🎨 Color Theory Basics</h3>
              <p className="text-sm text-gray-600">Learn the fundamentals of color harmony and theory.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">💻 Tailwind Color Guide</h3>
              <p className="text-sm text-gray-600">Master Tailwind CSS color configuration.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">♿ Accessibility Tips</h3>
              <p className="text-sm text-gray-600">Create accessible designs with proper contrast.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2025 exdreamcolors. Free online color tools for everyone.
          </p>
        </div>
      </footer>
    </div>
  )
}
