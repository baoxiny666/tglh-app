<template>
  <a-row>
        <a-col type="flex" :span="12">
          <!-- class="layout_shrink" -->
          <div>
              <bread-crumb></bread-crumb>
          </div>
        </a-col>
        <a-col :span="8">

        </a-col>
        <a-col :span="4">
          <div class="menu">
              <a-dropdown>
                <a style="width:7rem !important" @click="e => e.preventDefault()">
                  <a-icon type="user" style="color: rgba(24,144,120,.95)"/>&nbsp;用户<a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="loginOut">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
          </div> 
        </a-col>
  </a-row>
</template>
<script>
import BreadCrumb from './BreadCrumb.vue'
export default {
    name:'HeadNav',
    components:{
        BreadCrumb,
    },
    data() {
      return {       
      }
    },
    methods:{
      loginOut(){
        localStorage.removeItem('Authorization')
         window.location.href = "/"
      }
    }
}
</script>
<style>
  .layout_shrink{
    display:flex;
    width:100%;
    height:3rem;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .menu{
      width:5rem;
      height:3rem;
      margin-left: 11rem;
      text-align:right;
      line-height:3rem;
  }
 .trigger {
    font-size: 1rem;
    line-height: 3.5rem;
    padding: 0 1.1rem;
    cursor: pointer;
    transition: color 0.3s;
}
.trigger:hover {
    color: #1890ff;
}

</style>