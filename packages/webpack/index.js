require('./env');
const { configForApp } = require('./factories/config-for-app');
const { configForCore } = require('./factories/config-for-core');
const { configForShell } = require('./factories/config-for-shell');
const { configForLibs } = require('./factories/config-for-libs');

module.exports = {
  configForApp,
  configForCore,
  configForShell,
  configForLibs,
};
