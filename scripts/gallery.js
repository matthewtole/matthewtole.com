const sharp = require('sharp');
const jetpack = require('fs-jetpack');
const path = require('path');

(async () => {
  const rawImages = await jetpack.listAsync('/Users/mtole/Downloads/Photos/');
  let id = 1;
  for (let image of rawImages) {
    if (path.extname(image) !== '.jpg') {
      continue;
    }
    sharp('/Users/mtole/Downloads/Photos/' + image)
      .resize(300)
      .toFile(
        `src/static/images/projects/empire-uncut/thumbs/${id
          .toString()
          .padStart(2, '0')}.jpg`
      );

    sharp('/Users/mtole/Downloads/Photos/' + image)
      .resize(1000)
      .toFile(
        `src/static/images/projects/empire-uncut/${id
          .toString()
          .padStart(2, '0')}.jpg`
      );
    id += 1;
  }
})();
