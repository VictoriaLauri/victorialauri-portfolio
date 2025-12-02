# Victoria Lauri Portfolio - Implementation Guide (Part 3)

*Continuation from Part 2*

---

## Phase 8: API Integration

### Step 8.1: Create Custom Hooks

Create `src/lib/hooks/useReducedMotion.ts`:

```typescript
import { useEffect, useState } from 'react'

/**
 * Hook to detect user's reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
```

Create `src/lib/hooks/useMediaQuery.ts`:

```typescript
import { useEffect, useState } from 'react'

/**
 * Hook to detect media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
```

Create `src/lib/hooks/useNews.ts`:

```typescript
import useSWR from 'swr'
import type { NewsArticle, NewsCategory } from '@/types'

interface NewsResponse {
  articles: NewsArticle[]
  lastUpdated: string
  categories: NewsCategory[]
}

const TLDR_API_URL = import.meta.env.VITE_TLDR_API_URL || '/api/tldr'

async function fetcher(url: string): Promise<NewsResponse> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch news')
  }
  return response.json()
}

interface UseNewsOptions {
  category?: NewsCategory | 'all'
  limit?: number
}

export function useNews(options: UseNewsOptions = {}) {
  const { category = 'all', limit = 20 } = options

  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (limit) params.set('limit', limit.toString())

  const url = `${TLDR_API_URL}/articles?${params.toString()}`

  const { data, error, isLoading, mutate } = useSWR<NewsResponse>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: true,
    dedupingInterval: 60000, // 1 minute
    errorRetryCount: 3,
  })

  return {
    articles: data?.articles ?? [],
    lastUpdated: data?.lastUpdated,
    categories: data?.categories ?? [],
    isLoading,
    isError: !!error,
    error,
    refresh: () => mutate(),
  }
}
```

Create `src/lib/hooks/useEvents.ts`:

```typescript
import useSWR from 'swr'
import type { TechEvent } from '@/types'

interface EventsResponse {
  events: TechEvent[]
  total: number
}

const EVENTS_API_URL = import.meta.env.VITE_EVENTS_API_URL || '/api/events'

async function fetcher(url: string): Promise<EventsResponse> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

interface UseEventsOptions {
  format?: 'all' | 'online' | 'in-person'
  limit?: number
}

export function useEvents(options: UseEventsOptions = {}) {
  const { format = 'all', limit = 12 } = options

  const params = new URLSearchParams()
  if (format !== 'all') params.set('format', format)
  if (limit) params.set('limit', limit.toString())

  const url = `${EVENTS_API_URL}?${params.toString()}`

  const { data, error, isLoading, mutate } = useSWR<EventsResponse>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: true,
    dedupingInterval: 300000, // 5 minutes
    errorRetryCount: 3,
  })

  return {
    events: data?.events ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
    error,
    refresh: () => mutate(),
  }
}
```

Create `src/lib/hooks/index.ts`:

```typescript
export { useReducedMotion } from './useReducedMotion'
export { useMediaQuery } from './useMediaQuery'
export { useNews } from './useNews'
export { useEvents } from './useEvents'
```

### Step 8.2: Create API Utilities

Create `src/lib/api/tldr.ts`:

```typescript
import type { NewsArticle, NewsCategory } from '@/types'

const TLDR_API_URL = import.meta.env.VITE_TLDR_API_URL || '/api/tldr'

interface TLDRResponse {
  articles: NewsArticle[]
  lastUpdated: string
  categories: NewsCategory[]
}

export async function fetchTLDRArticles(
  category: NewsCategory | 'all' = 'all',
  limit = 20
): Promise<TLDRResponse> {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  params.set('limit', limit.toString())

  const response = await fetch(`${TLDR_API_URL}/articles?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch TLDR articles: ${response.statusText}`)
  }

  return response.json()
}
```

Create `src/lib/api/events.ts`:

