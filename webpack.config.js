const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const autoprefixer = require("autoprefixer");
const Reload4Plugin = require("@prakriya/reload4-html-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const SimpleI18nWebpackPlugin = require("simple-i18n-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const { hash, htmlBeautify, cdn, htmlReplace, i18n } = require("./config");

const htmlList = glob.sync("./src/*.html").map(htmlPath => {
	const filename = path.basename(htmlPath).toLowerCase();
	const chunkname = filename.replace(".html", "");
	return {
		filename: filename,
		chunkname: chunkname,
		chunk: `./src/js/${chunkname}.js`,
		template: path.resolve(htmlPath)
	};
});

const entry = {
	common: "./src/js/common"
};

const webpackConfigs = Object.keys(i18n).map(function(language) {
	const config = {
		name: language,
		mode: isProd ? "production" : "development",
		entry: entry,
		output: {
			path: path.join(__dirname, "./dist"),
			filename: isProd && hash ? "js/[name]-[hash].js" : "js/[name].js",
			publicPath: isProd && cdn ? cdn : "/"
		},
		resolve: {
			extensions: [".js", ".scss"]
		},
		devtool: isProd ? "source-map" : "eval-source-map",
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["env"]
						}
					}
				},
				{
					test: /\.(scss|css)$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								minimize: true
							}
						},
						{
							loader: "postcss-loader",
							options: {
								autoprefixer: {
									browsers: ["last 2 versions"]
								},
								plugins: () => [autoprefixer]
							}
						},
						{
							loader: "sass-loader",
							options: {}
						}
					]
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name:
									isProd && hash ? "img/[name]-[hash].[ext]" : "img/[name].[ext]"
							}
						},
						{
							loader: "image-webpack-loader",
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
				chunks: "all",
				name: "vendor"
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: isProd && hash ? "css/[name]-[hash].css" : "css/[name].css"
			}),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
			})
		]
	}

	if (i18n) {
		htmlList.forEach(item => {
			config.plugins.push(
				new HtmlWebpackPlugin({
					filename: language === 'zh' ? item.filename : language + '/' + item.filename,
					template: item.template,
					inject: "body",
					favicon: "./src/img/favicon.ico",
					chunks: ["vendor", "common", item.chunk]
				})
			);
		});
		config.plugins.push(
			new SimpleI18nWebpackPlugin({
				language: i18n[language]
			})
		);
	} else {
		htmlList.forEach(item => {
			config.plugins.push(
				new HtmlWebpackPlugin({
					filename: item.filename,
					template: item.template,
					inject: "body",
					favicon: "./src/img/favicon.ico",
					chunks: ["vendor", "common", item.chunk]
				})
			)
		});
	}

	if (htmlReplace) {
		config.plugins.push(new HtmlReplaceWebpackPlugin(htmlReplace));
	}

	if (isProd) {
		const backupTime = String(new Date().getTime());
		config.plugins.push(
			new SimpleProgressWebpackPlugin({
				format: "minimal"
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
					delete: ["dist"]
				},
				onEnd: {
					copy: [
						{
							source: "./dist",
							destination: "./backup/" + backupTime
						}
					]
				}
			})
		);

		if (htmlBeautify) {
			config.plugins.push(new HtmlBeautifyPlugin());
		}
	} else {
		config.plugins.push(new Reload4Plugin());
	}

	return config;
});

module.exports = webpackConfigs;