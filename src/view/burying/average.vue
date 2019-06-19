<template>
  <div class="all">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">用户分析</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="text">
      <div class="block">
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" plain>打印全部</el-button>
      </div>
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2"></td>
          <td>手机注册</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>注册按钮</td>
          <td>输入手机号框</td>
          <td>获取验证码框</td>
          <td>输入验证码框</td>
          <td>输入密码框</td>
          <td>立即注册按钮</td>
        </tr>
        <tr>
          <td>事件次数</td>
          <td>{{obj.registerClickNum}}</td>
          <td>{{obj.phoneInputNum}}</td>
          <td>{{obj.codeGetNum}}</td>
          <td>{{obj.codeInputNum}}</td>
          <td>{{obj.passwordInputNum}}</td>
          <td>{{obj.registerCompleteNum}}</td>
        </tr>
        <tr>
          <td>事件人数</td>
          <td>{{obj.registerClickNum}}</td>
          <td>{{obj.phoneInputNum}}</td>
          <td>{{obj.codeGetNum}}</td>
          <td>{{obj.codeInputNum}}</td>
          <td>{{obj.passwordInputNum}}</td>
          <td>{{obj.registerCompleteNum}}</td>
        </tr>
        <tr>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td rowspan="3"></td>
          <td>微信登录</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">点击微信登录按钮</td>
          <td></td>
          <td>打开按钮</td>
          <td>确认按钮</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>取消按钮</td>
          <td>/</td>
          <td>/</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>事件次数</td>
          <td>{{obj.wechatClickNum}}</td>
          <td>{{obj.wechatCancleNum}}</td>
          <td>{{obj.wechatOpenNum}}</td>
          <td>{{obj.wechatCompleteNum}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>事件人数</td>
          <td>{{obj.wechatClickNum}}</td>
          <td>{{obj.wechatCancleNum}}</td>
          <td>{{obj.wechatOpenNum}}</td>
          <td>{{obj.wechatCompleteNum}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td rowspan="3"></td>
          <td>微博登录</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">点击微博登录按钮</td>
          <td></td>
          <td>打开按钮</td>
          <td>确认按钮</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>取消按钮</td>
          <td>/</td>
          <td>/</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>事件次数</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>事件人数</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
registerClickNum
注册点击数
phoneInputNum
手机号输入数
codeGetNum
验证码获取数
codeInputNum
验证码输入数
passwordInputNum
密码输入数
registerCompleteNum
注册完成数
wechatClickNum
微信点击数
wechatOpenNum
微信打开数
wechatCancleNum
微信取消数
wechatCompleteNum
微信完成数
weiboClickNum
微博点击数
weiboCancleNum
微博取消数
weiboOpenNum
微博打开数
weiboCompleteNum
微博完成数
qqClickNum
QQ点击数
qqCancleNum
QQ取消数
qqOpenNum
QQ打开数
qqCompleteNum
QQ完成数
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      value: '',
      obj: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    search() {
      console.log(moment(new Date(this.value)).format("YYYY-MM-DD"))
    },
    getData() {
      this.$api.userAnalysis.RegisteredDataStatistics(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    margin-top: 50px;
    .block {
        .is-plain {
          background: #e97426;
          border: 1px solid #e97426;
          color: #fff;
          margin-left: 20px;
      }
    }
    table {
      margin-top: 30px;
      background: #fff;
      tr {
        td {
          width: 100px;
          height: 28px;
          text-align: center;
          line-height: 28px;
        }
      }
    }
  }
</style>
