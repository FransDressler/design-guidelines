// node tools/shoot-seq.js <url> <name> <ms,ms,...> [width] → shots/seq-<name>-<ms>.png  (frames of an animation over time)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [url, name, times = '300,1000,1700,2400', w = '1200'] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome' });
  const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
  
  await page.goto(url, { waitUntil: process.env.AFTER_LOAD ? 'load' : 'domcontentloaded' });
  const t0 = Date.now();
  for (const ms of times.split(',').map(Number)) {
    const wait = ms - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(__dirname, '..', 'shots', `seq-${name}-${ms}.png`) });
  }
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  console.log('ok', errs.join('; '));
  await browser.close();
})();
