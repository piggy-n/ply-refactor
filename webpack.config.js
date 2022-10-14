const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    devtool: "cheap-module-eval-source-map",
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
        extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: ["babel-loader", "eslint-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: require.resolve("svg-sprite-loader"),
                include: path.resolve(__dirname, "./src/assets/icons"),
                options: {
                    symbolId: "icon-[name]",
                },
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/",
                        limit: 8192,
                    },
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "iconfont/",
                    },
                },
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, "./tsconfig.json"),
            },
        }),
    ],
};
