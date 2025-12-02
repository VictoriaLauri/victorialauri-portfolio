<?php
// CORS for local dev
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=0, s-maxage=300, stale-while-revalidate=600');

// Inputs
$vertical = $_GET['vertical'] ?? 'webdev';
$allowed = ['webdev','tech','ai','product','data','devops','security','design','crypto','founders'];
if (!in_array($vertical, $allowed, true)) {
  http_response_code(400);
  echo json_encode(['sections' => [['title' => 'Latest', 'items' => []]], 'error' => 'Invalid vertical']);
  exit;
}

// Back-compat + mode
$keepSponsored = isset($_GET['keepSponsored']) && $_GET['keepSponsored'] === '1';
$mode = $_GET['mode'] ?? ($keepSponsored ? 'mark' : 'drop'); // drop | mark | raw
if (!in_array($mode, ['drop','mark','raw'], true)) $mode = 'drop';

$latestUrl = "https://tldr.tech/api/latest/" . $vertical;

/* ---------------- HTTP utils ---------------- */

/** GET helper (follows redirects). Tries to request JSON; can fall back to HTML. */
function http_get($url, $acceptJson = true) {
  $ua = 'TLDR-Proxy/1.4';
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_CONNECTTIMEOUT => 5,
      CURLOPT_TIMEOUT => 12,
      CURLOPT_HTTPHEADER => array_filter([
        $acceptJson ? 'Accept: application/json' : null,
        'User-Agent: '.$ua
      ])
    ]);
    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $ctype  = curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: '';
    curl_close($ch);
    return [$status, $ctype, $body ?: ''];
  }

  // Streams fallback (no cURL)
  $headers = "User-Agent: $ua\r\n";
  if ($acceptJson) $headers .= "Accept: application/json\r\n";
  $ctx = stream_context_create(['http' => [
    'method' => 'GET',
    'timeout' => 12,
    'ignore_errors' => true,
    'header' => $headers
  ]]);
  $body = @file_get_contents($url, false, $ctx);
  $status = 0; $ctype = '';
  if (isset($http_response_header)) {
    foreach ($http_response_header as $h) {
      if (preg_match('#HTTP/\S+\s+(\d{3})#', $h, $m)) $status = (int)$m[1];
      if (stripos($h, 'content-type:') === 0) $ctype = trim(substr($h, 13));
    }
  }
  return [$status, $ctype, $body ?: ''];
}

/** Tiny HEAD check */
function http_head_ok($url) {
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_NOBODY => true,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_MAXREDIRS => 5,
      CURLOPT_CONNECTTIMEOUT => 4,
      CURLOPT_TIMEOUT => 6,
      CURLOPT_USERAGENT => 'Mozilla/5.0 (CardImageFetcher/1.0)'
    ]);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code >= 200 && $code < 400;
  }
  $ctx = stream_context_create(['http' => ['method' => 'HEAD','timeout' => 6,'ignore_errors' => true]]);
  $f = @fopen($url, 'r', false, $ctx);
  if ($f) fclose($f);
  if (isset($http_response_header)) {
    foreach ($http_response_header as $h) {
      if (preg_match('#HTTP/\S+\s+(\d{3})#', $h, $m)) {
        $code = (int)$m[1];
        return $code >= 200 && $code < 400;
      }
    }
  }
  return false;
}

/* ---------------- URL & image helpers ---------------- */

function host_to_source($href) {
  $host = parse_url($href, PHP_URL_HOST);
  return $host ? preg_replace('/^www\./', '', strtolower($host)) : '';
}
function favicon_for_host($host) {
  return $host ? 'https://www.google.com/s2/favicons?domain='.$host.'&sz=256' : '';
}
function domain_origin($url) {
  $u = parse_url($url);
  if (!$u || !isset($u['scheme'], $u['host'])) return null;
  return $u['scheme'].'://'.$u['host'].(isset($u['port'])?':'.$u['port']:'');
}
function absolute_url($base, $path) {
  if (!$path) return null;
  if (preg_match('#^https?://#i', $path)) return $path;
  $u = parse_url($base);
  if (!$u) return $path;
  $origin = $u['scheme'].'://'.$u['host'].(isset($u['port'])?':'.$u['port']:'');
  if (strpos($path, '//') === 0) return $u['scheme'].':'.$path;
  if ($path[0] === '/') return $origin.$path;
  $dir = $origin.(isset($u['path']) ? preg_replace('#/[^/]*$#', '/', $u['path']) : '/');
  return $dir.$path;
}

