const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    devtool: false,
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i
        })],
    },

    module: {
        rules: [
            {
                test: [/.css$/],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: [/.js$/],
                exclude:
                    /(node_modules)/,
                use:
                    {
                        loader: 'babel-loader',
                        options:
                            {
                                presets: [
                                    '@babel/preset-env'
                                ]
                            }
                    }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img',
                    limit: 10 * 1024
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new CopyPlugin([
            { from: 'src/img/', to: 'img', force: true},
            { from: 'src/resume/', to: 'resume', force: true}
        ]),
    ]
}
;
