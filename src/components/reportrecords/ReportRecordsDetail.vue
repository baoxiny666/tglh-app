<template>
    <a-modal
            :visible="reportRecordsDetailVisible"
            title='详情'
            okText='完成'
            @cancel="() => { $emit('cancel') }"
    >
        <a-form layout='vertical'>
            <a-form-item label="区域编号">
                <a-input v-decorator="['area_no']" :value="reportRecordsDetailContent.area_no"/>
            </a-form-item>
            <a-form-item label="区域名称">
                <a-input v-decorator="['area_name']" :value="reportRecordsDetailContent.area_name"/>
            </a-form-item>
            <a-form-item label="部门名称">
                <a-input
                    v-decorator="['depart_name']" :value="reportRecordsDetailContent.depart_name"
                />
            </a-form-item>
            <a-form-item label="负责人编号">
                <a-input
                    v-decorator="['manage_user']" :value="reportRecordsDetailContent.manage_user"
                />
            </a-form-item>
            <a-form-item label="负责人姓名">
                <a-input
                    v-decorator="['manage_user_name']" :value="reportRecordsDetailContent.manage_user_name"
                />
            </a-form-item>
            <a-form-item label="负责人手机号">
                <a-input
                    v-decorator="['manage_phone']" :value="reportRecordsDetailContent.manage_phone"
                />
            </a-form-item>
            <a-form-item label="隐患描述">
                <a-textarea v-decorator="['desc']"  :rows="4" :value="reportRecordsDetailContent.desc" />
            </a-form-item>
            <a-form-item label="隐患照片">
                <a-card hoverable style="width: 400px">
                    <viewer  :images="requestPicsContent">
                        <img v-for="src in requestPicsContent" :src="src" :key="src" width="100%"/>
                    </viewer>
                </a-card>
            </a-form-item>

            <a-form-item label="记录状态">
                <a-input
                    v-decorator="['status']" :value="reportRecordsDetailContent.status"
                />
            </a-form-item>
            <a-form-item label="添加记录用户">
                <a-input
                    v-decorator="['record_user_no']" :value="reportRecordsDetailContent.record_user_no"
                />
            </a-form-item>
            <a-form-item label="记录用户名称">
                <a-input
                    v-decorator="['record_user_name']" :value="reportRecordsDetailContent.record_user_name"
                />
            </a-form-item>
             <a-form-item label="用户手机号">
                <a-input
                    v-decorator="['record_user_phone']" :value="reportRecordsDetailContent.record_user_phone"
                />
            </a-form-item>
             <a-form-item label="记录提交地理坐标">
                <a-input
                    v-decorator="['record_location']" :value="reportRecordsDetailContent.record_location"
                />
            </a-form-item>
            <a-form-item label="记录提交地理坐标名称">
                <a-input
                    v-decorator="['record_location_name']" :value="reportRecordsDetailContent.record_location_name"
                />
            </a-form-item>
            <a-form-item label="创建时间">
                <a-input
                    v-decorator="['create_time']" :value="reportRecordsDetailContent.create_time"
                />
            </a-form-item>
             <a-form-item label="更新时间">
                <a-input
                    v-decorator="['update_time']" :value="reportRecordsDetailContent.update_time"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    data() {
        return  {
            
        }
    },
    props:["reportRecordsDetailVisible","reportRecordsDetailContent","requestPicsContent"],
    mounted(){

    }
}
</script>

<style>

</style>