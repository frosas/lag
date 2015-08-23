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
};
