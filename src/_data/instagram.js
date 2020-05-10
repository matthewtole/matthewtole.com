const { getData } = require('user-instagram/src/scrape');
const CacheAsset = require('@11ty/eleventy-cache-assets');
const { format } = require('date-fns');

module.exports = async () => {
  const body = await CacheAsset('https://www.instagram.com/matthewtole', {
    duration: '1d',
    type: 'text',
  });
  return getData(body).posts.map(post => ({
    ...post,
    date: format(new Date(post.timestamp * 1000), 'MMMM do yyyy'),
  }));
};
