// node tools/meta.js --title "…" --desc "…" --url "https://…" [--image "https://…"] [--type website] [--jsonld local-business]
// Prints a ready <head> SEO block and warns about length problems.
const fs = require('fs'), path = require('path');
const a = {}; process.argv.slice(2).forEach((v, i, arr) => { if (v.startsWith('--')) a[v.slice(2)] = arr[i + 1]; });
if (!a.title || !a.desc || !a.url) { console.error('usage: node tools/meta.js --title "…" --desc "…" --url "…" [--image …] [--jsonld organization|local-business|event|product|person|article|faq|breadcrumb]'); process.exit(2); }
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const warn = [];
if (a.title.length < 30 || a.title.length > 60) warn.push(`title ${a.title.length} Zeichen (30–60)`);
if (a.desc.length < 70 || a.desc.length > 160) warn.push(`description ${a.desc.length} Zeichen (70–160)`);
if (/seamless|nahtlos|revolution|empower|unlock|next[- ]level|innovativ/i.test(a.title + a.desc)) warn.push('Floskel im Text – konkreter werden');
if (!/\d/.test(a.desc)) warn.push('description ohne Zahl – eine Zahl (Preis, Menge, Jahr) macht sie konkreter');
const out = [
  `<title>${esc(a.title)}</title>`,
  `<meta name="description" content="${esc(a.desc)}">`,
  `<link rel="canonical" href="${a.url}">`,
  `<meta property="og:title" content="${esc(a.title)}">`,
  `<meta property="og:description" content="${esc(a.desc)}">`,
  `<meta property="og:type" content="${a.type || 'website'}">`,
  `<meta property="og:url" content="${a.url}">`,
  a.image ? `<meta property="og:image" content="${a.image}">` : '<!-- og:image fehlt: 1200×630 PNG/JPG -->',
  `<meta property="og:locale" content="de_DE">`,
  `<meta name="twitter:card" content="${a.image ? 'summary_large_image' : 'summary'}">`,
];
if (a.jsonld) out.push(`<script type="application/ld+json">${fs.readFileSync(path.join(__dirname, '..', 'seo/jsonld', a.jsonld + '.json'), 'utf8').trim()}</script>`);
console.log(out.join('\n'));
if (warn.length) console.error('\n! ' + warn.join('\n! '));
