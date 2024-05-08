/* eslint-disable */
const { configForApp } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9001;
  return configForApp(packageJson, env, args);
};
