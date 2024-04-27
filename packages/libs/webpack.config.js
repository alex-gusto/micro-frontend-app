/* eslint-disable */
const { configForLibs } = require("@mf/webpack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  return configForLibs(packageJson, env, args);
};
