/**
 * Created by anton on 6/28/16.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve('./src', 'app.js'),
    vendor: [
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
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
      {test: /\.json?$/, loader: 'url-loader?limit=1&name=./json/[name].[ext]'},
      {test: /\.svg$|\.woff$|\.ttf$|\.otf$|\.eot$|\.woff2$/, loader: 'url-loader?limit=1&name=./fonts/[name].[ext]'},
      {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'url-loader?limit=1&name=./images/[name].[ext]'},
      //{test: /\.wav$|\.mp3$|\.ogg$/, loader: 'url-loader?limit=1&name=./audio/[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/audio/**', to: '.' }
    ])
    //new webpack.optimize.OccurenceOrderPlugin()
  ],
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: 3000,
    outputPath: path.join(__dirname, 'build')
  },
  devtool: 'eval'
};
