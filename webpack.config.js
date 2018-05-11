const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CheckerPlugin } = require('awesome-typescript-loader');
const isProd = process.env.NODE_ENV === 'production';
const name = '{{name}}';

module.exports = {
	devtool: isProd ? '#source-map' : '#eval-source-map',
	entry: {
		main: './src/index.ts'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: name + '/' + name + '.js',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.ts', '.js', '.scss', 'less']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'awesome-typescript-loader'
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: {
								safe: true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions']
							},
							plugins: () => [autoprefixer]
						}
					},
					{
						loader: 'sass-loader',
						options: {}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions']
							},
							plugins: () => [autoprefixer]
						}
					},
					{
						loader: 'less-loader',
						options: { strictMath: true, noIeCompat: true }
					}
				]
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
		new MiniCssExtractPlugin({
			filename: name + '/' + name + '.css'
		}),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			}
		})
	]
};
