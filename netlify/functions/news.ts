import type { Context } from '@netlify/functions'

/**
 * Netlify serverless function to fetch news from TLDR
 * - Scrapes the TLDR website HTML (API is deprecated)
 * - Extracts article links, titles, and sources
 * - Returns articles WITHOUT images (images resolved lazily on client)
 */

const ALLOWED_VERTICALS = [
  'webdev', 'tech', 'ai', 'product', 'data',
  'devops', 'security', 'design', 'crypto', 'founders',
]

interface NewsItem {
  id: string
  title: string
  url: string
  source: string
  image: null
}

interface NewsSection {
  title: string
  items: NewsItem[]
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

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
}

// ============================================
// HTML Scraping
// ============================================

/**
 * Parse news articles from TLDR HTML page
 */
function parseNewsFromHtml(html: string, vertical: string): NewsSection[] {
  const items: NewsItem[] = []
  const seenUrls = new Set<string>()
  const seenTitles = new Set<string>()

  // Strategy 1: Look for article links with substantial text
  // TLDR typically has links like: <a href="...">Article Title Here</a>
  // We want external links (not tldr.tech internal links)
  
  // Match anchor tags with href and text content
  const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]{10,})<\/a>/gi
  
  let match
  while ((match = linkPattern.exec(html)) !== null) {
    const [, href, rawTitle] = match
    
    // Skip internal TLDR links
    if (href.includes('tldr.tech')) continue
    if (href.startsWith('/')) continue
    if (href.startsWith('#')) continue
    if (!href.startsWith('http')) continue
    
    // Skip social/utility links
    if (href.includes('twitter.com')) continue
    if (href.includes('linkedin.com/sharing')) continue
    if (href.includes('facebook.com/sharer')) continue
    if (href.includes('mailto:')) continue
    
    // Clean up title
    const title = decodeHtmlEntities(rawTitle.trim())
      .replace(/\s+/g, ' ')
      .trim()
    
    // Skip if title is too short or looks like a button/nav
    if (title.length < 15) continue
    if (title.length > 300) continue
    
    // Skip duplicates
    if (seenUrls.has(href)) continue
    if (seenTitles.has(title.toLowerCase())) continue
    
    // Skip common non-article patterns
    const lowerTitle = title.toLowerCase()
    if (lowerTitle === 'read more') continue
    if (lowerTitle === 'learn more') continue
    if (lowerTitle === 'click here') continue
    if (lowerTitle.startsWith('subscribe')) continue
    if (lowerTitle.includes('unsubscribe')) continue
    
    seenUrls.add(href)
    seenTitles.add(title.toLowerCase())
    
    items.push({
      id: `${vertical}-${items.length}`,
      title,
      url: href,
      source: getSourceFromUrl(href),
      image: null,
    })
  }

  // Strategy 2: Look for links within article/card containers
  // Some sites wrap articles in divs with specific classes
  const articlePattern = /<article[^>]*>([\s\S]*?)<\/article>/gi
  let articleMatch
  
  while ((articleMatch = articlePattern.exec(html)) !== null) {
    const articleHtml = articleMatch[1]
    const innerLinkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]{10,})<\/a>/gi
    let innerMatch
    
    while ((innerMatch = innerLinkPattern.exec(articleHtml)) !== null) {
      const [, href, rawTitle] = innerMatch
      
      if (href.includes('tldr.tech')) continue
      if (!href.startsWith('http')) continue
      if (seenUrls.has(href)) continue
      
      const title = decodeHtmlEntities(rawTitle.trim()).replace(/\s+/g, ' ').trim()
      if (title.length < 15 || title.length > 300) continue
      if (seenTitles.has(title.toLowerCase())) continue
      
      seenUrls.add(href)
      seenTitles.add(title.toLowerCase())
      
      items.push({
        id: `${vertical}-${items.length}`,
        title,
        url: href,
        source: getSourceFromUrl(href),
        image: null,
      })
    }
  }

  // Remove any items that look like navigation or footer links
  const filteredItems = items.filter(item => {
    const lower = item.title.toLowerCase()
    // Skip if it's just a domain name or very generic
    if (lower === item.source) return false
    if (lower.includes('privacy policy')) return false
    if (lower.includes('terms of service')) return false
    if (lower.includes('cookie')) return false
    return true
  })

  // Group into sections or return as single section
  if (filteredItems.length === 0) {
    return []
  }

  return [{
    title: 'Latest',
    items: filteredItems.slice(0, 30), // Limit to 30 items
  }]
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
    
    // Parse news from HTML
    const sections = parseNewsFromHtml(html, vertical)
    const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
    console.log(`Parsed ${totalItems} news items`)

    if (totalItems === 0) {
      // Return empty but valid response
      return new Response(
        JSON.stringify({ 
          sections: [{ title: 'Latest', items: [] }],
          message: 'No articles found'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      )
    }

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
        sections: [{ title: 'Latest', items: [] }], 
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
