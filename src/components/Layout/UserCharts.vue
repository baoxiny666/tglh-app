<template>
    <a-row>
      <a-col :span="24">
        <data-card></data-card>
      </a-col>
      <a-col :span="24" class="space2">
          <div style="height:10px"></div>
          <data-select style="margin-left:8px"></data-select>
          <div style="height:13px"></div>
      </a-col>
      <a-col :span="24" class="space3">
        <div class="charts2"><data-charts style="width:90%"></data-charts></div>
        <div class="charts1"><pie-charts></pie-charts></div>
      </a-col>
       <a-col :span="24">
       <div style="height:10px;background-color:white"></div>
       </a-col>
    </a-row>
</template>

<script>
import DataCard from './DataCard.vue'
import DataCharts from './DataCharts.vue'
import DataSelect from './DataSelect.vue'
import PieCharts from './PieCharts.vue'
export default {
    name:'UserCharts',
    components:{
        DataCard,
        DataCharts,
        DataSelect,
        PieCharts   
    }
}
</script>
<style lang="scss">
.space2{
    margin-top:20px !important;
    background-color:white;
    border-radius:5px
}
.space3{
    display: flex !important;
    flex-direction: row !important;
    background-color:white;
}
.charts1{
    border-radius:5px;
    width: 45%;
}
.charts2{
    border-radius:5px;
    width: 55%;
    margin-left: 1%;
}
</style>