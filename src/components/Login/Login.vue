<template>
 <div class="LoginBody">
   <div class="BackGround"></div>
    <a-layout>
      <a-layout-header class="LayoutHeader"></a-layout-header>
      <a-layout-content class="LayoutContent">
        <div class="LoginForm">
          <br>
          <h2 class="title">隐患上报管理系统</h2>
          <br>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="Login-Form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'userName',
                  { rules: [{ required: true, message: '用户名不能为空!' }] },
                ]"
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(24,144,255,95)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'passWord',
                  { rules: [{ required: true, message: '密码不能为空!' }] },
                ]"
                type="password"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(24,144,255,95)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  },
                ]"
              >
                记住密码
              </a-checkbox>
              <a class="login-form-forgot" href="">
                忘记密码
              </a>
              <a-button type="primary" html-type="submit" class="login-form-button">
                登录
              </a-button>            
              <a @click="Regist()">
                立即注册
              </a>
            </a-form-item>
          </a-form>
        </div>
         <a-modal
          title="提示"
          :visible="confirmTipsVisible"
          :confirm-loading="confirmTipsLoading"
          @ok="handleConfirmTipsOk"
          @cancel="handleConfirmTipsCancel"
        >
      <p>{{ ModalText }}</p>
    </a-modal>
      </a-layout-content>
      <a-layout-footer class="LayoutFooter"></a-layout-footer>
    </a-layout>
 </div>
</template>

<script>
import Aes from '../../utils/aes.js'
import Api from '@/api/login/login.js'
export default {
  components:{
    Aes
  },
  data(){
       return {
          ModalText: '',
          confirmTipsVisible: false,
          confirmTipsLoading: false,
          ModalText:'',
          isSuccess:true
       }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      var that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let data = {
                       userName: values.userName,
                       passWord: values.passWord
          }

          let enc_after = Aes.encrypt(data);
          let globalstate = that.$store.state;
          let globalPath = that.$store.state.config.globalPath;
          let params = new URLSearchParams();
          params.append('aesData', enc_after);

      
          this.$axios({
            method: 'post',
            url: 'apis/jwt/login',
            data:params
          }).then(function (response) {
            console.log(response);
            if(response.data.isSuccess === false){
              that.isSuccess = false
              that.confirmTipsVisible = true
              that.ModalText = '用户名或密码错误,请重新登录'
              // that.$router.push('/login')
            }else{
              that.isSuccess = true
              that.confirmTipsVisible = true
              that.ModalText = '登陆成功,点击确定继续'
              that.$store.commit('changeLogin',{Authorization:response.data.content.token})
              that.$router.push('/index')
            }
          }).catch(function (error) {
              console.log(error);
          })
         
          
        }
      });
    },
    Regist(){
      this.$router.push('/Regist')
    },
    handleConfirmTipsOk(){
        this.ModalText = '';
        this.confirmLoading = true;
        setTimeout(() => {
          this.confirmTipsVisible = false;
          this.confirmTipsLoading = false;
        }, 100);
    },
    handleConfirmTipsCancel(){
      console.log('点击取消按钮........')
      this.confirmTipsVisible = false
    }
  },
};
</script>
<style lang="scss" >
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.title{
  font-size: 22px;
	text-align: center;
  text-shadow: blue($color:blue);
}
.LayoutHeader{
  width: 100%;
  height:190px !important;
  background-color:white !important; 
}
.LayoutContent{
  background-color: white;
}
.LayoutFooter{
  background-color: white !important;
}
.LoginForm{
  width: 25%;
  margin:0 auto;
  background-color: white;
  position: relative;
	overflow: hidden;
  border-radius: 17px;
  height: 300px !important;
  box-shadow:2px 2px 10px gray;
}
.Login-Form{
  width: 80%;
  margin: 0 auto !important;
}
.LoginBody{
  width: 100%;
  height: 100%;
}
.BackGround{
	display: block;
	position: absolute;
	z-index: 0;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: url(../../assets/login-bg.jpg) no-repeat;
	background-size: cover;
}
</style>