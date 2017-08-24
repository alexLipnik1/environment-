var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
	  loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader?modules&localIdentName=[path][name]__[local]--[hash:base64:5]!sass-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    hot: true,
    inline: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:8000',
      }
    },
  }
}
