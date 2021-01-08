<template>
    <a-table 
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        >
            <span slot="action" slot-scope="record,index">
                <a @click="handleUserEdit(index)">编辑</a>
                <!-- <a-divider type="vertical" />
                <a @click="handleUserDel(index)">删除</a> -->
            </span>
        <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
    </a-table>
  
</template>
<script>
const columns = [
  {
      title:'序号',
      dataIndex:'id'
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '员工编号',
    dataIndex: 'userno',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '所属部门',
    dataIndex: 'department',
  },
  {
    title: '职务',
    dataIndex: 'post'
  },
   {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
];
const data = [
  {
    id: '1',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
  {
    id: '2',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
   {
    id: '3',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
   {
    id: '4',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
   {
    id: '5',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
  {
    id: '6',
    username:'linai',
    name: 'John Brown',
    userno:34567,
    department: '数字信息化部-软件科',
    post: '科员',
  },
];

export default {
  data() {
    return {
        data,
        columns,
        pagination:{
              defaultPageSize:2,
              showTotal: total => `共 ${total} 条数据`,
              showSizeChanger:true,
              pageSizeOptions: ['2', '10', '15', '20'],
              onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
              hideOnSinglePage:false,
              showQuickJumper:true
        }
    };
  },
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
  }
}
</script>
<style scoped>


    /* .ant-table-wrapper {
        min-height: 40rem !important;
    } */
 
</style>