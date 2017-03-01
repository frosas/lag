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
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
    ],
  },
  plugins: [].concat(
    isDev ? [] : new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.DefinePlugin({BUILD_ID: Date.now()}),
    new webpack.BannerPlugin({banner: `Build date: ${new Date()}`})
  ),
  devtool: 'source-map',
};
