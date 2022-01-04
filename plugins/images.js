const Image = require('@11ty/eleventy-img');
const getColors = require('get-image-colors');

async function responsiveImage(src, alt) {
  const options = {
    outputDir: '_site/img/',
    cacheDuration: '1w',
    widths: [256, 512, 1024],
  };
  if (process.env.SKIP_IMAGES) {
    return `<img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="${alt}" loading="lazy"
      src="https://placekitten.com/256/256/">`;
  }

  let stats = await Image(src, options);
  let lowestSrc = stats.jpeg[0];

  let sources = [];
  Object.values(stats).forEach((imageFormat) => {
    sources.push(
      `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x" media="(min-width: 768px)">`
    );
    sources.push(
      `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[1].url}, ${imageFormat[2].url} 2x">`
    );
  });

  return `<picture>${sources.join('\n')}
    <img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="${alt}" loading="lazy"
      src="${lowestSrc.url}">
  </picture>`;
}

async function instagramImage(url, alt) {
  if (process.env.SKIP_IMAGES) {
    return `<img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="${alt}" loading="lazy"
      src="https://placekitten.com/256/256/">`;
  }

  const image = await Image(url, {
    outputDir: '_site/img/',
    cacheDuration: '1w',
    widths: [256, 512, null],
  });

  const colors = await getColors('_site/' + image.jpeg[0].url);

  let sources = [];
  Object.values(image).forEach((imageFormat) => {
    sources.push(
      `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x, ${imageFormat[2].url} 4x">`
    );
  });

  return `<picture>${sources.join(
    '\n'
  )}<img alt="${alt}" class="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-200 transform hover:scale-105" style="background-color: ${colors[0].hex()};" src="${
    image.jpeg[0].url
  }" loading="lazy" /></picture>`;
}

async function websiteScreenshot(url) {
  if (process.env.SKIP_IMAGES) {
    return `<img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="${url}" loading="lazy"
      src="https://placekitten.com/256/256/">`;
  }

  const screenshotWidth = 1024;
  const screenshotUrl = `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(
    url
  )}&output=image&width=${screenshotWidth}&height=${Math.round(
    (screenshotWidth / 16) * 9
  )}&token=${process.env.SCREENSHOT_TOKEN}&fresh=true`;

  const options = {
    outputDir: '_site/img/',
    cacheDuration: '1w',
    widths: [256, 512, 1024],
  };
  let stats = await Image(screenshotUrl, options);
  let lowestSrc = stats.jpeg[0];

  let sources = [];
  Object.values(stats).forEach((imageFormat) => {
    sources.push(
      `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[0].url}, ${imageFormat[1].url} 2x" media="(min-width: 768px)">`
    );
    sources.push(
      `<source type="image/${imageFormat[0].format}" srcset="${imageFormat[1].url}, ${imageFormat[2].url} 2x">`
    );
  });

  return `<picture>${sources.join('\n')}
    <img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="Screenshot of ${url}" loading="lazy"
      src="${lowestSrc.url}">
  </picture>`;
}

module.exports = { responsiveImage, instagramImage, websiteScreenshot };
