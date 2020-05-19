const CacheAsset = require('@11ty/eleventy-cache-assets');

module.exports = async () =>
  CacheAsset(
    'https://api.github.com/repos/matthewtole/matthewtole.com/commits',
    {
      duration: process.env.NETLIFY ? '1m' : '1h',
      type: 'json',
    }
  );
