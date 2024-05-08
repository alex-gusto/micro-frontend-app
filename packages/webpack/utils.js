const fs = require("fs");
const paths = require("./paths");

const PACKAGE_SCOPE = "@mf/";

module.exports.parseOptions = (packageJson, env, args) => {
  const isDev = args.mode !== "production";
  const isServe = env.WEBPACK_SERVE ?? false;
  const isAnalyze = "analyze" in args;
  const appName = packageJson.name;
  const appAlias = appName.replace(PACKAGE_SCOPE, "");

  return {
    isDev,
    isServe,
    isAnalyze,
    appName,
    appAlias,
    exports: packageJson.exports,
    publicPath: isServe ? "/" : `/${appAlias}/`,
  };
};

module.exports.combineUrl = (...args) =>
  args.map((str) => str.replace(/^\/|\/$/, "")).join("/");

module.exports.PACKAGE_SCOPE = PACKAGE_SCOPE;

// Read all apps names from apps folder
module.exports.readAppNames = () => {
  return fs
    .readdirSync(paths.appsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

module.exports.getRemoteAppName = (appName) => `${PACKAGE_SCOPE}${appName}`;
