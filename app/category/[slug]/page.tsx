import Navbar from '@/components/Navbar'
import NewsCard from '@/components/NewsCard'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { fetchNews, getByCategory } from '@/lib/news'

const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  finance: {
    name: 'AI in Finance',
    icon: '💰',
    description: 'FinTech innovations, trading algorithms, and financial AI applications'
  },
  education: {
    name: 'AI in Education',
    icon: '📚',
    description: 'EdTech, personalized learning, and AI-powered educational tools'
  },
  startups: {
    name: 'AI Startups',
    icon: '🚀',
    description: 'Funding rounds, new ventures, and startup ecosystem news'
  },
  tools: {
    name: 'AI Tools & Products',
    icon: '🛠️',
    description: 'New AI tools, product launches, and platform updates'
  },
  policy: {
    name: 'Policy & Regulation',
    icon: '⚖️',
    description: 'AI governance, regulations, ethics, and policy developments'
  },
  media: {
    name: 'AI in Media',
    icon: '🎨',
    description: 'Content generation, creative AI, and media applications'
  },
  business: {
    name: 'AI in Business',
    icon: '💼',
    description: 'Enterprise AI, automation, and business applications'
  },
  medical: {
    name: 'AI in Medical & Healthcare',
    icon: '🏥',
    description: 'Healthcare AI, medical diagnostics, drug discovery, and patient care'
  },
  environment: {
    name: 'AI in Environment & Agriculture',
    icon: '🌱',
    description: 'Climate tech, sustainable agriculture, and environmental monitoring'
  }
}

// Mark as dynamic to avoid build-time fetching
export const dynamic = 'force-dynamic'
export const revalidate = 1800

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const category = categoryInfo[slug]
  
  if (!category) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-white/60 mb-4">Looking for: {slug}</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              ← Back to Home
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Fetch directly from lib instead of API
  const allArticles = await fetchNews()
  const articles = getByCategory(allArticles, slug)

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-white/60">{category.description}</p>
            </div>
          </div>

          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-2xl p-12">
              <p className="text-white/60 text-lg mb-4">
                No AI articles found in this category yet.
              </p>
              <p className="text-white/40 text-sm mb-6">
                Articles are automatically categorized as they come in.
              </p>
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                Explore other categories →
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}