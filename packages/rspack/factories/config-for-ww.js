const createBaseConfig = require("./base-config");
const { merge } = require("webpack-merge");
const { parseOptions } = require("../utils");

module.exports.configForWW = (packageJson, env, args) => {
  const options = parseOptions(packageJson, env, args);
  const baseConfig = createBaseConfig(options);

  return merge(baseConfig, {
    entry: {
      worker: "./src/workers/worker.ts",
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
      library: {
        type: "self",
      },
    },
    plugins: [],
    target: "webworker",
  });
};
