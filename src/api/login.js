import fly from '@/utils/fly'

// 登录
export const login = data => fly.post('/puzzle/api/organize/app/person/login', data)

// 获取验证码
export const captchaCode = data => fly.post('/puzzle/api/organize/app/person/captcha', data)

// 验证码验证
export const captchaValid = data => fly.post('/puzzle/api/organize/app/person/captcha/valid', data)

// 重置密码
export const passwordReset = data => fly.post('/puzzle/api/organize/app/person/password/forget', data)
