# 多页面静态网站生成器
> webpack、babel、sass、支持多页面、html/js/css分离、html美化、cdn地址替换、图片优化、自动刷新、全局jQuery变量、打包历史备份

## 使用

安装

```sh
$ git clone https://github.com/zhw2590582/web-generator.git
$ cd web-generator
$ npm install
```

开发

```sh
$ npm run dev
```

添加页面

```sh
$ npm run add pageName
```

删除页面

```sh
$ npm run remove pageName
```

打包

```sh
$ npm run build
```

发布

```sh
$ npm run publish
```

## 配置

```js
// 在 package.json 中配置，只有在打包时生效

{
    hash: false, // 是否开启文件 hash 值命名
    cdn: 'https://github.com/' //CDN 地址
}

```

## 注意
* `sass/common.scss` 和 `js/common.js` 为公用文件，每个页面都会加载到。
* 每个页面对应一个三个文件，例如：`index.html`、`sass/index.scss`、`js/index.js`。
* 项目需区分桌面端和移动端，在`src/js/common.js` 中，需手动区分加载平台所需文件。
* 在 `sass/utils/mobile.scss`、`sass/utils/pc.scss`,对应移动端和桌面端样式文件。
* 在 `sass/utils/variable.scss`，保存了全局的公用样式变量。
* 移动端单位，设计稿像素值除以`100`即可，例如设计稿的`100px`，对应为`1rem`。
* 在移动端的url地址里，debug参数不为空时，会调出调试工具。
* 在根页面里插入`img`图片时，请使用`<img src="<%= require('./img/logo.png') %>">`，但在`templete`页面里则不需要。


## License

MIT © [Harvey Zack](https://www.zhw-island.com/)