import Vue from 'vue'
import axios from 'axios'

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Authorization'] = localStorage.getItem('Authorization')
  return config
})


axios.interceptors.response.use(res => {
  const { code } = res.data
  let that = this
  debugger
  if (code === 407) {
 

    // 2. 删除本地token 和 user_id
    localStorage.removeItem('Authorization')

    // 3. 跳转 login
    // router.push('/login')
    window.location.href = "/"
  }
  return res
})

 
axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}
 
export default axios