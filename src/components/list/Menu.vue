<template>
  <div>
    <a-menu mode="inline" :theme="theme" :open-keys="openKeys"  @openChange="onOpenChange">
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" />
          <span>系统管理</span>
        </span>
        
        <a-menu-item key="1">
          <router-link to="/userManage">
            用户管理
          </router-link>
        </a-menu-item>
      
      
        <a-menu-item key="2">
          <router-link to="/userManage">
            角色管理
          </router-link>
        </a-menu-item> 
        
        
        <a-menu-item key="3">
          <router-link to="/userManage">
            菜单管理
          </router-link>
        </a-menu-item>
        
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>扫码管理</span></span>
        <a-menu-item key="5">
          区域管理
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>

export default {
  name:'Menu',
  components:{
    
  },
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      theme:'dark'
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
}
</script>