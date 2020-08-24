import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/antd.js";
import './permission' // 权限过滤器
import './utils/error-log' // 错误日志

import { hasPermission } from './utils/permission'

import * as filters from './filters' // 全局筛选器

// 注册全局实用程序筛选器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.prototype.hasPerm = hasPermission

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
