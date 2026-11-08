// node tools/metrics.js url...  → h1/body size, ratio, content width, button heights, distinct font sizes
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome' });
  for (const url of process.argv.slice(2)) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3500);
      const m = await page.evaluate(() => {
        const fs = e => parseFloat(getComputedStyle(e).fontSize);
        const h = [...document.querySelectorAll('h1,h2')].filter(e => e.getBoundingClientRect().height > 0).map(fs);
        const ps = [...document.querySelectorAll('p')].filter(e => e.innerText.trim().length > 40).map(fs);
        const med = a => a.length ? a.sort((x, y) => x - y)[Math.floor(a.length / 2)] : 0;
        const sizes = new Set();
        document.querySelectorAll('body *').forEach(e => { if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) sizes.add(Math.round(fs(e))); });
        const btn = [...document.querySelectorAll('button, a[class*="button" i], a[class*="btn" i]')].map(e => Math.round(e.getBoundingClientRect().height)).filter(x => x > 20);
        const widths = [...document.querySelectorAll('p')].map(e => Math.round(e.getBoundingClientRect().width)).filter(x => x > 100);
        const fam = getComputedStyle(document.querySelector('h1,h2') || document.body).fontFamily.split(',')[0];
        return { maxHead: Math.max(0, ...h), body: med(ps), sizes: [...sizes].sort((a, b) => a - b).join(','), btnH: med(btn), pWidth: med(widths), headFont: fam };
      });
      console.log(url, JSON.stringify({ ...m, ratio: m.body ? (m.maxHead / m.body).toFixed(1) : '-' }));
    } catch (e) { console.log(url, 'ERR', e.message.slice(0, 60)); }
    await page.close();
  }
  await browser.close();
})();
