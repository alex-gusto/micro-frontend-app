const createBaseConfig = require("./base-config");
const { merge } = require("webpack-merge");
const { moduleFederationPlugin } = require("../parts/module-federation.plugin");
const { parseOptions, readAppNames, getRemoteAppName } = require("../utils");
const { loadExternals } = require("../parts/externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("../paths");
const fs = require("node:fs");

module.exports.configForApp = (packageJson, env, args) => {
  const options = parseOptions(packageJson, env, args);
  const baseConfig = createBaseConfig(options);

  const entry = {
    main: ["systemjs-webpack-interop/auto-public-path", "./src/index.tsx"],
    [options.appName]: "systemjs-webpack-interop/auto-public-path",
  };

  const plugins = [
    moduleFederationPlugin({
      name: options.appName,
      exposes: options.exports,
      // Collect all app names from /apps folder including core and shell from packages.
      // Transform to remote app names: @mf/core
      remotes: ["core", "shell", "sw", ...readAppNames()].map((name) =>
        getRemoteAppName(name)
      ),
    }),
  ];

  // Sandbox for app
  if (options.withSandbox && options.isServe) {
    plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        templateParameters: options,
        template: paths.appHtml,
        chunks: ["sandbox"],
        filename: "./index.html",
      })
    );

    if (!fs.existsSync(paths.resolveApp("src/sandbox.tsx"))) {
      throw new Error('Add sandbox entry point if "withPSandbox" is true!');
    }

    entry.sandbox = [
      "systemjs-webpack-interop/auto-public-path",
      "./src/sandbox.tsx",
    ];
  }

  return merge(baseConfig, {
    entry,

    plugins,

    externals: loadExternals(),
  });
};
