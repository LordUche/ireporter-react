const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader', ImageminPlugin.loader],
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    usedExports: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'API_BASE_URL',
      'CLOUD_NAME',
      'UPLOAD_PRESET',
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new ImageminPlugin({
      cache: true,
      bail: false,
    }),
  ],
  devtool: 'inline-source-map',
};
