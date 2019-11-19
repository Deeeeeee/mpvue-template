import moment from 'moment'

export default {
  methods: {
    // 时间格式化
    _Moment (value, format) {
      let s = ''
      console.log(value)
      if (!value) { return s }
      s = moment(value).format(format)
      console.log(s)
      return s
    }
  }
}
