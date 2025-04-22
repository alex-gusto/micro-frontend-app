const { resolve } = require("path");
const paths = require("../paths");
const { CssExtractRspackPlugin } = require("@rspack/core");
const { swManifestPlugin } = require("../parts/sw-manifest.plugin");

module.exports = (options) => {
  return {
    mode: "production",

    devtool: "source-map",

    output: {
      path: resolve(paths.appBuild, options.appAlias),
      filename: "[name].js",
      chunkFilename: "chunks/[name].[contenthash].js",
    },

    plugins: [
      new CssExtractRspackPlugin({
        filename: "css/[name].css",
      }),
      swManifestPlugin(),
    ],

    optimization: {
      chunkIds: options.isAnalyze ? "named" : "natural",
      moduleIds: options.isAnalyze ? "named" : "natural",
    },
  };
};
