// node tools/sitemap.js <base-url> [dir=.] → writes <dir>/sitemap.xml for all .html files (skips node_modules, debug, dist, drafts with noindex)
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [base, dir = '.'] = process.argv.slice(2);
if (!base) { console.error('usage: node tools/sitemap.js https://domain.de/ [dir]'); process.exit(2); }
const skip = /(^|\/)(node_modules|debug|dist|\.git|shots|src|seo|shadcn-lab)(\/|$)/;
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f), r = path.relative(dir, p); if (skip.test(r)) continue; fs.statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(r); } })(dir);
const urls = files.filter(f => !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(fs.readFileSync(path.join(dir, f), 'utf8'))).sort().map(f => {
  let lastmod; try { lastmod = execSync(`git log -1 --format=%cs -- "${f}"`, { cwd: dir, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
  lastmod ||= fs.statSync(path.join(dir, f)).mtime.toISOString().slice(0, 10);
  const loc = new URL(f.replace(/(^|\/)index\.html$/, '$1'), base.endsWith('/') ? base : base + '/').href;
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
});
fs.writeFileSync(path.join(dir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`sitemap.xml: ${urls.length} URLs`);
