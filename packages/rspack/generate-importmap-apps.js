const fs = require("fs");
const { join } = require("path");
const paths = require("./paths");
const {
  combineUrl,
  PACKAGE_SCOPE,
  readAppNames,
  getRemoteAppName,
} = require("./utils");
const { remoteEntry } = require("./parts/module-federation.plugin");

if (!process.env[`UI_URL`]) {
  throw new Error("Defined UI_URL in your .env file!");
}

const mainEntryURL = (app) => combineUrl(process.env[`UI_URL`], app, "main.js");

const remoteEntryURL = (app) =>
  combineUrl(process.env[`UI_URL`], app, remoteEntry);

module.exports = ({ isServe }) => {
  const appNames = readAppNames();
  // Collect apps urls
  const apps = Object.fromEntries(
    appNames.map((app) => [`${PACKAGE_SCOPE}${app}/app`, mainEntryURL(app)])
  );

  // Collect packages urls
  const packages = Object.fromEntries(
    ["libs", "core", "sw", ...appNames].map((name) => [
      getRemoteAppName(name),
      remoteEntryURL(name),
    ])
  );

  const imports = {
    ...apps,
    ...packages,
    [getRemoteAppName("shell")]: isServe
      ? combineUrl("/", remoteEntry)
      : remoteEntryURL("shell"),
  };

  if (!fs.existsSync(paths.appBuild)) {
    fs.mkdirSync(paths.appBuild, console.error);
  }

  fs.writeFileSync(
    join(paths.appBuild, "importmap-apps.json"),
    JSON.stringify({ imports }, null, "\t"),
    console.error
  );
};
