const path = require('path')

module.exports = {
  entry: {
    babel: 'babel-polyfill',
    desktop: './client/src/layouts/desktop/index.jsx',
    mobile: './client/src/layouts/mobile/index.jsx',
  },
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
}
