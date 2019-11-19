import {setSessionStore} from '../utils'

export default {
  created: function () {

  },
  methods: {
    // 验证登录
    _mixinCheckLogin () {
      console.log('> mixin: 验证登录状态')
      if (!this.$store.getters.token) {
        setSessionStore('LOGIN_NEXT_PATH', this.$router.fullPath)
        this.$router.push('/login')
      }
    }
  }
}
