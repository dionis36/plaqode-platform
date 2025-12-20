import { PlatformNav } from '@/components/layout/PlatformNav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <PlatformNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Scan Smart, Stay Safe
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Create stunning business cards and dynamic QR codes with our unified platform
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-lg font-semibold hover:opacity-90 transition"
            >
              Try Cardify Free
            </a>
            <a
              href="/auth/signup"
              className="inline-block px-8 py-4 border border-purple-500 rounded-lg text-lg font-semibold hover:bg-purple-500/10 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">The Story So Far...</h2>
          <p className="text-gray-400 text-lg mb-8">
            We're building the future of digital business tools. From smart business cards
            to powerful QR code solutions, everything you need in one place.
          </p>
          <button className="px-6 py-3 border border-purple-500 rounded-lg hover:bg-purple-500/10 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a
              href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4"></div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition">Cardify →</h3>
              <p className="text-gray-400">
                Create beautiful, professional business cards with our intuitive design platform
              </p>
              <p className="text-purple-400 text-sm mt-4">Try it free - no login required</p>
            </a>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition opacity-60">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-4"></div>
              <h3 className="text-2xl font-bold mb-3">QR Studio</h3>
              <p className="text-gray-400">
                Generate dynamic QR codes for menus, vCards, URLs, and more
              </p>
              <p className="text-gray-500 text-sm mt-4">Coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 PlaQode. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
