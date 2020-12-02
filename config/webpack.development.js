const merge = require('webpack-merge')
const parts = require('./webpack.parts')

module.exports = () => merge([
  {
    devServer: {
      stats: 'errors-only',
      open: true,
      overlay: true,
      historyApiFallback: true
    },
  },
  parts.loadCSS()
])
