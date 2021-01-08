<template>
  <div id="container"></div>
</template>
<script>
import { Column } from '@antv/g2plot';
const data = [
  { name:'炼钢厂', number: 138 },
  { name: '炼铁厂', number: 52 },
  { name: '动力厂', number: 61 },
  { name: '烧结厂', number: 145 },
  { name: '带钢厂', number: 48 },
];
export default {
    methods:{
    charts(){
       const bar = new Column('container',{
        data,
        xField: 'name',
        yField: 'number',
        seriesField: 'name',
        minColumnWidth: 50,
        maxColumnWidth: 50,
        legend: {
          layout: 'horizontal',
          position: 'top'
        },
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 100,
          },
          formatter(value){
            return value.number+"项"
          }
        },
    });
    bar.render();
    },
},
mounted:function(){
    this.charts();
  }
}
</script>

