var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    watch: true,
    devServer: {
        contentBase: './',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
    ]
}; 