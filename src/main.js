import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import WXP from 'minapp-api-promise'
import fly from './utils/flyio'
import store from './store'
import App from './App'

Vue.use(MpvueRouterPatch)

Vue.prototype.$wx = WXP
Vue.prototype.$http = fly;

Vue.config.productionTip = false

new Vue({
  mpType: 'app',
  store,
  ...App
}).$mount()