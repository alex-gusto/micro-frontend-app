const createBaseConfig = require("./base-config");
const { merge } = require("webpack-merge");
const { parseOptions } = require("../utils");
const { DefinePlugin } = require("@rspack/core");
const { InjectManifest } = require("@aaroon/workbox-rspack-plugin");
const { moduleFederationPlugin } = require("../parts/module-federation.plugin");

module.exports.configForSW = (packageJson, env, args) => {
  const options = parseOptions(packageJson, env, args);
  const baseConfig = createBaseConfig(options);

  return merge(baseConfig, {
    entry: {
      [options.appName]: ["systemjs-webpack-interop/auto-public-path"],
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    },
    plugins: [
      new DefinePlugin({
        "process.env.APP_VERSION": JSON.stringify(new Date().toISOString()),
      }),
      new InjectManifest({
        swSrc: "./service-worker.ts",
        swDest: "../service-worker.js",
      }),
      moduleFederationPlugin({
        name: options.appName,
        exposes: {
          ".": "./index.ts",
        },
      }),
    ],
  });
};
