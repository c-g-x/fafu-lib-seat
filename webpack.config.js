const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
    port: 8888,
    hot: true,
  },
};
