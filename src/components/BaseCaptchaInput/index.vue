<template>
  <view class="base-captcha-input">
      <ul class="base-captcha-input-container">
        <li class="field-wrap" v-for="(item, index) in length" :key="index">
          <i class="char-field">{{value[index] || placeholder}}</i>
        </li>
      </ul>
    <input ref="input" class="input-code" v-model="value"
           type="number" :maxlength="length"
           autocorrect="off" autocomplete="off" autocapitalize="off">
  </view>
</template>

<script>
  export default {
    name: 'BaseCaptchaInput',
    // component properties
    props: {
      length: {
        type: Number,
        default: 4
      },
      placeholder: {
        type: String,
        default: '-'
      },
      theme: {
        type: String,
        default: 'block'
      }
    },
    // variables
    data () {
      return {
        value: ''
      }
    },
    watch: {
      value(newVal) {
        // wx.showToast({title: newVal})
        // if (newVal.length >= this.length) {
        //   // this.hideKeyboard()
        // }
        this.handleSubmit()
      }
    },
    computed: {

    },
    methods: {
      hideKeyboard () {
        // let query = wx.createSelectorQuery()
        // query.select('baseCaptchaInput').blur()
      },
      handleSubmit () {
        this.$emit('input', this.value)
      }
      // handleInput (e) {
      //   wx.showToast(e.detail.value)
      //   if (e.detail.value.length >= this.length) {
      //     this.hideKeyboard()
      //   }
      //   this.handleSubmit()
      // }
    }
  }
</script>

<style scoped lang="less">
  .base-captcha-input {
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .base-captcha-input-container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    .field-wrap {
      list-style: none;
      display: block;
      height: 120px;
      width: 150px;
      line-height: 120px;
      font-size: 42px;
      text-align: center;
      .char-field {
        font-style: normal;
      }
    }
  }

  .block-container {
    justify-content: center;
    .field-wrap {
      background-color: #fff;
      margin: 2px;
      color: #000;
    }
  }

  .line-container {
    position: relative;
    background-color: #fff;
    &:after {
      box-sizing: border-box;
      content: "";
      width: 200%;
      height: 200%;
      transform: scale(.5);
      position: absolute;
      border: 1px solid #d9d9d9;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      border-radius: 4px;
    }
    .field-wrap {
      flex: 1;
      position: relative;
      &:not(:last-child):after {
        content: "";
        width: 1px;
        height: 50%;
        position: absolute;
        right: 0;
        top: 25%;
        background-color: #d9d9d9;
        transform: scaleX(.5);
      }
    }
  }

  .input-code {
    position: absolute;
    width: 1000%;
    left: -50%;
    top: 0;
    height: 120px;
    background-color: rgba(0,0,0,.1);
    /*left: -9999px;*/
    /*top: -9999px;*/
  }

</style>

