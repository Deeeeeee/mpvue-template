# vue_miniprogram

> vue_miniprogram

## Build Setup

``` bash
# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

------

## 项目说明
mpvue小程序框架，在[mpvue-quickstart](https://github.com/mpvue/mpvue-quickstart)基础上引入

[mpvue-entry](https://github.com/F-loat/mpvue-entry)

[mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch)

[minapp-api-promise](https://github.com/bigmeow/minapp-api-promise)

全局vuex、less、[flyio](https://github.com/wendux/fly)

自动按需导入[wux-weapp](https://github.com/wux-weapp/wux-weapp)组件（根据usingComponents自动引入）

实现更像vue的开发结构

更多详细文档请查阅 [quickstart](http://mpvue.com/mpvue/quickstart/)。

bug 或者交流建议等请反馈到 [mpvue/issues](https://gitee.com/hkgit/vue_miniprogram/issues)。
