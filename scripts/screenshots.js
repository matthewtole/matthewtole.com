const puppeteer = require('puppeteer');
const chalk = require('chalk');
const tinify = require('tinify');
require('dotenv').config();

tinify.key = process.env.TINIFY_API_KEY;

const screenshots = [
  {
    url: 'https://matthewtole-com.netlify.com',
    timeout: 1000,
    slug: 'matthewtole',
  },
  { url: 'https://katherinetole.com', timeout: 2000, slug: 'katherinetole' },
  { url: 'https://wedding.tole.family', timeout: 1000, slug: 'kathew' },
  { url: 'https://catandjoe.wedding', timeout: 1000, slug: 'catandjoe' },
  {
    url: 'https://mtole-jeffhme-prod.netlify.com',
    timeout: 1000,
    slug: 'jeffh',
  },
];

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    },
  });
  const page = await browser.newPage();
  for (let screenshot of screenshots) {
    try {
      await page.goto(screenshot.url);
      await new Promise(resolve => setTimeout(resolve, screenshot.timeout));
      const data = await page.screenshot();
      await tinify
        .fromBuffer(data)
        .toFile(`src/static/images/projects/${screenshot.slug}.png`);
      console.log(
        chalk.green('✓'),
        'Created',
        chalk.blue(`${screenshot.slug}.png`),
        'from',
        chalk.underline(screenshot.url)
      );
    } catch (ex) {
      console.log(chalk.red('✗'), `[${screenshot.url}] - ${ex.toString()}`);
    }
  }
  console.log();

  await browser.close();
})();
