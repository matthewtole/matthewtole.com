const CleanCSS = require('clean-css');

const cleanCss = new CleanCSS(
  {} // See https://www.npmjs.com/package/clean-css#constructor-options
);

const path = require('path');
const sass = require('sass');
const inputFile = path.join(__dirname, '../styles/main.scss');

module.exports = cleanCss.minify(sass.compile(inputFile).css).styles;
