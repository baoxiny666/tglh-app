import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../components/Login/Login.vue'
import ReportsRecords from '../components/ReportRecords/ReportRecords.vue'
import UserCharts from '../components/Layout/UserCharts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path:'/login',
    name:'登录',
    component:Login
  },
  {
    path:'/index',
    name:'首页',
    component:Index,
    children:[
      {
        path:'/UserCharts',
        name:'统计数据',
        meta:{title:'统计数据'},
        component:UserCharts
      },
      {
        path: '/ReportRecords',
        name: '上报记录',
        meta:{title:'上报记录'},
        component:ReportsRecords
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
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});


export default router
