const { resolve } = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const parts = require('./webpack.parts')
const { app } = require('../package.json')

module.exports = () => merge([
  { 
    entry: resolve(__dirname, '../src/index.tsx'),
    
    output: {
      chunkFilename: '[name].[chunkhash:7].js',
      filename: '[name].[chunkhash:7].js',
      publicPath: '/'
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(__dirname, '../src/index.html'),
        inject: true,
        env: process.env.NODE_ENV || 'development'
      }),
      new ManifestPlugin()
    ],

    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx'
      ]
    }
  },

  parts.loadTypescript(),

  parts.loadAsset(),

  // parts.loadJavascript(),

  parts.enableEslint(),

  // 全局变量
  parts.setFreeVariable('ENV', process.env.NODE_ENV || 'development'),
  parts.setFreeVariable('APP_NAME', app.name),
  parts.setFreeVariable('APP_TEAM', app.team),
  parts.setFreeVariable('JWT_HEADER', app.jwt_header),
  parts.setFreeVariable('BACKEND', '')
])
