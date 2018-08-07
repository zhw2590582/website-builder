const path = require("path");

module.exports = {
    port: 3000,
    hash: false,
    cdn: "https://github.com/",
    i18n: {
        zh: path.resolve('./src/languages/zh.json'),
        en: path.resolve('./src/languages/en.json')
    },
    htmlReplace: null
};

