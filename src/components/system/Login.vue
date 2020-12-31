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
                  'password',
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
      </a-layout-content>
      <a-layout-footer class="LayoutFooter"></a-layout-footer>
    </a-layout>
 </div>
</template>

<script>
import Aes from '../../utils/aes.js'
export default {
  components:{
    Aes
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
                       username: values.username,
                       password: values.password
          }
          debugger;
          let enc_after = Aes.encrypt(data);
          console.log(enc_after)
          console.log(Aes.decrypt(enc_after))
          console.log(that.$store.state.config.globalPath)
          
          // axios.post('/user/check', {
          //     enc_after
          // }).then(function (response) {
          //     console.log(response);
          // })
          // .catch(function (error) {
          //     console.log(error);
          // });
          this.$router.push('/index')
        }
      });
    },
    Regist(){
      this.$router.push('/Regist')
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