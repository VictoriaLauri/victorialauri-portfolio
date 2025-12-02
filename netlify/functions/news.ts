// Context type from @netlify/functions - available at runtime

/**
 * Netlify serverless function to fetch news from TLDR
 * - Fetches the TLDR homepage which embeds JSON data in Next.js scripts
 * - Extracts article data from the embedded JSON
 * - Filters by requested vertical/newsletter type
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

// Map our verticals to TLDR's internal newsletter names
const VERTICAL_MAP: Record<string, string[]> = {
  webdev: ['dev', 'webdev'],
  tech: ['tech'],
  ai: ['ai'],
  product: ['product'],
  data: ['data'],
  devops: ['devops'],
  security: ['infosec'], // TLDR uses 'infosec' not 'security'
  design: ['design'],
  crypto: ['crypto'],
  founders: ['founders'],
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
  newsletter?: string
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

function decodeJsonString(str: string): string {
  return str
    .replace(/\\u0026/g, '&')
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}

// ============================================
// JSON Extraction
// ============================================

/**
 * Extract the large JSON blob from TLDR's Next.js hydration data
 */
function extractJsonData(html: string): Record<string, TLDRArticle[]> | null {
  try {
    // Look for patterns like "design":[{...}],"crypto":[{...}]
    // This is embedded in the Next.js script tags

    // Find script content that contains article data
    // Pattern: "newsletter_key":[{article objects}]
    const dataMatch = html.match(/\{"[a-z]+":\[\{[^]*?"newsletter"[^]*?\}\]\}/g)

    if (dataMatch && dataMatch.length > 0) {
      // Find the longest match (most complete data)
      const longestMatch = dataMatch.reduce((a, b) =>
        a.length > b.length ? a : b
      )
      try {
        return JSON.parse(longestMatch)
      } catch {
        // Try fixing common JSON issues
      }
    }

    // Alternative: look for the pattern in self.__next_f.push calls
    const nextDataMatch = html.match(/self\.__next_f\.push\(\[1,"([^"]+)"\]\)/g)
    if (nextDataMatch) {
      for (const match of nextDataMatch) {
        const jsonStr = match.match(/self\.__next_f\.push\(\[1,"(.+)"\]\)/)?.[1]
        if (jsonStr && jsonStr.includes('"newsletter"')) {
          try {
            // Unescape the JSON string
            const unescaped = JSON.parse(`"${jsonStr}"`)
            // Now try to find and parse the article data
            const dataStart = unescaped.indexOf('{"')
            if (dataStart >= 0) {
              const parsed = JSON.parse(unescaped.slice(dataStart))
              if (typeof parsed === 'object') {
                return parsed
              }
            }
          } catch {
            continue
          }
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting JSON data:', error)
    return null
  }
}

/**
 * Extract articles by finding individual article objects
 * The TLDR JSON is embedded with ESCAPED quotes: \"url\":\"...\" not "url":"..."
 */
function extractArticlesByPattern(
  html: string,
  targetNewsletters: string[]
): NewsItem[] {
  const items: NewsItem[] = []
  const seenUrls = new Set<string>()

  // The HTML contains escaped JSON like: \"url\":\"https://...\",\"newsletter\":\"design\"
  // We need to match with escaped quotes
  const escapedRegex =
    /\\"url\\":\s*\\"(https?:\/\/[^"\\]+)\\"[^}]*\\"newsletter\\":\s*\\"([^"\\]+)\\"[^}]*\\"title\\":\s*\\"([^"\\]+)\\"/g

  let match
  while ((match = escapedRegex.exec(html)) !== null) {
    const [fullMatch, url, newsletter, title] = match

    if (!url || !title || !newsletter) continue
    if (url.includes('tldr.tech')) continue
    if (seenUrls.has(url)) continue
    if (title.length < 10) continue

    // Check if this article belongs to our target newsletters
    if (!targetNewsletters.includes(newsletter)) continue

    seenUrls.add(url)

    // Try to extract imageUrl
    const imageMatch = fullMatch.match(/\\"imageUrl\\":\s*\\"([^"\\]+)\\"/)

    items.push({
      id: `${newsletter}-${items.length}`,
      title: decodeJsonString(title),
      url: cleanUrl(decodeJsonString(url)),
      source: getSourceFromUrl(url),
      image: imageMatch ? decodeJsonString(imageMatch[1]) : null,
    })
  }

  // Also try unescaped format just in case
  const unescapedRegex =
    /"url":\s*"(https?:\/\/[^"]+)"[^}]*"newsletter":\s*"([^"]+)"[^}]*"title":\s*"([^"]+)"/g

  while ((match = unescapedRegex.exec(html)) !== null) {
    const [fullMatch, url, newsletter, title] = match

    if (!url || !title || !newsletter) continue
    if (url.includes('tldr.tech')) continue
    if (seenUrls.has(url)) continue
    if (title.length < 10) continue

    if (!targetNewsletters.includes(newsletter)) continue

    seenUrls.add(url)

    const imageMatch = fullMatch.match(/"imageUrl":\s*"([^"]+)"/)

    items.push({
      id: `${newsletter}-${items.length}`,
      title: decodeJsonString(title),
      url: cleanUrl(decodeJsonString(url)),
      source: getSourceFromUrl(url),
      image: imageMatch ? decodeJsonString(imageMatch[1]) : null,
    })
  }

  return items
}

/**
 * Extract articles from parsed JSON data
 */
function extractFromParsedData(
  data: Record<string, TLDRArticle[]>,
  targetNewsletters: string[]
): NewsItem[] {
  const items: NewsItem[] = []
  const seenUrls = new Set<string>()

  for (const [key, articles] of Object.entries(data)) {
    // Check if this key matches our target newsletters
    if (!targetNewsletters.includes(key)) continue

    if (!Array.isArray(articles)) continue

    for (const article of articles) {
      if (!article.url || !article.title) continue
      if (article.url.includes('tldr.tech')) continue
      if (seenUrls.has(article.url)) continue

      seenUrls.add(article.url)

      items.push({
        id: `${key}-${article.id || items.length}`,
        title: decodeJsonString(article.title),
        url: cleanUrl(decodeJsonString(article.url)),
        source: getSourceFromUrl(article.url),
        image: article.imageUrl ? decodeJsonString(article.imageUrl) : null,
      })
    }
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
    // Always fetch the main homepage - that's where the data is
    const tldrUrl = 'https://tldr.tech/'
    console.log(`Fetching: ${tldrUrl} for vertical: ${vertical}`)

    const response = await fetch(tldrUrl, {
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
    console.log(`Got ${html.length} bytes of HTML`)

    // Get the target newsletter names for this vertical
    const targetNewsletters = VERTICAL_MAP[vertical] || [vertical]
    console.log(`Looking for newsletters: ${targetNewsletters.join(', ')}`)

    let items: NewsItem[] = []

    // Log what newsletters we find in the HTML for debugging (escaped quotes)
    const foundNewsletters = new Set<string>()
    const newsletterMatches = html.matchAll(
      /\\"newsletter\\":\s*\\"([^"\\]+)\\"/g
    )
    for (const m of newsletterMatches) {
      foundNewsletters.add(m[1])
    }
    console.log(
      'Found newsletter types in HTML:',
      Array.from(foundNewsletters).join(', ') || 'NONE'
    )

    // Use pattern-based extraction (works with escaped quotes)
    console.log('Using pattern-based extraction...')
    items = extractArticlesByPattern(html, targetNewsletters)
    console.log(`Extracted ${items.length} items from pattern matching`)

    console.log(`Extracted ${items.length} articles for ${vertical}`)

    // Dedupe and limit
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
