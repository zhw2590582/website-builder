const path = require("path");

module.exports = {
    hash: false,
    htmlBeautify: false,
    cdn: "https://github.com/",
    i18n: {
        pattern: /_\((.*?)\)/ig,
        path: path.resolve('./src/languages')
    },
    htmlReplace: null
};

