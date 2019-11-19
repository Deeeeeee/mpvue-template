<template>
  <view class="page">
    <image class="logo" src="/static/images/logo/logo_h.png"></image>
    <ul class="tab-box">
      <li :class="{active: active === 1}" @click="tabChange(1)">
        <span>验证码登录</span>
      </li>
      <li :class="{active: active === 2}" @click="tabChange(2)">
        <span>密码登录</span>
      </li>
    </ul>
    <!--验证码登录-->
    <view class="captcha-box" v-show="active === 1">
      <view class="form-item">
        <span class="pre-phone">+86</span>
        <input :maxlength="11"
                   type="number"
                   class="no-border-input phone-input"
                   v-model="postForm.username"
                   placeholder="请输入手机号"/>
      </view>
      <view class="form-item">
        <input type="number"
                   class="no-border-input captcha-input"
                   :maxlength="4"
                   v-model="postForm.captcha"
                   placeholder="请输入验证码"/>
        <van-button class="captcha-btn" type="primary"
                :disabled="captchaDisabled"
                @click="getCaptchaCode">
          {{btnText}}
        </van-button>
      </view>
    </view>
    <!--密码登录-->
    <view class="captcha-box" v-show="active === 2">
      <view class="form-item">
        <input :maxlength="11" type="number" class="no-border-input w-100" v-model="postForm.username"
                   placeholder="请输入账号" />
      </view>
      <view class="form-item">
        <input :maxlength="11" type="password" class="no-border-input w-100" v-model="postForm.password"
                   placeholder="请输入密码"/>
      </view>
    </view>
    <van-button class="login-btn w-100" type="primary" size="large" round :disabled="submitDisabled" @click="loginSubmit">登录</van-button>
    <view class="text-center forget-btn-box">
      <a @click="forgetVisible = true">忘记密码？</a>
    </view>

    <view class="footer">
      未注册的手机号验证后自动创建学智云账号 <br> 且代表同意
      <router-link to="/app/protocol" class="color-green">《用户使用协议》</router-link>
    </view>
    <!--忘记密码-->
    <van-popup :show="forgetVisible" position="right" custom-style="width: 100%;height: 100%" :overlay="false">
      <view class="forget-box">
        <view class="back-icon" @click="forgetVisible = false">
          <van-icon name="arrow-left"></van-icon>
        </view>
        <h3>找回密码</h3>
        <p>通过您绑定的手机号找回密码</p>
        <view class="form-item">
          <input :maxlength="11" type="number" class="w-100" v-model="forgetForm.phone" placeholder="请输入手机号"/>
        </view>
        <van-button class="mt50" custom-class="login-btn w-100" type="primary" round :disabled="forgetFirstDisabled"
                    @click="getForgetCaptcha">下一步
        </van-button>
      </view>
    </van-popup>
    <!--忘记密码验证码-->
    <van-popup :show="forgetCaptchaVisible" position="right" custom-style="width: 100%;height: 100%" :overlay="false"
               @close="forgetForm.captcha = ''">
      <view class="forget-box">
        <view class="back-icon" @click="forgetCaptchaVisible = false">
          <van-icon name="arrow-left"></van-icon>
        </view>
        <h3>请输入验证码</h3>
        <p>我们已发送了验证码到您的手机</p>
        <view class="form-item captcha-form-item">
          <input type="number" v-model="forgetForm.captcha" :maxlength="4">
          <!--<van-password-input :length="4"-->
                              <!--v-model="forgetForm.captcha"-->
                              <!--:mask="false" gutter="30px"-->
                              <!--:focused="showKeyboard"-->
                              <!--@focus="showKeyboard = true"></van-password-input>-->
          <!--<van-number-keyboard v-model="forgetForm.captcha" :show="showKeyboard"-->
                               <!--@blur="showKeyboard = false"></van-number-keyboard>-->
        </view>
        <van-button class="mt50" custom-class="login-btn w-100" type="primary" size="large" round
                    :disabled="forgetSecondDisabled" @click="checkCaptcha">下一步
        </van-button>
        <view class="forget-btn-box">
          <a @click="reGetCaptchaCode">{{forgetBtnText}}</a>
        </view>
      </view>
    </van-popup>
    <!--重置密码-->
    <van-popup :show="passwordVisible" position="right" custom-style="width: 100%;height: 100%" :overlay="false"
               @close="password = ''">
      <view class="forget-box">
        <view class="back-icon" @click="passwordVisible = false">
          <van-icon name="arrow-left"></van-icon>
        </view>
        <h3>请输入新的密码</h3>
        <p>请设置新密码（6-8个字母、数字、无空格）</p>
        <view class="form-item">
          <van-field :maxlength="8" :type="isShowPassword ? 'text' : 'password'" class="w-90" v-model="password"
                     placeholder="请输入密码" :clearable="true"></van-field>
          <i class="eye-icon" @click="isShowPassword = !isShowPassword"
             :class="{'eye-open': isShowPassword === true}"></i>
        </view>
        <van-button class="login-btn w-100" type="primary" round :disabled="passwordDisabled" @click="resetPassword">
          登录
        </van-button>
      </view>
    </van-popup>
  </view>
