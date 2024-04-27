const paths = require("../paths");

module.exports = () => ({
  hot: true,
  port: "auto",
  historyApiFallback: true,
  allowedHosts: "all",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
  static: [paths.appBuild],
  client: {
    overlay: false,
  },
});
