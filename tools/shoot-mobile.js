// node tools/shoot-mobile.js <url> <name> [width=375] → shots/m-<name>-<w>.png (full page) + reports horizontal overflow
const { chromium } = require('playwright');
(async () => {
  const [url, name, w = '375'] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome' });
  const page = await browser.newPage({ viewport: { width: +w, height: 812 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const over = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > vw + 1).slice(0, 8)
      .map(e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '') + ' ' + Math.round(e.getBoundingClientRect().right));
    const small = [...document.querySelectorAll('a,button,input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height < 40; }).length;
    return { scrollW: document.documentElement.scrollWidth, vw, over, smallTargets: small };
  });
  await page.screenshot({ path: `shots/m-${name}-${w}.png`, fullPage: true });
  console.log(name, JSON.stringify(info));
  await browser.close();
})();
