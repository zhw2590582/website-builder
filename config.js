const path = require("path");

module.exports = {
  port: 3000,
  hash: true,
  cdn: "https://path-to-cdn.com/",
  i18n: {
    zh: path.resolve('./src/languages/zh.json'),
    en: path.resolve('./src/languages/en.json')
  },
  htmlReplace: [{
    pattern: '@@email',
    replacement: 'laozhaochaguan@gmail.com'
  }, {
    pattern: '@@website',
    replacement: 'https://github.com/zhw2590582'
  }]
};
