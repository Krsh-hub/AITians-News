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

const isAIRelated = (title: string, description: string): boolean => {
  const text = `${title} ${description}`.toLowerCase()
  
  // Must contain AI-related keywords
  const aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml',
    'deep learning', 'neural network', 'chatgpt', 'gpt', 'claude',
    'openai', 'anthropic', 'llm', 'large language model',
    'generative ai', 'gen ai', 'algorithm', 'automation',
    'computer vision', 'nlp', 'natural language', 'robotics',
    'autonomous', 'intelligent system', 'data science'
  ]
  
  return aiKeywords.some(keyword => text.includes(keyword))
}

const categorizeArticle = (title: string, description: string): string => {
  const text = `${title} ${description}`.toLowerCase()

  // Financial AI
  if (/ai.*(finance|banking|fintech|payment|trading|investment|crypto)|finance.*ai|fintech.*ai/.test(text)) {
    return 'finance'
  }
  
  // Education AI
  if (/ai.*(education|learning|student|course|university|teaching)|education.*ai|edtech.*ai/.test(text)) {
    return 'education'
  }
  
  // Startup AI (funding, ventures)
  if (/startup|funding|venture|founder|seed round|series [a-z]|raised.*million|investment/.test(text)) {
    return 'startups'
  }
  
  // AI Tools & Products (ChatGPT, Claude, new AI tools)
  if (/chatgpt|claude|gemini|copilot|midjourney|dall-e|stable diffusion|ai tool|ai product|ai platform|ai app|gpt-|released|launch.*ai/.test(text)) {
    return 'tools'
  }
  
  // Policy & Regulation
  if (/regulation|policy|law|governance|ethics|legislation|government.*ai|ai.*act|ai safety/.test(text)) {
    return 'policy'
  }
  
  // Medical & Healthcare AI
  if (/ai.*(medical|healthcare|health|diagnosis|drug|patient|hospital|doctor)|medical.*ai|health.*ai/.test(text)) {
    return 'medical'
  }
  
  // Environment & Agriculture AI
  if (/ai.*(environment|climate|agriculture|farming|sustainability|green energy|carbon)|climate.*ai|agriculture.*ai/.test(text)) {
    return 'environment'
  }
  
  // Media & Creative AI
  if (/ai.*(content|media|creative|video|image|art|music|generate)|content.*ai|creative.*ai/.test(text)) {
    return 'media'
  }
  
  // Business AI
  if (/ai.*(business|enterprise|company|corporate)|business.*ai|enterprise.*ai/.test(text)) {
    return 'business'
  }

  return 'general'
}

export async function fetchNews(): Promise<Article[]> {
  const allArticles: Article[] = []

  // Fetch from NewsAPI
  const newsApiKey = process.env.NEWSAPI_KEY
  if (newsApiKey) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=(artificial+intelligence+OR+AI+OR+machine+learning+OR+ChatGPT+OR+OpenAI+OR+LLM)&language=en&sortBy=publishedAt&pageSize=100&apiKey=${newsApiKey}`,
        { next: { revalidate: 1800 } }
      )

      if (response.ok) {
        const data = await response.json()
        
        if (data.articles) {
          const filteredArticles = data.articles
            .filter((item: any) => {
              // Filter out non-AI news
              const title = item.title || ''
              const description = item.description || ''
              return isAIRelated(title, description)
            })
            .map((item: any) => ({
              id: item.url,
              title: item.title || 'No Title',
              description: item.description || 'No description available.',
              url: item.url,
              image: item.urlToImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
              source: item.source?.name || 'NewsAPI',
              category: categorizeArticle(item.title || '', item.description || ''),
              publishedAt: item.publishedAt || new Date().toISOString()
            }))
          
          allArticles.push(...filteredArticles)
        }
      }
    } catch (error) {
      console.error('NewsAPI error:', error)
    }
  }

  // Fetch from The Guardian
  const guardianKey = process.env.GUARDIAN_API_KEY
  if (guardianKey) {
    try {
      const response = await fetch(
        `https://content.guardianapis.com/search?q=artificial+intelligence+OR+AI+OR+machine+learning&show-fields=thumbnail,trailText&page-size=50&api-key=${guardianKey}`,
        { next: { revalidate: 1800 } }
      )

      if (response.ok) {
        const data = await response.json()
        
        if (data.response?.results) {
          const filteredArticles = data.response.results
            .filter((item: any) => {
              const title = item.webTitle || ''
              const description = item.fields?.trailText || ''
              return isAIRelated(title, description)
            })
            .map((item: any) => ({
              id: item.id,
              title: item.webTitle || 'No Title',
              description: item.fields?.trailText || 'Read more on The Guardian',
              url: item.webUrl,
              image: item.fields?.thumbnail || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
              source: 'The Guardian',
              category: categorizeArticle(item.webTitle || '', item.fields?.trailText || ''),
              publishedAt: item.webPublicationDate || new Date().toISOString()
            }))
          
          allArticles.push(...filteredArticles)
        }
      }
    } catch (error) {
      console.error('Guardian API error:', error)
    }
  }

  if (allArticles.length === 0) {
    return [
      {
        id: '1',
        title: 'Add API Keys to See Real AI News',
        description: 'Configure NEWSAPI_KEY or GUARDIAN_API_KEY in .env.local to fetch real-time AI news.',
        url: 'https://newsapi.org',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        source: 'System',
        category: 'general',
        publishedAt: new Date().toISOString()
      }
    ]
  }

  // Remove duplicates
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