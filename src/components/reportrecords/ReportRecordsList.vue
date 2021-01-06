<template>
    <a-table 
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="message"
       
        >
            <span slot="action" slot-scope="record,index">
                <a @click="handleUserEdit(index)">详情</a>
                <a-divider type="vertical" />
                <a @click="handleUserDel(index)">删除</a>
            </span>
        <!-- <a slot="name" slot-scope="text">{{ text }}</a>
         :pagination="pagination" -->

        
    </a-table>
    
  
</template>
<script>
    const columns = [
                    {
                        title:'序号',
                        dataIndex:'xh'
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
                        dataIndex: 'area_name',
                    },
                    {
                        title: '负责人编号',
                        dataIndex: 'manage_user',
                    },
                    {
                        title: '负责人姓名',
                        dataIndex: 'manage_user_name',
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
                        title: '操作',
                        dataIndex: 'action',
                        scopedSlots: { customRender:'action'},
                        align: 'center'
                    }
    ];
    
    const data = [
      {
        id: '1',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
      {
        id: '2',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
      {
        id: '3',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
      {
        id: '4',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
      {
        id: '5',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
    {
        id: '6',
        area_no:'linai',
        area_name: 'John Brown',
        manage_user:34567,
        manage_user_name: '数字信息化部-软件科',
        manage_phone: '科员',
        desc:'周检查',
        record_status:'周检查',
        create_time:'2021-1-18'
      },
    ];

export default {
   data(){
      return {
        columns,
        pagination:{
              defaultPageSize:10,
              showTotal: total => `共 ${total} 条数据`,
              showSizeChanger:true,
              pageSizeOptions: ['10'],
              onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
              hideOnSinglePage:false,
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


    /* .ant-table-wrapper {
        min-height: 40rem !important;
    } */
 
</style>