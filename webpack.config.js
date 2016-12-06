'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '8888'

// global css
loaders.push({
  test: /\.css$/,
  exclude: /[\/\\]main[\/\\]/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
})

// local css modules
loaders.push({
  test: /\.css$/,
  exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
  loaders: [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
  ]
})

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './main/index.jsx'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: './public',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './main/index.html'
    })
  ]
}
