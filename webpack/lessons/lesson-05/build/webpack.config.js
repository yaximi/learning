var path = require("path")

module.exports = {
    mode: "none",
    entry: {
        main: "./src"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    }
}
