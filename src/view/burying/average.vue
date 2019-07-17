<template>
  <div class="all">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">用户分析</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="text">
      <div class="block">
        <h3>注册埋点统计</h3>
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="search(1)">查询</el-button>
        <el-button type="primary" plain @click="print(1)">打印全部</el-button>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>取消按钮</td>
            <td>打开按钮</td>
            <td>确认按钮</td>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>取消按钮</td>
            <td>打开按钮</td>
            <td>确认按钮</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>事件次数</td>
            <td>{{obj.weiboClickNum}}</td>
            <td>{{obj.weiboCancleNum}}</td>
            <td>{{obj.weiboOpenNum}}</td>
            <td>{{obj.weiboCompleteNum}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="7"></td>
          </tr>
          <tr>
            <td rowspan="3"></td>
            <td>QQ登录</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="2">点击QQ登录按钮</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>取消按钮</td>
            <td>打开按钮</td>
            <td>确认按钮</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>事件次数</td>
            <td>{{obj.qqClickNum }}</td>
            <td>{{obj.qqCancleNum }}</td>
            <td>{{obj.qqOpenNum }}</td>
            <td>{{obj.qqCompleteNum }}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="block">
        <h3>模块埋点统计</h3>
        <el-date-picker v-model="value2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="search(2)">查询</el-button>
        <el-button type="primary" plain @click="print(2)">打印全部</el-button>
        <table border="1" cellpadding="0" cellspacing="0">
          <tr>
            <td rowspan="2"></td>
            <td colspan="4">主菜单</td>
          </tr>
          <tr>
            <td>发现</td>
            <td>sounds</td>
            <td>我的</td>
            <td rowspan="4"></td>
          </tr>
          <tr>
            <td>访问次数</td>
            <td>{{selectBuriedPointModuleVisit.discoverNum}}</td>
            <td>{{selectBuriedPointModuleVisit.soundsNum}}</td>
            <td>{{selectBuriedPointModuleVisit.myNum}}</td>
          </tr>
          <tr>
            <td>访问人数</td>
            <td>{{selectBuriedPointModuleUserNum.discoverNum}}</td>
            <td>{{selectBuriedPointModuleUserNum.soundsNum}}</td>
            <td>{{selectBuriedPointModuleUserNum.myNum}}</td>
          </tr>
          <tr>
            <td>停留时长(s)</td>
            <td>{{selectBuriedPointModuleStay.discoverNum}}</td>
            <td>{{selectBuriedPointModuleStay.soundsNum}}</td>
            <td>{{selectBuriedPointModuleStay.myNum}}</td>
          </tr>
          <tr>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td rowspan="2"></td>
            <td colspan="4">sounds页面</td>
          </tr>
          <tr>
            <td>官方</td>
            <td>秀音</td>
            <td>推荐</td>
            <td>人声</td>
          </tr>
          <tr>
            <td>访问次数</td>
            <td>{{selectBuriedPointModuleVisit.officialNum}}</td>
            <td>{{selectBuriedPointModuleVisit.showVoiceNum}}</td>
            <td>{{selectBuriedPointModuleVisit.recommendNum}}</td>
            <td>{{selectBuriedPointModuleVisit.peopleVoiceNum}}</td>
          </tr>
          <tr>
            <td>访问人数</td>
            <td>{{selectBuriedPointModuleUserNum.officialNum}}</td>
            <td>{{selectBuriedPointModuleUserNum.showVoiceNum}}</td>
            <td>{{selectBuriedPointModuleUserNum.recommendNum}}</td>
            <td>{{selectBuriedPointModuleUserNum.peopleVoiceNum}}</td>
          </tr>
          <tr>
            <td>停留时长(s)</td>
            <td>{{selectBuriedPointModuleStay.officialNum}}</td>
            <td>{{selectBuriedPointModuleStay.showVoiceNum}}</td>
            <td>{{selectBuriedPointModuleStay.recommendNum}}</td>
            <td>{{selectBuriedPointModuleStay.peopleVoiceNum}}</td>
          </tr>
          <tr>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td colspan="5">app使用时长</td>
          </tr>
          <tr>
            <td>使用时间(s)</td>
            <td colspan="4">{{selectBuriedPointModuleUse}}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="2">push记录</td>
            <td rowspan="4" colspan="2"></td>
          </tr>
          <tr>
            <td></td>
            <td>点赞,评论</td>
            <td>后台系统推送</td>
          </tr>
          <tr>
            <td>送达人数</td>
            <td>{{selectBuriedPointModuleVisit.commentNum}}</td>
            <td>{{selectBuriedPointModuleVisit.backGroundNum}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import moment from "moment"
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        obj: {},
        selectBuriedPointModuleStay: {},      //停留数集合
        selectBuriedPointModuleUse: {},       //App使用时长
        selectBuriedPointModuleUserNum: {},  //用户数集合
        selectBuriedPointModuleVisit: {}    //访问数集合
      }
    },
    created() {
      
    },
    methods: {
      search(type) {
        //注册的数据
        if(type == 1) {
          this.$api.userAnalysis.RegisteredDataStatistics(data => {
            this.obj = data[0]
          }, {
            startTime: moment(new Date(this.value1[0])).format("YYYY-MM-DD"),
            endTime: moment(new Date(this.value1[1])).format("YYYY-MM-DD")
          })
        } else if (type == 2) {
          //模块的数据
          this.$api.userAnalysis.ModuleBuriedPointStatistics(data => {
            this.selectBuriedPointModuleStay = data.selectBuriedPointModuleStay[0]
            this.selectBuriedPointModuleUse = data.selectBuriedPointModuleUse
            this.selectBuriedPointModuleUserNum = data.selectBuriedPointModuleUserNum[0]
            this.selectBuriedPointModuleVisit = data.selectBuriedPointModuleVisit[0]
          }, {
            startTime: moment(new Date(this.value2[0])).format("YYYY-MM-DD"),
            endTime: moment(new Date(this.value2[1])).format("YYYY-MM-DD")
          })
        }

      },
      print(type) {
        // type为1是注册埋点
        // type为2是模块埋点
        var userId = window.localStorage.getItem('miyu.userId')
        var token = window.localStorage.getItem('miyu.token')
        if (type == 1) {  
          this.$ajax.get('/buriedPoint/selectBuriedPointRegisterPrint', {
            params: {
              startTime: moment(new Date(this.value1[0])).format("YYYY-MM-DD"),
              endTime: moment(new Date(this.value1[1])).format("YYYY-MM-DD"),
              token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
            }
          }).then(res => {
            const url = res.request.responseURL
            window.location.href = url
          }).catch(error => {
            console.log(error)
          })
        } else if (type == 2) {
          var userId = window.localStorage.getItem('miyu.userId')
          var token = window.localStorage.getItem('miyu.token')
          this.$ajax.get('/buriedPoint/selectBuriedPointModulePrint', {
            params: {
              startTime: moment(new Date(this.value2[0])).format("YYYY-MM-DD"),
              endTime: moment(new Date(this.value2[1])).format("YYYY-MM-DD"),
              token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
            }
          }).then(res => {
            console.log(res)
            const url = res.request.responseURL
            window.location.href = url
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  .text {
    margin-top: 50px;
    display: flex;

    .block {
      margin-right: 80px;

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