```typescript
import type { TechEvent } from '@/types'

const EVENTS_API_URL = import.meta.env.VITE_EVENTS_API_URL || '/api/events'

interface EventsResponse {
  events: TechEvent[]
  total: number
}

export async function fetchEvents(
  format: 'all' | 'online' | 'in-person' = 'all',
  limit = 12
): Promise<EventsResponse> {
  const params = new URLSearchParams()
  if (format !== 'all') params.set('format', format)
  params.set('limit', limit.toString())

  const response = await fetch(`${EVENTS_API_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`)
  }

  return response.json()
}
```

Create `src/lib/api/index.ts`:

```typescript
export { fetchTLDRArticles } from './tldr'
export { fetchEvents } from './events'
```

### Step 8.3: Commit API Integration

```bash
git add .
git commit -m "feat: add API integration hooks (useNews, useEvents) and utilities"
git push
```

---

## Phase 9: Pages - Dynamic

### Step 9.1: Create Project Detail Page Components

Create `src/components/projects/ProjectHero.tsx`:

```tsx
import type { Project } from '@/types'

interface ProjectHeroProps {
  project: Project
}

function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative bg-neutral-900 py-20 text-white md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-1 mb-6">{project.title}</h1>
          <p className="text-xl text-neutral-300">{project.shortDescription}</p>

          {/* Action links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                <svg
                  className="h-5 w-5"
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
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 to-neutral-900/95"
        aria-hidden="true"
      />
    </section>
  )
}

export { ProjectHero }
```

Create `src/components/projects/ProjectOverview.tsx`:

```tsx
import { Badge } from '@/components/ui'
import type { Project } from '@/types'

interface ProjectOverviewProps {
  project: Project
}

function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Hero image */}
          <div className="mb-12 overflow-hidden rounded-xl bg-neutral-100">
            <img
              src={project.heroImage}
              alt={`Screenshot of ${project.title}`}
              className="w-full"
              loading="lazy"
            />
          </div>

          {/* Overview */}
          <div className="mb-12">
            <h2 className="heading-2 mb-6 text-neutral-900">Overview</h2>
            <p className="text-body-lg">{project.fullDescription}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="heading-3 mb-4 text-neutral-900">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="heading-3 mb-4 text-neutral-900">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-neutral-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ProjectOverview }
```

Create `src/components/projects/ChallengesSection.tsx`:

```tsx
import type { Project } from '@/types'

interface ChallengesSectionProps {
  project: Project
}

function ChallengesSection({ project }: ChallengesSectionProps) {
  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Challenges */}
          <div className="mb-16">
            <h2 className="heading-2 mb-8 text-neutral-900">
              Challenges & Solutions
            </h2>
            <div className="space-y-8">
              {project.challenges.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                    Challenge: {item.challenge}
                  </h3>
                  <p className="text-neutral-600">
                    <span className="font-medium text-primary-700">
                      Solution:{' '}
                    </span>
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Learnings */}
          <div>
            <h2 className="heading-2 mb-8 text-neutral-900">Key Learnings</h2>
            <ul className="space-y-4">
              {project.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ChallengesSection }
```

Update `src/components/projects/index.ts`:

```typescript
export { ProjectCard } from './ProjectCard'
export { ProjectGrid } from './ProjectGrid'
export { ProjectHero } from './ProjectHero'
export { ProjectOverview } from './ProjectOverview'
export { ChallengesSection } from './ChallengesSection'
```

### Step 9.2: Create Project Detail Page

Create `src/pages/ProjectDetailPage.tsx`:

```tsx
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import {
  ProjectHero,
  ProjectOverview,
  ChallengesSection,
} from '@/components/projects'
import { getProjectBySlug } from '@/data'

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <section className="flex min-h-screen-nav items-center justify-center bg-white">
        <div className="container">
          <div className="mx-auto max-w-md text-center">
            <h1 className="heading-2 mb-4 text-neutral-900">
              Project Not Found
            </h1>
            <p className="text-body-lg mb-8">
              Sorry, we couldn&apos;t find the project you&apos;re looking for.
            </p>
            <Link to="/projects">
              <Button size="lg">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ChallengesSection project={project} />

      {/* Back to projects */}
      <section className="bg-white py-12">
        <div className="container">
          <div className="text-center">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                ← Back to All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectDetailPage
```

### Step 9.3: Create News Page Components

Create `src/components/news/NewsCard.tsx`:

```tsx
import { Card, CardContent, Badge } from '@/components/ui'
import type { NewsArticle } from '@/types'

interface NewsCardProps {
  article: NewsArticle
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline-none"
    >
      <Card
        variant="outline"
        className="h-full transition-colors group-hover:border-primary-300 group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2"
      >
        <CardContent>
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="primary">{article.category}</Badge>
            <span className="text-sm text-neutral-500">{article.source}</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
            {article.title}
          </h3>
          <p className="line-clamp-3 text-neutral-600">{article.summary}</p>
          <div className="mt-4 flex items-center text-sm text-primary-600">
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export { NewsCard }
```

Create `src/components/news/NewsList.tsx`:

```tsx
import { NewsCard } from './NewsCard'
import { SkeletonCard, ErrorMessage } from '@/components/ui'
import type { NewsArticle } from '@/types'

interface NewsListProps {
  articles: NewsArticle[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

function NewsList({ articles, isLoading, isError, onRetry }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Unable to load news"
        message="We couldn't fetch the latest news. Please try again."
        onRetry={onRetry}
      />
    )
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-xl bg-neutral-50 p-12 text-center">
        <p className="text-neutral-600">No articles found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export { NewsList }
```

Create `src/components/news/CategoryTabs.tsx`:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { NewsList } from './NewsList'
import type { NewsArticle, NewsCategory } from '@/types'

interface CategoryTabsProps {
  articles: NewsArticle[]
  categories: NewsCategory[]
  activeCategory: NewsCategory | 'all'
  onCategoryChange: (category: NewsCategory | 'all') => void
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

const categoryLabels: Record<NewsCategory | 'all', string> = {
  all: 'All',
  webdev: 'Web Dev',
  ai: 'AI',
  security: 'Security',
  devops: 'DevOps',
  general: 'General',
}

function CategoryTabs({
  articles,
  categories,
  activeCategory,
  onCategoryChange,
  isLoading,
  isError,
  onRetry,
}: CategoryTabsProps) {
  const allCategories: (NewsCategory | 'all')[] = ['all', ...categories]

  return (
    <Tabs
      defaultValue={activeCategory}
      className="w-full"
    >
      <TabsList aria-label="News categories" className="mb-8 justify-start">
        {allCategories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => onCategoryChange(category)}
          >
            {categoryLabels[category]}
          </TabsTrigger>
        ))}
      </TabsList>

      {allCategories.map((category) => (
        <TabsContent key={category} value={category}>
          <NewsList
            articles={
              category === 'all'
                ? articles
                : articles.filter((a) => a.category === category)
            }
            isLoading={isLoading}
            isError={isError}
            onRetry={onRetry}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { CategoryTabs }
```

Create `src/components/news/index.ts`:

```typescript
export { NewsCard } from './NewsCard'
export { NewsList } from './NewsList'
export { CategoryTabs } from './CategoryTabs'
```

### Step 9.4: Create News Page

Create `src/pages/NewsPage.tsx`:

```tsx
import { useState } from 'react'
import { NewsList } from '@/components/news'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { useNews } from '@/lib/hooks'
import type { NewsCategory } from '@/types'

const categories: (NewsCategory | 'all')[] = [
  'all',
  'webdev',
  'ai',
  'security',
  'devops',
  'general',
]

const categoryLabels: Record<NewsCategory | 'all', string> = {
  all: 'All',
  webdev: 'Web Dev',
  ai: 'AI',
  security: 'Security',
  devops: 'DevOps',
  general: 'General',
}

function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all')
  const { articles, isLoading, isError, refresh, lastUpdated } = useNews({
    category: activeCategory,
  })

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-1 mb-4 text-neutral-900">Tech News</h1>
          <p className="text-body-lg mb-4">
            Stay updated with the latest in web development, AI, security, and
            more. Powered by TLDR.
          </p>
          {lastUpdated && (
            <p className="mb-8 text-sm text-neutral-500">
              Last updated:{' '}
              {new Date(lastUpdated).toLocaleDateString('en-GB', {
                dateStyle: 'medium',
              })}
            </p>
          )}
        </div>

        <Tabs defaultValue="all" className="mx-auto max-w-5xl">
          <TabsList aria-label="News categories" className="mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {categoryLabels[category]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <NewsList
                articles={articles}
                isLoading={isLoading}
                isError={isError}
                onRetry={refresh}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Attribution */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            News content provided by{' '}
            <a
              href="https://tldr.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              TLDR Newsletter
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsPage
```

### Step 9.5: Create Events Page Components

Create `src/components/events/EventCard.tsx`:

```tsx
import { Card, CardContent, Badge } from '@/components/ui'
import { formatDateTime } from '@/lib/utils'
import type { TechEvent } from '@/types'

interface EventCardProps {
  event: TechEvent
}

function EventCard({ event }: EventCardProps) {
  const formatBadge = {
    online: { label: 'Online', variant: 'primary' as const },
    'in-person': { label: 'In Person', variant: 'secondary' as const },
    hybrid: { label: 'Hybrid', variant: 'outline' as const },
  }

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus-visible:outline-none"
    >
      <Card
        variant="outline"
        className="h-full transition-colors group-hover:border-primary-300 group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2"
      >
        <CardContent>
          {/* Date and format */}
          <div className="mb-3 flex items-center justify-between">
            <time
              dateTime={event.dateTime}
              className="text-sm font-medium text-primary-600"
            >
              {formatDateTime(event.dateTime)}
            </time>
            <Badge variant={formatBadge[event.format].variant}>
              {formatBadge[event.format].label}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
            {event.name}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-neutral-600">
            {event.description}
          </p>

          {/* Location & Organizer */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            {event.location && (
              <span className="flex items-center gap-1">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location}
              </span>
            )}
            <span className="flex items-center gap-1">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {event.organizer}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export { EventCard }
```

Create `src/components/events/EventList.tsx`:

```tsx
import { EventCard } from './EventCard'
import { SkeletonCard, ErrorMessage } from '@/components/ui'
import type { TechEvent } from '@/types'

interface EventListProps {
  events: TechEvent[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

function EventList({ events, isLoading, isError, onRetry }: EventListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Unable to load events"
        message="We couldn't fetch upcoming events. Please try again."
        onRetry={onRetry}
      />
    )
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl bg-neutral-50 p-12 text-center">
        <p className="text-neutral-600">No upcoming events found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export { EventList }
```

Create `src/components/events/EventFilters.tsx`:

```tsx
import { cn } from '@/lib/utils'

type FilterOption = 'all' | 'online' | 'in-person'

interface EventFiltersProps {
  activeFilter: FilterOption
  onFilterChange: (filter: FilterOption) => void
}

const filters: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'online', label: 'Online' },
  { value: 'in-person', label: 'In Person' },
]

function EventFilters({ activeFilter, onFilterChange }: EventFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter events"
    >
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            activeFilter === filter.value
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          )}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export { EventFilters, type FilterOption }
```

Create `src/components/events/index.ts`:

```typescript
export { EventCard } from './EventCard'
export { EventList } from './EventList'
export { EventFilters, type FilterOption } from './EventFilters'
```

### Step 9.6: Create Events Page

Create `src/pages/EventsPage.tsx`:

```tsx
import { useState } from 'react'
import { EventList, EventFilters, type FilterOption } from '@/components/events'
import { useEvents } from '@/lib/hooks'

function EventsPage() {
  const [filter, setFilter] = useState<FilterOption>('all')
  const { events, isLoading, isError, refresh } = useEvents({
    format: filter,
  })

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-1 mb-4 text-neutral-900">Tech Events</h1>
          <p className="text-body-lg mb-8">
            Discover upcoming tech meetups, conferences, and workshops in London
            and online.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Filters */}
          <div className="mb-8 flex justify-center">
            <EventFilters activeFilter={filter} onFilterChange={setFilter} />
          </div>

          {/* Event list */}
          <EventList
            events={events}
            isLoading={isLoading}
            isError={isError}
            onRetry={refresh}
          />
        </div>
      </div>
    </section>
  )
}

export default EventsPage
```

### Step 9.7: Setup Routing

Update `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'

// Pages (lazy loaded for code splitting)
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const EventsPage = lazy(() => import('@/pages/EventsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// Loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
```

### Step 9.8: Update Main Entry Point

Update `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### Step 9.9: Commit Dynamic Pages

```bash
git add .
git commit -m "feat: add dynamic pages (ProjectDetail, News, Events) with routing"
git push
```

---

## Phase 10: Accessibility & SEO

### Step 10.1: Create SEO Utility

Create `src/lib/utils/seo.ts`:

```typescript
interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

export function updatePageMeta({ title, description, image, url }: SEOProps) {
  // Update title
  document.title = `${title} | Victoria Lauri`

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', title)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', description)
  }

  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) {
      ogImage.setAttribute('content', image)
    }
  }

  if (url) {
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', url)
    }
  }
}
```

Update `src/lib/utils/index.ts`:

```typescript
export { cn } from './cn'
export { formatDate, formatDateTime, getRelativeTime } from './formatDate'
export { updatePageMeta } from './seo'
```

### Step 10.2: Update HTML Head

Update `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>Victoria Lauri | Full-Stack Developer</title>
    <meta name="title" content="Victoria Lauri | Full-Stack Developer" />
    <meta name="description" content="Full-stack developer specialising in accessible, performant web applications with React, TypeScript, and Node.js. Based in London, UK." />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://victorialauri.dev/" />
    <meta property="og:title" content="Victoria Lauri | Full-Stack Developer" />
    <meta property="og:description" content="Full-stack developer specialising in accessible, performant web applications with React, TypeScript, and Node.js. Based in London, UK." />
    <meta property="og:image" content="https://victorialauri.dev/og-image.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://victorialauri.dev/" />
    <meta property="twitter:title" content="Victoria Lauri | Full-Stack Developer" />
    <meta property="twitter:description" content="Full-stack developer specialising in accessible, performant web applications with React, TypeScript, and Node.js. Based in London, UK." />
    <meta property="twitter:image" content="https://victorialauri.dev/og-image.png" />

    <!-- Theme Color -->
    <meta name="theme-color" content="#16a34a" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 10.3: Create robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://victorialauri.dev/sitemap.xml
```

### Step 10.4: Create sitemap.xml

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://victorialauri.dev/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://victorialauri.dev/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://victorialauri.dev/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://victorialauri.dev/news</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://victorialauri.dev/events</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://victorialauri.dev/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Step 10.5: Commit SEO

```bash
git add .
git commit -m "feat: add SEO meta tags, sitemap, and robots.txt"
git push
```

---

## Phase 11: Testing

### Step 11.1: Install Testing Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @axe-core/react
```

### Step 11.2: Configure Vitest

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['./tests/**/*.{test,spec}.{ts,tsx}', './src/**/*.{test,spec}.{ts,tsx}'],
  },
})
```

### Step 11.3: Create Test Setup

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

### Step 11.4: Create Example Component Test

Create `tests/components/Button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Step 11.5: Add Test Scripts

Update `package.json` scripts section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 11.6: Run Tests

```bash
npm run test:run
```

### Step 11.7: Commit Testing Setup

```bash
git add .
git commit -m "feat: add testing setup with Vitest and React Testing Library"
git push
```

---

## Phase 12: Deployment

### Step 12.1: Build the Project

```bash
# Run the production build
npm run build

# Preview locally
npm run preview
```

### Step 12.2: Deploy to Netlify via CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project (link to existing site or create new)
netlify init

# Deploy to production
netlify deploy --prod
```

### Step 12.3: Deploy via GitHub Integration (Recommended)

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your repositories
5. Select `victorialauri-portfolio`
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click "Deploy site"

### Step 12.4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain (e.g., `victorialauri.dev`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

### Step 12.5: Enable Netlify Forms

1. Ensure your contact form has `data-netlify="true"` attribute
2. Deploy the site
3. Go to "Forms" in Netlify dashboard
4. Your form should appear automatically
5. Configure email notifications in form settings

### Step 12.6: Final Commit

```bash
git add .
git commit -m "chore: deployment configuration complete"
git push
```

---

## Post-Launch Checklist

### Performance Audit

Run Lighthouse in Chrome DevTools:

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select all categories
4. Click "Analyze page load"
5. Fix any issues to achieve 90+ scores

### Accessibility Audit

1. Run axe DevTools browser extension
2. Test keyboard navigation on all pages
3. Test with a screen reader (NVDA or VoiceOver)
4. Verify colour contrast ratios

### Content Review

- [ ] All project descriptions are complete
- [ ] All images have alt text
- [ ] Contact form works correctly
- [ ] All links work correctly
- [ ] Social links point to correct profiles

### SEO Verification

1. Submit sitemap to Google Search Console
2. Verify meta tags with [Meta Tags Checker](https://metatags.io/)
3. Test OpenGraph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
npm run lint
# Fix any linting errors
npx tsc --noEmit
# Check for type errors
```

**Tailwind styles not applying:**
1. Verify `tailwind.config.js` content paths
2. Ensure `@tailwind` directives are in `index.css`
3. Restart dev server

**React Router not working on Netlify:**
- Verify `netlify.toml` has the redirect rule for SPA

**Forms not working:**
- Ensure `data-netlify="true"` attribute is present
- Deploy and test on live site (forms don't work locally)

**API calls failing:**
- Check environment variables are set in Netlify
- Verify API endpoints are correct
- Check browser console for CORS errors

---

## Next Steps (Future Enhancements)

1. **Dark Mode** - Add theme toggle with system preference detection
2. **Analytics** - Integrate Netlify Analytics or Plausible
3. **Testimonials** - Add client/colleague quotes section
4. **Blog** - Consider adding a blog using MDX
5. **Performance** - Implement image optimization with sharp
6. **CI/CD** - Add GitHub Actions for automated testing

---

Congratulations! You've built a complete, accessible, and performant portfolio website. 🎉

