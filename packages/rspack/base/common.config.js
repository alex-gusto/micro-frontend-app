const paths = require("../paths");
const getRules = require("../parts/rules");
const getAlias = require("../parts/aliases");
const { DefinePlugin } = require("@rspack/core");
const { getClientEnvironment } = require("../env");

module.exports = (options) => {
  const plugins = [
    new DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(options.publicPath),
    }),
    new DefinePlugin(getClientEnvironment()),
  ];

  return {
    output: {
      path: paths.appBuild,
      library: {
        type: "system",
      },
      publicPath: options.publicPath,
      // clean: true,
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
      rspackFuture: {
        disableTransformByDefault: true,
      },
    },

    stats: {
      children: true,
    },
  };
};
