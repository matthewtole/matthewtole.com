module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.addPlugin(require('eleventy-plugin-svg-contents'));

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
