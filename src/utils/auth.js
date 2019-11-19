// import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken () {
  return wx.getStorageSync(TokenKey)
}

export function setToken (token) {
  return wx.setStorageSync(TokenKey, token)
}

export function removeToken () {
  return wx.clearStorageSync(TokenKey)
}

export function getCookie (key) {
  return wx.getStorageSync(key)
}

export function setRootId(rootId) {
  return wx.setStorageSync('rootId', rootId)
}
export function getRootId() {
  return wx.getStorageSync('rootId')
}
export function removeRootId() {
  return wx.setStorageSync('rootId', '')
}

export function setOrgName(orgName) {
  return wx.setStorageSync('orgName', orgName)
}

export function getOrgName() {
  return wx.getStorageSync('orgName')
}

export function romveOrgName() {
  return wx.setStorageSync('orgName', '')
}
