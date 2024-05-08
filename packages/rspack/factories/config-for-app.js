const createBaseConfig = require("./base-config");
const { merge } = require("webpack-merge");
const { moduleFederationPlugin } = require("../parts/module-federation.plugin");
const { parseOptions, readAppNames, getRemoteAppName } = require("../utils");
const { loadExternals } = require("../parts/externals");

module.exports.configForApp = (packageJson, env, args) => {
  const options = parseOptions(packageJson, env, args);
  const baseConfig = createBaseConfig(options);

  return merge(baseConfig, {
    entry: {
      main: ["systemjs-webpack-interop/auto-public-path", "./src/index.tsx"],
      [options.appName]: "systemjs-webpack-interop/auto-public-path",
    },

    plugins: [
      moduleFederationPlugin({
        name: options.appName,
        exposes: options.exports,
        // Collect all app names from /apps folder including core and shell from packages.
        // Transform to remote app names: @mf/core
        remotes: ["core", "shell", ...readAppNames()].map((name) =>
          getRemoteAppName(name)
        ),
      }),
    ],

    externals: loadExternals(),
  });
};
