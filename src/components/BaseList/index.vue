<template>
  <ul class="base-list">
    11
    <li v-for="(item,index) in newList" :key="index">
      <slot></slot>
    </li>
  </ul>
</template>

<script>
import fly from '@/utils/fly'

export default {
  props: {
    api: {
      type: String,
      required: true
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    searchParams: {
      type: Object
    },
    formatFn: {
      type: Function
    }
  },
  data() {
    return {
      params: {
        page: 1,
        size: 10
      },
      list: [1, 2, 3],
      moreLoading: false,
      finished: false,
      finishedText: '没有更多了',
      noData: false
    }
  },
  computed: {
    newList() { // 返回处理之后的List列表
      if (!this.formatFn) {
        return this.list
      }
      return this.formatFn(this.list)
    }
  },
  onPullDownRefresh() {
    console.log('> 刷新中...')
    this.getData()
  },
  onReachBottom() {
    console.log('> 触底 load more...')
  },
  onLoad() {
    this.getData()
  },
  methods: {
    /**
     * 获取数据
     * @param isRefresh {boolean} 是否刷新
     */
    getData (isRefresh) {
      // this.params = {...this.params, ...this.searchParams}
      // this.moreLoading = true
      // this.noData = false
      fly.post(this.api, this.params).then(({ data }) => {
        wx.stopPullDownRefresh()

        this.list = [...this.list, ...data.array || []]
        this.moreLoading = false
        this.params.page += 1
        // 暂无数据
        if (data.totalSize === 0) {
          this.finished = true
          this.finishedText = ''
          this.noData = true
        } else {
          this.noData = false
        }
        // 加载结束没有数据
        if (this.params.page > data.totalPage) {
          this.finished = true
        }
      }).catch(() => {
        wx.stopPullDownRefresh()
      })
    },
    refresh(){

    }
  }
}
</script>

<style>

</style>
