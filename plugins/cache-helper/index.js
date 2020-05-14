const fs = require('fs');
const path = require('path');

module.exports = {
  async onPreBuild({ constants, utils }) {
    await utils.cache.restore([path.normalize(`${constants.BUILD_DIR}/../.cache`)]);
    console.log(fs.readdirSync(path.normalize(`${constants.BUILD_DIR}/../.cache`)));
  },
  async onPostBuild({ constants, utils }) {
    await utils.cache.save([path.normalize(`${constants.BUILD_DIR}/../.cache`)]);
  },
};