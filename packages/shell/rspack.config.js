/* eslint-disable */
const { configForShell } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9000;
  return configForShell(packageJson, env, args);
};