/** Find og:image / twitter:image, else biggest <img> */
function pick_meta_image($html, $pageUrl) {
  if ($html === '') return null;
  $dom = new DOMDocument();
  libxml_use_internal_errors(true);
  $dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);
  libxml_clear_errors();
  $xp = new DOMXPath($dom);

  $selectors = [
    "//meta[@property='og:image']/@content",
    "//meta[@name='og:image']/@content",
    "//meta[@name='twitter:image']/@content",
    "//meta[@property='twitter:image']/@content",
    "//link[@rel='image_src']/@href"
  ];
  foreach ($selectors as $q) {
    $nodes = $xp->query($q);
    if ($nodes && $nodes->length > 0) {
      $val = trim($nodes->item(0)->nodeValue);
      if ($val) return absolute_url($pageUrl, $val);
    }
  }

  $imgs = $xp->query("//img[@src]");
  $best = null; $bestArea = 0;
  foreach ($imgs as $img) {
    $src = $img->getAttribute('src');
    $w = (int)$img->getAttribute('width');
    $h = (int)$img->getAttribute('height');
    $area = ($w > 0 && $h > 0) ? ($w * $h) : 0;
    if ($src && $area >= $bestArea) { $bestArea = $area; $best = $src; }
  }
  if ($best) return absolute_url($pageUrl, $best);
  return null;
}

/** Resolve best card image (12h cache; temp dir; small cache-bust) */
function resolve_card_image($articleUrl) {
  static $cacheDir = null;
  if ($cacheDir === null) {
    $base = rtrim(sys_get_temp_dir(), '/');
    $cacheDir = $base . '/tldr_ogcache';
    if (!is_dir($cacheDir)) @mkdir($cacheDir, 0755, true);
  }
  $key = $cacheDir . '/' . md5($articleUrl . 'cachebust4') . '.json';

  if (file_exists($key) && (time() - filemtime($key) < 43200)) {
    $cached = @json_decode(@file_get_contents($key), true);
    if (is_array($cached) && !empty($cached['image'])) return $cached['image'];
  }

  // 1) Try OG/Twitter
  list($s, $ct, $html) = http_get($articleUrl, false);
  $image = null;
  if ($s >= 200 && $s < 400 && $html !== '') {
    $img = pick_meta_image($html, $articleUrl);
    if ($img) $image = $img;
  }

  // 2) Fallback to site icons
  if (!$image) {
    $origin = domain_origin($articleUrl);
    if ($origin) {
      $candidates = [$origin.'/apple-touch-icon.png', $origin.'/favicon.ico'];
      foreach ($candidates as $c) {
        if (http_head_ok($c)) { $image = $c; break; }
      }
    }
  }

  // 3) Final fallback: favicon service
  if (!$image) {
    $host = host_to_source($articleUrl);
    $image = favicon_for_host($host);
  }

  @file_put_contents($key, json_encode(['image' => $image], JSON_UNESCAPED_SLASHES));
  return $image;
}

/* ---------------- Sponsor filtering helpers ---------------- */

/** Normalize URLs (drop tracking params) so comparisons are reliable */
function normalize_url($url) {
  $parts = parse_url($url);
  if (!$parts || empty($parts['scheme']) || empty($parts['host'])) return $url;
  $origin = $parts['scheme'].'://' . $parts['host'] . (isset($parts['port'])?':'.$parts['port']:'');
  $path = $parts['path'] ?? '/';

  $keep = [];
  if (!empty($parts['query'])) {
    parse_str($parts['query'], $q);
    foreach ($q as $k => $v) {
      if (preg_match('/^(utm_|gclid$|fbclid$|mc_|ref$|ref_|campaign|source|medium|content)$/i', $k)) continue;
      $keep[$k] = $v;
    }
  }
  $qs = $keep ? ('?'.http_build_query($keep)) : '';
  return $origin.$path.$qs;
}

