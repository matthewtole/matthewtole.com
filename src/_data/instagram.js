const instagram = require("user-instagram");
const download = require('download');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = async () => {
  mkdirp.sync('_site/static/images/instagram/');
  const data = await instagram("https://www.instagram.com/matthewtole");
  for (let post of data.posts) {
    const filename = `_site/static/images/instagram/${post.shortcode}.png`;
    if (fs.existsSync(filename)) {
      continue;
    }
    await download(post.picture.url).pipe(fs.createWriteStream(filename));
  }
  return data.posts;
}
