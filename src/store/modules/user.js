import {login} from '@/api/login'
import md5 from 'js-md5'
// import router from '../../router'

import {
  setToken,
  getToken,
  removeToken,
  getRootId,
  setRootId,
  removeRootId,
  setOrgName,
  getOrgName
} from '@/utils/auth'
// import {
//   setStore
// } from '@/utils'
const user = {
  state: {
    token: getToken(),
    rootId: getRootId(),
    userInfo: {},
    orgName: getOrgName()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      console.log(token)
      setToken(token)
    },
    SET_USER_INFO: (state, data) => {
      console.log(data)
      state.userInfo = data
    },
    SET_ROOT_ID: (state, rootInfo) => {
      state.rootId = rootInfo.rootId || ''
      state.orgName = rootInfo.name || ''
      setRootId(rootInfo.rootId || '')
      setOrgName(rootInfo.name)
      // console.log(state, getOrgName())
    }
  },
  actions: {
    // 登录
    Login ({commit}, params) {
      params.username = params.username.trim()
      if (params.password) {
        params.password = md5(params.password).toUpperCase()
      }
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          commit('SET_USER_INFO', response.data)
          commit('SET_TOKEN', response.data.accesstoken)
          // 判断是否有所属机构
          if (response.data.organizeList && response.data.organizeList.length > 0) {
            // 如果登录之前已经设置了rootId(eg.收到邀请时) 则登录后进入指定机构
            let targetOrg = null
            let rootId = getRootId()
            console.log('> 设置的rootId:', rootId)
            if (rootId) {
              targetOrg = response.data.organizeList.filter(item => item.organizeId === parseInt(rootId))[0]
            } else {
              targetOrg = response.data.organizeList[0]
            }
            console.log(targetOrg)
            commit('SET_ROOT_ID', targetOrg)
          } else {
            // 没有所属机构 跳转机构绑定页
            // router.push('/person/bindOrganize')
            // commit('SET_TOKEN', '')
            // removeToken()
            // commit('SET_ROOT_ID', {})
            // removeRootId()
            // window.location.reload()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        // getInfo().then(response => {
        //   commit('SET_USERINFO', response.data)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut ({commit, state}) {
      // return new Promise((resolve, reject) => {
      //   logout().then(() => {
      //     commit('SET_NAME', '')
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        removeToken()
        removeRootId()
        commit('SET_ROOT_ID', {})
        resolve()
      })
    }
  }
}

export default user