/** Registrable domain helpers (handles common 2-level ccTLDs like example.co.uk) */
function registrable_domain_from_host($host) {
  $host = strtolower($host ?? '');
  if ($host === '') return '';
  $parts = explode('.', $host);
  if (count($parts) <= 2) return $host;

  $tld = end($parts);
  $sld = prev($parts);
  $thd = prev($parts);

  $twoLevelCcTLDs = [
    'co.uk','ac.uk','gov.uk','org.uk','ltd.uk','plc.uk',
    'com.au','net.au','org.au','com.br','com.mx','com.ar','com.tr','com.pl',
    'com.cn','com.hk','com.sg','com.tw','co.jp','ne.jp','or.jp','co.kr',
    'com.sa','co.in','com.co','com.ng','com.ph','com.my','com.vn','com.pe'
  ];
  $candidate = $sld.'.'.$tld;
  if (in_array($candidate, $twoLevelCcTLDs, true) && $thd) {
    return $thd.'.'.$candidate;
  }
  return $candidate;
}
function registrable_domain($url) {
  $h = parse_url($url ?? '', PHP_URL_HOST);
  return $h ? registrable_domain_from_host($h) : '';
}
function brand_from_regdomain($reg) {
  $label = explode('.', $reg)[0] ?? '';
  return preg_replace('/[^a-z0-9]+/i', '', $label);
}
function looks_like_cta($title) {
  $t = mb_strtolower((string)$title);
  foreach ([
    'learn more','get started','sign up','try it','try now','start free',
    'book a demo','book demo','free trial','download','read more','limited time'
  ] as $p) {
    if (mb_strpos($t, $p) !== false) return true;
  }
  return false;
}

/** Cache small JSON blobs in /tmp */
function small_cache_get($key, $ttl = 600) {
  $dir = rtrim(sys_get_temp_dir(), '/').'/tldr_cache';
  if (!is_dir($dir)) @mkdir($dir, 0755, true);
  $file = $dir.'/'.md5($key).'.json';
  if (file_exists($file) && (time() - filemtime($file) < $ttl)) {
    $data = @json_decode(@file_get_contents($file), true);
    if (is_array($data)) return $data;
  }
  return null;
}
function small_cache_set($key, $arr) {
  $dir = rtrim(sys_get_temp_dir(), '/').'/tldr_cache';
  if (!is_dir($dir)) @mkdir($dir, 0755, true);
  $file = $dir.'/'.md5($key).'.json';
  @file_put_contents($file, json_encode($arr, JSON_UNESCAPED_SLASHES));
}

/**
 * Sniff the live newsletter HTML to find the *top* Sponsored block.
 * Returns an array of normalized URLs to treat as sponsored seeds.
 * (Used only in mark/drop modes; raw mode bypasses everything.)
 */
function sniff_head_sponsor_urls($vertical) {
  $ckey = 'sponsor_sniff_'.$vertical;
  $cached = small_cache_get($ckey, 600);
  if (is_array($cached)) return $cached;

  $url = 'https://tldr.tech/'.$vertical;
  list($code, $ctype, $html) = http_get($url, false);
  $out = [];
  if ($code >= 200 && $code < 400 && stripos($ctype, 'text/html') !== false && $html !== '') {
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);
    libxml_clear_errors();
    $xp = new DOMXPath($dom);

    // Find the first node that contains "sponsor/sponsored"
    $nodes = $xp->query("//*[contains(translate(normalize-space(string(.)),'SPONSORED','sponsored'),'sponsor')]");
    if ($nodes && $nodes->length > 0) {
      $label = $nodes->item(0);

      // Try within the same block first
      $container = $label;
      for ($up = 0; $up < 3 && $container; $up++) {
        $anchors = $xp->query('.//a[starts-with(@href,"http://") or starts-with(@href,"https://")]', $container);
        if ($anchors && $anchors->length > 0) {
          $limit = min(4, $anchors->length);
          for ($i = 0; $i < $limit; $i++) {
            $href = trim($anchors->item($i)->getAttribute('href'));
            if ($href === '' || strpos($href, 'tldr.tech') !== false) continue;
            $out[] = normalize_url($href);
          }
          break;
        }
        $container = $container->parentNode;
      }

      // Fallback: first few external anchors right after the label
      if (!$out) {
        $anchors = $xp->query('following::a[starts-with(@href,"http://") or starts-with(@href,"https://")][position() <= 3]', $label);
        foreach ($anchors as $a) {
          $href = trim($a->getAttribute('href'));
          if ($href === '' || strpos($href, 'tldr.tech') !== false) continue;
          $out[] = normalize_url($href);
        }
      }
    }
  }

  $out = array_values(array_unique($out));
  small_cache_set($ckey, $out);
  return $out;
}

