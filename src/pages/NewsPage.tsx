import { useState } from 'react'
import { useNews } from '@/lib/hooks'
import { NewsCard, NewsCardSkeleton } from '@/components/news'
import type { NewsCategory } from '@/types'
import { NEWS_CATEGORY_LABELS } from '@/types'
import { cn } from '@/lib/utils'

/** Available categories for the news tabs */
const CATEGORIES: NewsCategory[] = [
  'tech',
  'ai',
  'webdev',
  'product',
  'design',
]

/**
 * News page - Latest tech news from various categories
 * Features:
 * - Category tabs for filtering
 * - Responsive grid layout
 * - Loading skeletons
 * - Error handling with retry
 * - Accessible keyboard navigation
 */
function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('tech')
  const { sections, isLoading, isValidating, error, refresh } =
    useNews(activeCategory)

  // Flatten all articles from all sections
  const allArticles = sections.flatMap((section) => section.items)

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const categories = CATEGORIES
    let newIndex = index

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % categories.length
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + categories.length) % categories.length
    } else if (e.key === 'Home') {
      newIndex = 0
    } else if (e.key === 'End') {
      newIndex = categories.length - 1
    } else {
      return
    }

    e.preventDefault()
    setActiveCategory(categories[newIndex])

    // Focus the new tab
    const tabsContainer = e.currentTarget.parentElement
    const newTab = tabsContainer?.children[newIndex] as HTMLButtonElement
    newTab?.focus()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="border-b border-silver/30 bg-linear-to-br from-silver/10 via-coral-light/10 to-slate/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <h1 className="text-2xl font-bold text-jet sm:text-3xl lg:text-4xl">
            Tech News
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate sm:text-lg">
            Stay updated with the latest in web development, AI, security, and
            more. Curated daily from trusted sources.
          </p>
        </div>
      </header>

      {/* Category Tabs */}
      <nav className="sticky top-16 z-20 border-b border-silver/30 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="News categories"
            className="flex gap-1 overflow-x-auto py-2 scrollbar-none"
          >
            {CATEGORIES.map((category, index) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${category}`}
                  id={`tab-${category}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleCategoryChange(category)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(
                    'tabs-trigger whitespace-nowrap',
                    isActive && 'tabs-trigger-active'
                  )}
                >
                  {NEWS_CATEGORY_LABELS[category]}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Validating indicator */}
        {isValidating && !isLoading && (
          <div
            className="mb-4 flex items-center gap-2 text-sm text-slate"
            role="status"
            aria-live="polite"
          >
            <svg
              className="h-4 w-4 animate-spin text-coral"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Refreshing...</span>
          </div>
        )}

        {/* Tab Panel */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {/* Error State */}
          {error && (
            <div className="error-message" role="alert">
              <svg
                className="error-message-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="error-message-title">Failed to load news</h2>
              <p className="error-message-text mb-4">{error.message}</p>
              <button onClick={refresh} className="btn-primary btn-sm">
                Try again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              aria-busy="true"
              aria-label="Loading news articles"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && allArticles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="mb-4 h-12 w-12 text-silver"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-jet">
                No articles found
              </h2>
              <p className="mt-1 text-slate">
                Check back later for new{' '}
                {NEWS_CATEGORY_LABELS[activeCategory].toLowerCase()} content.
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && !error && allArticles.length > 0 && (
            <>
              {/* Article count */}
              <p className="mb-4 text-sm text-slate">
                Showing {allArticles.length} article
                {allArticles.length !== 1 ? 's' : ''}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Attribution */}
        <footer className="mt-12 border-t border-silver/30 pt-8 text-center">
          <p className="text-sm text-slate">
            News sourced from{' '}
            <a
              href="https://tldr.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              TLDR Newsletter
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default NewsPage
