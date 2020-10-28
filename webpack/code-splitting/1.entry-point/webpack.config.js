const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "none",
    entry: {
        index: "./src/index.js",
        another: "./src/another-module.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};

/**
 * code splitting（代码分离）
 *
 * 1、entry point（入口起点）：使用 entry 配置手动的分离代码。
 *
 * 优点：
 *      简单直接。
 * 缺点：
 *      1、如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
 *      2、这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。
 *
 * 以上两个缺点中，第一点对我们的示例来说无疑是个问题，因为我们在 ./src/index.js 与 ./src/another-module.js 中都引入了 lodash，这样就在两个 bundle 中造成重复引用。
 *
 * 2、prevent duplication（防止重复）：
 *      1、dependOn option
 *      2、splitChunksPlugin
 */
