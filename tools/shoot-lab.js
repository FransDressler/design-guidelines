// Screenshots the shadcn-lab page for each tuned palette → shots/lab-<palette>.png
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: require('os').homedir() + '/.cache/ms-playwright/chromium-1252/chrome-linux64/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8744');
  await page.waitForTimeout(1500);
  for (const p of ['crumbz', 'zyorex', 'pelmatech']) {
    await page.getByRole('button', { name: p, exact: true }).click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${__dirname}/../shots/lab-${p}.png` });
  }
  await browser.close();
  console.log('ok');
})();
