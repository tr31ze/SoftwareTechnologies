'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve('./src', 'app.js'),
    vendor: [
    ]
  },
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: '[name].js',
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/audio/**', to: '.' },
	  { from: 'src/index.html', force: true },
	  { from: 'flash/export/images/carrabba_atlas_.png', to: 'release/images/carrabba_atlas_.png' , force: true },

    ]),new ExtractTextPlugin('bundle.css')
    //new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: ["/node_modules/", path.resolve(__dirname, 'src/carrabba.js')]
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},

        {
            test: /\.less$/,
            loader: 'style-loader!css-loader?sourceMap!postcss-loader!less-loader?sourceMap&sourceMapContents'
        },
      {test: /\.json?$/, loader: 'url-loader?limit=1&name=./json/[name].[ext]'},
      {test: /\.svg$|\.woff$|\.ttf$|\.otf$|\.eot$|\.woff2$/, loader: 'url-loader?limit=1&name=./assets/fonts/[name].[ext]'},
      {	test: /\.jpe?g$|\.gif$|\.png$/,
		loader: 'url-loader?limit=1&name=./images/[name].[ext]'},
      {test: /\.wav$|\.mp3$|\.ogg$/, loader: 'url-loader?limit=1&name=./audio/[name].[ext]'}
    ]
  },
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: 3000,
    outputPath: path.join(__dirname, 'src')
  },
  devtool: 'eval'
};
