const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
];

module.exports = {
    mode,
    plugins,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 8080,
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "http://192.168.86.83:8080/",
        clean: true,
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ['html-loader'] },
            { test: /\.svg$/, use: ['svg-inline-loader'] },
            { test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {loader: 'css-loader',
                        options: {
                            url:true
                        },
                    }
                ],
            },
            {   test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
          },
        ],
    }
}