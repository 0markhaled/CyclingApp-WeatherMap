const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './src/index.js',
	output: {
		// copy the path dir from backend paste after '../' to output to the static server folder
		path: path.resolve(__dirname, '../backend-ExpressJs/public'),
		filename: 'bundle.js',
		// hash, ext, query, fragment, base, name, path
		assetModuleFilename: 'img/[name][ext]'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|ttf|webp|jpeg|gif|jfif)$/,
				type: 'asset/resource'
			},
			{
				test: /\.hbs$/,
				use: [{
					loader: 'handlebars-loader',
					options: {
						helperDirs: path.resolve(__dirname, 'helpers')
					}
				}]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
};

module.exports = config;