/* ---------------- Marking & filtering ---------------- */

/**
 * Detect and mark sponsor blocks robustly:
 * - Seeds:
 *    a) explicit "(Sponsor)" fields/flags IF present in JSON
 *    b) OR URLs sniffed from the live HTML sponsor block at the top
 * - If a seed is at index 0 (section head), ALWAYS mark the immediate next item too.
 * - Also mark up to 5 following items when they match:
 *      registrable domain == seed, OR brand token in title, OR CTA-y title.
 * - If NO explicit/seed sponsor but the section starts with >=2 items sharing registrable domain, mark that head cluster.
 * - Mark duplicates of the same normalized URL anywhere (first kept when dropping).
 */
function mark_sponsor_blocks(array $section, array $sniffedSeeds = []) {
  if (empty($section['items']) || !is_array($section['items'])) return $section;

  $items = &$section['items'];
  $n = count($items);

  // Build initial sponsor seed indexes
  $seedIdx = [];

  // A) JSON-provided explicit sponsor markers
  for ($i = 0; $i < $n; $i++) {
    $title = (string)($items[$i]['title'] ?? '');
    if (preg_match('/\(\s*sponsor\s*\)/i', $title)
        || !empty($items[$i]['sponsored']) || !empty($items[$i]['isSponsor']) || !empty($items[$i]['is_sponsored'])) {
      $seedIdx[] = $i;
      $items[$i]['_sponsored'] = true;
    }
  }

  // B) Seed from sniffed URLs (when JSON lacks flags)
  if ($sniffedSeeds) {
    $seedSet = [];
    foreach ($sniffedSeeds as $u) $seedSet[normalize_url($u)] = true;

    for ($i = 0; $i < $n; $i++) {
      $u = normalize_url((string)($items[$i]['url'] ?? ''));
      if ($u !== '' && isset($seedSet[$u])) {
        $items[$i]['_sponsored'] = true;
        $seedIdx[] = $i;
      }
    }
  }

  // If we have any seeds, extend tails
  if ($seedIdx) {
    $seedIdx = array_values(array_unique($seedIdx));
    sort($seedIdx);

    foreach ($seedIdx as $s) {
      $seedUrl   = (string)($items[$s]['url'] ?? '');
      $seedReg   = registrable_domain($seedUrl);
      $seedBrand = brand_from_regdomain($seedReg);

      $cap = 5; // conservative cap
      $i = $s + 1;
      $markedAnyFollowing = false;

      while ($i < $n && $cap-- > 0) {
        $itTitle = (string)($items[$i]['title'] ?? '');
        $itUrl   = (string)($items[$i]['url'] ?? '');
        $itReg   = registrable_domain($itUrl);

        $matchReg   = ($seedReg !== '' && $itReg !== '' && $itReg === $seedReg);
        $matchBrand = ($seedBrand !== '' && preg_match('/\b'.preg_quote($seedBrand,'/').'\b/i', $itTitle));
        $matchCTA   = looks_like_cta($itTitle);

        // Always mark the very next item if the seed is at the head of the section
        $forceNextWhenHead = ($s === 0 && $i === $s + 1);

        if ($matchReg || $matchBrand || $matchCTA || $forceNextWhenHead) {
          $items[$i]['_sponsored'] = true;
          $markedAnyFollowing = true;
          $i++;
          if ($forceNextWhenHead && !($matchReg || $matchBrand || $matchCTA)) {
            break; // only force the immediate next one
          }
          continue;
        }
        if ($markedAnyFollowing) break;
        break;
      }
    }
  } else {
    // Fallback: head-cluster if nothing else
    if ($n > 1) {
      $seedReg = registrable_domain((string)($items[0]['url'] ?? ''));
      if ($seedReg !== '') {
        $runLen = 1;
        for ($j = 1; $j < $n; $j++) {
          $reg = registrable_domain((string)($items[$j]['url'] ?? ''));
          if ($reg === $seedReg) $runLen++; else break;
        }
        if ($runLen >= 2) {
          for ($k = 0; $k < $runLen; $k++) $items[$k]['_sponsored'] = true;
        }
      }
    }
  }

  // Global dedupe on normalized URLs
  $seen = [];
  for ($i = 0; $i < $n; $i++) {
    $url = (string)($items[$i]['url'] ?? '');
    $nurl = normalize_url($url);
    if ($nurl === '') continue;
    if (isset($seen[$nurl])) {
      $items[$i]['_sponsored'] = true;
    } else {
      $seen[$nurl] = true;
    }
  }

  return $section;
}

