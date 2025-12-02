// Quick test to see the actual TLDR data format
const response = await fetch('https://tldr.tech/')
const html = await response.text()

console.log('HTML length:', html.length)

// Check escaped format
const hasEscapedQuotes = html.includes('\\"url\\"')
const hasNormalQuotes = html.includes('"url":')
console.log('\nQuote format:')
console.log('  Escaped quotes (\\"):', hasEscapedQuotes)
console.log('  Normal quotes ("):', hasNormalQuotes)

// Find newsletter occurrences with escaped quotes
const newsletters = html.match(/\\"newsletter\\"[^,}]+/g) || []
console.log('\nFirst 5 newsletter matches (escaped):')
newsletters.slice(0, 5).forEach(m => console.log(' ', m))

// Find unique newsletter values
const uniqueNewsletters = new Set()
const nlMatches = html.matchAll(/\\"newsletter\\":\\s*\\"([^"\\]+)\\"/g)
for (const m of nlMatches) {
  uniqueNewsletters.add(m[1])
}
console.log('\nUnique newsletter types found:', Array.from(uniqueNewsletters).join(', '))

// Try to extract a design article
const designRegex = /\\"url\\":\s*\\"(https?:\/\/[^"\\]+)\\"[^}]*\\"newsletter\\":\s*\\"design\\"[^}]*\\"title\\":\s*\\"([^"\\]+)\\"/g
const designMatch = designRegex.exec(html)
if (designMatch) {
  console.log('\nFound design article:')
  console.log('  URL:', designMatch[1])
  console.log('  Title:', designMatch[2])
} else {
  console.log('\nNo design article found with current pattern')
}

