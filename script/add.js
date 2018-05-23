const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const slugify = require('@sindresorhus/slugify');
let page = process.argv[2];

if (!page) {
	console.log(chalk.red('请输入需要被初始化的页面名称: npm run add pageName'));
	process.exit();
} else {
	page = slugify(page);
}

const creatFile = {
	html: {
		path: path.resolve('./src/', page + '.html'),
		data: `<%= require('html-loader!./templete/header.html') %>\n\n<div class="${page}-page">\n    ${page}-page\n</div>\n\n<%= require('html-loader!./templete/footer.html') %>`
	},
	scss: {
		path: path.resolve('./src/sass', page + '.scss'),
		data: `@charset "UTF-8";\n\n.index-page{\n\n}`
	},
	js: {
		path: path.resolve('./src/js', page + '.js'),
		data: `import '../sass/${page}';\nimport { showLoading, showMessage } from './common';\n\n$(() => {\n    console.log('${page}');\n});`
	}
};

Object.keys(creatFile).forEach(file => {
	const filePath = creatFile[file].path;
	const fileData = creatFile[file].data;
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, fileData);
		console.log(chalk.green(`成功创建：${filePath}`));
	}
});
