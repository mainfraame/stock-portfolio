'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve('./public/index.jsx'),
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff2'},
            {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader'},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.svg$/, loader: 'file-loader'}
        ]
    },
    resolve: {
        alias: {
            actions: path.resolve('./public/redux/actions'),
            components: path.resolve('./public/components'),
            reducers: path.resolve('./public/redux/reducers'),
            store: path.resolve('./public/redux/store'),
            utils: path.resolve('./public/utils'),
            views: path.resolve('./public/views')
        },
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html')
        })
    ],
    sassLoader: {
        includePaths: [path.resolve('./node_modules/bootstrap/scss')]
    }
};