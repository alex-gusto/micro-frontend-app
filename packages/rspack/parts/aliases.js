const paths = require("../paths");
const { join } = require("path");

module.exports = ({ appAlias }) => {
  return {
    [appAlias]: join(paths.rootDirectory, "apps", appAlias, "src"),
  };
};
