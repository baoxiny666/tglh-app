 <template>
 <a-row>
      <a-col :span="15">
        <a>请选择想要查看的数据：</a>
      <a-select default-value="各分厂上报数" style="width: 140px" @change="handleChange">
      <a-select-option value="0" @click="select1()" :FactoryName="name">
       各分厂上报数
      </a-select-option>
      <a-select-option value="1" @click="select2()" :FactoryName="name">
        各分厂处理数
      </a-select-option>
    </a-select>
      </a-col>
      <a-col :span="9">
          <a>请选择时间范围：</a>
    <a-range-picker locale={locale}
      :ranges="{ 今日: [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
      @change="onChange"
    />
      </a-col>
    </a-row>
</template>
<script>
import moment from 'moment';
import locale from 'ant-design-vue/es/locale/zh_CN'
import "moment/locale/zh-cn"
export default {
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      name:'上报数'
    };
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    select1(){
        this.name='上报数'
    },
    select2(){
        this.name='处理数'
    }
      },
};
</script>
<style lang="scss">
</style>