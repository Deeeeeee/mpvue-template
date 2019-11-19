/**
 * ScrollList 下拉刷新&滚动加载[mixin]
 * ======== 使用方法 ========
 * router中配置对应页面 config.enablePullDownRefresh: true
 * 对应页面中通过 mixins 引入
 * ======== 外部参数 ========
 * scrollApi {string} 外部定义  用于确认请求接口
 * scrollParams {object} 外部定义  用于外部设置请求参数
 * ======== 内部参数 ========
 * scrollList {array} 存放数据列表
 * scrollParams {object} 存放基础请求信息 可被外部参数 覆盖
 * scrollStatus {object} 存放滚动状态
 * ======== *注意事项* ========
 * 被混入的页面内勿使用相同命名
 */

import fly from '@/utils/fly'
export default {
  data() {
    return {
      // scrollApi: '',
      // scrollOutParams: '',
      scrollList: [],
      scrollParams: {
        page: 1,
        size: 10
      },
      scrollStatus: {
        loading: false,
        ended: false,
        nodata: false
      }
    }
  },
  onLoad () {
    console.log('> onLoad')
    this.scrollGetData()
  },
  onPullDownRefresh () {
    console.log('> 刷新中...')
    this.scrollRefresh()
  },
  onReachBottom () {
    console.log('> 触底 load more...')
    this.scrollGetData()
  },
  methods: {
    /**
     * 获取数据
     * @param isRefresh {boolean} 是否刷新
     */
    scrollGetData (isRefresh) {
      this.scrollStatus.loading = true
      this._resetLoadingStatus()
      if (isRefresh) {
        this.scrollParams.page = 1
      }
      let params = {
        ...this.scrollParams,
        ...this.scrollOutParams
      }
      fly.post(this.scrollApi, params).then(({ data }) => {
        wx.stopPullDownRefresh()
        this.scrollStatus.loading = false
        this._setLoadingStatus(this.scrollParams.page, this.scrollParams.size, data.array)
        if (isRefresh) {
          this.scrollList = this._scrollFormat(data.array)
        } else {
          this.scrollList = [...this.scrollList, ...this._scrollFormat(data.array)]
        }
        this.scrollParams.page += 1
      }).catch(() => {
        this.scrollStatus.loading = false
        wx.stopPullDownRefresh()
      })
    },
    scrollRefresh() {
      this.scrollGetData(true)
    },
    _setLoadingStatus(page, size, arr) {
      console.log(arr)
      console.log(size)
      console.log(page)
      if (page === 1 && arr.length === 0) {
        this.scrollStatus.nodata = true
      } else if (arr.length < size) {
        this.scrollStatus.ended = true
      }
    },
    _resetLoadingStatus() {
      this.scrollStatus.nodata = false
      this.scrollStatus.ended = false
    }
  }
}
