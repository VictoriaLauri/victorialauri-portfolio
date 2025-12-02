import useSWR from 'swr'
import { fetchNews } from '@/lib/api/news'
import type { NewsCategory, NewsResponse } from '@/types'

/**
 * Custom hook for fetching news data with SWR
 * Provides caching, revalidation, and error handling
 *
 * @param category - The news vertical to fetch
 * @returns Object containing news data, loading state, error, and refresh function
 */
export function useNews(category: NewsCategory) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<NewsResponse>(
    ['news', category],
    () => fetchNews(category),
    {
      // Cache for 5 minutes
      dedupingInterval: 5 * 60 * 1000,
      // Revalidate on focus after 5 minutes
      focusThrottleInterval: 5 * 60 * 1000,
      // Keep previous data while revalidating
      keepPreviousData: true,
      // Retry on error
      errorRetryCount: 3,
      errorRetryInterval: 3000,
      // Don't revalidate on mount if we have cached data
      revalidateOnMount: true,
    }
  )

  return {
    /** News sections containing articles */
    sections: data?.sections ?? [],
    /** Whether the initial fetch is loading */
    isLoading,
    /** Whether a revalidation is in progress */
    isValidating,
    /** Error object if the fetch failed */
    error: error as Error | undefined,
    /** Function to manually refresh the data */
    refresh: () => mutate(),
  }
}

