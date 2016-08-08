'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (config) => {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: {
            dir: './dist/coverage/',
            type: 'html'
        },
        files: ['./public/_tests_/config.js'],
        frameworks: ['jasmine', 'es6-shim'],
        preprocessors: {
            './public/_tests_/config.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        singleRun: true,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        exclude: [
                            /node_modules/,
                            /\.spec\.js$/
                        ],
                        loader: 'isparta-instrumenter'
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    }
                ],
                resolve: {
                    extensions: ['', '.js', '.html'],
                    root: __dirname
                },
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/]
                }
            },
            sassLoader: {
                includePaths: [
                    './node_modules/bootstrap/scss'
                ]
            }
        }
    });
};