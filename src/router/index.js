module.exports = {
  pages: [
    {
      path: 'pages/index'
    },
    {
      path: 'pages/logs',
      config: {
        navigationBarTitleText: '查看启动日志'
      }
    },
    {
      path: 'pages/counter',
      config: {
        // usingComponents: {
        //   "wux-icon": "../static/wux/icon/index",
        //   "wux-button": "../static/wux/button/index"
        // }
      }
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    backgroundColor: '#fafafa',
    selectedColor: '#333',
    borderStyle: 'white',
    list: [{
      text: '首页',
      pagePath: 'pages/index',
      iconPath: 'static/tabs/home.png',
      selectedIconPath: 'static/tabs/home-active.png'
    }, {
      text: '订单',
      pagePath: 'pages/logs',
      iconPath: 'static/tabs/orders.png',
      selectedIconPath: 'static/tabs/orders-active.png'
    }],
    position: 'bottom'
  },
  // 全局引入组件
  usingComponents: {
    // 'wux-search-bar': '../static/wux/search-bar/index',
    "van-button": "vant-weapp/dist/button/index"
  }
}
