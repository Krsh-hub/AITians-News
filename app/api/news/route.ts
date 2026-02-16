import { NextResponse } from 'next/server'
import { fetchNews, getTrending, getByCategory } from '@/lib/news'

export const dynamic = 'force-dynamic'
export const revalidate = 1800

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')

    const articles = await fetchNews()

    if (type === 'trending') {
      return NextResponse.json({ articles: getTrending(articles) })
    }

    if (category) {
      return NextResponse.json({ articles: getByCategory(articles, category) })
    }

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ articles: [] })
  }
}