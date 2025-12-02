import type { Context } from '@netlify/functions'

/**
 * Netlify serverless function to fetch news from TLDR
 * - Scrapes the TLDR website which embeds JSON data in Next.js hydration scripts
 * - Extracts article data from the embedded JSON
 * - Returns articles WITHOUT images (images resolved lazily on client)
 */

const ALLOWED_VERTICALS = [
  'webdev', 'tech', 'ai', 'product', 'data',
  'devops', 'security', 'design', 'crypto', 'founders',
]

// Map our verticals to TLDR's internal names
const VERTICAL_MAP: Record<string, string> = {
  webdev: 'webdev',
  tech: 'tech',
  ai: 'ai',
  product: 'product',
  data: 'data',
  devops: 'devops',
  security: 'infosec', // TLDR uses 'infosec' not 'security'
  design: 'design',
  crypto: 'crypto',
  founders: 'founders',
}

interface NewsItem {
  id: string
  title: string
  url: string
  source: string
  image: string | null
}

interface NewsSection {
  title: string
  items: NewsItem[]
}

interface TLDRArticle {
  id?: number
  title?: string
  url?: string
  tldr?: string
  imageUrl?: string
  date?: string
  category?: string
}

// ============================================
// Helpers
// ============================================

function getSourceFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

// ============================================
// JSON Extraction from Next.js Hydration
// ============================================

/**
 * Extract news articles from TLDR's embedded JSON data
 * TLDR uses Next.js which embeds data in script tags
 */
function extractArticlesFromJson(html: string, vertical: string): NewsItem[] {
  const items: NewsItem[] = []
  const tldrKey = VERTICAL_MAP[vertical] || vertical

  try {
    // Look for the embedded JSON data containing article arrays
    // The data is typically in a pattern like "webdev":[{...}, {...}]
    const jsonPattern = new RegExp(`"${tldrKey}":\\s*\\[([^\\]]+(?:\\[[^\\]]*\\][^\\]]*)*?)\\]`, 'g')
    
    let match
    while ((match = jsonPattern.exec(html)) !== null) {
      try {
        // Try to parse the array content
        const arrayContent = `[${match[1]}]`
        const articles: TLDRArticle[] = JSON.parse(arrayContent)
        
        for (const article of articles) {
          if (!article.url || !article.title) continue
          if (article.url.includes('tldr.tech')) continue
          
          // Clean the URL (remove utm params for cleaner display)
          let cleanUrl = article.url
          try {
            const urlObj = new URL(article.url)
            urlObj.searchParams.delete('utm_source')
            cleanUrl = urlObj.toString()
          } catch {
            // Keep original if parsing fails
          }
          
          items.push({
            id: `${vertical}-${article.id || items.length}`,
            title: article.title,
            url: cleanUrl,
            source: getSourceFromUrl(article.url),
            image: article.imageUrl || null,
          })
        }
      } catch {
        // Continue if this match doesn't parse
        continue
      }
    }

    // Alternative approach: look for the full data structure
    if (items.length === 0) {
      // Try to find JSON objects with url, title, and tldr fields
      const articlePattern = /\{"url":"(https?:\/\/[^"]+)"[^}]*"title":"([^"]+)"[^}]*\}/g
      let articleMatch
      const seenUrls = new Set<string>()
      
      while ((articleMatch = articlePattern.exec(html)) !== null) {
        const [fullMatch, url, title] = articleMatch
        
        if (url.includes('tldr.tech')) continue
        if (seenUrls.has(url)) continue
        if (title.length < 10) continue
        
        // Check if this article belongs to our vertical
        if (fullMatch.includes(`"newsletter":"${tldrKey}"`) || 
            fullMatch.includes(`"${tldrKey}"`)) {
          seenUrls.add(url)
          
          // Try to extract imageUrl from the match
          const imageMatch = fullMatch.match(/"imageUrl":"([^"]+)"/)
          const imageUrl = imageMatch ? imageMatch[1] : null
          
          items.push({
            id: `${vertical}-${items.length}`,
            title: title,
            url: url.replace(/\?utm_source=[^&"]+/, ''),
            source: getSourceFromUrl(url),
            image: imageUrl,
          })
        }
      }
    }
  } catch (error) {
    console.error('Error extracting JSON:', error)
  }

  return items
}

