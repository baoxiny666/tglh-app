import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/ant-design-vue.js'
import Antd from 'ant-design-vue'
import axios from './interceptor/interceptor.js'
import devServer from '../vue.config.js'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(devServer)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
