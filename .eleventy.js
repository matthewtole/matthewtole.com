module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPlugin(require("eleventy-plugin-svg-contents"));

  return {
    dir: {
      input: "./src"
    }
  };
};
