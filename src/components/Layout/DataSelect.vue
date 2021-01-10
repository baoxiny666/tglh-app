 <template>
    <a-row>
      <a-col :span="11" style="text-align:right">
        <a>请选择想要查看的数据：</a>
        <a-select default-value="各分厂上报数" style="width: 140px">
          <a-select-option :value="sbs"  @click="select1()">
          各分厂上报数
          </a-select-option>
        <a-select-option :value="cls" @click="select2()">
          各分厂处理数
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="1">
      </a-col>
      <a-col :span="12">
          <a>请选择时间范围：</a>
          <a-range-picker locale={locale}
            :ranges="{ 今日: [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
            @change="onChange"
          />
      </a-col>
      <a-col :span="24" style="height:40px"></a-col>
      <a-rows>

        <a-col :span="12">
            <div id="colContainer"></div>
            <!-- <data-charts :colChartsData="chartsData"></data-charts> -->
        </a-col>

        <a-col :span="12">
          <div id="pieContainer"></div>
          <!-- :pieChartsData="chartsData" -->
            <!-- <pie-charts :pieChartsData="chartsData"></pie-charts> -->
        </a-col>
      </a-rows>
  </a-row>
  
</template>
<script>
import { Column } from '@antv/g2plot';

import { Pie } from '@antv/g2plot';


import Aes from '../../utils/aes.js'
import moment from 'moment';
import locale from 'ant-design-vue/es/locale/zh_CN'
import "moment/locale/zh-cn"
export default {
  data() {
    return {
      flag:0,
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      start_time:'',
      end_time:'',
      status:'',
      sbs:'-1',
      cls:'3',
      pieChartsData:[],
      columnChartsData:[],
      colPlot:{},
      piePlot:{}
    };
  },
  components:{
      

  },
  methods: {
    moment,
    
    onChange(dates, dateStrings) {
      this.start_time = dateStrings[0]
      this.end_time = dateStrings[1]
      this.dataChartsApi("date")
    },
    handleChange(value) {
      alert(value)
    },
    select1(){
      this.status =  ""
      this.dataChartsApi("select1")
    },
    select2(){
      this.status =  this.cls
      this.dataChartsApi("select2")
    },
    dataChartsApi(params){
      let data
      let that = this
      if(params == undefined){
        data = {
          start_time:"",
          end_time:"",
          status:""
        } 
      }else{
         data = {
          start_time:this.start_time,
          end_time:this.end_time,
          status:this.status
        } 
      }
      let enc_after  = Aes.encrypt(data);     
      let transfer = new URLSearchParams();
      transfer.append('aesData', enc_after); 
      this.$axios({
          method: 'post',
          url: 'apis/statistic/selectDataCharts',
          data:transfer
      }).then((response)=> {
          that.pieChartsData = response.data.data.pieCharts;
          that.columnChartsData = response.data.data.columnCharts;
          
          if(that.flag == 0){
            that.colCharts()
            that.pieCharts()
            that.flag = 1;
          }
         
      }).catch(function (error) {
            console.log(error);
      })
    },colCharts(){
      let that = this
         this.colPlot = new Column('colContainer',{
            data:that.columnChartsData,
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
        })
        this.colPlot.render()
              
    },
    pieCharts(){
        let that = this
        this.piePlot = new Pie('pieContainer', {
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
        this.piePlot.render();
    }

  },
  mounted(){
    this.dataChartsApi()

    
  },watch:{
      columnChartsData(a,b){
        
        this.colPlot.changeData(a)
        this.colPlot.render()
        
      },
      pieChartsData(a,b){
            this.piePlot.changeData(a)
        this.piePlot.render()
       

      }
  }
};
</script>
<style lang="scss">

</style>