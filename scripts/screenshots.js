const puppeteer = require('puppeteer');
const chalk = require('chalk');
const tinify = require('tinify');

tinify.key = 'PLM0GKPN9YPqKH4OuZlf13IJXCc3gmU_';

const screenshots = [
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
      height: 768,
      deviceScaleFactor: 1,
    },
  });
  const page = await browser.newPage();
  console.log();
  for (let screenshot of screenshots) {
    try {
      await page.goto(screenshot.url);
      await new Promise(resolve => setTimeout(resolve, screenshot.timeout));
      const data = await page.screenshot();
      await tinify
        .fromBuffer(data)
        .toFile(`src/static/images/projects/${screenshot.slug}.png`);
      console.log(
        chalk.green('SUCCESS:'),
        `Created ${screenshot.slug}.png from ${screenshot.url}`
      );
    } catch (ex) {
      console.log(
        chalk.red('ERROR:'),
        `[${screenshot.url}] - ${ex.toString()}`
      );
    }
  }
  console.log();

  await browser.close();
})();
