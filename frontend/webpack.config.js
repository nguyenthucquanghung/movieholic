/*
    ./webpack.config.js
*/
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        //exclude: /node_modules/,
        //,
        loaders: [
          {
           loader: "style-loader"
          },
          {
           loader: "css-loader"
          },
          {
           loader: "sass-loader",
           options: {
              includePaths: [path.resolve(__dirname, "node_modules")]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1500,
          name: 'imgs/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    })
  ]
}