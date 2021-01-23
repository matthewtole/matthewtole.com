const Image = require('@11ty/eleventy-img');

module.exports = async (url) => {
  if (process.env.SKIP_IMAGES === '1') {
    return `<img
    class="absolute top-0 left-0 object-cover w-full h-full"
      alt="${url}" loading="lazy"
      src="https://placekitten.com/256/256/">`;
  }

  const screenshotWidth = 1024;
  const screenshotUrl = `https://screenshotapi.net/api/v1/screenshot?url=${encodeURIComponent(
    url
  )}&output=image&width=${screenshotWidth}&height=${Math.round(
    (screenshotWidth / 16) * 9
  )}&token=${process.env.SCREENSHOT_TOKEN}&fresh=true`;

  const options = {
    outputDir: 'dist/assets/images/screenshot/',
    urlPath: '/assets/images/screenshot',
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
      alt="Screenshot of ${url}" loading="lazy"
      src="${lowestSrc.url}">
  </picture>`;
}