/**
 * Broader extraction that finds all articles in the HTML
 */
function extractAllArticles(html: string, vertical: string): NewsItem[] {
  const items: NewsItem[] = []
  const seenUrls = new Set<string>()
  const tldrKey = VERTICAL_MAP[vertical] || vertical

  // Pattern to match article objects with newsletter field
  const pattern = new RegExp(
    `\\{[^{}]*"newsletter"\\s*:\\s*"${tldrKey}"[^{}]*"url"\\s*:\\s*"(https?://[^"]+)"[^{}]*"title"\\s*:\\s*"([^"]+)"[^{}]*\\}|` +
    `\\{[^{}]*"url"\\s*:\\s*"(https?://[^"]+)"[^{}]*"newsletter"\\s*:\\s*"${tldrKey}"[^{}]*"title"\\s*:\\s*"([^"]+)"[^{}]*\\}|` +
    `\\{[^{}]*"url"\\s*:\\s*"(https?://[^"]+)"[^{}]*"title"\\s*:\\s*"([^"]+)"[^{}]*"newsletter"\\s*:\\s*"${tldrKey}"[^{}]*\\}`,
    'g'
  )

  let match
  while ((match = pattern.exec(html)) !== null) {
    const url = match[1] || match[3] || match[5]
    const title = match[2] || match[4] || match[6]
    
    if (!url || !title) continue
    if (url.includes('tldr.tech')) continue
    if (seenUrls.has(url)) continue
    if (title.length < 10) continue

    seenUrls.add(url)
    
    // Try to find imageUrl nearby
    const fullMatch = match[0]
    const imageMatch = fullMatch.match(/"imageUrl"\s*:\s*"([^"]+)"/)
    
    items.push({
      id: `${vertical}-${items.length}`,
      title: title.replace(/\\u0026/g, '&').replace(/\\"/g, '"'),
      url: url.replace(/\?utm_source=[^&"]+/, '').replace(/\\u0026/g, '&'),
      source: getSourceFromUrl(url),
      image: imageMatch ? imageMatch[1].replace(/\\u0026/g, '&') : null,
    })
  }

  return items
}

// ============================================
// Main Handler
// ============================================

export default async function handler(req: Request, _context: Context) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(req.url)
  const vertical = url.searchParams.get('vertical') || 'webdev'

  if (!ALLOWED_VERTICALS.includes(vertical)) {
    return new Response(
      JSON.stringify({ sections: [], error: 'Invalid vertical' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  try {
    // Fetch the TLDR webpage
    const tldrUrl = `https://tldr.tech/${vertical}`
    console.log(`Fetching: ${tldrUrl}`)
    
    const response = await fetch(tldrUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    })

    if (!response.ok) {
      throw new Error(`TLDR returned ${response.status}`)
    }

    const html = await response.text()
    console.log(`Got ${html.length} bytes of HTML`)
    
    // Try different extraction methods
    let items = extractArticlesFromJson(html, vertical)
    
    if (items.length === 0) {
      console.log('First extraction found nothing, trying broader extraction...')
      items = extractAllArticles(html, vertical)
    }
    
    console.log(`Extracted ${items.length} articles for ${vertical}`)

    // Dedupe and limit
    const uniqueItems = items.slice(0, 30)

    const sections: NewsSection[] = uniqueItems.length > 0 
      ? [{ title: 'Latest', items: uniqueItems }]
      : []

    return new Response(
      JSON.stringify({ sections }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('News fetch error:', error)
    return new Response(
      JSON.stringify({ 
        sections: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch news' 
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}