/**
 * Filter sponsored sections/items.
 * If $drop === true, remove them.
 * If $drop === false, keep them but ensure _sponsored=true is set.
 */
function filter_sponsored_sections(array $sections, bool $drop, array $sniffedSeeds): array {
  $out = [];
  foreach ($sections as $section) {
    $title = (string)($section['title'] ?? '');
    if ($title !== '' && preg_match('/\b(sponsor|sponsored|advert|ad)\b/i', $title)) {
      if ($drop) continue; // drop whole section
    }

    $section = mark_sponsor_blocks($section, $sniffedSeeds); // sets _sponsored flags

    if (!empty($section['items']) && is_array($section['items'])) {
      if ($drop) {
        $section['items'] = array_values(array_filter(
          $section['items'],
          fn($it) => empty($it['_sponsored'])
        ));
      } else {
        foreach ($section['items'] as &$it) {
          if (!empty($it['_sponsored'])) $it['_sponsored'] = true;
        }
        unset($it);
      }
    }
    $out[] = $section;
  }
  return $out;
}

/* ---------------- HTML fallback parsers ---------------- */

function parse_with_dom($html) {
  $items = [];
  if ($html === '') return $items;

  $dom = new DOMDocument();
  libxml_use_internal_errors(true);
  $dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);
  libxml_clear_errors();
  $xp = new DOMXPath($dom);

  // Any external links (most TLDR items are outbound links)
  $nodes = $xp->query('//a[starts-with(@href,"http://") or starts-with(@href,"https://")]');

  $seen = []; $i = 0;
  foreach ($nodes as $a) {
    $href = trim($a->getAttribute('href'));
    if (!$href) continue;
    if (strpos($href, 'tldr.tech') !== false) continue; // skip internal TLDR links
    if (isset($seen[$href])) continue; // dedupe
    $seen[$href] = true;

    $title = trim(preg_replace('/\s+/', ' ', $a->textContent));
    if ($title === '' || mb_strlen($title) < 4) continue;

    // IMPORTANT: do NOT skip "(Sponsor)" anchors here; detection happens later
    $srcHost = host_to_source($href);
    $items[] = [
      'id' => 'ext-'.$i++,
      'title' => $title,
      'url' => $href,
      'source' => $srcHost,
      // image set later by enrichment step
    ];
    if ($i >= 60) break; // keep it reasonable
  }
  return $items;
}

