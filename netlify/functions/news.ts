// Context type from @netlify/functions - available at runtime

/**
 * Netlify serverless function to fetch news from TLDR
 * - Resolves the latest edition page for a newsletter vertical via TLDR's
 *   `/api/latest/{slug}` redirect (e.g. -> tldr.tech/tech/2026-09-18)
 * - Parses the rendered `<article>` blocks on that edition page
 * - Filters out sponsor articles (titles end in "(Sponsor)")
 */

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

// Map our verticals to TLDR's newsletter URL slugs
const VERTICAL_TO_SLUG: Record<string, string> = {
  webdev: 'dev', // TLDR calls this newsletter 'dev'
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

function cleanUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    urlObj.searchParams.delete('utm_source')
    return urlObj.toString()
  } catch {
    return url.replace(/\?utm_source=[^&"]+/, '')
  }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

// ============================================
// Article extraction
// ============================================

/**
 * Parse the `<article>` blocks TLDR renders on an edition page, e.g.:
 * <article class="mt-3"><a class="font-bold" href="URL" target="_blank"
 *   rel="noopener noreferrer"><h3>Title (3 minute read)</h3></a>
 *   <div class="newsletter-html">...summary...</div></article>
 *
 * Sponsor entries are titled like "... (Sponsor)" and are skipped.
 */
function extractArticlesFromEditionHtml(html: string): NewsItem[] {
  const items: NewsItem[] = []
  const seenUrls = new Set<string>()

  const articleRegex =
    /<article\b[^>]*>\s*<a\b[^>]*\bhref="([^"]*)"[^>]*>\s*<h3>([\s\S]*?)<\/h3>/g

  let match: RegExpExecArray | null
  while ((match = articleRegex.exec(html)) !== null) {
    const [, rawUrl, rawTitle] = match
    if (!rawUrl || !rawTitle) continue

    const url = cleanUrl(decodeHtmlEntities(rawUrl))
    if (url.includes('tldr.tech')) continue
    if (seenUrls.has(url)) continue

    const decodedTitle = decodeHtmlEntities(rawTitle).trim()
    if (/\(\s*sponsor\s*\)\s*$/i.test(decodedTitle)) continue

    const title = decodedTitle.replace(/\s*\(\d+\s*minute read\)\s*$/i, '')
    if (title.length < 4) continue

    seenUrls.add(url)

    items.push({
      id: `item-${items.length}`,
      title,
      url,
      source: getSourceFromUrl(url),
      image: null,
    })
  }

  return items
}

// ============================================
// Main Handler
// ============================================

export default async function handler(req: Request) {
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
  const vertical = url.searchParams.get('vertical') || 'tech'

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
    const slug = VERTICAL_TO_SLUG[vertical] || vertical
    // /api/latest/{slug} redirects to the latest dated edition page,
    // e.g. https://tldr.tech/tech/2026-09-18 - fetch() follows it.
    const latestUrl = `https://tldr.tech/api/latest/${slug}`
    console.log(`Fetching: ${latestUrl} for vertical: ${vertical}`)

    const response = await fetch(latestUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    })

    if (!response.ok) {
      throw new Error(`TLDR returned ${response.status}`)
    }

    const html = await response.text()
    console.log(`Got ${html.length} bytes of HTML from ${response.url}`)

    const items = extractArticlesFromEditionHtml(html)
    console.log(`Extracted ${items.length} non-sponsor articles for ${vertical}`)

    // Limit
    const uniqueItems = items.slice(0, 30)

    const sections: NewsSection[] =
      uniqueItems.length > 0 ? [{ title: 'Latest', items: uniqueItems }] : []

    return new Response(JSON.stringify({ sections }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('News fetch error:', error)
    return new Response(
      JSON.stringify({
        sections: [],
        error: error instanceof Error ? error.message : 'Failed to fetch news',
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
