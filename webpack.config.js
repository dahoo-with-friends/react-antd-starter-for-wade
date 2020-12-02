const merge = require('webpack-merge')
const commonConfig = require('./config/webpack.common')
const productionConfig = require('./config/webpack.production')
const developmentConfig = require('./config/webpack.development')

module.exports = mode => mode === 'production'
  ? merge(commonConfig(), productionConfig(), { mode })
  : merge(commonConfig(), developmentConfig(), { mode })