function parse_with_regex($html) {
  $items = []; $seen = []; $i = 0;
  if (!preg_match_all('#<a[^>]+href=["\'](https?://[^"\']+)["\'][^>]*>(.*?)</a>#is', $html, $m, PREG_SET_ORDER)) {
    return $items;
  }
  foreach ($m as $match) {
    $href = trim($match[1]);
    if (strpos($href, 'tldr.tech') !== false) continue;
    if (isset($seen[$href])) continue;
    $seen[$href] = true;

    $text = trim(preg_replace('/\s+/', ' ', strip_tags($match[2])));
    if ($text === '' || mb_strlen($text) < 4) continue;

    // IMPORTANT: do NOT skip "(Sponsor)" anchors here; detection happens later
    $srcHost = host_to_source($href);
    $items[] = [
      'id' => 'rx-'.$i++,
      'title' => $text,
      'url' => $href,
      'source' => $srcHost,
      // image set later by enrichment step
    ];
    if ($i >= 60) break;
  }
  return $items;
}

/* ---------------- Image enrichment ---------------- */

function enrich_items_with_images($sections) {
  foreach ($sections as &$section) {
    if (!isset($section['items']) || !is_array($section['items'])) continue;
    foreach ($section['items'] as &$it) {
      if (!empty($it['image'])) continue; // keep provided image if any
      if (empty($it['url'])) {
        $it['image'] = !empty($it['source']) ? favicon_for_host($it['source']) : null;
        continue;
      }
      $it['image'] = resolve_card_image($it['url']);
      if (empty($it['source'])) $it['source'] = host_to_source($it['url']);
    }
  }
  return $sections;
}

/* ---------------- Fetch & respond ---------------- */

// Only sniff sponsor seeds when we're actually marking/dropping
$sniffedSeeds = ($mode === 'raw') ? [] : sniff_head_sponsor_urls($vertical);

/** 1) Try JSON; if HTML, parse to items */
list($code, $ctype, $body) = http_get($latestUrl, true);
if ($code >= 200 && $code < 300 && $body !== '') {
  if (stripos($ctype, 'application/json') !== false) {
    $data = json_decode($body, true);
    if (is_array($data) && isset($data['sections'])) {
      if ($mode !== 'raw') {
        $drop = ($mode === 'drop');
        $data['sections'] = filter_sponsored_sections($data['sections'], $drop, $sniffedSeeds);
      }
      $data['sections'] = enrich_items_with_images($data['sections']);
      echo json_encode($data, JSON_UNESCAPED_SLASHES); exit;
    }
    echo $body; exit; // unexpected JSON shape; pass-through
  }
  $items = parse_with_dom($body);
  if (!$items) $items = parse_with_regex($body);
  $sections = [['title' => 'Latest', 'items' => $items]];
  if ($mode !== 'raw') {
    $drop = ($mode === 'drop');
    $sections = filter_sponsored_sections($sections, $drop, $sniffedSeeds);
  }
  $sections = enrich_items_with_images($sections);
  echo json_encode(['sections' => $sections], JSON_UNESCAPED_SLASHES); exit;
}

/** 2) Fallback fetch without Accept header */
list($code2, $ctype2, $body2) = http_get($latestUrl, false);
if ($code2 >= 200 && $code2 < 300 && $body2 !== '') {
  if (stripos($ctype2, 'application/json') !== false) {
    $data = json_decode($body2, true);
    if (is_array($data) && isset($data['sections'])) {
      if ($mode !== 'raw') {
        $drop = ($mode === 'drop');
        $data['sections'] = filter_sponsored_sections($data['sections'], $drop, $sniffedSeeds);
      }
      $data['sections'] = enrich_items_with_images($data['sections']);
      echo json_encode($data, JSON_UNESCAPED_SLASHES); exit;
    }
    echo $body2; exit;
  }
  $items = parse_with_dom($body2);
  if (!$items) $items = parse_with_regex($body2);
  $sections = [['title' => 'Latest', 'items' => $items]];
  if ($mode !== 'raw') {
    $drop = ($mode === 'drop');
    $sections = filter_sponsored_sections($sections, $drop, $sniffedSeeds);
  }
  $sections = enrich_items_with_images($sections);
  echo json_encode(['sections' => $sections], JSON_UNESCAPED_SLASHES); exit;
}

/** 3) Still nothing */
http_response_code(502);
echo json_encode(['sections' => [['title' => 'Latest', 'items' => []]], 'error' => 'Upstream failed']);