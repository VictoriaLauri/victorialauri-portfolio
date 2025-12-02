import { useState, useEffect } from 'react'
import type { NewsArticle, NewsCategory } from '@/types'
import { cn } from '@/lib/utils'
import { resolveArticleImage } from '@/lib/api/news'

/** Category-based fallback images from Unsplash */
const FALLBACK_IMAGES: Record<NewsCategory, string> = {
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop', // circuit board
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop', // AI brain
  webdev: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop', // code
  product: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop', // team planning
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', // design tools
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', // data charts
  devops: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop', // servers
  security: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop', // cybersecurity
  crypto: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop', // bitcoin
  founders: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=250&fit=crop', // startup
}

/** Default fallback if category unknown */
const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop'

interface NewsCardProps {
  article: NewsArticle
  /** Category for fallback image selection */
  category?: NewsCategory
  /** Optional className for custom styling */
  className?: string
}

/**
 * NewsCard - Displays a single news article with image, title, and source
 * Opens in a new tab when clicked
 * Images are loaded lazily to avoid timeout issues
 */
export function NewsCard({ article, category, className }: NewsCardProps) {
  const fallbackImage = category ? FALLBACK_IMAGES[category] : DEFAULT_FALLBACK
  const [imageUrl, setImageUrl] = useState<string | null>(article.image || null)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(!article.image)

  // Lazily resolve image if not provided
  useEffect(() => {
    if (article.image) {
      setImageUrl(article.image)
      setIsLoadingImage(false)
      return
    }

    let cancelled = false

    async function loadImage() {
      setIsLoadingImage(true)
      const resolvedImage = await resolveArticleImage(article.url)
      if (!cancelled) {
        setImageUrl(resolvedImage)
        setIsLoadingImage(false)
      }
    }

    loadImage()

    return () => {
      cancelled = true
    }
  }, [article.image, article.url])

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const showImage = imageUrl && !imageError

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm',
        'transition-all duration-200 hover:border-coral/30 hover:shadow-lg',
        'focus-within:ring-2 focus-within:ring-coral focus-within:ring-offset-2',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-silver/20">
        {isLoadingImage ? (
          /* Loading skeleton */
          <div className="skeleton absolute inset-0" aria-hidden="true" />
        ) : showImage ? (
          <>
            {/* Skeleton while image loads */}
            {!imageLoaded && (
              <div className="skeleton absolute inset-0" aria-hidden="true" />
            )}
            <img
              src={imageUrl!}
              alt=""
              aria-hidden="true"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              className={cn(
                'h-full w-full object-cover transition-transform duration-300',
                'group-hover:scale-105',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </>
        ) : (
          /* Fallback image based on category */
          <img
            src={fallbackImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Source */}
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-coral">
          {article.source}
        </p>

        {/* Title */}
        <h3 className="line-clamp-3 flex-1 text-base font-semibold leading-snug text-jet">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 hover:text-coral focus:outline-none"
          >
            {article.title}
          </a>
        </h3>

        {/* External link indicator */}
        <div className="mt-3 flex items-center text-sm text-slate">
          <span className="sr-only">Opens in new tab</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </article>
  )
}

/**
 * Skeleton loading state for NewsCard
 */
export function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm">
      {/* Image skeleton */}
      <div className="skeleton aspect-[16/10]" aria-hidden="true" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Source skeleton */}
        <div className="skeleton mb-2 h-3 w-16 rounded" aria-hidden="true" />

        {/* Title skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" aria-hidden="true" />
          <div className="skeleton h-4 w-3/4 rounded" aria-hidden="true" />
        </div>

        {/* Link indicator skeleton */}
        <div className="skeleton mt-3 h-4 w-4 rounded" aria-hidden="true" />
      </div>
    </div>
  )
}
