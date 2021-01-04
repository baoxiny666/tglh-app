import Vue from 'vue'
import axios from 'axios'
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Authorization'] = localStorage.getItem('Authorization')
  return config
})
 

 
axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}
 
export default axios