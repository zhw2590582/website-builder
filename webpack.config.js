const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Reload4Plugin = require('@prakriya/reload4-html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const pkg = require('./package.json');
const cdn = pkg.cdn.trim();
const isProd = process.env.NODE_ENV === 'production';
const hash = pkg.hash && isProd;

const entry = {
	common: './src/js/common'
};

const HtmlPlugin = [];
glob.sync('./src/*.html').forEach(htmlPath => {
	const filename = path.basename(htmlPath).toLowerCase();
	const chunk = filename.replace('.html', '');
	entry[chunk] = `./src/js/${chunk}.js`;
	HtmlPlugin.push(
		new HtmlWebpackPlugin({
			filename: filename,
			template: path.resolve(htmlPath),
			inject: 'body',
			favicon: './src/img/favicon.ico',
			chunks: ['vendor', 'common', chunk]
		})
	);
});

const config = {
	mode: isProd ? 'production' : 'development',
	entry: entry,
	output: {
		path: path.join(__dirname, './dist'),
		filename: hash ? 'js/[name]-[hash].js' : 'js/[name].js',
		publicPath: isProd && cdn ? cdn : '/'
	},
	resolve: {
		extensions: ['.js', '.scss']
	},
	devtool: isProd ? 'source-map' : 'eval-source-map',
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
				use: [
					{
						loader: 'file-loader',
						options: {
							name: hash ? 'img/[name]-[hash].[ext]' : 'img/[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true
						}
					}
				]
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
			filename: hash ? 'css/[name]-[hash].css' : 'css/[name].css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		...HtmlPlugin
	]
};

if (isProd) {
	const backupTime = String(new Date().getTime());
	config.plugins.push(
		new SimpleProgressWebpackPlugin({
			format: 'minimal'
		}),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			}
		}),
		new FileManagerPlugin({
			onStart: {
				delete: ['dist']
			},
			onEnd: {
				copy: [
					{
						source: './dist',
						destination: './backup/' + backupTime
					}
				]
			}
		}),
		new HtmlBeautifyPlugin()
	);
} else {
	config.plugins.push(new Reload4Plugin());
}

module.exports = config;
