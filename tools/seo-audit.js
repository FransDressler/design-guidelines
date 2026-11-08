// node tools/seo-audit.js <url> [--lighthouse]
// On-page SEO checks: title, description, h1/heading order, img alt, canonical, lang, viewport, OG/Twitter, links, robots/sitemap.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const CHROME = require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome';

(async () => {
  const url = process.argv[2];
  if (!url) { console.error('usage: node tools/seo-audit.js <url> [--lighthouse]'); process.exit(2); }
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => null);
  const d = await page.evaluate(() => {
    const m = s => document.querySelector(s)?.getAttribute('content') ?? null;
    return {
      title: document.title,
      desc: m('meta[name=description]'),
      lang: document.documentElement.lang,
      viewport: m('meta[name=viewport]'),
      robots: m('meta[name=robots]'),
      canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
      og: ['og:title', 'og:description', 'og:image', 'og:url'].filter(k => !m(`meta[property="${k}"]`)),
      twitter: m('meta[name="twitter:card"]'),
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]),
      h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()),
      imgNoAlt: [...document.images].filter(i => !i.hasAttribute('alt')).map(i => i.src.slice(-60)),
      emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.innerText.trim() && !a.getAttribute('aria-label')).length,
      vagueLinks: [...document.querySelectorAll('a')].map(a => a.innerText.trim().toLowerCase()).filter(t => ['hier', 'mehr', 'click here', 'here', 'more', 'learn more'].includes(t)).length,
      words: document.body.innerText.split(/\s+/).filter(Boolean).length,
      jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
    };
  });
  const origin = new URL(url).origin;
  const ok = async p => { try { return (await page.request.get(origin + p)).status(); } catch { return 0; } };
  const robotsTxt = await ok('/robots.txt'), sitemap = await ok('/sitemap.xml');
  await browser.close();

  const out = [];
  const add = (level, check, msg) => out.push({ level, check, msg });
  add(res && res.status() < 400 ? 'ok' : 'fail', 'status', `HTTP ${res ? res.status() : 'n/a'}`);
  const tl = d.title.length;
  add(!tl ? 'fail' : tl < 30 || tl > 60 ? 'warn' : 'ok', 'title', `${tl} Zeichen (30–60): "${d.title}"`);
  const dl = d.desc?.length ?? 0;
  add(!dl ? 'fail' : dl < 70 || dl > 160 ? 'warn' : 'ok', 'description', dl ? `${dl} Zeichen (70–160)` : 'fehlt');
  add(d.h1.length === 1 ? 'ok' : d.h1.length ? 'warn' : 'fail', 'h1', `${d.h1.length}× ${d.h1.map(t => '"' + t.slice(0, 50) + '"').join(', ')}`);
  const skips = d.headings.filter((h, i) => i && h > d.headings[i - 1] + 1).length;
  add(skips ? 'warn' : 'ok', 'heading-order', skips ? `${skips} übersprungene Ebene(n): ${d.headings.join(' ')}` : d.headings.join(' '));
  add(d.imgNoAlt.length ? 'fail' : 'ok', 'img-alt', d.imgNoAlt.length ? `${d.imgNoAlt.length} ohne alt` : 'alle Bilder haben alt');
  add(d.lang ? 'ok' : 'fail', 'lang', d.lang || 'fehlt');
  add(d.viewport ? 'ok' : 'fail', 'viewport', d.viewport || 'fehlt');
  add(d.canonical ? 'ok' : 'warn', 'canonical', d.canonical || 'fehlt');
  add(/noindex/i.test(d.robots || '') ? 'fail' : 'ok', 'robots-meta', d.robots || 'nicht gesetzt (indexierbar)');
  add(d.og.length ? 'warn' : 'ok', 'open-graph', d.og.length ? 'fehlt: ' + d.og.join(', ') : 'vollständig');
  add(d.twitter ? 'ok' : 'warn', 'twitter-card', d.twitter || 'fehlt');
  add(d.emptyLinks ? 'warn' : 'ok', 'link-text', `${d.emptyLinks} leere, ${d.vagueLinks} vage Linktexte`);
  add(d.words < 200 ? 'warn' : 'ok', 'content', `${d.words} Wörter`);
  add(d.jsonld ? 'ok' : 'warn', 'structured-data', d.jsonld ? `${d.jsonld} JSON-LD-Block(e)` : 'kein JSON-LD');
  add(robotsTxt === 200 ? 'ok' : 'warn', 'robots.txt', `${origin}/robots.txt → ${robotsTxt}`);
  add(sitemap === 200 ? 'ok' : 'warn', 'sitemap.xml', `${origin}/sitemap.xml → ${sitemap}`);

  if (process.argv.includes('--lighthouse')) {
    try {
      const json = execFileSync('npx', ['-y', 'lighthouse', url, '--only-categories=seo', '--output=json', '--quiet', '--chrome-flags=--headless=new', ], { env: { ...process.env, CHROME_PATH: CHROME }, maxBuffer: 1e8 }).toString();
      const lh = JSON.parse(json).categories.seo.score * 100;
      add(lh >= 90 ? 'ok' : 'warn', 'lighthouse-seo', `${lh}/100`);
    } catch (e) { add('warn', 'lighthouse-seo', 'Lighthouse nicht gelaufen: ' + e.message.split('\n')[0]); }
  }

  const icon = { ok: '✓', warn: '!', fail: '✗' };
  for (const r of out) console.log(`${icon[r.level]} ${r.check.padEnd(16)} ${r.msg}`);
  const f = out.filter(r => r.level === 'fail').length, w = out.filter(r => r.level === 'warn').length;
  console.log(`\n${url}: ${f} Fehler, ${w} Warnungen`);
  process.exit(f ? 1 : 0);
})();
