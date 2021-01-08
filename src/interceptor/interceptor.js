import Vue from 'vue'
import axios from 'axios'
import func from '../config/index.js'
import store from '../store/index.js'

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['time'] = new Date().getTime().toString()
  let _sign = func.signEncrypt(store.state.config.signKey + config.headers['time'])
  config.headers['sign'] = _sign
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Authorization'] = localStorage.getItem('Authorization')
  return config
})



axios.interceptors.response.use(res => {
  const { code } = res.data
  let that = this
  
  if (code === 407) {
    // 2. 删除本地token 和 user_id
    localStorage.removeItem('Authorization')

    // 3. 跳转 login
    // router.push('/login')
    window.location.href = "/"
  }
  return res
})

 
// axios.install = (Vue) => {
//   Vue.prototype.$axios = axios
// }
 
export default axios