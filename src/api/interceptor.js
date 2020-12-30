import axios from 'axios'
let instance = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})


instance.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('token')
      if (token ) {
        config.headers.authorization = token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
)


// http response 拦截器
instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理 
      if (response.data.code) {
        switch (response.data.code) {
          case 1002:
            store.state.isLogin = false
            router.replace({
              path: 'login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
        }
      }
      return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error.response.status) // 返回接口返回的错误信息
    }
)


export default instance