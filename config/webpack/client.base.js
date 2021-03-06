const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const chalk = require('chalk')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config = require('../index')
const devMode = process.env.NODE_ENV === 'development'

/**
 * 配置 autoprefixer 各浏览器前缀
 * postcss-flexbugs-fixes 检查flex错误
 *  */
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('postcss-flexbugs-fixes'), require('autoprefixer')]
  }
}

module.exports = {
  name: 'client',
  target: 'web',

  entry: {
    app: [
      '@babel/polyfill',
      // ArriveFooter 监听抵达页尾的事件
      './src/app/utils/arrive-footer.js',
      /**
       * 懒加载图片、Dom
       * 使用方式
       * 给dom添加class="load-demand"、data-load-demand="<div></div> or <img />"
       **/
      './src/app/utils/load-demand.js',
      './src/client/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: devMode ? '[name].bundle.js' : '[name].[hash].js',
    publicPath: config.PUBLIC_PATH + '/'
  },

  resolve: {
    alias: {
      '@': path.resolve('src/app'),
      Config: path.resolve('config/index')
    }
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  optimization: {
    // namedModules: true,
    // noEmitOnErrors: true,
    minimize: devMode ? false : true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /(\.css|\.scss)$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      // js 文件解析
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: `css`,
            options: {
              modules: {
                localIdentName: config.CLASS_SCOPED_NAME
              },
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: `sass`
          },
          { ...postcssConfig }
        ]
      },

      // css 解析
      {
        test: /\.css$/,
        use: ['css-hot', { loader: MiniCssExtractPlugin.loader }, { loader: `css` }, { ...postcssConfig }]
      },

      // 小于8K的图片，转 base64
      {
        test: /\.(png|jpe?g|gif|bmp|svg)$/,
        use: [
          {
            loader: 'url',
            options: {
              // 配置图片编译路径
              limit: 8192, // 小于8k将图片转换成base64
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack', // 图片压缩
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),

    new webpack.DefinePlugin({
      __SERVER__: 'false',
      __CLIENT__: 'true'
    }),

    // 提取css插件
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css'
    }),

    // 创建视图模版文件，给server使用
    // 主要是打包后的添加的css、js静态文件路径添加到模版中
    new HtmlwebpackPlugin({
      filename: path.resolve(__dirname, '../../dist/server/index.ejs'),
      template: `src/app/views/index.html`,
      metaDom: '<%- meta %>',
      htmlDom: '<%- html %>',
      reduxState: '<%- reduxState %>',
      CNZZ_STAT: '<%- CNZZ_STAT %>',
      BAIDU_STAT: '<%- BAIDU_STAT %>',
      head: config.HEAD
      // inject: false
    }),

    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ]
}
