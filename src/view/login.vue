<template>
  <div class="authentication-wrapper authentication-3">
    <div class="authentication-inner" style="background-image: url('/static/imgs/bg.jpg');background-size: cover;background-repeat: no-repeat">
      <div class="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5" >
      </div>
      <div class="d-flex col-lg-4 align-items-center bg-white p-5">
        <div class="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
          <div class="w-100">
            <div class="d-flex justify-content-center align-items-center">
              <div >
                <div class="w-100 position-relative" >
                  <img src="../../static/imgs/logo@2x.jpg" alt="" width="100" height="100 ">
                </div>
              </div>
            </div>
            <!-- / Logo -->

            <h4 class="text-center text-lighter font-weight-normal mt-5 mb-0">登录你的账号</h4>

            <!-- Form -->
            <form class="my-5">
              <b-form-group label="账号">
                <b-input v-model="credentials.email" />
              </b-form-group>
              <b-form-group>
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>密码</div>
                  <!--<a href="javascript:void(0)" class="d-block small">忘记密码?</a>-->
                </div>
                <b-input type="password" v-model="credentials.password" />
              </b-form-group>

              <div class="d-flex justify-content-between align-items-center m-0">
                <!--<b-check v-model="credentials.rememberMe" class="m-0">记住密码</b-check>-->
                <b-btn  style="background-color: rgb(255, 64, 129);float: right" @click.once="loginPost()">登录</b-btn>
              </div>
            </form>
            <!-- / Form -->

            <div class="text-center text-muted">
              <!--Don't have an account yet? <a href="javascript:void(0)">Sign Up</a>-->
            </div>

          </div>
        </div>
      </div>
      <!-- / Form container -->

    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
  export default {
    name: 'login',
    metaInfo: {
      title: 'Sounds后台管理系统-登录'
    },
    data: () => ({
      credentials: {
        email: '',
        password: '',
        rememberMe: false,
        role: ''
      }
    }),
    created(){
      this.credentials.email = '';
      this.credentials.password = '';
      const that = this;
      document.onkeydown = function (e) {
        const key = window.event.keyCode;
        if (key == 13) {
          that.loginPost();
        }
      }
    },
    methods:{
      loginPost(){
        this.$api.miyu.login(data=>{
          this.$router.push({name:'userList'})
          window.localStorage.setItem('miyu.token',data.token)
          window.localStorage.setItem('miyu.author','author:Mr.xu,wx:18525343489')
          window.localStorage.setItem('miyu.userName',data.admin.name)
          window.localStorage.setItem('miyu.phone',data.admin.phone)
          window.localStorage.setItem('miyu.userId',data.admin.id)
          window.localStorage.setItem('miyu.type',data.admin.type)
        },{
          account:this.credentials.email,
          password:this.credentials.password,
        })
      }
    }
  }
</script>
<style>
  .custom-control.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before, .custom-control.custom-radio .custom-control-input:checked ~ .custom-control-label::before {
    border-color: rgb(255, 64, 129);
    background-color: rgb(255, 64, 129)
  }
  .loginButton {
     background-color: rgb(255, 64, 129);
     float: right;
     width: 66px;
     height: 38px;
     border-radius: 4px;
     color: #fff;
     border: none;
     outline: none;
  }
</style>
