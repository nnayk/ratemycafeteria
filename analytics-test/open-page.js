const puppeteer = require('puppeteer');
const fs = require('fs');

// Prefer system Chrome to avoid bundled Chromium download/launch issues
const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

(async () => {
  try {
    const launchOptions = {
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    };
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    const browser = await puppeteer.launch(launchOptions);
    const url = 'https://www.ratemycafeteria.org/school/Vanderbilt University';

    for (let i = 0; i < 10; i++) {
      const page = await browser.newPage();
      page.on('pageerror', () => {});
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
    }

    console.log('Opened 10 tabs. Browser will stay open. Press Ctrl+C to exit.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
