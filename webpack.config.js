/* eslint-disable no-console */

var webpack = require('webpack');
const debug = require('debug')('app:webpack');

var isDev = process.env.NODE_ENV !== 'production';
debug('Running in ' + (isDev ? 'development' : 'production') + ' mode');

module.exports = {
    entry: {
        main: './src/browser/main',
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
        isDev ? [] : new webpack.optimize.UglifyJsPlugin()
    ),
    debug: isDev,
    devtool: isDev ? 'source-map' : '',
};
