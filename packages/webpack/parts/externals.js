const { dependencies } = require("../../../package.json");

const skippedLibs = new Set([]);

const extraDeps = ["react-dom/server"];

const externals = [...Object.keys(dependencies), ...extraDeps].filter(
  (dep) => !skippedLibs.has(dep)
);

module.exports.loadExternals = () => externals;

module.exports.exposeExternals = () =>
  Object.fromEntries(externals.map((lib) => [lib, lib]));
