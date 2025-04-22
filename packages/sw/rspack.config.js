/* eslint-disable */
const { configForSW } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9102;
  return configForSW(packageJson, env, args);
};
