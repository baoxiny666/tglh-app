<template>
    <a-layout>
        <a-layout-header class="layout-ua-header">
            <a-form layout="inline" class="layout-form" :form="functionform" @submit="handleFunctionSubmit">
                <a-form-item>
                    <a-input placeholder="搜索功能名称">
                        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" icon="search">
                        搜索
                    </a-button>  
                </a-form-item>
                <a-form-item>
                    <a-button type="danger" @click="showModal">
                        增加
                    </a-button>
                </a-form-item>
            </a-form>
           
        </a-layout-header>
        <a-layout-content class="layout-ua-content">
            <user-list></user-list>
        </a-layout-content>
        <a-layout-footer class="layout-ua-footer">
           
        </a-layout-footer>


        <user-add
                ref="functionadd"
                :visible="visible"
                @cancel="dialogStatus==='add'?handleCancel():handleEditCancel()"
                @ok="dialogStatus==='add'?handleOk():handleEditOk()"
        />
    </a-layout>
    
</template>

<script> 
    import FunctionList from './FunctionList.vue';
    import FunctionAdd from './FunctionAdd.vue';
    export default {
        components: {
            FunctionList,
            FunctionAdd
        },
        data() {
            return {
                dialogStatus:'',
                visible: false
            }
        },
        methods: {
                onCellChange(key, dataIndex, value) {
                    const dataSource = [...this.dataSource];
                    const target = dataSource.find(item => item.key === key);
                    if (target) {
                        target[dataIndex] = value;
                        this.dataSource = dataSource;
                    }
                },
                onDelete(key) {
                    const dataSource = [...this.dataSource];
                    this.dataSource = dataSource.filter(item => item.key !== key);
                },
                handleAdd() {
                    const { count, dataSource } = this;
                    const newData = {
                        key: count,
                        name: `Edward King ${count}`,
                        age: 32,
                        address: `London, Park Lane no. ${count}`,
                    };
                    this.dataSource = [...dataSource, newData];
                    this.count = count + 1;
                },
                handleFunctionSubmit(e) {
                    e.preventDefault();
                    this.form.validateFields((err, values) => {
                        if (!err) {
                            console.log('Received values of form: ', values);
                        }
                    })
                },
                showModal() {
                    this.visible = true;
                    this.dialogStatus = 'add';
                },
                handleCancel() {
                    this.visible = false;
                    this.dialogStatus=''
                    console.log('add cancel')
                },
                handleOk(){
                    console.log('add ok')
                },
                //处理编辑的方法
                showEditModal(){
                    this.type = 'edit';
                    this.visible = true;
                },
                handleEditCancel(){
                    this.visible = false;
                    this.dialogStatus = ''
                    console.log('edit cancel')
                },
                handleEditOk(){
                    this.visible = true;
                    console.log('edit ok')
                }
            }
    }
</script>

<style> 
    .layout-form{
        margin-top: 0.2rem !important;
    }
    .layout-ua-header{
        width:100% !important;
        height:3rem !important;
        background: #fbfbfc !important;
    }

    .layout-ua-content{
        width:100% !important;
        height:45rem !important;
    }

    .layout-ua-footer{
        width:100% !important;
        height:2rem !important;
    }
</style>