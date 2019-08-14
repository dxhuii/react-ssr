## 说明

- api 使用豆瓣电影，需要解决跨域，chrome 可以安装这个插件 https://github.com/yize/xswitch 来解决跨域
- 项目依赖几乎都是目前最新版本
- 支持 react-hooks
- 尽量使用 yarn 安装依赖包

## 跨域简单配置

```js
{
  // Use IntelliSense to learn about possible links.
  // Type `rule` to quick insert rule.
  // 输入 rule 来快速插入规则
  // For more information, visit: https://github.com/yize/xswitch
  "proxy": [
    [
      ".production.min.js",
      // ".production(.min)?.js",
      ".development.js"
      // "react.development.js",
    ],
    // `Command/Ctrl + click` to visit:
    // https://unpkg.com/react@16.4.1/umd/react.production.min.js
    [
      "(.*)/path1/path2/(.*)", // https://www.sample.com/path1/path2/index.js
      "http://127.0.0.1:3000/$2", // http://127.0.0.1:3000/index.js
    ],
  ],
  // 这里写跨域的域名
  "cors": [
    "ebb.io",
    "api.douban.com"
  ]
}
```

## 开始

**_没有在 windows 机器上测试过，可能会报错_**

```
$ git clone http://gitlab.boqii.com/html5/react-ssr.git
$ cd react-ssr
$ yarn
$ yarn start
```

浏览器打开 [http://localhost:4000](http://localhost:4000)

## 相关命令说明

### 开发环境

```
yarn start
```

### 生产环境测试

```
yarn pro
```

## 部署到服务器

1、打包项目

```
yarn dist
```

2、将项目上传至你的服务器  
3、启动服务

Node 启动服务

```
node ./dist/server/server.js
```

或使用 pm2 启动服务

```
pm2 start ./dist/server/server.js --name "react-ssr" --max-memory-restart 400M
```

## 特点

- 🖥 支持首屏服务端渲染，支持 SEO
- ✂️ 按页面将代码分片，然后按需加载
- 🌈 支持 CSS Modules，避免 CSS 全局污染
- 🔄 开发环境支持热更新
- 🎛 内置登录、退出等功能
- 💡 服务器渲染可控制，如登录用户  关闭服务端渲染
- 💡 增加全局缓存

## 增加全局缓存

`src/server/render.js`

- 开始的地方判断有没有缓存

```js
import cache from 'memory-cache'
const isLogin = req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`]
// 如果是游客，则优先使用缓存中的数据
if (!isLogin) {
  let _cache = cache.get(req.url)
  if (_cache) {
    try {
      resolve(JSON.parse(_cache))
      return
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}
```

如果开始的地方没有缓存，请求数据，在结束的时候存入缓存

```js
// 对游客的请求进行缓存
if (!isLogin) {
  cache.put(req.url, JSON.stringify(params), CACHA_TIME)
}
```

> CACHA_TIME 缓存时间，单位(毫秒)

## 支持 Service Worker

- 使用 `offline-plugin` 插件

>  注：项目里面包含了对 vscode 的配置
