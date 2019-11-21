<template>
  <view class="page">
    <image class="banner" src="https://oss.zhihanyun.com/FopHNdEjtoi-VgJ9yQ0SR3VR_AbD"></image>
    <base-title title="公开课程" rightText="全部课程" url="/pages/discover/list"></base-title>
    <public-course-list :scrollOutParams="{statusList: [101]}"></public-course-list>
  </view>
</template>

<script>
  // import { coursePersonList } from '@/api/study'
  import BaseTitle from '@/components/BaseTitle'
  import PublicCourseList from './_components/PublicCourseList'

  export default {
    components: { BaseTitle, PublicCourseList },
    data () {
      return {
      }
    },
    mixins: [],
    onLoad () {
    },
    methods: {
    }

  }
</script>

<style lang="less" scoped>
  .page {
    padding: 0;
    background-color: #fff;
    .banner {
      width: 690px;
      height: 326px;
      display: block;
      margin: 0 auto;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, .1);
    }
  }
</style>
