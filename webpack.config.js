/* eslint-env node */

const webpack = require("webpack");
const debug = require("debug")("app:webpack");
const CopyPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const renderOfflineSupport = require("./src/node/renderOfflineSupport");

const buildDate = new Date();

const isDev = process.env.NODE_ENV !== "production";
debug(`Running in ${isDev ? "development" : "production"} mode`);

module.exports = {
  entry: {
    main: "./src/browser/main",
    "service-worker": "./src/browser/service-worker.js"
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "scripts/[name].js"
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
      { test: /\.tsx?$/, use: ["babel-loader", "awesome-typescript-loader"] },
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: ["css-loader"] })
      }
    ]
  },
  plugins: [].concat(
    isDev ? [] : new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new CleanPlugin("dist"),
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
    new ExtractTextPlugin("styles/[name].css")
  ),
  devtool: "source-map"
};
