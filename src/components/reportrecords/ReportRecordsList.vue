<template>
    <a-table 
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="message"
        :pagination="pagination"
        >
            <span slot="action" slot-scope="record,index">
                <a @click="handleUserEdit(index)">详情</a>
                <a-divider type="vertical" />
                <a @click="handleUserDel(index)">删除</a>
            </span>
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
export default {
   data(){
      return {
        columns,
        pagination:{
              position:'both',
              defaultPageSize:9,
              showTotal: total => `共 ${total} 条数据`,
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

</style>