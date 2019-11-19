function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  wx.setStorageSync(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  if (typeof name !== 'string') {
    return JSON.parse(window.localStorage.getItem(name))
  } else {
    return wx.getStorageSync(name)
  }
}

/**
 * 深拷贝
 * @param object
 */
export function deepClone (obj) {
  if (typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj === null) return null
  let o = new obj.constructor()
  for (let key in obj) {
    o[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return o
}

// 赋值
export function setVal (post, data) {
  for (const i in post) {
    for (const a in data) {
      if (i === a) {
        post[i] = data[a]
      }
    }
  }
}

export default {
  formatNumber,
  formatTime,
  deepClone,
  setVal
}
