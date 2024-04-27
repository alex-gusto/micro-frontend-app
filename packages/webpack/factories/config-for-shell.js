const createBaseConfig = require("./base-config");
const { merge } = require("webpack-merge");
const { moduleFederationPlugin } = require("../parts/module-federation.plugin");
const paths = require("../paths");
const { parseOptions, getRemoteAppName } = require("../utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { loadExternals } = require("../parts/externals");
const generateImportMapApps = require("../generate-importmap-apps");
const generateImportMapLibs = require("../generate-importmap-libs");

module.exports.configForShell = (packageJson, env, args) => {
  const options = parseOptions(packageJson, env, args);
  const baseConfig = createBaseConfig(options);

  // Generate import maps for SystemJS based on .env settings
  generateImportMapApps(options);
  generateImportMapLibs(options);

  return merge(baseConfig, {
    entry: {
      main: ["systemjs-webpack-interop/auto-public-path", "./src/index.ts"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        title: "Micro FE",
        templateParameters: options,
        template: paths.appHtml,
        filename: options.isServe ? "./index.html" : "../index.html",
      }),
      moduleFederationPlugin({
        name: options.appName,
        remotes: [getRemoteAppName("core")], // Shell could depends on core
        exposes: options.exports,
      }),
    ],

    externals: loadExternals(),

    devServer: {
      open: true,
    },
  });
};
