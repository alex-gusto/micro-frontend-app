const { ModuleFederationPlugin } = require("@rspack/core").container;

const filename = "remoteEntry.js";

module.exports.remoteEntry = filename;

module.exports.moduleFederationPlugin = ({ name, exposes, remotes }) => {
  return new ModuleFederationPlugin({
    name,
    library: { type: "system", name },
    filename,
    exposes,
    remotes,
  });
};
