const read = require('@commitlint/read');

module.exports = async () => {
  return read({ edit: true });
};
