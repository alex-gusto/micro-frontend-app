/* eslint-disable */
const { configForCore } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9100;
  return configForCore(packageJson, env, args);
};
