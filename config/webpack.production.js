const merge = require('webpack-merge')
const parts = require('./webpack.parts')

module.exports = () => merge([
  parts.extractCSS(),
  parts.generateSourceMaps(),
  parts.splitBundle(),
  parts.attachRev()
])
