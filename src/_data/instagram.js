const instagram = require('user-instagram');
const download = require('download');
const jetpack = require('fs-jetpack');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const getColors = require('get-image-colors');

const thumbnailSizes = [150, 240, 320, 480, 640];
const outputFolder = '_site/static/images/instagram/';
const username = 'matthewtole';
const cacheFolder = '_cache';
const cacheFile = path.join(cacheFolder, 'instagram.json');

const isDev = () => process.env.ELEVENTY_ENV !== 'prod';

module.exports = async () => {
  if (isDev() && fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile).toString());
  }

  mkdirp.sync(outputFolder);
  const data = await instagram(`https://www.instagram.com/${username}`);

  const posts = [];

  for (let post of data.posts) {
    await downloadPost(post);
    for (size of thumbnailSizes) {
      await downloadPost(post, size);
    }
    try {
      const colors = await getColors(makeFilename(post));
      posts.push({
        ...post,
        color: colors[0].hex(),
      });
    } catch (ex) {
      console.log(ex);
      posts.push(post);
    }
  }

  if (isDev()) {
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }
    fs.writeFileSync(cacheFile, JSON.stringify(posts));
  }

  return posts;
};

const downloadPost = async (post, size) => {
  const src = size ? post.picture[`thumbnail_${size}`] : post.picture.url;
  if (fs.existsSync(makeFilename(post, size))) {
    return;
  }
  return download(src).then(buffer =>
    jetpack.writeAsync(makeFilename(post, size), buffer)
  );
};

const makeFilename = (post, size) => {
  if (size) {
    return `${outputFolder}${post.shortcode}_${size}.jpg`;
  }
  return `${outputFolder}${post.shortcode}.jpg`;
};
