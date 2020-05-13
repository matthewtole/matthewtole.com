const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const atImport = require('postcss-import');

const fileName = 'styles.css';

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './plugins/*.js',
    './src/**/*.css',
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = class {
  async data() {
    const rawFilepath = path.join(
      __dirname,
      `../_includes/postcss/${fileName}`
    );
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    console.log(rawFilepath);
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
