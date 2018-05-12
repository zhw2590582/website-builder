const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ReplaceCdnPlugin = require('./scripts/replaceCdnPlugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';

const entry = {
	common: './src/js/common'
};

const HtmlPlugin = [];
glob.sync('./src/*.html').forEach(htmlPath => {
	const filename = path.basename(htmlPath).toLowerCase();
	const chunk = filename.replace('.html', '');
	entry[chunk] = `./src/js/${chunk}.js`;
	HtmlPlugin.push(new HtmlWebpackPlugin({
		filename: filename,
		template: htmlPath,
		inject: 'body',
		favicon: './src/img/favicon.ico',
		chunks: ['vendor', 'common', chunk]
	}))
});

const config = {
	mode: isProd ? 'production' : 'development',
	entry: entry,
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'js/[name].js',
		publicPath: './'
	},
	resolve: {
		extensions: ['.js', '.scss', 'less']
	},
	devtool: isProd ? 'source-map' : 'eval-source-map',
	module: {
		rules: [{
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
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true
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
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						publicPath: './img',
						name: '[name].[ext]'
					}
				}]
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'vendor'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		...HtmlPlugin
	]
};

if (isProd) {
	const backupTime = String(new Date().getTime());
	config.plugins.push(new FileManagerPlugin({
		onStart: {
			delete: ['dist']
		},
		onEnd: {
			copy: [{
				source: './dist',
				destination: './backup/' + backupTime
			}]
		}
	}));
	config.plugins.push(new ReplaceCdnPlugin());
}

module.exports = config;
