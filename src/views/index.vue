<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
        <div class="logo-style"><div class="logo" /><span v-show="!collapsed" style="color:white;margin:auto 0">天钢联合特钢</span></div>
        <left-menu></left-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="layout-header">
          <head-nav></head-nav>
      </a-layout-header>
      <a-layout-content style="margin: 20px 16px" class="layout-content">
           <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import LeftMenu from '../components/Layout/LeftMenu.vue'
import HeadNav from '../components/Layout/HeadNav.vue'
import UserCharts from '../components/Layout/UserCharts.vue';
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components:{
      LeftMenu,
      HeadNav,
      UserCharts
  },
  methods:{
  }
}
</script>
<style>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
  }
  .layout-header{
    display: flex;
    flex-direction: row;
    height: 50px !important;
  }
  .logo{
    background: url(../assets/favicon.png) no-repeat;
    background-size: 32px,32px;
    width: 32px !important; 
  }
  .logo-style{
    display: flex;
    flex-direction: row;
  }
</style>