var path = require("path")

module.exports = {
    mode: "none",
    context: path.resolve(__dirname, "../"),
    entry: {
        main: "./src"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    "csv-loader"
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    "xml-loader"
                ]
            }
        ]
    }
}
