import type { Context } from '@netlify/functions'

/**
 * Netlify serverless function to resolve article images
 * - Fetches og:image or twitter:image from article URL
 * - Falls back to favicon if no social image found
 * - Called lazily per-article to avoid timeout issues
 */

/**
 * Extract og:image, twitter:image, or fallback image from HTML
 */
function extractImageFromHtml(html: string, pageUrl: string): string | null {
  // Try og:image
  let match = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  )
  if (!match) {
    match = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    )
  }

  // Try twitter:image
  if (!match) {
    match = html.match(
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
    )
  }
  if (!match) {
    match = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
    )
  }

  if (match && match[1]) {
    const imageUrl = match[1]
    // Handle relative URLs
    if (imageUrl.startsWith('//')) {
      return `https:${imageUrl}`
    }
    if (imageUrl.startsWith('/')) {
      try {
        const base = new URL(pageUrl)
        return `${base.origin}${imageUrl}`
      } catch {
        return imageUrl
      }
    }
    return imageUrl
  }

  return null
}

/**
 * Get favicon URL for a domain
 */
function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname
    // Use Google's favicon service as a reliable fallback
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`
  } catch {
    return ''
  }
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

  // Get the article URL from query params
  const url = new URL(req.url)
  const articleUrl = url.searchParams.get('url')

  if (!articleUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  // Validate URL
  try {
    new URL(articleUrl)
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  try {
    // Fetch the article page with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(articleUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; VictoriaLauri-Portfolio/1.0; +https://victorialauri.com)',
        Accept: 'text/html',
      },
      signal: controller.signal,
      redirect: 'follow',
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Return favicon as fallback
      return new Response(
        JSON.stringify({ image: getFaviconUrl(articleUrl) }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          },
        }
      )
    }

    const html = await response.text()
    const image = extractImageFromHtml(html, articleUrl)

    return new Response(
      JSON.stringify({ image: image || getFaviconUrl(articleUrl) }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      }
    )
  } catch (error) {
    // On any error, return favicon as fallback
    console.error('Image resolve error:', error)
    return new Response(
      JSON.stringify({ image: getFaviconUrl(articleUrl) }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600', // Cache errors for 1 hour
        },
      }
    )
  }
}
