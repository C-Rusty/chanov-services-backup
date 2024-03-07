const path = require('path');

const HTMLWebpackPlugin = require(`html-webpack-plugin`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: `development`,
    devtool: 'source-map',
    entry: `./src/index.tsx`,
    output: {
        filename: `[name].[chunkhash:8].js`,
        path: path.resolve(__dirname, `public/`),
        uniqueName: 'main',
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', `.tsx`, `.ts`]
    },
    bail: true,
    devServer : {
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: { index: "/", disableDotRule: true },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: `/node_modules/`,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [`@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`]
                    }
                }
            },
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
            {
                test: /\.(png|jpe?g|svg|webp)(\?.*)?$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: `./src/view/index.html`,
            filename: `index.html`,
            favicon: './src/view/favicon.svg',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: `./src/images`, to: `images`}
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
    ],
}