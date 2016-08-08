'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


module.exports = {
    env : process.env.NODE_ENV,
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './index-dev.js'
        ],
        vendor: [
            //'@newton-software/nrc/*',
            'ndom',
            'eventemitter3',
            'isomorphic-fetch',
            'rc-trigger',
            'react',
            'react-addons-pure-render-mixin',
            'react-dom',
            'react-redux',
            'react-redux-oop',
            'redux',
            'redux-logger',
            'redux-thunk',
            'seamless-immutable',
        ]
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: 'http://localhost:3000/'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: /node_modules[\/\\]@newton-software/
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader!less-loader?sourceMap&sourceMapContents'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader'
            },
            {test: /\.json?$/, loader: 'json'},
            {test: /\.svg$|\.woff$|\.ttf$|\.otf$|\.eot$|\.woff2$/, loader: 'url-loader?limit=1&name=[hash].[ext]'},
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'url-loader?limit=1&name=[hash].[ext]'},
            {test: /\.wav$|\.mp3|\.ogg$/, loader: 'url-loader?limit=1&name=[hash].[ext]'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        //new webpack.optimize.OccurenceOrderPlugin()
    ],
    postcss: function () {
        return [autoprefixer({
            browsers: ['last 2 versions']
        })];
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        publicPath: 'http://localhost:3000/',

        port: 3000,

        quiet: true,
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: {colors: true},
        historyApiFallback: true
    },
    devtool: 'eval'
};
