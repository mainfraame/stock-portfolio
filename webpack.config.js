'use strict';

const path = require('path');
const webpack = require('webpack');
const angular = require('./webpack.angular.config');
const react = require('./webpack.react.config');

var base = {
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
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {test: /\.woff2$/, loader: 'url-loader?limit=10000&minetype=application/font-woff2'},
            {test: /\.woff$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader'},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.svg$/, loader: 'file-loader'}
        ]
    },
    resolve: {
        root: path.resolve(__dirname)
    },
    sassLoader: {
        includePaths: [path.resolve('./node_modules/bootstrap/scss')]
    }
};

//module.exports = Object.assign(base, process.argv[3] === 'react' ? react : angular);
module.exports = base;