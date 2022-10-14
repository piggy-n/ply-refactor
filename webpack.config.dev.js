const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    entry: {
        app: "./src/demo/index.tsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        port: 8080,
        compress: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/demo/index.html",
            inject: "body",
            hash: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
