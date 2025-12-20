/* eslint-disable */
const { configForApp, configForWW } = require("@mf/rspack");
const packageJson = require("./package.json");

module.exports = (env, args) => {
  env.CUSTOM_PORT = 9002;
  env.WITH_SANDBOX = true;

  return [
    configForApp(packageJson, env, args),
    configForWW(packageJson, env, args),
  ];
};
