/* eslint-env node */

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const renderOfflineSupport = require("./src/build/renderOfflineSupport");

const buildDate = new Date();

module.exports = {
  entry: {
    main: "./src/browser/main",
    "service-worker": "./src/browser/service-worker.js"
  },
  output: {
    path: `${__dirname}/dist/browser`,
    filename: "scripts/[name].js"
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
      { test: /\.(js|tsx?)$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.tsx?$/, exclude: /node_modules/, use: ["ts-loader"] },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "static" }]),
    new webpack.DefinePlugin({ BUILD_ID: Date.now() }),
    new webpack.BannerPlugin({ banner: `Build date: ${buildDate}` }),
    new HtmlPlugin({
      template: "html/index.ejs",
      templateData: { buildDate, offlineSupportHtml: renderOfflineSupport() },
      filename: "index.html",
      chunks: ["main"],
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    new MiniCssExtractPlugin({ filename: "styles/[name].css" })
  ],
  devtool: "cheap-module-eval-source-map"
};
