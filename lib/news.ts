interface Article {
  id: string
  title: string
  description: string
  url: string
  image: string
  source: string
  category: string
  publishedAt: string
}

const categorizeArticle = (title: string, description: string): string => {
  const text = `${title} ${description}`.toLowerCase()

  if (/finance|banking|fintech|payment/.test(text)) return 'finance'
  if (/education|learning|student|course/.test(text)) return 'education'
  if (/startup|funding|venture|founder/.test(text)) return 'startups'
  if (/tool|product|launch|chatgpt|claude/.test(text)) return 'tools'
  if (/regulation|policy|law|governance/.test(text)) return 'policy'
  if (/content|media|creative|video|image/.test(text)) return 'media'
  if (/business|enterprise|company/.test(text)) return 'business'

  return 'general'
}

export async function fetchNews(): Promise<Article[]> {
  const allArticles: Article[] = []

  // Fetch from NewsAPI if key is available
  const newsApiKey = process.env.NEWSAPI_KEY
  if (newsApiKey) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&language=en&sortBy=publishedAt&pageSize=50&apiKey=${newsApiKey}`,
        { next: { revalidate: 1800 } }
      )

      if (response.ok) {
        const data = await response.json()
        
        if (data.articles) {
          const newsApiArticles = data.articles.map((item: any) => ({
            id: item.url,
            title: item.title || 'No Title',
            description: item.description || 'No description available.',
            url: item.url,
            image: item.urlToImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            source: item.source?.name || 'NewsAPI',
            category: categorizeArticle(item.title || '', item.description || ''),
            publishedAt: item.publishedAt || new Date().toISOString()
          }))
          allArticles.push(...newsApiArticles)
        }
      }
    } catch (error) {
      console.error('NewsAPI error:', error)
    }
  }

  // Fetch from The Guardian if key is available
  const guardianKey = process.env.GUARDIAN_API_KEY
  if (guardianKey) {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?q=artificial+intelligence&show-fields=thumbnail,trailText&page-size=30&api-key=${guardianKey}`,
        { next: { revalidate: 1800 } }
      )

      if (response.ok) {
        const data = await response.json()
        
        if (data.response?.results) {
          const guardianArticles = data.response.results.map((item: any) => ({
            id: item.id,
            title: item.webTitle || 'No Title',
            description: item.fields?.trailText || 'Read more on The Guardian',
            url: item.webUrl,
            image: item.fields?.thumbnail || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            source: 'The Guardian',
            category: categorizeArticle(item.webTitle || '', item.fields?.trailText || ''),
            publishedAt: item.webPublicationDate || new Date().toISOString()
          }))
          allArticles.push(...guardianArticles)
        }
      }
    } catch (error) {
      console.error('Guardian API error:', error)
    }
  }

  // If no articles from APIs, return fallback
  if (allArticles.length === 0) {
    return [
      {
        id: '1',
        title: 'No API keys configured - Add NewsAPI or Guardian API keys',
        description: 'Please add NEWSAPI_KEY or GUARDIAN_API_KEY to your .env.local file to fetch real news.',
        url: 'https://newsapi.org',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        source: 'System',
        category: 'general',
        publishedAt: new Date().toISOString()
      }
    ]
  }

  // Remove duplicates and sort by date
  const uniqueArticles = allArticles.filter((article, index, self) =>
    index === self.findIndex((a) => a.title === article.title)
  )

  return uniqueArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getTrending(articles: Article[], limit = 6): Article[] {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  return articles
    .filter(article => new Date(article.publishedAt) > oneDayAgo)
    .slice(0, limit)
}

export function getByCategory(articles: Article[], category: string): Article[] {
  return articles.filter(article => article.category === category)
}