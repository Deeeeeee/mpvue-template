<template>
  <view class="page">
    <public-course-list :scrollOutParams="{}"></public-course-list>
  </view>
</template>

<script>
  import PublicCourseList from './_components/PublicCourseList'

  export default {
    components: { PublicCourseList },
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
  }
</style>
