const fs = require('fs');
const path = require('path');

module.exports = {
  async onPreBuild({ constants, utils }) {
    // const cacheDirs = getCacheDirs(constants);

    // if (await utils.cache.restore(cacheDirs)) {
    //   console.log('Found a Gatsby cache. We’re about to go FAST. ⚡️');
    // } else {
    //   console.log('No Gatsby cache found. Building fresh.');
    // }
  },
  async onPostBuild({ constants, utils }) {
    // console.log(fs.readdirSync(constants.BUILD_DIR));
    console.log(fs.readdirSync(path.normalize(`${constants.BUILD_DIR}/../.cache`)));
    // console.log(fs.readdirSync(path.normalize(`${constants.PUBLISH_DIR}/../`)));
    // console.log(fs.readdirSync(path.join(constants.CACHE_DIR, '.cache')));
    // const cacheDirs = getCacheDirs(constants);

    // if (await utils.cache.save(cacheDirs)) {
    //   console.log('Stored the Gatsby cache to speed up future builds.');
    // } else {
    //   console.log('No Gatsby build found.');
    // }
  },
};