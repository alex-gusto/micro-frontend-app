const paths = require("../paths");
const { CssExtractRspackPlugin } = require("@rspack/core");

module.exports = ({ isDev }) => {
  const cssRule = isDev
    ? {
        test: /\.css$/i,
        type: "css",
      }
    : {
        test: /\.css$/i,
        use: [CssExtractRspackPlugin.loader, "css-loader"],
      };

  return [
    {
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(js|ts)x?$/,
      include: paths.appDirectory,
      use: {
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true,
              decorators: true,
            },
            transform: {
              react: {
                runtime: "automatic",
                development: isDev,
                refresh: isDev,
              },
            },
          },
        },
      },
    },
    cssRule,
    {
      test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
      type: isDev ? "asset/resource" : "asset",
    },
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      type: "asset/resource",
    },
  ];
};
