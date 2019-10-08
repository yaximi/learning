const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        "main": "./src/index.js"
    },
    output: {
        filename: "static/js/[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./"
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            "src": path.resolve(__dirname, "../src"),
            "assets": path.resolve(__dirname, "../src/assets"),
            "components": path.resolve(__dirname, "../src/components"),
            "pages": path.resolve(__dirname, "../src/pages")
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: 'static/img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.ejs",
            inject: true
        })
    ]
};
