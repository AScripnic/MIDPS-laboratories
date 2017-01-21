let path = require('path');

module.exports = {
  entry: './bootstrap.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, './app'),
        loader: 'babel-loader',
        query: {
          presets: 'es2015',
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};