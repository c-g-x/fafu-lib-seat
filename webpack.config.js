const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'fafu-lib-webpack.bundle.js',
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: ['node'],
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    compress: true,
    open: true,
    port: 9000,
  },
};
