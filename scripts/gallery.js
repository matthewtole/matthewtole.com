const sharp = require('sharp');
const jetpack = require('fs-jetpack');
const path = require('path');
const tinify = require('tinify');
require('dotenv').config();

tinify.key = process.env.TINIFY_API_KEY;
const folder = '/mnt/c/Users/matth/Downloads/Photos';

(async () => {
  const rawImages = await jetpack.listAsync(folder);
  let id = 1;
  for (let image of rawImages) {
    if (path.extname(image) !== '.jpg') {
      continue;
    }

    await tinify
      .fromBuffer(await sharp(path.join(folder, image)).resize(300).toBuffer())
      .toFile(
        `src/static/images/projects/empire-uncut/thumbs/${id
          .toString()
          .padStart(2, '0')}.jpg`
      );

    await tinify
      .fromBuffer(await sharp(path.join(folder, image)).resize(1000).toBuffer())
      .toFile(
        `src/static/images/projects/empire-uncut/${id
          .toString()
          .padStart(2, '0')}.jpg`
      );
    id += 1;
  }
})();
