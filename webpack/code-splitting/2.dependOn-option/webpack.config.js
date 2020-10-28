const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    mode: "none",
    entry: {
        index: {
            import: "./src/index.js",
            dependOn: "shared"
        },
        another: {
            import: "./src/another-module.js",
            dependOn: "shared"
        },
        shared: ["lodash"]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./"
    },
    optimization: {
        runtimeChunk: "single"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
};

/**
 * prevent duplication（防止重复）
 *
 * 配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块。
 * 在单个 HTML 页面上使用多个入口时，需设置 optimization.runtimeChunk: 'single'。
 */
