<template>
  <a-row>
    <a-col :xs="2" :sm="4" :md="5" :lg="6" :xl="7">
       
    </a-col>
    <a-col :xs="20" :sm="16" :md="14" :lg="12" :xl="10">
      <a-layout>
          <a-layout-header  class="layout-header"></a-layout-header>
          <a-layout-content class="layout-content">
              
          </a-layout-content>
          <a-layout-footer class="layout-footer">Footer</a-layout-footer>
      </a-layout>
    </a-col>
    <a-col :xs="2" :sm="4" :md="5" :lg="6" :xl="7">
    
    </a-col>
  </a-row>
</template>
<script>
  export default{ 
    name:'Register',
    components:{
      
    },
    methods: {
    
    }
  }
</script>
<style scoped>
  .layout-header{
    width:100%;
    height:10rem;
    background:white;
  }

  .layout-content{
    width:100%;
    height:45rem
  }


  .layout-footer{
    width:100%;
    height:5rem
  }
</style>