import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import Index from '../components/list/Index'
import UserManage from '../components/usermanage/UserManage'
import FunctionManage from '../components/functionmanage/FunctionManage'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'登录',
    component:Login
  },
  {
    path:'/register',
    name:'注册',
    component:Register
  },
  {
    path:'/index',
    name:'首页',
    component:Index,
    children:[
      {
        path: '/userManage',
        name: '用户管理',
        component:UserManage
      },
      {
        path: '/functionManage',
        name: '功能管理',
        component:FunctionManage
      }
    ]
  }
]



const router = new VueRouter({
  routes
})


// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
});


axios.interceptors.response.use((response) => {
  if (response.data.code == 401){
	  uni.removeStorageSync(http.config.setTokenKey)
	  uni.removeStorageSync(http.config.setUserKey)
    this.$router.push("/login")
  }
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})

export default router
