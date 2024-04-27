/* eslint-disable */
const { configForCore } = require("@mf/webpack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  return configForCore(packageJson, env, args);
};
