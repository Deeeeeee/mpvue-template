import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import WXP from 'minapp-api-promise'
import fly from './utils/fly'
import store from './store'
import App from './App'
import globalFn from '@/utils'

Vue.use(MpvueRouterPatch)

Vue.prototype.$wx = WXP
Vue.prototype.$http = fly

Vue.config.productionTip = false
Object.keys(globalFn).forEach(key => {
  Vue.prototype['$' + key] = globalFn[key]
})
new Vue({
  mpType: 'app',
  store,
  ...App
}).$mount()
