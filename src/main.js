import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/antd.js";
import './permission' // permission control
import { hasBtnPermission } from './utils/permission'

const { mockXHR } = require('../mock')
mockXHR()

Vue.config.productionTip = false
Vue.prototype.hasPerm = hasBtnPermission

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
