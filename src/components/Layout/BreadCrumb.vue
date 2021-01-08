<template>

    <a-breadcrumb class="layout_shrink_bread">
    <a-icon type="profile" style="width:30px"/> 
        <a-breadcrumb-item v-for="(item,index) of $route.matched" :key="index" style="padding:5px">
        <router-link :to="item.path">{{item.meta.title}}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>     
</template>
<script>
export default {
    name:'BreadCrumb',
     watch :{
        '$route':'init'
    },
     methods:{
        init(){
            console.log(this.$route)
        }
    }
}
</script>
<style lang="scss">
.layout_shrink_bread{
    width:15rem;
    height:3rem;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-left: 5% !important;
}
</style>