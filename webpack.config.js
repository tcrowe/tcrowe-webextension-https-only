/*

# webpack config

https://webpack.js.org
https://webpack.js.org/configuration

*/

let path = require('path')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

let env = process.env.NODE_ENV
let dev = env === 'development'
let prd = env === 'production'

let tmpPath = path.join(__dirname, 'dist', 'tmp')

let backgroundPath = path.join(tmpPath, 'background.js')
let popupPath = path.join(tmpPath, 'popup.js')

let outputPath = path.join(__dirname, 'dist', 'webextension')

if (env !== 'development') {
  env = 'production'
  prd = true
}

let opts = {
  target: 'web',
  mode: env,
  entry: {
    background: backgroundPath,
    popup: popupPath
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  watch: false,
  cache: dev,
  performance: {
    hints: false
  },
  stats: {
    assets: false,
    colors: dev,
    errors: true,
    errorDetails: true,
    hash: false
  }
}

if (dev === true) {
  opts.devtool = 'source-map'
}

if (prd === true) {
  opts.optimization = {
    minimize: true,
    minimizer: [
      new UglifyjsWebpackPlugin({
        sourceMap: false,
        uglifyOptions: {
          ecma: 5,
          mangle: true,
          compress: true,
          warnings: false
        }
      })
    ]
  }
}

module.exports = opts
