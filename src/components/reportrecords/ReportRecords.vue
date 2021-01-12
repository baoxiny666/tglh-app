<template>
    <a-layout>
        <a-layout-header class="layout-ua-header">
            <form id="myform" name="myform" method="post" action="/apis/report/export" target="iframe">
        　　　　<input type="hidden" name="aesData" :value="excelParams">
            </form>
            <iframe id="iframe" name="iframe" style="display:none"></iframe>
               <a-row>
              <a-form layout="inline" class="layout-form" :form="reportRecordConditionForm" >
            <a-col :span="7" style="width:270px">
                    <a-form-item label="关键字">
                        <a-input-search v-model="search"   @search="onSearchInput()" placeholder="请输入搜索内容" v-decorator="[
                                    'search'
                                ]" class="input-serach">
                            <a-icon type="filter" slot="prefix" />
                        </a-input-search>
                    </a-form-item>
            </a-col>
            <a-col :span="6" style="width:190px">
                <a-form-item label="区域选择">
                    <a-cascader v-decorator="[
                        'depart_area_select'
                    ]"  :options="departAreaOptions" placeholder="请选择" @change="departAreaChange" class="cascader"/>
                    </a-form-item>
            </a-col>
             <a-col :span="5" style="width:210px">
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
            </a-col>
            <a-col :span="6" style="width:350px">
                        <a-form-item label="时间选择">
                            <a-config-provider>
                                    <a-range-picker   class="timepicker" v-decorator="[
                                    'time_select' 
                                ]"
                                     :ranges="{ 今日: [moment(), moment()] }"
                                        @change="onRepRecordsDateChange"
                                    >
                                    </a-range-picker>
                            </a-config-provider  >
                        </a-form-item>
                 </a-col>
                 <a-col :span="5"> 
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
                        
                 </a-col>
                   </a-form>   
            </a-row>     
                                              
        </a-layout-header>
        <a-layout-content class="layout-ua-content">
            <report-records-list style="height:710px !important;overflow:auto" v-on:receivePageHelper="receivePageHelper"  :message="reportRecordData" :zongji="zongji"></report-records-list>
        </a-layout-content>
        <a-layout-footer class="layout-ua-footer">
        </a-layout-footer>
    </a-layout>
    
</template>

<script> 
    
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn')
    import store from '../../store/index.js'
    import locale from 'antd/lib/date-picker/locale/zh_CN';
    import "moment/locale/zh-cn"
    import Aes from '../../utils/aes.js'
    import ReportRecordsList from './ReportRecordsList'
    import Api from '@/api/reportrecords/reportrecords.js'
    export default {
        components: {
           
            ReportRecordsList
        },
        data() {
            return {
                zongji:'',
                statusDefault:-1,
                departAreaDefault:-1,
                defaultCurrent:'',
                defaultPageSize:'',
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
                locale:locale,
                reportRecordConditionForm: this.$form.createForm(this, { name: 'coordinated' }),
                reportRecordData:[],
                excelParams:{},
                authorize:localStorage.getItem("Authorization")
                
            }
        },
        methods: {
                moment,
                //接收 分页条件
                receivePageHelper:function(params){
                    this.defaultCurrent = params.defaultCurrent
                    this.defaultPageSize = params.defaultPageSize
                    this.reportRecordListApi();
                },
                reportRecordListApi(params){
                    let data;
                    let that = this
                    if(params == undefined){
                        data = {
                            start_time:this.start_time,
                            end_time:this.end_time,
                            area_no:this.area_no,
                            depart_id:this.depart_id,
                            search:this.search,
                            status:this.status,
                            currentPage:this.defaultCurrent,
                            pageSize:this.defaultPageSize
                        } 
                    }else{
                        data = params;
                    }

                    
                    let enc_after  = Aes.encrypt(data);
                    let path =this.$store.state.config.globalPath
                    let transfer = new URLSearchParams();
                    transfer.append('aesData', enc_after); 
                    this.excelParams = transfer;
                    //let reportRecordList = await Api.reportRecordListApi(total);
                   

                    this.$axios({
                        method: 'post',
                        url: path+'/report/select',
                        data:transfer
                    }).then((response)=> {
                        that.reportRecordData = response.data.data.content
                        that.zongji = response.data.data.totalSize
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
                            that.transferParams["currentPage"] = that.defaultCurrent
                            that.transferParams["pageSize"] = that.defaultPageSize
                            that.reportRecordListApi(that.transferParams);
         
                        }
                    });
                },
                exportExcel(){
                    // let exportForm = document.getElementById("myform");
                    // exportForm.submit();
                    let path =this.$store.state.config.globalPath
                    this.$axios({
                        method: 'post',
                        url: path+'/report/export',
                        data:this.excelParams,
                        responseType: 'blob'
                    }).then((response)=> {
                        this.download(response)
                    }).catch(function (error) {
                        console.log(error);
                    })
                   
                },
                download(data){
                    if (!data) {
                        return
                    }
                    // new Blob([data])用来创建URL的file对象或者blob对象
                    let url = window.URL.createObjectURL(new Blob([data])); 
                    // 生成一个a标签
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    // 生成时间戳
                    let timestamp="隐患上报记录"+new Date().getTime();   
                    link.download = timestamp + ".csv";   
                    document.body.appendChild(link);
                    link.click();
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
                // this.reportRecordListApi()
            }
    }
</script>

<style> 
    .layout-form{
        margin-top: 0.2rem !important;
        display: flex !important;;
        flex-direction: row !important;
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
    .input-serach{
        width:190px!important
    }
    .cascader{
        width: 100px!important;
    }
    .timepicker{
        width: 260px;
    }
</style>