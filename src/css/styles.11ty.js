const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const inputFileName = 'styles.pcss';
const outputFilename = 'styles.css';

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './plugins/*.js',
    './src/**/*.css',
    './src/**/*.md',
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelistPatternsChildren: [/hljs/, /article/],
});

module.exports = class {
  async data() {
    const rawFilepath = path.join(
      __dirname,
      `../_includes/postcss/${inputFileName}`
    );
    return {
      permalink: `css/${outputFilename}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import')(),
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
      ...(process.env.ELEVENTY_ENV === 'prod'
        ? [purgecss, require('cssnano')]
        : []),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
