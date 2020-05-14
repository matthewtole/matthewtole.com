const fs = require('fs');
const path = require('path');

const cacheDirectories = (constants) => [
  path.normalize(`${constants.BUILD_DIR}/../.cache`),
];

module.exports = {
  async onPreBuild({ constants, utils }) {
    await utils.cache.restore(cacheDirectories(constants));
  },
  async onPostBuild({ constants, utils }) {
    await utils.cache.save(cacheDirectories(constants));
  },
};
