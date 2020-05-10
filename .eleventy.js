const emoji = require('node-emoji');
const Image = require('@11ty/eleventy-img');
const assert = require('assert');
const getColors = require('get-image-colors');
const parseJSON = require('date-fns/parseJSON');
const format = require('date-fns/format');

if (!process.env.NETLIFY) {
  require('dotenv').config();
}

assert(
  process.env.SCREENSHOT_TOKEN,
  'You forgot to set the SCREENSHOT_TOKEN environment variable!'
);

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

  eleventyConfig.addFilter('parseDate', parseJSON);

  eleventyConfig.addFilter('formatDate', format);

  eleventyConfig.addFilter('firstLine', str => str.split('\n')[0]);

  eleventyConfig.addFilter('emojify', emoji.emojify);

  eleventyConfig.addFilter('limit', function(list, n) {
    return list.slice(0, n);
  });

  eleventyConfig.addFilter('removeEmoji', function(commit) {
    return commit.substr(commit.indexOf(':', 2) + 1);
  });

  eleventyConfig.addFilter('getEmoji', function(commit) {
    return commit.substr(0, commit.indexOf(':', 2) + 1);
  });

  eleventyConfig.addNunjucksAsyncShortcode('responsiveImage', async function(
    src,
    alt
  ) {
    const options = {
      outputDir: '_site/img/',
      cacheDuration: '1w',
      widths: [256, 512, 1024],
    };
    let stats = await Image(src, options);
    let lowestSrc = stats.jpeg[0];

    let sources = [];
    Object.values(stats).forEach(imageFormat => {
      sources.push(
        `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x" media="(min-width: 768px)">`
      );
      sources.push(
        `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[1].url}, ${imageFormat[2].url} 2x">`
      );
    });

    return `<picture>${sources.join('\n')}
      <img
      class="absolute top-0 left-0 object-cover w-full h-full
        alt="${alt}" loading="lazy"
        src="${lowestSrc.url}">
    </picture>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode('instagramImage', async function(
    post
  ) {
    const image = await Image(post.picture.url, {
      outputDir: '_site/img/',
      cacheDuration: '1w',
      widths: [256, 512, null],
    });

    const colors = await getColors('_site/' + image.jpeg[0].url);

    let sources = [];
    Object.values(image).forEach(imageFormat => {
      sources.push(
        `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x, ${imageFormat[2].url} 4x">`
      );
    });

    return `<picture>${sources.join(
      '\n'
    )}<img class="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-200 transform hover:scale-105" style="background-color: ${colors[0].hex()};" src="${
      image.jpeg[0].url
    }" loading="lazy" /></picture>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode('websiteScreenshot', async function(
    url,
    alt
  ) {
    const options = {
      outputDir: '_site/img/',
      cacheDuration: '1w',
      widths: [256, 512, 1024, 2048],
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

    let sources = [];
    Object.values(stats).forEach(imageFormat => {
      sources.push(
        `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x, ${imageFormat[2].url} 4x" media="(min-width: 768px)">`
      );
      sources.push(
        `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[1].url}, ${imageFormat[2].url} 2x, ${imageFormat[3].url} 4x">`
      );
    });

    return `<picture>${sources.join('\n')}
      <img
      class="absolute top-0 left-0 object-cover w-full h-full
        alt="${alt}" loading="lazy"
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
