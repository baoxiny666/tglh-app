<template>
    <a-layout>
        <a-layout-header class="layout-ua-header">
            <a-form layout="inline" class="layout-form" :form="formReportRecords" @submit="handleReportRecordsSubmit">
                 <a-space :size="size">
                    <a-form-item>
                        <a-input placeholder="请输入搜索内容">
                            <a-icon type="filter" slot="prefix" />
                            <!-- <a-icon type="user" style="color:rgba(0,0,0,.25)" /> -->
                        </a-input>
                    </a-form-item>
                
                    <a-form-item label="状态选择">
                            <a-select  default-value="0" style="width: 120px"
                                v-decorator="[
                                    'record_status',
                                    { 
                                        rules: [{ required: true, message: '请选择状态' }] 
                                    }
                                ]"
                                placeholder=""
                                @change="handleRecordsSelectChange"
                                >
                                <a-select-option value="0">
                                    新增
                                </a-select-option>
                                <a-select-option value="1">
                                    已审核
                                </a-select-option>
                                <a-select-option value="2">
                                    未通过
                                </a-select-option>
                                <a-select-option value="3">
                                    已处理
                                </a-select-option>
                                <a-select-option value="4">
                                    已归档
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <a-range-picker
                                :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                                @change="onRecordsChange"
                            ></a-range-picker>
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
                     </a-space>
            </a-form>
        </a-layout-header>
        <a-layout-content class="layout-ua-content">
            <report-records-list></report-records-list>
        </a-layout-content>
        <a-layout-footer class="layout-ua-footer">
        </a-layout-footer>


        <user-add
                ref="formadd"
                :visible="visible"
                @cancel="dialogStatus==='add'?handleCancel():handleEditCancel()"
                @ok="dialogStatus==='add'?handleOk():handleEditOk()"
        />
    </a-layout>
    
</template>

<script> 
    import ReportRecordsList from './ReportRecordsList'
    export default {
        components: {
            ReportRecordsList
        },
        data() {
            return {
                size:67,
                formadd: this.$form.createForm(this),
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
                handleSubmit(e) {
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
                },
                handleReportRecordsSubmit(){
                    
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