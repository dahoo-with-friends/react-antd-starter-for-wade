const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserJSPlugin = require('terser-webpack-plugin')
const path = require('path')

const cssLoaders = [
  'style-loader', 
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('autoprefixer')
      ])
    },
  }
]

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      // .css
      {
        test: /\.css$/,
        include,
        exclude,
        use: cssLoaders,
      },
      // .less
      {
        test: /\.less$/,
        include,
        exclude,
        use: cssLoaders.concat([{
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: require('./theme'),
              paths: [path.resolve(__dirname, '../node_modules')]
            }
          }
        }])
      }
    ],
  },
})

const extractCssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('autoprefixer')
      ])
    },
  }
]

exports.extractCSS = ({ include, exclude } = {}) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:7].css',
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: extractCssLoaders,
        },
        {
          test: /\.less$/,
          include,
          exclude,
          use: extractCssLoaders.concat([{
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: require('./theme'),
                paths: [path.resolve(__dirname, '../node_modules')]
              }
            }
          }]),
        }
      ],
    },
    plugins: [plugin],
  }
}

exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        use: ['babel-loader']
      }
    ]
  }
})

exports.loadTypescript = ({ include, exclude } = { exclude: /node_modules/ }) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include,
        exclude,
        use: ['ts-loader']
      }
    ]
  }
})

exports.loadAsset = () => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  }
})

exports.enableEslint = () => ({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
          fix: true,
          formatter: require('eslint-friendly-formatter'),
          emitError: true,
          emitWarning: true
        },
      },
    ],
  }
})

exports.generateSourceMaps = ({ type } = { type: 'source-map' }) => ({
  devtool: type,
})

// vendor.js
exports.splitBundle = () => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        }
      }
    }
  }
})

exports.attachRev = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ]
})

exports.minifyJavascript = () => ({
  optimization: {
    minimizer: [new TerserJSPlugin({ sourceMap: true })],
  },
})

// 环境变量
exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [new webpack.DefinePlugin(env)],
  }
}
