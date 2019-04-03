<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand -->
    <b-navbar-brand to="/">回到首页</b-navbar-brand>
    <b-navbar-nav class="align-items-lg-center ml-auto">

      <!-- Divider -->
      <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1"></div>

      <b-nav-item-dropdown :right="!isRTL" class="demo-navbar-user">
        <template slot="button-content"  style="margin-right: 15px">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <img src="" alt class="d-block ui-w-30 rounded-circle" width="30" height="30"  style="margin-right: 15px">
              <span class="px-1 mr-lg-2 ml-2 ml-lg-0" style="font-size: 14px;color:#000;font-weight:bold">{{userName}}</span>
            </span>
        </template>
        <b-dd-item @click="userDialog=true;showUser()"><i class="ion ion-md-settings text-info"></i>  &nbsp;设置密码</b-dd-item>
        <b-dd-item @click="logout()"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; 退出登录</b-dd-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <el-dialog title="提示" :visible.sync="userDialog" width="30%" :append-to-body="true">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>       
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialog = false">取 消</el-button>
        <el-button type="primary" @click="passwordPost()">确 定</el-button>
      </span>
    </el-dialog>
  </b-navbar>
  
</template>

<script>
export default {
  name: 'app-layout-navbar',

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      userDialog:false,
      userName:window.localStorage.getItem('miyu.userName'),
      phone:window.localStorage.getItem('miyu.phone'),
      form:{
        name:'',
        phone:'',
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
      }
    }
  },
  mounted(){
   
  },
  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },
    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },
    logout(){
      localStorage.clear()
      this.$router.push({name:'userlogin'})
    },
    // 点击弹窗赋值
    showUser(){
      this.form.name = this.userName;
      this.form.phone = this.phone;
      this.form.oldPassword = '';
      this.form.newPassword = '';
      this.form.confirmPassword = '';
    },
    // 修改密码
    passwordPost(){
      if(this.form.confirmPassword !== this.form.newPassword){
        this.$notify.warning({
          type:'warning',
          message:'确认密码必须与新密码保持一致！',
          title:'注意'
        })
        // 提示并清空
        this.form.newPassword = '';
        this.form.confirmPassword = '';
      }else if(this.form.confirmPassword === this.form.newPassword){
        this.$api.miyu.editor_password(()=>{
          this.$notify({
            type:'success',
            message:'修改密码成功,3秒后跳转！',
            title:'成功'
          })
          this.userDialog = false;
          setTimeout(()=>{
            this.$router.push({name:'userlogin'})
          },3000)
        },{
          name:this.form.name,
          phone:this.form.phone,
          oldPassword:this.form.oldPassword,
          newPassword:this.form.confirmPassword,
        })
      }
    }
  }
}
</script>
