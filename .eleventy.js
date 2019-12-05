const emoji = require('node-emoji');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.addPassthroughCopy('src/**/_redirects');
  eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    },
  };

  eleventyConfig.setLibrary('md', markdownIt(options));

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

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
