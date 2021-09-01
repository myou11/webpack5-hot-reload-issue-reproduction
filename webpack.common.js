const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const getEnvFile = env => {
  switch (env.environment) {
    case "prd":
      return "./env/.env.production";
    case "local":
      return "./env/.env.local";
    case "stg":
      return "./env/.env.stg";
    case "dev":
    default:
      return "./env/.env.dev";
  }
};

module.exports = env => ({
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      path: getEnvFile(env),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["Your application is running here http://localhost:3000"],
        notes: [""],
      },
      clearConsole: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[id].[hash].js",
    chunkFilename: "[name].[id].[hash].js",
  },
});
