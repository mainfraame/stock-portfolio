'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve('./public/react/index.jsx'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/react/index.html')
        })
    ],
    resolve: {
        alias: {
            actions: path.resolve('./public/react/redux/actions'),
            components: path.resolve('./public/react/components'),
            reducers: path.resolve('./public/react/redux/reducers'),
            store: path.resolve('./public/react/redux/store'),
            utils: path.resolve('./public/react/utils'),
            views: path.resolve('./public/react/views')
        },
        extensions: ['', '.js', '.jsx']
    }
};