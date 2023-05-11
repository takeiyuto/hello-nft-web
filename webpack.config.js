const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./nft.ts",
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
    externals: {
        "@metamask/onboarding": "MetaMaskOnboarding",
        web3: "Web3",
    },
};
