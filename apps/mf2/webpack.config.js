/* eslint-disable */
const { configForApp } = require("@mf/webpack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  return configForApp(packageJson, env, args);
};
