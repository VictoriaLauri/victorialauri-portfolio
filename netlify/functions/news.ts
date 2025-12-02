import type { Context } from '@netlify/functions'

/**
 * Netlify serverless function to proxy TLDR API
 * - Fetches news from TLDR API
 * - Sniffs sponsor URLs from live HTML page
 * - Filters out sponsored content using domain matching
 * - Returns articles WITHOUT images (images resolved lazily on client)
 */

const ALLOWED_VERTICALS = [
  'webdev', 'tech', 'ai', 'product', 'data',
  'devops', 'security', 'design', 'crypto', 'founders',
]

interface TLDRItem {
  id?: string
  title?: string
  url?: string
  source?: string
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
}

// ============================================
// URL & Domain Helpers
// ============================================

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const origin = `${parsed.protocol}//${parsed.host}`
    const path = parsed.pathname

    // Remove tracking params
    const trackingParams = [
      'utm_', 'gclid', 'fbclid', 'mc_', 'ref', 'ref_',
      'campaign', 'source', 'medium', 'content'
    ]
    const params = new URLSearchParams(parsed.search)
    const keepParams = new URLSearchParams()
    
    for (const [key, value] of params) {
      const isTracking = trackingParams.some(t => 
        key.toLowerCase().startsWith(t) || key.toLowerCase() === t.replace('_', '')
      )
      if (!isTracking) {
        keepParams.set(key, value)
      }
    }

    const qs = keepParams.toString()
    return origin + path + (qs ? '?' + qs : '')
  } catch {
    return url
  }
}

function getRegistrableDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase()
    const parts = hostname.split('.')
    if (parts.length <= 2) return hostname

    // Handle two-level TLDs like co.uk, com.au, etc.
    const twoLevelTLDs = [
      'co.uk', 'ac.uk', 'gov.uk', 'org.uk', 'com.au', 'net.au',
      'com.br', 'com.mx', 'co.jp', 'ne.jp', 'co.kr', 'com.cn',
      'com.hk', 'com.sg', 'com.tw', 'co.in', 'com.co'
    ]
    
    const lastTwo = parts.slice(-2).join('.')
    if (twoLevelTLDs.includes(lastTwo) && parts.length > 2) {
      return parts.slice(-3).join('.')
    }
    
    return parts.slice(-2).join('.')
  } catch {
    return ''
  }
}

function getBrandFromDomain(domain: string): string {
  const label = domain.split('.')[0] || ''
  return label.replace(/[^a-z0-9]/gi, '').toLowerCase()
}

function getSourceFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

// ============================================
// Sponsor Detection
// ============================================

const CTA_PATTERNS = [
  'learn more', 'get started', 'sign up', 'try it', 'try now',
  'start free', 'book a demo', 'book demo', 'free trial',
  'download', 'read more', 'limited time', 'register now',
  'join now', 'subscribe', 'claim your', 'get your'
]

function looksLikeCTA(title: string): boolean {
  const lower = title.toLowerCase()
  return CTA_PATTERNS.some(p => lower.includes(p))
}

