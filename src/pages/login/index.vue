<template>
  <view class="page">
    <image class="logo" src="/static/images/logo/logo_v.png"></image>
    <van-button type="primary" class="button-big" @click="login" size="large">微信用户一键登录</van-button>
    <a href="/pages/login/login" class="login-phone c-blue">输入手机号码登录/注册</a>
  </view>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      logs: []
    }
  },
  methods: {
    login() {
      console.log(1)
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            console.log(res.code)
            // wx.request({
            //   url: 'https://test.com/onLogin',
            //   data: {
            //     code: res.code
            //   }
            // })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    userInfo() {
      console.log(1)
      wx.getUserInfo({
        success (res) {
          console.log(res)
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.button-big{
  margin-top: 100rpx;
}
.logo {
  display: block;
  width: 220rpx;
  height: 330rpx;
  margin: 157rpx auto 0;
}
  .login-phone{
    margin-top: 50rpx;
  }

</style>
