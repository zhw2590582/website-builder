# website-builder

> 根据业务需求制作的网站生成器，适用于单层目录多页面的静态网站

## 特色

- webpack、babel、sass
- 支持多页面和多国际语言
- 全局 jQuery 变量
- 打包历史备份
- html 模块化
- 图片优化
- 自动刷新
- SEO 友好

## 使用

安装

```sh
$ git clone https://github.com/zhw2590582/website-builder.git
$ cd website-builder
$ npm install
```

开发

```sh
$ npm run dev
```

打包

```sh
$ npm run build
```

添加页面

```sh
$ npm run add pageName
```

删除页面

```sh
$ npm run remove pageName
```

## 配置

#### config.js

```js
{
  // 开发端口
  port: 3000,
  // 打包是否添加hash
  hash: true,
  // 打包资源路径
  publicPath: "/website-builder/",
  // 多语言文件路径
  i18n: {
    zh: path.resolve('./src/languages/zh.json'),
    en: path.resolve('./src/languages/en.json'),
    jp: path.resolve('./src/languages/jp.json'),
  },
  // html文本替换
  htmlReplace: [{
    pattern: '@@email',
    replacement: 'laozhaochaguan@gmail.com'
  }, {
    pattern: '@@website',
    replacement: 'https://github.com/zhw2590582'
  }]
}
```

## License

MIT © [Harvey Zack](https://www.zhw-island.com/)
