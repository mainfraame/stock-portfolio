'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve('./public/angular/index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/angular/index.html')
        })
    ],
    resolve: {
        alias: {
            controllers: path.resolve('./public/angular/controllers'),
            components: path.resolve('./public/angular/components'),
            services: path.resolve('./public/angular/services'),
            views: path.resolve('./public/angular/views')
        },
        extensions: ['', '.js', '.html']
    },
    htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
    },
    test: function (config) {
        return {
            entry: './public/angular/webpack.tests.js',
            output: Object.assign({}, config.output, {
                // client assets are output to dist/test/
                path: path.join(config.output.path, 'test'),
                publicPath: undefined // no assets CDN
            }),
            devtool: 'inline-source-map', // sourcemap support
            plugins: config.plugins.concat(
                new webpack.DefinePlugin({
                    'typeof window': JSON.stringify('object')
                })
            )
        };
    }
};