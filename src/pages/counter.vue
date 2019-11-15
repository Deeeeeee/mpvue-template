<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <van-button @click="increment">
        +
      </van-button>
      <!-- <button @click="increment">+</button> -->
      <van-button @click="decrement">
        —
      </van-button>
      <!-- <button @click="decrement">-</button> -->
    </p>
  </div>
</template>

<script>

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style lang="less" scoped>
  p{
    color: red;
  }
.counter-warp {
  text-align: center;
  margin-top: 100px;
  p {
    color: red;
  }
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
