/**
 * Type definitions for Victoria Lauri Portfolio
 */

// ============================================
// News Types
// ============================================

/** A single news article item scraped from TLDR website */
export interface NewsArticle {
  id: string
  title: string
  url: string
  source: string
  image?: string | null
}

/** A section of news articles (e.g., "Headlines", "Articles", etc.) */
export interface NewsSection {
  title: string
  items: NewsArticle[]
}

/** Response from the news API */
export interface NewsResponse {
  sections: NewsSection[]
  error?: string
}

/** Available news categories/verticals */
export type NewsCategory =
  | 'webdev'
  | 'tech'
  | 'ai'
  | 'product'
  | 'data'
  | 'devops'
  | 'security'
  | 'design'
  | 'crypto'
  | 'founders'

/** Human-readable labels for news categories */
export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  webdev: 'Dev',
  tech: 'Tech',
  ai: 'AI',
  product: 'Product',
  data: 'Data',
  devops: 'DevOps',
  security: 'Security',
  design: 'Design',
  crypto: 'Crypto',
  founders: 'Founders',
}

// ============================================
// Project Types
// ============================================

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  thumbnail: string
  heroImage: string
  techStack: string[]
  features: string[]
  challenges: ChallengeItem[]
  learnings: string[]
  githubUrl: string
  liveUrl?: string
  featured: boolean
  order: number
}

export interface ChallengeItem {
  challenge: string
  solution: string
}

// ============================================
// Event Types
// ============================================

export interface TechEvent {
  id: string
  name: string
  description: string
  dateTime: string
  endDateTime?: string
  format: 'online' | 'in-person' | 'hybrid'
  location?: string
  url: string
  organizer: string
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  label: string
  href: string
}

// ============================================
// Service Types
// ============================================

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

// ============================================
// Tech Stack Types
// ============================================

export interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools' | 'databases'
}

