const createBaseConfig = require('./base-config');
const { merge } = require('webpack-merge');
const { parseOptions } = require('../utils');
const { moduleFederationPlugin } = require('../parts/module-federation.plugin');
const { loadExternals } = require('../parts/externals');

module.exports.configForCore = (packageJson, ...args) => {
  const options = parseOptions(packageJson, ...args);
  const baseConfig = createBaseConfig(options);

  return merge(baseConfig, {
    entry: {
      [options.appName]: 'systemjs-webpack-interop/auto-public-path',
    },

    plugins: [
      moduleFederationPlugin({
        name: options.appName,
        exposes: options.exports,
      }),
    ],

    externals: loadExternals(),
  });
};
