'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.jsx',
    output: {
        path: '../dist',
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
            actions: path.resolve('./redux/actions'),
            components: path.resolve('./components'),
            reducers: path.resolve('./redux/reducers'),
            store: path.resolve('./redux/store'),
            utils: path.resolve('./utils'),
            views: path.resolve('./views')
        },
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    sassLoader: {
        includePaths: [path.resolve('./node_modules/bootstrap/scss')]
    }
};