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
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};

/**
 * prevent duplication（防止重复）
 *
 * SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
 * 使用 optimization.splitChunks 配置选项之后，现在应该可以看出，index.bundle.js 和 another.bundle.js 中已经移除了重复的依赖模块。
 * 需要注意的是，插件将 lodash 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了大小。
 */
