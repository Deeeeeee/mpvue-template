<template>
  <view class="base-title">
    <text class="title">{{title}}</text>
    <view class="right" @click="handleRouter" v-if="rightText">{{rightText}}
      <image v-if="url" class="more" src="/static/images/discover/icon_more.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'baseTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    rightText: {
      type: String
    },
    url: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleRouter () {
      if (this.url) {
        wx.navigateTo({url: this.url})
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .base-title{
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
        line-height: 30px;
      font-size: 36px;
    }
    .right{
      color: #999;
      font-size: 30px;
      line-height: 30px;
    }
    .more{
      width:30px;
      height:30px;
      vertical-align: top;
      margin-left: 10px;
    }
  }
</style>
