<template>
  <view class="lesson-list">
    <view class="lesson-item" v-for="(item,index) in scrollList" :key="index">
      <view class="item-image-wrap">
        <image class="img" v-if="item.images" mode="aspectFill" :src="item.images[0] + '?imageView2/2/w/250'"
               alt=""></image>
        <image class="img" v-else mode="aspectFill" src="/static/images/study/default.png" alt=""></image>
      </view>
      <view class="item-info">
        <view class="item-title line-ellipsis">{{ item.name }}</view>
        <view class="fs28 c-999" v-if="item.courseTime"></view>
        <view class="fs28 c-666" v-else>{{item.startTime}}-{{item.endTime}}</view>
        <view class="fs28 c-999" v-if="item.quota">限{{item.quota}}人/已报名{{item.applyPersonCount}}人</view>
        <view class="item-info-footer">
          <view>
            <view class="color-yellow fs28 status" v-if="item.apply">审核中</view>
            <view class="c-999 fs28 status" v-if="!item.apply && item.status === 102">已结束</view>
            <view class="c-999 fs28 status" v-if="!item.apply && item.status === 103">已取消</view>
          </view>
          <view>
            <button v-if="!item.apply && (item.status === 100 || item.status === 101)" type="primary" size="mini"
                    :disabled="item.quota && item.quota === item.applyPersonCount" class="study-button"
                    @click.stop="handleApply(item)">开始报名
            </button>
          </view>
        </view>
      </view>
    </view>
    <!--底部状态-->
    <view class="list-status tc">
      <view v-if="scrollStatus.loading">加载中...</view>
      <view v-if="scrollStatus.nodata">暂无数据</view>
      <view v-if="scrollStatus.ended">没有更多了</view>
    </view>
  </view>
</template>

<script>
  // import { coursePersonList } from '@/api/study'
  import ScrollList from '@/mixin/ScrollList'
  import BaseTitle from '@/components/BaseTitle'
  import { signUp } from '@/api/openClass'

  export default {
    components: { BaseTitle },
    props: {
      scrollOutParams: {
        type: Object
      }
    },
    data () {
      return {
        scrollApi: '/organize/app/openCourse/courseList'
      }
    },
    mixins: [ScrollList],
    onLoad () {
    },
    methods: {
      handleStudy (item) {
        console.log('go 课程详情')
        // this.$router.push({
        //   path: '/person/studyInfo',
        //   query: { coursePersonId: item.coursePersonId, personId: item.personId }
        // })
      },
      handleDetails (row) {
        if (row.status === 100 || row.status === 101) {
          this.$router.push({
            path: '/find/openCourse/courseDetails',
            query: { courseAssignmentId: row.courseAssignmentId }
          })
        }
      },

      handleApply (item) {
        this.$dialog.confirm({
          title: '提示',
          message: '点击确定后，待审核通过即可在我的学习中观看。'
        }).then(() => {
          signUp({
            courseAssignmentId: item.courseAssignmentId
          }).then(({ data }) => {
            item.apply = 1
            this.$router.push({ path: '/person/studyCenter' })
          })
        }).catch(() => {
        })
      },
      _scrollFormat (arr) {
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
      }
    }

  }
</script>

<style lang="less" scoped>
  .lesson-list {
    flex: 1;
    background-color: #fff;
    /*margin-top: 20px;*/
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
          display: block;
          width: 100%;
          line-height: 30px;
          font-size: 32px;
        }

        .time {
          margin: 20px 0;
        }
        .item-info-footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

</style>
