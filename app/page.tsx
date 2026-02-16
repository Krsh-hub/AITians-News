import Navbar from '@/components/Navbar'
import NewsCard from '@/components/NewsCard'
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { fetchNews, getTrending, getByCategory } from '@/lib/news'

// Mark as dynamic
export const dynamic = 'force-dynamic'
export const revalidate = 1800

export default async function Home() {
  const allArticles = await fetchNews()
  const trending = getTrending(allArticles, 6)

  const categories = [
    { key: 'startups', name: 'AI Startups', icon: '🚀' },
    { key: 'tools', name: 'Tools & Products', icon: '🛠️' },
    { key: 'finance', name: 'AI in Finance', icon: '💰' },
    { key: 'education', name: 'AI in Education', icon: '📚' },
    { key: 'medical', name: 'AI in Medical', icon: '🏥' },
    { key: 'environment', name: 'AI in Environment', icon: '🌱' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Real-time AI news from across the globe</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AI News, <span className="gradient-text">Decoded</span>
            </h1>

            <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto">
              Everything happening in AI across industries. No noise.
            </p>

            <a href="#trending" className="btn-primary inline-flex items-center space-x-2">
              <span>Explore Latest</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Trending */}
        <section id="trending" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Trending Now</h2>
                <p className="text-white/50 text-sm">Hot stories in the last 24 hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.slice(0, 6).map((article: any) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => {
          const categoryArticles = getByCategory(allArticles, cat.key)
          if (categoryArticles.length === 0) return null

          return (
            <section key={cat.key} className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-3 mb-12">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{cat.name}</h2>
                    <p className="text-white/50 text-sm">Latest updates</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryArticles.slice(0, 6).map((article: any) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto text-center text-white/40 text-sm">
            © 2026 AITian News. Built for AI enthusiasts.
          </div>
        </footer>
      </main>
    </>
  )
}