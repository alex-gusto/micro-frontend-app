const paths = require("../paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

module.exports = ({ isDev }) => {
  const styleLoader = isDev ? "style-loader" : MiniCssExtractPlugin.loader;
  const baseStyleLoaders = [styleLoader, "css-loader", "postcss-loader"];

  return [
    {
      test: /\.m?[jt]sx?$/,
      include: paths.appDirectory,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => {
              const before = [];

              if (isDev) {
                before.push(ReactRefreshTypeScript());
              }

              return { before };
            },
          },
        },
      ],
    },
    {
      test: /\.css$/i,
      use: baseStyleLoaders,
    },
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
