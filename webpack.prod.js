const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env =>
    merge(common(env), {
        mode: "production",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ["file-loader"],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ["file-loader"],
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                }),
            ],
        },
        stats: "verbose",
    });
