/* eslint-env node */
/* eslint-disable no-console */

const webpack = require('webpack');
const debug = require('debug')('app:webpack');

const isDev = process.env.NODE_ENV !== 'production';
debug(`Running in ${(isDev ? 'development' : 'production')} mode`);

module.exports = {
  entry: {
    'main': './src/browser/main',
    'service-worker': './src/browser/service-worker.js',
  },
  output: {
    path: './public/compiled/scripts',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
  plugins: [].concat(
    isDev ? [] : new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({BUILD_ID: Date.now()}),
    new webpack.BannerPlugin(`Build date: ${new Date()}`)
  ),
  debug: isDev,
  devtool: 'source-map',
};
