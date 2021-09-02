const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = env =>
    merge(common(env), {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            static: "./dist",
            port: 3000,
            hot: true,
            historyApiFallback: true,
            open: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
        },
    });
