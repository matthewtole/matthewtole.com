const instagram = require("user-instagram");
const download = require('download');
const fs = require('fs');

module.exports = async () => {
  const data = await instagram("https://www.instagram.com/matthewtole");
  for (let post of data.posts) {
    await download(post.picture.url).pipe(fs.createWriteStream('_site/static/images/instagram/' + post.shortcode + '.png'));
  }
  return data.posts;
}
