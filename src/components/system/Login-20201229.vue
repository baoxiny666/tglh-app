<template>
    <a-layout class="backimg">
      <a-layout-header class="header-content"></a-layout-header>
      <a-layout-content  class="middle-content">
          <div class="login-container">
            <a-row  class="login-container-row">
              <a-col :span="8"></a-col>
              <a-col :span="8" class="login_form_outer">
                <div class="login_form_input">
                  <div class="login_form_input_inner">
                    <a-form 
                        id="components-form-demo-normal-login"
                        :form="form"
                        @submit="handleSubmit"
                        class="login-form"
                      >   
                          <div class="login-form-title">隐患上报后台管理</div>
                          <a-form-item class="inputBox">
                            <a-input 
                              v-decorator="[
                                'userName',
                                { rules: [{ required: true, message: '请输入您的用户名!' }] },
                              ]"
                              placeholder="用户名"
                            >
                              <a-icon slot="prefix" type="user" style="color: rgba(24,144,255,.95)" />
                            </a-input>
                          </a-form-item>
                          <a-form-item class="inputBox">
                            <a-input 
                              v-decorator="[
                                'password',
                                { rules: [{ required: true, message: '请输入密码!' }] },
                              ]"
                              type="password"
                              placeholder="密码"
                            >
                              <a-icon slot="prefix" type="lock" style="color: rgba(24,144,255,.95)" />
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
                            
                            </a>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                              登录
                            </a-button>
                            Or
                            <a href="/user/reg">
                              还没有账号，去注册
                            </a>
                          </a-form-item>
                      </a-form>
                  </div>
                </div>

              </a-col>
              <a-col :span="8"  >

              </a-col>
            </a-row>
          </div>
    </a-layout-content>
    <a-layout-footer class="footer-content"></a-layout-footer>
  </a-layout>
</template>



<script>
    export default ({
      name: 'Login',
      components:{
      },

      beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
      },
      methods: {
       
        handleSubmit(e) {
          e.preventDefault();
          let that = this
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              that.$router.push("/index")
            }
          });
        }
      }
    })
</script>
<style>
  .footer-content {
     background: url("../../assets/background.svg") no-repeat !important;
  }
  .backimg{
    width:100%;
    height:100%;
    background: url("../../assets/background.svg") no-repeat !important;
    background-size: 100% 100% !important;
    overflow:hidden;
  }


  .font-color{
    color:	rgb(0,191,255);
    font-size: 1.5rem;
  }

  .login_form_outer{
    width:100%;
    height:45rem !important;
   
  }

  .login_form_input{
    width: 29rem;
    height: 22rem;
    margin: 12rem 5rem 12rem 5rem ;
    background-color: rgba(176, 196, 222, 0.2);
    border-radius: 0.5rem;
    border-color: rgba(176, 196, 222, 0.2);
  }

  .login_form_input_inner{
    width:25rem;
    height: 22rem;
    margin: 0 auto;
  }

  /* .login-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  } */
  .login-container-row{
    height:45rem !important
  }

  .login-form-title{
    width:100%;
    height:5rem;
    line-height:5rem;
    font-size:1.8rem;
    color:#000000;
    text-align: center;
  }
 
  /*中上下布局*/
  .middle-content{
    height:50rem !important
  }

  .footer-content{
    height: 10rem !important
  }
  .header-content{
    height:5rem !important;
    background:rgba(0,0,0,0) !important
  }





#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  height:2.5rem;
}


</style>
