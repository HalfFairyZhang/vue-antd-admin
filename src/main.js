import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/antd.js";
import './permission' // 权限过滤器
import { hasPermission } from './utils/permission'

Vue.config.productionTip = false
Vue.prototype.hasPerm = hasPermission

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
