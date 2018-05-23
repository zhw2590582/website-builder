const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const slugify = require('@sindresorhus/slugify');
let page = process.argv[2];

if (!page) {
	console.log(chalk.red('请输入需要被删除的页面名称: npm run remove pageName'));
	process.exit();
} else {
	page = slugify(page);
}

const removeFile = {
	html: path.resolve('./src/', page + '.html'),
	scss: path.resolve('./src/sass', page + '.scss'),
	js: path.resolve('./src/js', page + '.js')
};

Object.keys(removeFile).forEach(file => {
	const filePath = removeFile[file];
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
		console.log(chalk.green(`成功删除：${filePath}`));
	}
});
