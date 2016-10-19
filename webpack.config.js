var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./examples/examples.js",

  output: {
    path: __dirname + "/docs/js",
    filename: "bundle.js"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};