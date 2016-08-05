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
            }
        ]
    },
    resolve: {
        alias: {
            'actions': path.resolve(__dirname,'./redux/actions'),
            'controllers': path.resolve(__dirname,'./controllers'),
            'components': path.resolve(__dirname,'./components'),
            'reducers': path.resolve(__dirname,'./redux/reducers'),
            'stores': path.resolve(__dirname,'./redux/stores'),
            'utils': path.resolve(__dirname,'./utils')
        },
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: './views/style.css',
                to: '../dist/style.css'
            }
        ])
    ]
};