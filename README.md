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

配置

```js
// 在 package.json 中配置，只有在打包时生效
// hash: 是否开启文件 hash 值命名
// cdn: CDN 地址
```

## License

MIT © [Harvey Zack](https://www.zhw-island.com/)