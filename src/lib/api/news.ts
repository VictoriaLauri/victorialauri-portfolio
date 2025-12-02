import type { NewsCategory, NewsResponse } from '@/types'
import { mockNewsByCategory } from '@/data/mockNews'

/**
 * News API configuration
 * In production: uses Netlify serverless function at /api/news
 * In development: uses mock data for faster iteration
 */

// Use relative URL for Netlify function (works in production)
// Falls back to mock data in development
const NEWS_API_URL = '/api/news'

// Use mock data in development for faster iteration
const USE_MOCK_DATA = import.meta.env.DEV

/**
 * Fetch news articles for a specific category
 * @param category - The news vertical to fetch (webdev, ai, tech, etc.)
 * @returns Promise resolving to NewsResponse
 */
export async function fetchNews(category: NewsCategory): Promise<NewsResponse> {
  // Use mock data in development for faster iteration
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockNewsByCategory[category] || mockNewsByCategory.webdev
  }

  const url = `${NEWS_API_URL}?vertical=${encodeURIComponent(category)}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`)
  }

  const data: NewsResponse = await response.json()

  // Handle API-level errors
  if (data.error) {
    throw new Error(data.error)
  }

  return data
}

/**
 * Resolve the image for a news article (lazy loading)
 * Called individually per article to avoid function timeouts
 * @param articleUrl - The URL of the article to fetch image for
 * @returns Promise resolving to image URL or null
 */
export async function resolveArticleImage(articleUrl: string): Promise<string | null> {
  // In development, return null (mock data already has images)
  if (USE_MOCK_DATA) {
    return null
  }

  try {
    const url = `/api/resolve-image?url=${encodeURIComponent(articleUrl)}`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.image || null
  } catch {
    return null
  }
}

/**
 * SWR fetcher function for news
 * Can be used with useSWR hook
 */
export function newsFetcher(category: NewsCategory) {
  return fetchNews(category)
}
