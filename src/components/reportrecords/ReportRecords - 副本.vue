<template>
    <a-layout>
        <a-layout-header class="layout-ua-header">
            <form id="myform" name="myform" method="post" action="/apis/report/export" target="iframe">
        　　　　<input type="hidden" name="aesData" :value="excelParams">
            </form>
            <iframe id="iframe" name="iframe" style="display:none"></iframe>
            <a-form layout="inline" class="layout-form" :form="reportRecordConditionForm" >
                 <a-space :size="size">
                    <a-form-item label="关键字">
                        
                        <a-input-search  v-model="search"   @search="onSearchInput()" placeholder="请输入搜索内容" v-decorator="[
                                    'search'
                                ]">
                            <a-icon type="filter" slot="prefix" />
                        </a-input-search>
                    </a-form-item>
                    <a-form-item label="区域选择">
                        <a-cascader v-decorator="[
                                    'depart_area_select'
                                ]"  :options="departAreaOptions" placeholder="请选择" @change="departAreaChange" />
                    </a-form-item>
                    <a-form-item label="状态选择">
                            <a-select   style="width: 120px"
                                v-decorator="[
                                    'status'
                                ]"
                               
                                placeholder=""
                                @change="statusChange"
                                >
                                
                                <a-select-option  v-for="item in reportRecordOptions"  :key="item.id" :value="item.flag">
                                    {{ item.name }}
                                </a-select-option>
                                
                            </a-select>
                        </a-form-item>
                        <a-form-item label="时间选择">
                            <a-config-provider >
                                    <a-range-picker v-decorator="[
                                    'time_select'
                                ]"
                                        @change="onRepRecordsDateChange"
                                    >
                                    </a-range-picker>
                            </a-config-provider  >
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" icon="search" @click="handleReportRecordsSubmit">
                                搜索
                            </a-button>  
                        </a-form-item>
                   
                        <a-form-item>
                            <a-button type="danger" @click="exportExcel"  icon="cloud-download">
                                导出数据
                            </a-button>
                        </a-form-item>
                     </a-space>
            </a-form>
        </a-layout-header>
        <a-layout-content class="layout-ua-content">
            <report-records-list style="height:710px !important;overflow:auto" :message="reportRecordData"></report-records-list>
        </a-layout-content>
        <a-layout-footer class="layout-ua-footer">
        </a-layout-footer>
    </a-layout>
    
</template>

<script> 
    import Aes from '../../utils/aes.js'
    import ReportRecordsList from './ReportRecordsList'
    import zhCn from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import Api from '@/api/reportrecords/reportrecords.js'
    export default {
        components: {
            ReportRecordsList
        },
        data() {
            return {
                statusDefault:-1,
                departAreaDefault:-1,
                size:'middle',
                visible: false,
                dateFormat: 'YYYY/MM/DD',
                monthFormat: 'YYYY/MM',
                departAreaOptions:[],
                reportRecordOptions:[],
                transferParams:{},
                start_time:'',
                end_time:'',
                depart_id:'',
                area_no:'',
                search:'',
                status:'',
                locale:zhCn,
                reportRecordConditionForm: this.$form.createForm(this, { name: 'coordinated' }),
                reportRecordData:[],
                excelParams:{},
                authorize:localStorage.getItem("Authorization")
                
            }
        },
        watch: {
                search(newValue, oldValue) {
                    console.log(newValue)
                }
        },
        methods: {
           
                reportRecordListApi(params){
                    let data;
                    if(params == undefined){
                        data = {
                            start_time:this.start_time,
                            end_time:this.end_time,
                            area_no:this.area_no,
                            depart_id:this.depart_id,
                            search:this.search,
                            status:this.status
                        } 
                    }else{
                        data = params;
                    }

                    
                    let enc_after  = Aes.encrypt(data);
                   
                    let transfer = new URLSearchParams();
                    transfer.append('aesData', enc_after); 
                    this.excelParams = enc_after;
                    //let reportRecordList = await Api.reportRecordListApi(total);
                   

                    this.$axios({
                        method: 'post',
                        url: 'apis/report/select',
                        data:transfer
                    }).then((response)=> {
                       this.reportRecordData = response.data.data
                    }).catch(function (error) {
                        console.log(error);
                    })


                },
                async initDepartFactory(){
                    let departArea = await  Api.getDepartArea();
					this.departAreaOptions = departArea
					
                },
                async initReportStatus(){
                    let reportStatus = await  Api.getReportStatus();
					this.reportRecordOptions = reportStatus
                },
                handleReportRecordsSubmit(){
                    let that = this
                    this.reportRecordConditionForm.validateFields((err, values) => {
                        if (!err) {
                            console.log('Received values of form: ', values);   
                            that.transferParams = values;
                            console.log("回到"+that.transferParams.depart_area_select)
                            that.status = that.transferParams.status == "-1"?"":that.transferParams.status
                            that.depart_id =  that.transferParams.depart_area_select == undefined || that.transferParams.depart_area_select[0] == "-1"?
                                                 "": that.transferParams.depart_area_select[0]
                            that.area_no =  that.transferParams.depart_area_select == undefined  || that.transferParams.depart_area_select[1] == undefined?
                                                 "": that.transferParams.depart_area_select[1]
                            that.transferParams["depart_id"] =  that.depart_id
                            that.transferParams["area_no"] =  that.area_no
                            that.transferParams["start_time"] = that.start_time
                            that.transferParams["end_time"] =  that.end_time
                            that.transferParams["status"] = that.status

                            that.reportRecordListApi(that.transferParams);
         
                        }
                    });
                },
                exportExcel(){
                    let exportForm = document.getElementById("myform");
                    exportForm.submit();
                   
                },
                onRepRecordsDateChange(dates, dateStrings) {
                    this.start_time =  dateStrings[0];
                    this.end_time = dateStrings[1];
                    this.reportRecordListApi();
                   
                },
                departAreaChange(value){

                    if(value[0] === "-1"){
                        this.depart_id = "";
                        this.area_no = ""; 
                    }else{
                        this.depart_id = value[0];
                        this.area_no = value[1]; 
                    }
                    
                    this.reportRecordListApi();
                },
                statusChange(value){
                    if(value === "-1"){
                        this.status = "";
                    }else{
                        this.status = value;
                    }
                    
                    this.reportRecordListApi();
                },
                
                onSearchInput(){
                    
                    this.reportRecordListApi()
                }
                // ,getCurrentLData(){
                //     return this.getDay(0);
                // },
                // getCurrentRData(){
                //     return this.getDay(0);
                // }
                // ,getDay(day) {
                //     var today = new Date();
                //     var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
                //     today.setTime(targetday_milliseconds); //注意，这行是关键代码
                //     var tYear = today.getFullYear();
                //     var tMonth = today.getMonth();
                //     var tDate = today.getDate();
                //     tMonth = this.doHandleMonth(tMonth + 1);
                //     tDate = this.doHandleMonth(tDate);
                //     return tYear + "-" + tMonth + "-" + tDate;
                // },
                // // 处理月份数据
                // doHandleMonth(month) {
                //     var m = month;
                //     if (month.toString().length === 1) {
                //         m = "0" + month;
                //     }
                //     return m;
                // }
            },
            mounted(){
                this.initDepartFactory();
                this.initReportStatus();
                this.reportRecordListApi()
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