/* eslint-disable */
const { configForShell } = require("@mf/webpack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  return configForShell(packageJson, env, args);
};
