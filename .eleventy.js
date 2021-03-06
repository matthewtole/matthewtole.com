const { emojify } = require('node-emoji');
const assert = require('assert');
const parseJSON = require('date-fns/parseJSON');
const format = require('date-fns/format');
const {
  responsiveImage,
  instagramImage,
  websiteScreenshot,
} = require('./plugins/images');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');

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
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));

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

  eleventyConfig.addFilter('parseInt', parseInt);

  eleventyConfig.addFilter('parseDate', parseJSON);

  eleventyConfig.addFilter('formatDate', format);

  eleventyConfig.addFilter('firstLine', (str) => str.split('\n')[0]);

  eleventyConfig.addFilter('emojify', emojify);

  eleventyConfig.addFilter('limit', function (list, n) {
    return list.slice(0, n);
  });

  const GITHUB_EMOJI_REGEX = /^\w*:[a-z_]+:/;

  eleventyConfig.addFilter('removeEmoji', function (commit) {
    const match = GITHUB_EMOJI_REGEX.exec(commit);
    return match ? commit.replace(match, '') : commit;
  });

  eleventyConfig.addFilter('getEmoji', function (commit) {
    const match = GITHUB_EMOJI_REGEX.exec(commit);
    return match ? match[0] : '';
  });

  eleventyConfig.addNunjucksAsyncShortcode('responsiveImage', responsiveImage);
  eleventyConfig.addNunjucksAsyncShortcode(
    'websiteScreenshot',
    websiteScreenshot
  );
  eleventyConfig.addNunjucksAsyncShortcode('instagramImage', instagramImage);

  const md = markdownIt({
    linkify: true,
    html: true,
    highlight: function (str, lang) {
      return `<pre class="hljs"><code>${
        lang && hljs.getLanguage(lang)
          ? hljs.highlight(lang, str, true).value
          : md.utils.escapeHtml(str)
      }</code></pre>`;
    },
  });
  eleventyConfig.setLibrary('md', md);

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
