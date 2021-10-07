const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
    path: path.resolve(__dirname, 'build'),
        filename: 'webpack_simple.js',
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.template'})],
};