/* eslint-disable */
const { configForLibs } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9101;
  return configForLibs(packageJson, env, args);
};
