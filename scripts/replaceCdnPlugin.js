const pkg = require('../package.json');
const chalk = require('chalk');
const oldPahh = pkg.cdn.old;
const newPath = pkg.cdn.new;

function ReplaceCdnPlugin(options) {}

ReplaceCdnPlugin.prototype.apply = function (compiler) {
	compiler.hooks.compilation.tap('ReplaceCdnPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
            'ReplaceCdnPlugin',
            (data, cb) => {
                cb(null, data)
            }
        );
		compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
			'ReplaceCdnPlugin',
			(data, cb) => {
                if (!data.html.includes(oldPahh)) cb(null, data);
                const cdnReg = new RegExp(oldPahh.replace('.', '[\.]'), 'gm');
                data.html = data.html.replace(cdnReg, newPath);
				cb(null, data)
			}
		);
	})
}

module.exports = ReplaceCdnPlugin
