module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/static');
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

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
