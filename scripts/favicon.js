const favicons = require('favicons');
const fs = require('fs');
const chalk = require('chalk');

const source = 'src/favicon.png';

const configuration = {
  path: '/static',
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
  },
};

favicons(source, configuration, (err, res) => {
  console.log();
  if (err) {
    console.log(chalk.red('FAILED:'), err.message);
    console.log();
    process.exit(1);
  }
  fs.writeFileSync('src/_includes/favicon.njk', res.html.join('\n'));
  res.images.forEach(image => {
    fs.writeFileSync(`src/static/${image.name}`, image.contents);
    console.log(chalk.green('✓'), image.name);
  });
  console.log();
  console.log(
    chalk.green('SUCCESS:'),
    `Created ${res.images.length} images and updated the template file.`
  );
  console.log();
});
