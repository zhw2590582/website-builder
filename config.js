const path = require("path");

module.exports = {
    hash: false,
    htmlBeautify: false,
    cdn: "https://github.com/",
    i18n: {
        zh: path.resolve('./src/languages/zh.json'),
        en: path.resolve('./src/languages/en.json')
    },
    htmlReplace: null
};

