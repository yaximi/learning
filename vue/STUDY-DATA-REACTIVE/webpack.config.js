const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        main: './src/observer.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    devServer: {
        static: './dist',
        port: 8080,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue响应式原理',
            filename: "index.html",
            template: "public/index.html",
        }),
    ],
};