function hasExplicitSponsorFlag(item: TLDRItem): boolean {
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

function isSponsoredSection(title: string): boolean {
  const lower = title.toLowerCase()
  return /\b(sponsor|sponsored|advert|advertisement|ad)\b/.test(lower)
}

/**
 * Sniff the live TLDR HTML page to find sponsor URLs
 */
async function sniffSponsorUrls(vertical: string): Promise<Set<string>> {
  const sponsorUrls = new Set<string>()
  
  try {
    const response = await fetch(`https://tldr.tech/${vertical}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VictoriaLauri-Portfolio/1.0)',
        'Accept': 'text/html',
      },
    })
    
    if (!response.ok) return sponsorUrls
    
    const html = await response.text()
    
    // Find "Sponsor" or "Sponsored" labels and extract nearby URLs
    // Look for patterns like: <strong>Sponsor</strong> or class="sponsor"
    const sponsorPatterns = [
      // Match content near "Sponsor" text
      /(?:sponsor(?:ed)?)[^<]*<\/[^>]+>\s*(?:<[^>]+>\s*)*<a[^>]+href=["']([^"']+)["']/gi,
      // Match links in elements with sponsor in class
      /class=["'][^"']*sponsor[^"']*["'][^>]*>[\s\S]*?<a[^>]+href=["']([^"']+)["']/gi,
      // Match the first few links after "Sponsor" text
      />\s*(?:Sponsor(?:ed)?)\s*<[\s\S]{0,500}?<a[^>]+href=["']([^"']+)["']/gi,
    ]
    
    for (const pattern of sponsorPatterns) {
      let match
      while ((match = pattern.exec(html)) !== null) {
        const url = match[1]
        if (url && !url.includes('tldr.tech')) {
          sponsorUrls.add(normalizeUrl(url))
        }
      }
    }
    
    // Also look for the first section which often contains sponsors
    // Extract URLs from the first "card" or "article" block
    const firstBlockMatch = html.match(/<article[^>]*>[\s\S]*?<\/article>/i)
    if (firstBlockMatch) {
      const linkMatches = firstBlockMatch[0].matchAll(/<a[^>]+href=["']([^"']+)["']/gi)
      for (const m of linkMatches) {
        if (m[1] && !m[1].includes('tldr.tech')) {
          sponsorUrls.add(normalizeUrl(m[1]))
        }
      }
    }
  } catch (error) {
    console.error('Error sniffing sponsor URLs:', error)
  }
  
  return sponsorUrls
}

/**
 * Mark sponsored items in a section
 */
function markSponsors(
  items: TLDRItem[],
  sniffedUrls: Set<string>
): TLDRItem[] {
  if (!items.length) return items
  
  const marked = items.map(item => ({ ...item }))
  const n = marked.length
  
  // Step 1: Mark items with explicit sponsor flags or matching sniffed URLs
  const seedIndexes: number[] = []
  
  for (let i = 0; i < n; i++) {
    const item = marked[i]
    const normalizedUrl = normalizeUrl(item.url || '')
    
    if (hasExplicitSponsorFlag(item)) {
      item._sponsored = true
      seedIndexes.push(i)
    } else if (normalizedUrl && sniffedUrls.has(normalizedUrl)) {
      item._sponsored = true
      seedIndexes.push(i)
    }
  }
  
  // Step 2: Extend sponsor marking to following items that match by domain or CTA
  for (const seedIdx of seedIndexes) {
    const seedUrl = marked[seedIdx].url || ''
    const seedDomain = getRegistrableDomain(seedUrl)
    const seedBrand = getBrandFromDomain(seedDomain)
    
    let cap = 5 // Mark up to 5 following items
    let i = seedIdx + 1
    
    while (i < n && cap-- > 0) {
      const item = marked[i]
      const itemUrl = item.url || ''
      const itemDomain = getRegistrableDomain(itemUrl)
      const itemTitle = item.title || ''
      
      const matchesDomain = seedDomain && itemDomain === seedDomain
      const matchesBrand = seedBrand && 
        new RegExp(`\\b${seedBrand}\\b`, 'i').test(itemTitle)
      const isCTA = looksLikeCTA(itemTitle)
      
      // If seed is at position 0, always mark the next item
      const forceNext = seedIdx === 0 && i === 1
      
      if (matchesDomain || matchesBrand || isCTA || forceNext) {
        item._sponsored = true
        i++
        if (forceNext && !matchesDomain && !matchesBrand && !isCTA) {
          break
        }
      } else {
        break
      }
    }
  }
  
  // Step 3: Head cluster detection - if first 2+ items share same domain, mark as sponsors
  if (seedIndexes.length === 0 && n > 1) {
    const firstDomain = getRegistrableDomain(marked[0].url || '')
    if (firstDomain) {
      let runLength = 1
      for (let j = 1; j < n; j++) {
        const domain = getRegistrableDomain(marked[j].url || '')
        if (domain === firstDomain) {
          runLength++
        } else {
          break
        }
      }
      
      if (runLength >= 2) {
        for (let k = 0; k < runLength; k++) {
          marked[k]._sponsored = true
        }
      }
    }
  }
  
  // Step 4: Dedupe - mark duplicate URLs
  const seenUrls = new Set<string>()
  for (const item of marked) {
    const normalizedUrl = normalizeUrl(item.url || '')
    if (normalizedUrl) {
      if (seenUrls.has(normalizedUrl)) {
        item._sponsored = true
      } else {
        seenUrls.add(normalizedUrl)
      }
    }
  }
  
  return marked
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
    // Step 1: Sniff sponsor URLs from the live HTML page
    const sniffedUrls = await sniffSponsorUrls(vertical)
    console.log(`Sniffed ${sniffedUrls.size} sponsor URLs for ${vertical}`)
    
    // Step 2: Fetch from TLDR API
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
      // HTML fallback
      const html = await response.text()
      const items = parseLinksFromHtml(html)
      data = { sections: [{ title: 'Latest', items }] }
    }

    // Step 3: Filter sections and mark sponsors
    const filteredSections = (data.sections || [])
      // Remove sections with sponsor in title
      .filter((section) => !isSponsoredSection(section.title || ''))
      .map((section) => {
        // Mark sponsors in items
        const markedItems = markSponsors(section.items || [], sniffedUrls)
        
        // Filter out sponsored items
        const cleanItems = markedItems
          .filter((item) => !item._sponsored)
          .map((item, index) => ({
            id: item.id || `${vertical}-${index}`,
            title: item.title || '',
            url: item.url || '',
            source: item.source || getSourceFromUrl(item.url || ''),
            image: null, // Resolved lazily on client
          }))
        
        return {
          title: section.title || 'Latest',
          items: cleanItems,
        }
      })
      // Remove empty sections
      .filter((section) => section.items.length > 0)

    console.log(`Returning ${filteredSections.reduce((sum, s) => sum + s.items.length, 0)} items`)

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
      JSON.stringify({ sections: [], error: 'Failed to fetch news' }),
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
 * Fallback HTML parser
 */
function parseLinksFromHtml(html: string): TLDRItem[] {
  const items: TLDRItem[] = []
  const seen = new Set<string>()

  const linkRegex = /<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>([^<]+)<\/a>/gi
  let match

  while ((match = linkRegex.exec(html)) !== null) {
    const [, href, text] = match
    const title = text.trim()

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
