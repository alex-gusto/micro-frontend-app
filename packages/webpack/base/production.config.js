const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const paths = require("../paths");

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
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        ignoreOrder: true,
      }),
    ],

    optimization: {
      chunkIds: options.isAnalyze ? "named" : "natural",
      moduleIds: options.isAnalyze ? "named" : "natural",
    },
  };
};
