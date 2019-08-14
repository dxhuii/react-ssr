/**
 * 生产环境配置
 * API 接口地址
 * debug 是否开发
 * NAME 网站名称
 * DESCRIBE 网站首页标题
 * KEYWORDS 关键词
 * DESCRIPTION 描述
 * DOMAIN 网站带 HTTPS 完整域名
 * PORT 端口
 * AUTH_COOKIE_NAME 登录 cookie 名称
 * COOKIE_PREFIX cookie 前缀
 * CLASS_SCOPED_NAME css-modules 规则 https://github.com/css-modules/css-modules
 * PUBLIC_PATH 前端打包后，静态资源路径前缀 生成效果如：//cdn.domain.com/app.bundle.js
 */

const config = {
  debug: false,
  CLASS_SCOPED_NAME: '[hash:base64:8]',
  AUTH_COOKIE_NAME: 'auth',
  CACHA_TIME: 60000,
  HEAD: `<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  `,
  API: 'https://api.douban.com/',
  NAME: '网站标题',
  DESCRIBE: '网站简短介绍',
  KEYWORDS: '关键词',
  DESCRIPTION: '网站描述',
  DOMAIN: 'https://www.domain.com',
  PORT: 6666, // 部署到线上的端口号
  COOKIE_PREFIX: 'cookie_', // 登录的cookie 前缀
  PUBLIC_PATH: '//cdn.domain.com', // cdn域名
  BAIDU_STAT: '123456', // 百度统计
  CNZZ_STAT: '123456', // CNZZ 统计
  GA: 'UA-********-1', // 谷歌统计
  EMAIL: 'admin@domain.com', // 邮箱
  ICP: '沪ICP备1234567号' // 备案号
}

config.HEAD += `<link rel="icon" href="/favicon.ico" />`

// 开发环境配置
if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.PORT = 4000
  config.CLASS_SCOPED_NAME = '[name]_[local]__[hash:base64:5]'
  config.DOMAIN = '//localhost:4000'
  config.PUBLIC_PATH = 'http://localhost:4000'
}

module.exports = config
