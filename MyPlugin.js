const importFresh = require('import-fresh');

function MyPlugin(options) {
	this.options = options;
}

MyPlugin.prototype.apply = function(compiler) {
	compiler.hooks.compilation.tap("MyPlugin", compilation => {
		compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
			"MyPlugin",
			(data, cb) => {
				const languages = importFresh(this.options.path)(importFresh);
				console.log(languages);
				cb(null, data);
			}
		);
	});
};

module.exports = MyPlugin;
