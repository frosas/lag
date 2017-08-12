/* eslint-env node */

const webpack = require('webpack');
const debug = require('debug')('app:webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
debug(`Running in ${isDev ? 'development' : 'production'} mode`);

module.exports = {
  entry: {
    main: './src/browser/main',
    'service-worker': './src/browser/service-worker.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'scripts/[name].js',
  },
  module: {
    rules: [{test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']}],
  },
  plugins: [].concat(
    new CleanWebpackPlugin('dist'),
    new CopyWebpackPlugin([{from: 'static'}]),
    isDev ? [] : new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.DefinePlugin({BUILD_ID: Date.now()}),
    new webpack.BannerPlugin({banner: `Build date: ${new Date()}`})
  ),
  devtool: 'source-map',
};
