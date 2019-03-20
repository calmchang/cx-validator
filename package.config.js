const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',//打包模式，开发模式下不压缩
  // devtool: 'inline-source-map',//sourcemap模式
  entry: './src/validator.js',
  output: {
    // libraryTarget:'umd',
    // umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'validator.js'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  }
};