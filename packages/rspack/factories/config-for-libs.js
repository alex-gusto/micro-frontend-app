const createBaseConfig = require('./base-config');
const { merge } = require('webpack-merge');
const { parseOptions } = require('../utils');
const { moduleFederationPlugin } = require('../parts/module-federation.plugin');
const { exposeExternals } = require('../parts/externals');

// This build collect all external libraries and expose them from libs package.
module.exports.configForLibs = (packageJson, ...args) => {
  const options = parseOptions(packageJson, ...args);
  const baseConfig = createBaseConfig(options);
  const entry = ['systemjs-webpack-interop/auto-public-path'];

  if (options.isServe) {
    entry.push('react-refresh/runtime');
  }

  return merge(baseConfig, {
    entry: {
      [options.appName]: entry,
    },

    plugins: [
      moduleFederationPlugin({
        name: options.appName,
        exposes: {
          '.': './index.ts',
          ...exposeExternals(),
        },
      }),
    ],
  });
};
