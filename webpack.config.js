var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var webpack = require('webpack'); 
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {index:'./src/index.jsx'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{
    publicPath:'/',
    contentBase:'./public',
  	inline:true,
  	port:8080,
    proxy:{
    '**':{
      target:'http://localhost:3000',
      changeOrigin:true,
      secure:false
      }
    }
  },

  module: {
  loaders: [
    { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", 
		
    query:{presets:['react','es2015']}
	}
  ]
}
};