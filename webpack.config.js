module.exports = {
    mode: "development",
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
            }
        ]
    },
    devServer: {
        static: {
            directory: `${__dirname}/dist`,
        },
        port: 3000,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    target: ["web", "es5"],
};