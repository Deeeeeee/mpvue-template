/* 手机号码 */
export function isvalidatePhone (str) {
  const reg = /^1[0-9]{10}$/
  return reg.test(str)
}
/* 验证码 */
export function isValidateCaptcha (str) {
  const reg = /^[0-9]{4}$/
  return reg.test(str)
}
/* 登录密码 */
export function isValidatePassword (str) {
  const reg = /^[0-9|a-z|A-Z]{6,8}$/
  return reg.test(str)
}
