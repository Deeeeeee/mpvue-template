<template>
  <div class="main-container">
    <ul class="base-list">
      <li v-for="(item,index) in list" :key="index">
       {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import {openClassList} from '@/api/openClass'
export default {
  components: {
  },
  data () {
    return {
      list: [],
      searchParams: {
        page: 1,
        size: 10
      },
      loading: false,
      finished: false,
      finishedText: '没有更多了',
      noData: false
    }
  },
  onLoad () {
    this.getData()
  },
  onPullDownRefresh() {
    console.log('> 刷新中...')
    this.getData()
  },
  onReachBottom() {
    console.log('> 触底 load more...')
  },
  methods: {
    /**
     * 获取数据
     * @param isRefresh {boolean} 是否刷新
     */
    getData (isRefresh) {
      // this.searchParams = {...this.searchParams, ...this.searchParams}
      // this.loading = true
      // this.noData = false
      if (isRefresh) {
        this.searchParams.page = 1
      }
      openClassList(this.searchParams).then(({ data }) => {
        wx.stopPullDownRefresh()
        if (isRefresh) {
          this.list = data.array || []
        } else {
          this.list = [...this.list, ...data.array || []]
        }
        this.searchParams.page += 1
      }).catch(() => {
        wx.stopPullDownRefresh()
      })
    }
  }

}
</script>

<style lang="less">
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
