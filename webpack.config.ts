/* eslint-env node */

import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { render as renderOfflineSupport } from "./src/build/offline-support";

const getBuildDate = () => new Date().toUTCString();

const buildIsProd = (args: { mode?: string }) => {
  switch (args.mode) {
    case "production":
      return true;
    case "development":
      return false;
    default:
      throw new Error(`Unknown mode`);
  }
};

const configFactory: webpack.ConfigurationFactory = (_, args) => {
  const isProd = buildIsProd(args);
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
        banner: (() => `Build date: ${getBuildDate()}`) as any
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

export default configFactory;
