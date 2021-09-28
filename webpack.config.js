const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fafu-lib-webpack.bundle.js',
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
      {test: /\.js$/, use: 'source-map-loader', enforce: 'pre'},
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: ['node'],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, '.'),
    },
    compress: true,
    open: true,
    port: 9000,
  },
};
