/* eslint-env node */

module.exports = {
    entry: "./src/browser/main",
    output: {
        path: './public/compiled/scripts',
        filename: 'main.js'
    }
};