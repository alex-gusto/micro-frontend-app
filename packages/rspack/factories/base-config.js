const getCommonConfig = require("../base/common.config");
const { merge } = require("webpack-merge");
const getDevelopmentConfig = require("../base/development.config");
const getProductionConfig = require("../base/production.config");

module.exports = (options) => {
  const commonConfig = getCommonConfig(options);

  if (options.isDev) {
    return merge(commonConfig, getDevelopmentConfig(options));
  }

  return merge(commonConfig, getProductionConfig(options));
};
