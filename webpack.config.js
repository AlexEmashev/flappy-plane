const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => {

  return {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      hot: true,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'), // To shrink babelify modules to only src,
          loader: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false // Not to remove assets on incremental build.
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single', // To extract runtime into a single chunk. We can also split third-party libraries as lodash or react into separate chunks.
      // This way users won't have to load this chunks again.
      moduleIds: 'deterministic', // This assures that ids of not touched modules won't be updated
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      unusedExports: true
    }
  }
};