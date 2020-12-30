<template>
  <a-modal
    :visible="visible"
    title='添加功能菜单'
    okText='完成'
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('ok') }"
  >
    <a-form layout='vertical' :form="formadd">
         <a-form-item label="功能名称">
            <a-input
                v-decorator="['username', { rules: [{ required: true, message: '请输入功能名称' }] }]"
            />
        </a-form-item>
        <a-form-item label="上级功能">
            <a-input-password
                v-decorator="['func_pid', { rules: [{ required: true, message: '' }] }]"
            />
        </a-form-item>
        <a-form-item label="功能路径">
            <a-input
                v-decorator="['func_address', { rules: [{ required: true, message: '请输入功能路径' }] }]"
            />
        </a-form-item>
        <a-form-item label="功能描述">
            <a-input
                v-decorator="['func_desc', { rules: [{ required: true, message: '请输入描述信息' }] }]"
            />
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