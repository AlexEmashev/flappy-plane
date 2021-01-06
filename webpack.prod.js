const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: false // Enable warnings about conflicting order
    })
  ],
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'sass-loader'
      ]
    }]

  }
});