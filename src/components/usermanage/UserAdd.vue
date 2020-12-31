<template>
  <a-modal
    :visible="visible"
    title='添加用户'
    okText='完成'
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('ok') }"
  >
    <a-form layout='vertical' :form="formadd">
         <a-form-item label="用户名">
            <a-input
                v-decorator="['username', { rules: [{ required: true, message: '请输入您的用户名' }] }]"
            />
        </a-form-item>
        <a-form-item label="密码">
            <a-input-password
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
            />
        </a-form-item>
        <a-form-item label="姓名">
            <a-input
                v-decorator="['name', { rules: [{ required: true, message: '请输入真实姓名' }] }]"
            />
        </a-form-item>
        <a-form-item label="手机号">
            <a-input
                v-decorator="['telephone', { rules: [{ required: true, message: '请输入11位手机号码' }] }]"
            />
        </a-form-item>
        <a-form-item label="所属部门">
            <a-cascader :options="options" placeholder="请选择所属部门信息" :required="true"/>
        </a-form-item>
        <a-form-item label="职务">
            <a-select
                mode="multiple"
                style="width: 100%"
                placeholder="请选择"
                @change="handleDutyChange"
            >
                <a-select-option v-for="item in dutyData" :key="item.label">
                    {{item.label}}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="功能菜单">
            <a-select
                mode="multiple"
                style="width: 100%"
                placeholder="请选择"
                @change="handleFuncChange"
            >
                <a-select-option v-for="item in funcData" :key="item.label">
                    {{item.label}}
                </a-select-option>
            </a-select>
        </a-form-item>
    </a-form>
  </a-modal>

</template>

<script>
  export default {
    name: 'UserAdd',
    props: ['visible'],
    data () {
        return {
                formadd: this.$form.createForm(this),
                options: [
                            {
                                label: '数字信息化部',
                                value: 'xxhb',
                                children: [
                                            {
                                                label: '软件科',
                                                value: 'rjk'
                                            },
                                            {
                                                label: '通讯科',
                                                value: 'txk'
                                            },
                                            {
                                                label: '网络科',
                                                value: 'wlk'
                                            }
                                        ]
                            },
                            {
                                label: '炼铁厂',
                                value: 'ltc',
                                children: [
                                            {
                                                label: '一号高炉',
                                                value: 'yhgl'
                                            },
                                            {
                                                label: '二号高炉',
                                                value: 'ehgl'
                                            }
                                ]
                            }
                    ],
                    dutyData:[
                        {
                            "label":"超级管理员",
                            "value":"0"
                        },
                        {
                            "label":"隐患上报审核",
                            "value":"0"
                        },
                        {
                            "label":"隐患上报处理",
                            "value":"1"
                        },
                        {
                            "label":"隐患上报归档",
                            "value":"2"
                        },
                        {
                            "label":"点检审核",
                            "value":"4"
                        },
                        {
                            "label":"点检处理",
                            "value":"5"
                        }
                    ],
                    funcData:[
                        {
                            "label":"扫码管理",
                            "value":"0"
                        },
                        {
                            "label":"点检管理",
                            "value":"1"
                        },
                        {
                            "label":"系统管理",
                            "value":"2"
                        }
                    ]

                    
        }
    },
    methods:{
        handleDutyChange(value) {
            console.log(`selected ${value}`);
        },
        handleFuncChange(value) {
            console.log(`selected ${value}`);
        },
    }
    
  }
</script>

<style scoped>

</style>