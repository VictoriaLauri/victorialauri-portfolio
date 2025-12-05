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
  subtitle: string // One-sentence summary
  shortDescription: string // For cards on projects list
  overview: ProjectOverview
  role: string // Your role & contribution
  techStack: TechStackItem[]
  images: string[] // Array of image filenames (e.g., ['project_01.jpg', 'project_02.jpg'])
  videoDemo?: string // Optional video URL
  githubUrl: string
  liveUrl?: string
  features: string[]
  challenges: ChallengeItem[]
  learnings: string[]
  accessibility: string // A11y & UX considerations
  businessReasoning: string
  futureImprovements: string[]
  featured: boolean
  completedDate: string // For ordering (newest first)
}

export interface ProjectOverview {
  what: string
  why: string
  who: string
}

export interface TechStackItem {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'testing' | 'deployment'
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

