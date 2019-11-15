<template>
  <div class="page">
    <van-button @click="handleLogin">test fly</van-button>
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {
  components: {
  },

  data () {
    return {
      logs: []
    }
  },
  onLoad() {
    console.log(login)
  },
  methods: {
    handleLogin() {
      login({username: 'aaa', password: 'aaaa'}).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style lang="less" scoped>

</style>
