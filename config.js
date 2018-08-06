const path = require("path");

module.exports = {
    hash: false,
    htmlBeautify: false,
    cdn: "https://github.com/",
    i18n: {
        path: path.resolve('./src/languages')
    },
    htmlReplace: [{
        pattern: 'name',
        replacement: 'languages.zh.name'
    }]
};