</template>

<script>
  import { isvalidatePhone, isValidateCaptcha, isValidatePassword } from '@/utils/validate'
  import { captchaCode, captchaValid, passwordReset } from '@/api/login'
  import { getStore } from '@/utils'

  export default {
    components: {},

    data () {
      return {
        active: 1,
        postForm: {
          username: '13211112222',
          captcha: '4545',
          password: '4545'
        },
        captchaDisabled: true,
        btnText: '获取验证码',
        loginTimer: null,
        submitDisabled: true,
        // 忘记密码
        forgetVisible: false,
        forgetFirstDisabled: true,
        forgetForm: {
          type: 102,
          phone: '13211112222',
          captcha: '4545'
        },
        // 验证码
        forgetCaptchaVisible: false,
        forgetBtnText: '',
        forgetDisabled: true,
        forgetSecondDisabled: true,
        showKeyboard: false,
        forgetTimer: null,
        // 重置密码
        passwordVisible: false,
        passwordDisabled: true,
        isShowPassword: false,
        password: '',
        // 协议
        agreementVisible: false
      }
    },
    watch: {
      postForm: {
        handler (value) {
          console.log(1)
          if (this.active === 1) {
            // 验证码登录
            this.submitDisabled = !(isvalidatePhone(value.username) && isValidateCaptcha(value.captcha))
            if (this.loginTimer === null) {
              this.captchaDisabled = !isvalidatePhone(value.username)
            }
          }
          if (this.active === 2) {
            // 账号密码登录
            this.submitDisabled = !(isvalidatePhone(value.username) && value.password !== '')
          }
        },
        deep: true
      },
      forgetForm: {
        handler (value) {
          this.forgetFirstDisabled = !isvalidatePhone(value.phone)
          this.forgetSecondDisabled = !isValidateCaptcha(value.captcha)
        },
        deep: true
      },
      password (value) {
        value = value.replace(/\s+/g, '')
        this.passwordDisabled = !isValidatePassword(value)
      }
    },
    methods: {
      tabChange (index) {
        this.active = index
        this.postForm.username = ''
        this.postForm.captcha = ''
        this.postForm.password = ''
      },
      // 获取验证码
      getCaptchaCode () {
        const _this = this
        clearInterval(_this.loginTimer)
        this.loginTimer = null
        this.captchaDisabled = true
        this.getCaptcha({
          type: 101,
          phone: this.postForm.username || 13211112222
        }).then(() => {
          this.cutDownTime('btnText', 'loginTimer', 'captchaDisabled', 'postForm')
        }).catch(err => {
          console.log(err)
          this.captchaDisabled = false
          this.btnText = '获取验证码'
        })
      },
      // 获取验证码
      getCaptcha (params) {
        return new Promise((resolve, reject) => {
          captchaCode(params).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      cutDownTime (btnText, timer, disabled, form) {
        const _this = this
        let cutTime = 60
        this[btnText] = cutTime + 's后重发'
        this[timer] = setInterval(() => {
          if (cutTime > 0) {
            this[disabled] = true
            this[btnText] = cutTime + 's后重发'
          } else {
            this[disabled] = !isvalidatePhone(this[form].username)
            this[btnText] = '重新获取'
            clearInterval(_this[timer])
            this[timer] = null
          }
          cutTime -= 1
        }, 1000)
      },
      // 登录
      loginSubmit () {
        let params = {}
        if (this.active === 1) {
          // 验证码登录
          params = {
            username: this.postForm.username,
            captcha: this.postForm.captcha
          }
        }
        if (this.active === 2) {
          // 账号登录
          params = {
            username: this.postForm.username,
            password: this.postForm.password
          }
        }
        this.$store.dispatch('Login', params).then(() => {
          const next = getStore('LOGIN_NEXT_PATH')
          if (next) {
            // setStore('LOGIN_NEXT_PATH', '')
            this.$router.push(next)
          } else {
            this.goIndex()
          }
        }).catch(() => {
        })
      },
      // 忘记密码获取验证码
      getForgetCaptcha () {
        const _this = this
        clearInterval(_this.forgetTimer)
        this.forgetDisabled = true
        this.forgetTimer = null
        this.getCaptcha({
          type: 102,
          phone: this.forgetForm.phone
        }).then(() => {
          this.forgetVisible = false
          this.forgetCaptchaVisible = true
          this.cutDownTime('forgetBtnText', 'forgetTimer', 'forgetDisabled', 'forgetForm')
        }).catch(err => {
          console.warn(err)
          this.forgetDisabled = false
          this.forgetBtnText = '获取验证码'
        })
      },
      // 重新获取验证码
      reGetCaptchaCode () {
        if (this.forgetDisabled) {
          return false
        } else {
          this.getForgetCaptcha()
        }
      },
      // 校验验证码
      checkCaptcha () {
        captchaValid(this.forgetForm).then(res => {
          this.passwordVisible = true
          this.forgetCaptchaVisible = false
        }).catch(() => {
        })
      },
      // 重置密码
      resetPassword () {
        passwordReset({
          username: this.forgetForm.phone,
          password: this.password
        }).then(res => {
          this.$store.commit('SET_USER_INFO', res.data)
          this.$store.commit('SET_TOKEN', res.data.accesstoken)
          this.goIndex()
        }).catch(() => {
        })
      },
      // 根据邀请机构 设置当前 rootId
      setRootIdByInvitation () {
        const invitationRootId = getStore('INVITATION_ROOT_ID')
        console.log('> 邀请机构Id:', invitationRootId)
        if (invitationRootId) {
          // setStore('INVITATION_ROOT_ID', '')
          this.$store.commit('SET_ROOT_ID', { rootId: invitationRootId })
        }
      },
      goIndex() {
        wx.switchTab({
          url: '/pages/study/index'
        })
      }
    }

  }
</script>

<style lang="less">
  .no-border-input {
    .van-cell:after {
      border-bottom: 0;
    }
  }
</style>
<style lang="less" scoped>
  @import "../../styles/_variate";

  .logo {
    display: block;
    width: 341px;
    height: 112px;
    margin: 100px auto 0;
  }

  .tab-box {
    margin: 100px auto 0;
    width: 600px;
    // 常用样式
    font-size: 0;

    li {
      display: inline-block;
      width: 50%;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 36px;
      color: #999999;

      span {
        display: inline-block;
        height: 66px;
      }

      &.active {
        color: #333;
        font-weight: bold;

        span {
          border-bottom: 4px solid @theme;
        }
      }
    }
  }

  .captcha-box {
    padding: 20px;
    width: 100%;

    .form-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1PX solid #D2D1D1;
      padding: 20px 0;

      .pre-phone {
        display: inline-block;
        border-right: 1PX solid #D2D1D1;
        width: 108px;
        height: 60px;
        color: #999999;
        font-size: 30px;
        line-height: 60px;
      }

      .phone-input {
        width: 552px;
      }

      .captcha-input {
        width: 440px;
      }

      .captcha-btn {
        width: 220px;
        height: 70px;
        line-height: 70px;
      }

      /*.eye-icon{*/
      /*position: absolute;*/
      /*right:0;*/
      /*top:50%;*/
      /*transform: translate(0, -50%);*/
      /*width:45px;*/
      /*height: 45px;*/
      /*background: url("/static/images/login/eye-close-icon.png");*/
      /*background-size: 100% 100%;*/
      /*&.eye-open{*/
      /*background: url("/static/images/login/eye-open-icon.png");*/
      /*background-size: 100% 100%;*/
      /*}*/
      /*}*/
    }
  }


  .button-big {
    margin-top: 100px;
  }

  .forget {
    margin-top: 50px;
  }


  .forget-btn-box {
    margin-top: 30px;
    color: #999;
    font-size: 30px;
    text-align: center;
  }

  .forget-box {
    padding: 0 40px;

    .back-icon {
      position: absolute;
      top: 40px;
      left: 40px;
      font-size: 40px;
      color: #333;
    }

    h3 {
      margin-top: 150px;
      font-size: 50px;
      text-align: center;
      font-weight: normal;
    }

    p {
      margin-bottom: 50px;
      line-height: 100px;
      color: #999;
      text-align: center;
      font-size: 30px;
    }
  }

  .captcha-form-item {
    height: 140px;
  }

  .footer {
    color: #999;
    text-align: center;
    margin-top: 80px;
    font-size: 24px;
    line-height: 40px
  }


</style>

