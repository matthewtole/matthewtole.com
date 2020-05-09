const emoji = require('node-emoji');
const Image = require('@11ty/eleventy-img');
require('dotenv').config();

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.addPassthroughCopy('src/**/_redirects');
  eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));

  eleventyConfig.addFilter('jsmin', code => {
    const babel = require('@babel/core');
    try {
      const result = babel.transformSync(code, {
        presets: [
          '@babel/preset-env',
          ...(process.env.ELEVENTY_ENV === 'prod' ? ['minify'] : []),
        ],
        plugins: ['@babel/plugin-proposal-class-properties'],
      });
      return result.code;
    } catch (ex) {
      console.error(ex);
      return code;
    }
  });

  eleventyConfig.addFilter('emojify', emoji.emojify);

  eleventyConfig.addNunjucksAsyncShortcode('websiteScreenshot', async function(
    url,
    alt
  ) {
    const options = {
      outputDir: '_site/img/',
      cacheDuration: '1w',
      widths: [256, 512, 1024],
    };
    const screenshotWidth = 2048;
    let stats = await Image(
      `https://screenshotapi.net/api/v1/screenshot?url=${encodeURIComponent(
        url
      )}&output=image&width=${screenshotWidth}&height=${Math.round(
        (screenshotWidth / 16) * 9
      )}&token=${process.env.SCREENSHOT_TOKEN}`,
      options
    );
    let lowestSrc = stats.jpeg[0];
    let sizes = '256w';

    return `<picture class="absolute top-0 left-0 object-cover w-full h-full">
            ${Object.values(stats)
              .map(imageFormat => {
                return `  <source type="image/${
                  imageFormat[0].format
                }" srcset="${imageFormat
                  .map(entry => `${entry.url} ${entry.width}w`)
                  .join(', ')}" sizes="${sizes}">`;
              })
              .join('\n')}
      <img
      class="absolute top-0 left-0 object-cover w-full h-full
        alt="${alt}"
        src="${lowestSrc.url}">
    </picture>`;
  });

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
