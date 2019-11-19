// 验证公开课 邀请机构与当前机构是否统一
import {setSessionStore} from '../utils'

export default {
  created () {
  },
  methods: {
    _mixinCheckInvitation () {
      console.log('> mixin: 检查邀请码')
      const token = parseInt(this.$store.getters.token)
      const rootId = parseInt(this.$store.getters.rootId)
      const invitationRootId = parseInt(this.$route.query.rootId)
      let isPass = true
      if (invitationRootId) {
        if (rootId) {
          console.log('> mixin: 检查邀请码')
          if (rootId !== invitationRootId) {
            console.log('> mixin: 邀请码与当前机构不匹配')
            isPass = false
            // 当前rootId 与 邀请rooId不一致 退出登录
            // 保存当前页面
            setSessionStore('LOGIN_NEXT_PATH', this.$route.fullPath)
            // 保存邀请rootId
            setSessionStore('INVITATION_ROOT_ID', invitationRootId)
            // 退出登录
            this.$store.dispatch('FedLogOut').then(res => {
              this.$router.push('/login')
            })
          } else {
            console.log('> mixin: 邀请码与当前机构匹配')
            if (!token) {
              isPass = false
              this.$router.push('/login')
            }
          }
        } else {
          isPass = false
          // 保存当前页面
          setSessionStore('LOGIN_NEXT_PATH', this.$route.fullPath)
          // 保存邀请rootId
          setSessionStore('INVITATION_ROOT_ID', invitationRootId)
          // 跳转登录页
          this.$router.push('/login')
        }
      } else {
        if (rootId) {
          console.log('> mixin: 无邀请码 但 已登录')
        } else {
          isPass = false
          // 未登录 跳转登录页
          // 保存当前页面
          setSessionStore('LOGIN_NEXT_PATH', this.$route.fullPath)
          // 跳转登录页
          this.$router.push('/login')
        }
      }
      return isPass
    }
  }
}
