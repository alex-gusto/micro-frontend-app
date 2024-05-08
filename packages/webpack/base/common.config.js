const paths = require("../paths");
const getRules = require("../parts/rules");
const getAlias = require("../parts/aliases");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const { getClientEnvironment } = require("../env");

module.exports = (options) => {
  const plugins = [
    new webpack.DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(options.publicPath),
    }),
    new webpack.DefinePlugin(getClientEnvironment()),
    new ForkTsCheckerWebpackPlugin({
      async: options.isServe,
      devServer: false,
      typescript: {
        configOverwrite: {
          compilerOptions: {
            incremental: true,
          },
        },
        profile: false,
        build: false,
      },
    }),
  ];

  if (options.isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: "auto" }));
  }

  return {
    context: paths.appDirectory,

    output: {
      path: paths.appBuild,
      library: {
        type: "system",
      },
      publicPath: options.publicPath,
      clean: true,
    },

    resolve: {
      symlinks: false,
      alias: getAlias(options),
      extensions: [".mjs", ".js", ".ts", ".tsx", ".json", ".jsx"],
      fallback: {
        crypto: require.resolve("crypto-browserify"),
      },
    },

    module: {
      rules: getRules(options),
    },

    plugins,

    experiments: {
      topLevelAwait: true,
    },
  };
};
