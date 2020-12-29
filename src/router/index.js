import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import Index from '../components/list/Index'
import UserManage from '../components/usermanage/UserManage'
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
