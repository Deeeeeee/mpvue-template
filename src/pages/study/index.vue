<template>
  <view class="page">
    <van-tabs class="tabs w-100" @change="handleTabChange" sticky>
      <van-tab v-for="(item,index) in tabs" :title="item.description" :key="index"></van-tab>
    </van-tabs>
    <view class="lesson-list">
      <view class="lesson-item" v-for="(item,index) in list" :key="index">
        <view class="item-image-wrap">
          <image class="img" v-if="item.images" mode="aspectFill" :src="item.images[0]" alt=""></image>

          <view class="item-status default" v-if="item.allotStatus === 100">
            <image class="status" src="/static/images/study/status_default.png"></image>
            <text class="text">未开始</text>
          </view>
          <view class="item-status success" v-if="item.allotStatus === 101">
            <image class="status" src="/static/images/study/status_success.png"></image>
            <text class="text">进行中</text>
          </view>
          <view class="item-status error" v-if="item.allotStatus === 102">
            <image class="status" src="/static/images/study/status_error.png"></image>
            <text class="text">已结束</text>
          </view>
          <!--<view class="item-status warning">-->
          <!--<image class="status" src="/static/images/study/status_warning.png"></image>-->
          <!--<text class="text">待审核</text>-->
          <!--</view>-->
        </view>
        <view class="item-info">
          <view class="item-title line-ellipsis">{{ item.name }}</view>
          <view class="f28 c-999" v-if="item.courseTime"></view>
          <view class="f28 c-999" v-else>{{item.startTime}}-{{item.endTime}}</view>
          <progress :percent="item.percent" border-radius="4px" activeColor="#46AE84"  show-info />
          <view class="item-info-footer">
            <view v-if="item.allotStatus === 102 || item.allotStatus === 101">
              <view class="study-status c-green" v-if="item.status === 103">已通过</view>
              <view class="study-status c-999" v-if="item.status === 104">未通过</view>
            </view>
            <view>
              <button type="primary" v-if="item.allotStatus === 101 && item.status === 100"
                      @click.stop="handleStudy(item)">开始学习
              </button>
              <button type="primary" v-if="item.allotStatus === 101 && [101,103,104].indexOf(item.status) > -1"
                      @click.stop="handleStudy(item)">继续学习
              </button>
              <button type="primary"  size="mini" v-if="item.allotStatus === 100 && item.status === 100" disabled>开始学习
              </button>
            </view>
          </view>
        </view>
      </view>
      <!--底部状态-->
      <view class="list-status tc">
        <view v-if="loading">加载中...</view>
        <view v-if="noData">暂无数据</view>
        <view v-if="finished">没有更多了</view>
      </view>
    </view>

    <!--<navigator url="/pages/login/index">-->
      <!--去登陆-->
    <!--</navigator>-->
  </view>
</template>

<script>
  import { coursePersonList } from '@/api/study'

  export default {
    components: {},
    data () {
      return {
        tabs: [
          {code: '', description: '全部'},
          {code: 101, description: '进行中'},
          {code: 100, description: '未开始'},
          {code: 102, description: '已结束'}
        ],
        list: [],
        searchParams: {
          page: 1,
          size: 10,
          allotStatus: ''
        },
        loading: false,
        finished: false,
        noData: false
      }
    },
    onLoad () {
      this.getData()
    },
    onPullDownRefresh () {
      console.log('> 刷新中...')
      this.getData(true)
    },
    onReachBottom () {
      console.log('> 触底 load more...')
      this.getData()
    },
    methods: {
      percentage (row) {
        if (row.classHourLearn) {
          let p = (row.classHourLearn / row.classHourTotal * 100).toFixed(2) * 1
          if (p >= 100) {
            p = 100
          }
          // console.log((row.classHourLearn / row.classHourTotal * 100).toFixed(2) * 1)
          // console.log((row.classHourLearn / row.classHourTotal * 100).toFixed(2) * 1)
          return p
        } else {
          return 0
        }
      },

      handleTabChange (event) {
        // console.log(event)
        // let value = this.tabs[event.mp.detail.index].code
        this.searchParams.allotStatus = this.tabs[event.mp.detail.index].code
        this.searchParams.page = 1
        this.list = []
        this.getData()
      },

      handleStudy (item) {
        console.log('go 课程详情')
        // this.$router.push({
        //   path: '/person/studyInfo',
        //   query: { coursePersonId: item.coursePersonId, personId: item.personId }
        // })
      },
      /**
       * 获取数据
       * @param isRefresh {boolean} 是否刷新
       */
      getData (isRefresh) {
        this.loading = true
        this._resetLoadingStatus()
        if (isRefresh) {
          this.searchParams.page = 1
        }
        coursePersonList(this.searchParams).then(({ data }) => {
          wx.stopPullDownRefresh()
          this.loading = false
          this._setLoadingStatus(this.searchParams.page, this.searchParams.size, data.array)
          if (isRefresh) {
            this.list = this._format(data.array)
          } else {
            this.list = [...this.list, ...this._format(data.array)]
          }
          this.searchParams.page += 1
        }).catch(() => {
          this.loading = false
          wx.stopPullDownRefresh()
        })
      },
      _format (arr) {
        if (!arr) return []
        return arr.map(item => {
          item.startTime = this.$Moment(item.startTime, 'YYYY.MM.DD')
          item.endTime = this.$Moment(item.endTime, 'YYYY.MM.DD')
          item.courseTime = this.$Moment(item.courseTime, 'YYYY.MM.DD')
          if (item.classHourLearn) {
            let percent = (item.classHourLearn / item.classHourTotal * 100).toFixed(2) * 1
            if (percent >= 100) {
              percent = 100
            }
            item.percent = percent
          } else {
            item.percent = 0
          }
          return item
        })
      },
      _setLoadingStatus(page, size, arr) {
        console.log(arr)
        console.log(size)
        console.log(page)
        if (page === 1 && arr.length === 0) {
          this.noData = true
        } else if (arr.length < size) {
          this.finished = true
        }
      },
      _resetLoadingStatus() {
        this.noData = false
        this.finished = false
      }
    }

  }
</script>

<style lang="less" scoped>
  .page {
    padding: 88px 0 0;
  }
  .tabs{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9999;
  }

  .lesson-list {
    flex: 1;
    background-color: #fff;
    margin-top: 20px;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;

    .lesson-item {
      padding: 15px 0;
      box-sizing: border-box;
      background: #fff;
      display: flex;

      .item-image-wrap {
        position: relative;
        margin-right: 30px;

        .img {
          display: block;
          width: 250px;
          height: 250px;
          border-radius: 8px;
        }

        .item-status {
          position: absolute;
          padding-left: 10px;
          top: 14px;
          left: -10px;
          width: 98px;
          height: 51px;
          line-height: 40px;
          color: #fff;
          font-size: 22px;

          .status {
            position: absolute;
            left: 0;
            width: 98px;
            height: 51px;
          }

          .text {
            position: relative;
            z-index: 1;
          }

        }
      }

      .item-info {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title {
          display: inline-block;
          width: 340px;
          line-height: 30px;
          font-size: 32px;
        }

        .time {
          margin: 20px 0;
        }
        .item-info-footer{

        }
      }
    }
  }

</style>
