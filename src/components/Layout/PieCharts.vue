<template>
    <div id="container1"></div>
</template>
<script>

import { Pie } from '@antv/g2plot';
const data = [
  { type:'炼钢厂', value: 138 },
  { type: '炼铁厂', value: 52 },
  { type: '动力厂', value: 61 },
  { type: '烧结厂', value: 145 },
  { type: '带钢厂', value: 48 },
];
export default {
    methods:{
        piecharts(){
            let that = this
            const piePlot = new Pie('container1', {
                appendPadding: 10,
                data:that.pieChartsData,
                angleField: 'value',
                colorField: 'type',
                radius: 0.8,
                label: {
                    type: 'spider',
                    content: '{name} {percentage}',
                },
                legend: {
                    layout: 'horizontal',
                    position: 'top'
                },   
                interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
            });
            piePlot.render();
            piePlot.changeData(that.pieChartsData);
        }
    },
    watch: {
        pieChartsData: function(newVal,oldVal){
 
         }
    },
    props:["pieChartsData"],
    mounted:function(){
        this.piecharts();
    }
}
</script>



