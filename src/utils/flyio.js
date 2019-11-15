import Fly from 'flyio/dist/npm/wx'
import store from '../store'

const fly = new Fly()
const host = 'https://test.vip.ececloud.cn'

var params = {}
//添加请求拦截器
fly.interceptors.request.use((request) => {
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'apptype': 100,
    // 'clienttype': 100
  }

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
      if (res.status !== 'succ') {
        if (!(params && params.hide)) {
          wx.showToast({
            title: res.message || '系统错误',
            icon: 'none',
            duration: 3 * 1000
          })
        }
        // 登录失效
        if (res.code === 40001) {
          wx.showToast({
            title: '登录失效,请重新登录',
            icon: 'none',
            duration: 3 * 1000
          })

          store.dispatch('FedLogOut').then(() => {
            // location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
        // 无相应权限
        if (res.code === 40003) {
          wx.showToast({
            title: '无相应权限,请重新登录',
            icon: 'none',
            duration: 3 * 1000
          })
          store.dispatch('FedLogOut').then(() => {
            // location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
        // 账号失效
        if (res.code === 40608 || res.code === 40610) {
          wx.showToast({
            title: '您的学智云账号未开通或已过期',
            icon: 'none',
            duration: 3 * 1000
          })
          store.dispatch('FedLogOut').then(() => {
            // location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
        return Promise.reject(response.data)
      } else {
        return response.data
      }
    }
  },
  error => {
    if (!params.hide) {
      if (error.message !== 'request is canceled') {
        wx.showToast({
          title: error.message || '系统错误',
          icon: 'cancel',
          duration: 3 * 1000
        })
      }
    }
    return Promise.reject(error.message)
  }
)

fly.config.baseURL = host

export default fly
