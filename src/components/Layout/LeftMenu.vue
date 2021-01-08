<template>
      <a-menu theme="dark" :default-selected-keys="[this.$route.path.split('/').toString()[2]]" :default-open-keys="[this.$route.path.split('/').toString()[1]]" mode="inline">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>隐患上报系统</span></span>
          <a-menu-item key="1">
            <router-link to="/ReportRecords">
              <a-icon type="switcher"  />上报记录
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
              <router-link to="/UserCharts">
             <a-icon type="line-chart" />统计数据
              </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  props:{
  },
  methods:{
  }
};
</script>
<style lang="scss">
.logo{
    background-image: url(../../assets/favicon.png) no-repeat;
    background-size: 100%;
    width: 30px;
    height: 30px;
}
.item{
    display: flex;
    flex-direction: row;
}
</style>
