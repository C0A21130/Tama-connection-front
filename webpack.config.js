const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: `${__dirname}/dist`,
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: "react-svg-loader"
            },
            {
                test: /\.(png|jpg|webm)$/,
                type: "asset/resource"
            }
        ]
    },
    devServer: {
        static: {
            directory: `${__dirname}/dist`,
        },
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],
    target: ["web", "es5"],
};