<template>
   <a-row style="background:white;height:150px;border-radius:7px">
    <a-col :span="6">
      <a-card class="card1">
        <a-row class="row">
      <a-col :span="15">
          <h3>全厂累计上报</h3>
          <p>{{allnum}}项</p>
      </a-col>
      <a-col :span="9">
        <a-icon type="bell" style="color:white;font-size:70px" />
      </a-col>
    </a-row>    
      </a-card>
    </a-col>
    <a-col :span="6">
     <a-card class="card2">
        <a-row class="row">
      <a-col :span="15">
          <h3>全厂累计审核</h3>
          <p>{{pass}}项</p>
      </a-col>
      <a-col :span="9">
        <a-icon type="search" style="color:white;font-size:70px"/>
      </a-col>
    </a-row>    
      </a-card>
    </a-col>
    <a-col :span="6" >
       <a-card class="card3">
        <a-row class="row">
      <a-col :span="15">
          <h3>全厂累计处理</h3>
          <p>{{finish}}项</p>
      </a-col>
      <a-col :span="9">
        <a-icon type="setting" style="color:white;font-size:70px"/>
      </a-col>
    </a-row>    
      </a-card>
    </a-col>
     <a-col :span="6" >
       <a-card class="card4">
        <a-row class="row">
      <a-col :span="15">
          <h3>全厂累计归档</h3>
          <p>{{finish}}项</p>
      </a-col>
      <a-col :span="9">
        <a-icon type="schedule" style="color:white;font-size:70px" />
      </a-col>
    </a-row>    
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
export default {
  name:'DataCard',
  data(){
    return{
      allnum:'11111',
      pass:'111111',
      finish:'444444',
    }
  },
}
</script>
<style lang="scss">
  .card1{
    text-align: center;
    width: 90%;
    height: 130px;
    background-color: #FFA3A1 !important;
    border-radius: 11px !important;
    margin: 0 auto !important;
    margin-top: 10px !important;
  }
  .card2{
    text-align: center;
    width: 90%;
    height: 130px;
    background-color: #87DE75 !important;
    border-radius: 11px !important;
    margin: 0 auto !important;
    margin-top: 10px !important;
  }
  .card3{
    text-align: center;
    width: 90%;
    height: 130px;
    background-color:#93B7E3!important;
    border-radius: 11px !important;
    margin: 0 auto !important;
    margin-top: 10px !important;
  }
  .card4{
    text-align: center;
    width: 90%;
    height: 130px;
    background-color:#EDAFDA !important;
    border-radius: 11px !important;
    margin: 0 auto !important;
    margin-top: 10px !important;
  }
  h3{
    color: white!important;
    font-family: "Microsoft Yahei", sans-serif;
    font-weight:600 !important;
  }
  p{
     color: white!important;
     font-size: 28px;
     font-weight:600 !important;
  }
</style>