// Usage: node tools/shoot.js <url> <name>  → shots/<name>.png and shots/<name>-boxes.png
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [url, name] = process.argv.slice(2);
  const out = path.join(__dirname, '..', 'shots');
  const browser = await chromium.launch({
    executablePath: require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);
  for (const t of ['Accept all', 'Accept', 'Alle akzeptieren', 'Got it', 'Allow all']) {
    await page.getByRole('button', { name: t, exact: true }).first().click({ timeout: 500 }).catch(() => {});
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/${name}.png` });
  await page.evaluate(require('fs').readFileSync(path.join(__dirname, 'overlay.js'), 'utf8'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/${name}-boxes.png` });
  await browser.close();
  console.log('ok', name);
})().catch(e => { console.error('ERR', e.message.slice(0, 120)); process.exit(1); });
