const opn = require('opn');
const chalk = require('chalk');
const pkg = require('../package.json');
const url = pkg.cdn + 'index.html';

opn(url).then(() => {
	console.log(chalk.green(`打开成功：${url}`));
});;