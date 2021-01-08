<template>
    <a-row>
      <report-records-detail
          :reportRecordsDetailVisible="rrdDetailVisible"
          :reportRecordsDetailContent="reportRDetail"
          :requestPicsContent="newRequestPics"
          @cancel="handleRrdDetailCancel()"
      >
      </report-records-detail>
      <a-table 
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="message"
        :pagination="pagination"
        >

           
         
            <span slot="action" slot-scope="record,index">
                <a @click="viewDetail(index)">详情</a>
                <a-divider type="vertical" />
                <a @click="deleteRecord(index)">删除</a>
            </span>
           
    </a-table>
    </a-row>
    
</template>
<script>

    const columns = [
                    {
                      title: '序号',
                      dataIndex: 'xh'
                    },
                    {
                        title:'ID',
                        dataIndex:'id'
                    },
                    {
                        title: '区域编号',
                        dataIndex: 'area_no'
                    },
                    {
                        title: '区域名称',
                        dataIndex: 'area_name'
                    },
                    {
                        title: '负责人编号',
                        dataIndex: 'manage_user'
                    },
                    {
                        title: '负责人姓名',
                        dataIndex: 'manage_user_name'
                    },
                    {
                        title: '负责人手机号',
                        dataIndex: 'manage_phone'
                    },
                    {
                        title: '隐患描述',
                        dataIndex: 'desc'
                    },
                    {
                        title: '记录状态',
                        dataIndex: 'status'
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'create_time'
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'update_time'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        scopedSlots: { customRender:'action'},
                        align: 'center'
                    }
    ];
import ReportRecordsDetail from './ReportRecordsDetail.vue'
import Aes from '../../utils/aes.js'
export default {
   components:{
     ReportRecordsDetail
   },
   data(){
      return {
        columns,
        recordId:'',
        reportRDetail:{},
        rrdDetailVisible:false,
        requestPics:[],
        newRequestPics:[],
        pagination:{
                defaultCurrent: 1, 
                defaultPageSize: 9, 
                total: 0, 
                pageSizeOptions: ["5", "10", "15", "20"],

                position:'both',
                showTotal: (total, range) => {
                  return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
                hideOnSinglePage:true,
                showQuickJumper:true
        }
    }
  },
  props:["message"],
  methods:{
      handleUserEdit(params){
        console.log(params)
      },
      handleUserDel(params){
        console.log(params)
      },
      customRender: function(t, r, index) {
        return parseInt(index) + 1
      },
      onShowSizeChange: (current, pageSize) => {
        this.pagination.defaultCurrent = 1
        this.pagination.defaultPageSize = pageSize
      },
      // 改变每页数量时更新显示
      onChange: (current, size) => {
        this.pagination.defaultCurrent = current
        this.pagination.defaultPageSize = size
        
      },
      viewDetail(index){
        let that = this
        this.recordId = index.id
        this.rrdDetailVisible = true
        let recordIdObj = {"id":this.recordId};
        let enc_after  = Aes.encrypt(recordIdObj);     
        let transfer = new URLSearchParams();
        transfer.append('aesData', enc_after); 
        this.$axios({
            method: 'post',
            url: 'apis/report/selectDetail',
            data:transfer
        }).then((response)=> {
            this.reportRDetail = response.data.data[0]
            this.requestPics = JSON.parse(response.data.data[0].images);

            let _repuestPics = this.requestPics
           
            this.newRequestPics = _repuestPics.map(function (item,index,_repuestPics) { 
                return that.$store.state.config.globalUploadPics + item; 
            }),
            console.log(this.newRequestPics)
           

        }).catch(function (error) {
            console.log(error);
        })
         
      },
      handleRrdDetailCancel(){
        this.rrdDetailVisible = false
      },
      //并发请求图片文件
      togetherRequestPics(){
        this.$axios.all([searchTopic(), searchs()])
        .then(() => {
            this.$axios.spread((res) => {

            })
          }
        );
      }


  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        })
      }
    }
  },
  mounted(){
    
  }
}
</script>
<style scoped>

</style>