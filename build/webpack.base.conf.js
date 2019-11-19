var path = require('path')
var fs = require('fs')
var stat = fs.stat
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var MpvueEntry = require('mpvue-entry')
// var ImportantComponent = require('./autoImportantComponent')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var copy = function (src, dst) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path
      var _dst = dst + '/' + path
      var readable
      var writable
      stat(_src, function (err, st) {
        if (err) {
          throw err
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src) // 创建读取流
          writable = fs.createWriteStream(_dst) // 创建写入流
          readable.pipe(writable)
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      });
    });
  });
}

var exists = function (src, dst, callback) {
  //测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) { //存在
      callback(src, dst)
    } else { //不存在
      fs.mkdir(dst, function () { //创建目录
        callback(src, dst)
      })
    }
  })
}

let baseWebpackConfig = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  // entry,
  entry: MpvueEntry.getEntry('src/router/index.js'),
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    jsonpFunction: 'webpackJsonpMpvue',
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src')
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader!px2rpx-loader?rpxUnit=75&rpxPrecision=8',
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: Object.assign({
              checkMPEntry: true
            }, vueLoaderConfig)
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    // api 统一桥协议方案
    new webpack.DefinePlugin({
      'mpvue': 'global.mpvue',
      'mpvuePlatform': 'global.mpvuePlatform'
    }),
    new MpvueEntry(),
    new MpvuePlugin(),
    // new CopyWebpackPlugin([{
    //   from: '**/*.json',
    //   to: ''
    // }], {
    //   context: 'src/'
    // }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: path.resolve(config.build.assetsRoot, './static'),
      ignore: ['.*']
    }]),
    new CopyWebpackPlugin([
      {
        from: resolve('node_modules/vant-weapp/dist'),
        to: resolve('dist/wx/vant-weapp/dist'),
        ignore: ['.*']
      }
    ]),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../node_modules/wux-weapp/dist'),
    //     to: path.resolve(config.build.assetsRoot, './static/wux'),
    //     ignore: ['.*']
    //   }
    // ])
    // ...ImportantComponent()
  ]
}

// 针对百度小程序，由于不支持通过 miniprogramRoot 进行自定义构建完的文件的根路径
// 所以需要将项目根路径下面的 project.swan.json 拷贝到构建目录
// 然后百度开发者工具将 dist/swan 作为项目根目录打
const projectConfigMap = {
  tt: '../project.config.json',
  swan: '../project.swan.json'
}

const PLATFORM = process.env.PLATFORM
if (/^(swan)|(tt)$/.test(PLATFORM)) {
  baseWebpackConfig = merge(baseWebpackConfig, {
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, projectConfigMap[PLATFORM]),
        to: path.resolve(config.build.assetsRoot)
      }])
    ]
  })
}

module.exports = baseWebpackConfig
