/* eslint-disable no-console */

var webpack = require('webpack');

var isDev = JSON.parse(process.env.DEV || '0');
console.log('[webpack] Running in ' + (isDev ? 'development' : 'production') + ' mode');

module.exports = {
    entry: './src/browser/main',
    output: {
        path: './public/compiled/scripts',
        filename: 'main.js',
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
    devtool: isDev ? 'eval-source-map' : '',
};
