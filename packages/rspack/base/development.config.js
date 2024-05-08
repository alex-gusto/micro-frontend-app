const createDevServer = require("../parts/dev-server");
const paths = require("../paths");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

module.exports = (options) => {
  return {
    mode: "development",

    devtool: "eval-source-map",

    output: {
      path: paths.appBuild,
      filename: "[name].js",
      chunkFilename: "chunks/[name].js",
    },

    devServer: createDevServer(options),

    optimization: {
      minimize: false,
    },

    plugins: [
      new ReactRefreshPlugin({
        overlay: false,
        exclude: [/node_modules/],
        library: options.appName,
      }),
      //   new webpack.WatchIgnorePlugin({
      //     paths: [/\.d\.[cm]ts$/],
      //   }),
    ],

    watchOptions: {
      ignored: new RegExp(`/apps/(?!${options.appAlias})|node_modules`), // Watch just current app
    },
  };
};
