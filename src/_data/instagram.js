const instagram = require('user-instagram');
const download = require('download');
const fs = require('fs');
const mkdirp = require('mkdirp');

const thumbnailSizes = [150, 240, 320, 480, 640];
const outputFolder = '_site/static/images/instagram/';
const username = 'matthewtole';

module.exports = async () => {
  if (process.env.ELEVENTY_ENV !== 'prod') {
    return [];
  }

  mkdirp.sync(outputFolder);
  const data = await instagram(`https://www.instagram.com/${username}`);

  for (let post of data.posts) {
    await downloadPost(post);
    for (size of thumbnailSizes) {
      await downloadPost(post, size);
    }
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
