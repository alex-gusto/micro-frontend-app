const createBaseConfig = require('./base-config');

module.exports.configForEslint = () => {
  return createBaseConfig({ isDev: false, isServe: false });
};
