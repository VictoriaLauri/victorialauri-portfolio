import type { Context } from '@netlify/functions'

/**
 * Netlify serverless function to proxy TLDR API
 * - Fetches news from TLDR API
 * - Filters out sponsored content
 * - Returns articles WITHOUT images (images resolved lazily on client)
 */

// Allowed news categories/verticals
const ALLOWED_VERTICALS = [
  'webdev',
  'tech',
  'ai',
  'product',
  'data',
  'devops',
  'security',
  'design',
  'crypto',
  'founders',
]

interface TLDRItem {
  id?: string
  title?: string
  url?: string
  source?: string
  image?: string
  sponsored?: boolean
  isSponsor?: boolean
  is_sponsored?: boolean
  _sponsored?: boolean
}

interface TLDRSection {
  title?: string
  items?: TLDRItem[]
}

interface TLDRResponse {
  sections?: TLDRSection[]
  error?: string
}

/**
 * Extract hostname from URL for source display
 */
function getSourceFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname
    return hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Check if an item appears to be sponsored content
 */
function isSponsored(item: TLDRItem): boolean {
  const title = (item.title || '').toLowerCase()

  // Check explicit flags
  if (item.sponsored || item.isSponsor || item.is_sponsored || item._sponsored) {
    return true
  }

  // Check for "(Sponsor)" in title
  if (/\(\s*sponsor\s*\)/i.test(title)) {
    return true
  }

  return false
}

/**
 * Check if a section title indicates sponsored content
 */
function isSponsoredSection(title: string): boolean {
  const lower = title.toLowerCase()
  return /\b(sponsor|sponsored|advert|ad)\b/.test(lower)
}

export default async function handler(req: Request, _context: Context) {
  // Handle CORS preflight
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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Parse query parameters
  const url = new URL(req.url)
  const vertical = url.searchParams.get('vertical') || 'webdev'

  // Validate vertical
  if (!ALLOWED_VERTICALS.includes(vertical)) {
    return new Response(
      JSON.stringify({
        sections: [{ title: 'Latest', items: [] }],
        error: 'Invalid vertical',
      }),
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
    // Fetch from TLDR API
    const tldrUrl = `https://tldr.tech/api/latest/${vertical}`
    const response = await fetch(tldrUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'VictoriaLauri-Portfolio/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`TLDR API returned ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    let data: TLDRResponse

    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // If HTML returned, parse links from it
      const html = await response.text()
      const items = parseLinksFromHtml(html)
      data = { sections: [{ title: 'Latest', items }] }
    }

    // Filter and transform sections
    const filteredSections = (data.sections || [])
      .filter((section) => !isSponsoredSection(section.title || ''))
      .map((section) => ({
        title: section.title || 'Latest',
        items: (section.items || [])
          .filter((item) => !isSponsored(item))
          .map((item, index) => ({
            id: item.id || `${vertical}-${index}`,
            title: item.title || '',
            url: item.url || '',
            source: item.source || getSourceFromUrl(item.url || ''),
            // Don't include image - will be resolved lazily on client
            image: null,
          })),
      }))

    return new Response(
      JSON.stringify({ sections: filteredSections }),
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
        error: 'Failed to fetch news',
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

/**
 * Fallback parser for HTML responses
 */
function parseLinksFromHtml(html: string): TLDRItem[] {
  const items: TLDRItem[] = []
  const seen = new Set<string>()

  // Simple regex to extract links
  const linkRegex = /<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]+)<\/a>/gi
  let match

  while ((match = linkRegex.exec(html)) !== null) {
    const [, href, text] = match
    const title = text.trim()

    // Skip internal links and duplicates
    if (href.includes('tldr.tech')) continue
    if (seen.has(href)) continue
    if (title.length < 4) continue

    seen.add(href)
    items.push({
      id: `html-${items.length}`,
      title,
      url: href,
      source: getSourceFromUrl(href),
    })

    if (items.length >= 30) break
  }

  return items
}
