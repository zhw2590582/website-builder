const importFresh = require("import-fresh");
const get = require("get-value");

module.exports = class SimpleI18nWebpackPlugin {
	constructor(options) {
		this.options = Object.assign({}, SimpleI18nWebpackPlugin.DEFAULTS, options);
		if (
			!this.options.pattern ||
			Object.prototype.toString.call(this.options.pattern) !== "[object RegExp]"
		) {
			throw new Error(
				"Invalid `pattern` option provided, it must be a valid regex."
			);
		} else if (!this.options.path || typeof this.options.path !== "string") {
			throw new Error(
				"Invalid `path` option provided, it must be a path string."
			);
		}
	}

	static get DEFAULTS() {
		return {
			pattern: /_\((.*?)\)/gi,
			path: "",
			unmatch: "Not Found"
		};
	}

	getLanguages() {
		return importFresh(this.options.path)(importFresh);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap("SimpleI18nWebpackPlugin", compilation => {
			compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
				"SimpleI18nWebpackPlugin",
				(htmlPluginData, callback) => {
					const languages = this.getLanguages();
					const defaultLanguage = languages[Object.keys(languages)[0]];
					htmlPluginData.html = htmlPluginData.html.replace(
						this.options.pattern,
						($1, $2, $3) => {
							const key = $2.trim();
							const val = get(defaultLanguage, key);
							if (!key || !val) {
								return this.options.unmatch + '[' + key + ']';
							} else {
								return val
							}
						}
					);
					callback(null, htmlPluginData);
				}
			);
		});
	}
};
