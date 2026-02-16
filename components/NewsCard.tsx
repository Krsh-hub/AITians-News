'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Clock, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface NewsCardProps {
  article: {
    id: string
    title: string
    description: string
    url: string
    image: string
    source: string
    category: string
    publishedAt: string
  }
}

export default function NewsCard({ article }: NewsCardProps) {
  const [imgError, setImgError] = useState(false)
  
  const fallbackImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'

  return (
    <div className="news-card h-full flex flex-col group cursor-pointer">
      <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4 bg-slate-800">
        <Image
          src={imgError ? fallbackImage : (article.image || fallbackImage)}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setImgError(true)}
          unoptimized
        />
        <div className="absolute top-3 left-3">
          <span className={`category-badge category-${article.category}`}>
            {article.category}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition">
        {article.title}
      </h3>

      <p className="text-white/60 dark:text-white/60 text-sm mb-4 line-clamp-3 flex-1">
        {article.description}
      </p>

      <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3" />
          <span>
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>
        <span className="text-white/60">{article.source}</span>
      </div>

      
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition text-sm"
      >
        <span>Read more</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}