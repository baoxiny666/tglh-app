import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    //存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    //全局路径
    config:{
      globalPath:'http://10.34.3.12:8199/',
      encryptIv :'fe8a5d47f0bdf4f0',
      encryptKey :'87a1ec63db4c1d34'
    }
    
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  },
  actions: {
    
  }
});
 
export default store;