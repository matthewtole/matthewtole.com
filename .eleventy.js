const { emojify } = require('node-emoji');
const assert = require('assert');
const parseJSON = require('date-fns/parseJSON');
const format = require('date-fns/format');
const {
  responsiveImage,
  instagramImage,
  websiteScreenshot,
} = require('./plugins/images');

if (!process.env.NETLIFY) {
  require('dotenv').config();
}

if (!process.env.SKIP_IMAGES) {
  assert(
    process.env.SCREENSHOT_TOKEN,
    'You forgot to set the SCREENSHOT_TOKEN environment variable!'
  );
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.addPassthroughCopy('src/**/_redirects');
  eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));

  eleventyConfig.addFilter('jsmin', (code) => {
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

  eleventyConfig.addFilter('firstLine', (str) => str.split('\n')[0]);

  eleventyConfig.addFilter('emojify', emojify);

  eleventyConfig.addFilter('limit', function (list, n) {
    return list.slice(0, n);
  });

  eleventyConfig.addFilter('removeEmoji', function (commit) {
    return commit.substr(commit.indexOf(':', 2) + 1);
  });

  eleventyConfig.addFilter('getEmoji', function (commit) {
    return commit.substr(0, commit.indexOf(':', 2) + 1);
  });

  eleventyConfig.addNunjucksAsyncShortcode('responsiveImage', responsiveImage);
  eleventyConfig.addNunjucksAsyncShortcode(
    'websiteScreenshot',
    websiteScreenshot
  );
  eleventyConfig.addNunjucksAsyncShortcode('instagramImage', instagramImage);

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
