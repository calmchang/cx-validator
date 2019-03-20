const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',//打包模式，开发模式下不压缩
  devtool: 'inline-source-map',//sourcemap模式
  devServer: {
    contentBase: './dist'
  },
  entry: './test/test.js',
  output: {
    libraryTarget:'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.js'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './test/test.html'})
  ]
};