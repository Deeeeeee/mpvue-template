module.exports = {
  pages: [
    {
      path: 'pages/discover/index',
      config: {
        enablePullDownRefresh: true
      }
    },
    {
      path: 'pages/study/index'
    },
    {
      path: 'pages/my/index'
    },
    {
      path: 'pages/login/wxLogin'
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
    list: [
      {
        text: '我的学习',
        pagePath: 'pages/study/index',
        iconPath: 'static/images/tabs/study.png',
        selectedIconPath: 'static/images/tabs/study_active.png'
      },
      {
        text: '发现',
        pagePath: 'pages/discover/index',
        iconPath: 'static/images/tabs/discover.png',
        selectedIconPath: 'static/images/tabs/discover_active.png'
      },
      {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'static/images/tabs/my.png',
        selectedIconPath: 'static/images/tabs/my_active.png'
      }
    ],
    position: 'bottom'
  },
  // 全局引入组件
  usingComponents: {
    // 'wux-search-bar': '../static/wux/search-bar/index',
    'van-button': 'vant-weapp/dist/button/index',
    'van-nav-bar': 'vant-weapp/dist/nav-bar/index',
    'van-cell': 'vant-weapp/dist/cell/index',
    'van-cell-group': 'vant-weapp/dist/cell-group/index'
  }
}
