const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader" ],
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)$/,
                use: [ "file-loader" ],
            },
        ],
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    output: {
        filename: "eko_media.bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },
    devServer: {
        open: "http://localhost:8080/public",
        port: 8080,
        publicPath: "/dist/"
    }
};
