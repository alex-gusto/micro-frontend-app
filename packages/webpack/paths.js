const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const rootDirectory = path.resolve(__dirname, "../../");

const resolveRoot = (relativePath) => path.resolve(rootDirectory, relativePath);

module.exports = {
  appDirectory,
  rootDirectory,
  resolveRoot,
  appsDirectory: resolveRoot("apps"),
  appBuild: resolveRoot("build"),
  appHtml: path.resolve(__dirname, "./parts/template.ejs"),
  dotEnv: resolveRoot(".env"),
};
