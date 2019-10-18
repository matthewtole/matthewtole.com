const instagram = require('user-instagram');
const download = require('download');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

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

  for (let post of data.posts) {
    await downloadPost(post);
    for (size of thumbnailSizes) {
      await downloadPost(post, size);
    }
  }

  if (isDev()) {
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }
    fs.writeFileSync(cacheFile, JSON.stringify(data.posts));
  }

  return data.posts;
};

const downloadPost = async (post, size) => {
  const src = size ? post.picture[`thumbnail_${size}`] : post.picture.url;
  if (fs.existsSync(makeFilename(post, size))) {
    return;
  }
  await download(src).pipe(fs.createWriteStream(makeFilename(post, size)));
};

const makeFilename = (post, size) => {
  if (size) {
    return `${outputFolder}${post.shortcode}_${size}.png`;
  }
  return `${outputFolder}${post.shortcode}.png`;
};
