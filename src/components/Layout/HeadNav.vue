<template>
<a-row>
      <a-col :span="23">
        <div class="layout_shrink">
             <bread-crumb></bread-crumb>
        </div>
      </a-col>
      <a-col :span="1">
        <div class="menu">
            <a-dropdown>
              <a style="width:7rem !important" @click="e => e.preventDefault()">
                <a-icon type="user" style="color: rgba(24,144,120,.95)"/>&nbsp;炼铁厂-数字信息化部-张莫某<a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出登录</a>
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
}
</script>
<style lang="scss">
.layout_shrink{
    display:flex;
    width:100%;
    height:3rem;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
.menu{
    width:18rem;
    height:3rem;
    margin-left: 13rem;
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