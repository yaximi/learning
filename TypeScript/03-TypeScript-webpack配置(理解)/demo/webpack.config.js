const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
    mode: "development", // "development" | "production" | "none"

    context: __dirname,

    entry: {
        "main": "./src/main.ts"
    },

    output: {
        // clean: true,
        filename: "assets/js/[name].js", // filename: 指定打包之后的JS文件的名称
        path: path.resolve(__dirname, 'dist'), // path: 指定打包之后的文件存储到什么地方
        publicPath: "./"
    },

    /**
     * resolve.extensions: 指定文件扩展名
     */
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },

    /**
     * 配置sourcemap
     */
    devtool: "inline-source-map",

    /**
     * devServer: 自动检测文件变化
     */
    devServer: {
        compress: true,
        devMiddleware: {
            publicPath: '/'
            // writeToDisk: true
        },
        hot: true,
        open: true,
        port: 'auto'
    },

    /**
     * module: 告诉webpack如何处理webpack不能够识别的文件
     */
    module: {
        rules: [
            // ts编译配置
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    /**
     * plugins: 告诉webpack需要新增一些什么样的功能
     */
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]
};
