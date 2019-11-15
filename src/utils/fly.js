import Fly from 'flyio/dist/npm/wx'
// import store from '../store'

const fly = new Fly()
const host = 'https://test.vip.ececloud.cn'

//添加请求拦截器
fly.interceptors.request.use((request) => {
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/x-www-form-urlencoded',
    'apptype': 100,
    'clienttype': 100
  }
  // if (store.getters.token) {
  //   request.headers['accesstoken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  //
  // if (store.getters.rootId) {
  //   request.headers['root'] = getRootId()
  // }
  request.headers['accesstoken'] = 'PzjMOE-1573810236466'
  request.headers['root'] = 3

  let authParams = {
    //公共参数
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    }
  })
  request.body = {
    ...request.body,
    ...authParams
  }
  return request
})

//添加响应拦截器
fly.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res && res.status === undefined) {
      // 国籍、民族
      return response.data
    } else {
      if (res.status === 'fail') {
        let title = ''
        switch (res.code) {
          case 40001:
            title = '登录失效,请重新登录'
            break
          case 40003:
            title = '无相应权限,请重新登录'
            break
          case 40608:
          case 40610:
            title = '您的账号未开通或已过期'
            break
          default:
            title = res.message || '系统异常'
        }
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 3 * 1000
        })
        return Promise.reject(response.data)
      } else {
        return response.data
      }
    }
  },
  error => {
    console.log(error)
    wx.showToast({
      title: error.message || '系统错误',
      icon: 'none',
      duration: 3 * 1000
    })
    return Promise.reject(error.message)
  }
)

fly.config.baseURL = host

export default fly
