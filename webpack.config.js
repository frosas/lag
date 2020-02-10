/* eslint-env node */

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { render: renderOfflineSupport } = require("./src/build/offline-support");

const getBuildDate = () => new Date().toUTCString();

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const assetNameTemplate = `[name]${isProd ? ".[contenthash]" : ""}`;

  return {
    entry: {
      main: "./src/browser/main",
      "service-worker": "./src/browser/service-worker.js"
    },
    output: {
      path: `${__dirname}/dist/browser`,
      filename: `scripts/${assetNameTemplate}.js`
    },
    resolve: { extensions: [".ts", ".tsx", ".js"] },
    module: {
      rules: [
        { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
        {
          test: /\.(js|tsx?)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
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
      new webpack.BannerPlugin({
        banner: () => `Build date: ${getBuildDate()}`
      }),
      new HtmlPlugin({
        template: "html/index.ejs",
        templateData: {
          getBuildDate,
          offlineSupportHtml: renderOfflineSupport()
        },
        inject: false,
        minify: isProd && {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true
        }
      }),
      new MiniCssExtractPlugin({ filename: `styles/${assetNameTemplate}.css` })
    ],
    devtool: isProd ? "source-map" : "cheap-module-eval-source-map"
  };
};
