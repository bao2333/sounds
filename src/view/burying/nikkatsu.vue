<template>
  <div>
    <div class="nikkatsuHeader">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/burying/nikkatsu' }">用户分析</el-breadcrumb-item>
        <el-breadcrumb-item class="now_page">活跃用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="block">
      <el-date-picker v-model="value" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
      </el-date-picker>
      <el-button type="primary" plain @click="getTime()">查询</el-button>
    </div>
    <div class="block">
      <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" plain @click="getUserLoginNum()">查询</el-button>
    </div>
    <div class="user-table" v-loading="loading">
      <div class="dayRegister">
        <div class="registerNum">用户注册数&nbsp;{{registerNum}}</div>
        <el-table :data="tableData.DayRegisterNum" border style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="Hour" label="时间" align="center">
          </el-table-column>
          <el-table-column prop="Count" label="注册数" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="dayRegister">
        <div class="registerNum">用户发帖量&nbsp;{{userPost}}</div>
        <el-table :data="tableData.DayArticleNum" border style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="Hour" label="时间" align="center">
          </el-table-column>
          <el-table-column prop="Count" label="发帖数" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="dayRegister">
        <div class="registerNum">标签发帖量&nbsp;{{labelNum}}</div>
        <el-table :data="tableData.DayLabelArticleNum" border style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="name" label="标签名" align="center">
            <template slot-scope="prop">
              <span v-if="prop.row.name">{{prop.row.name}}</span>
              <span v-else>无标签</span>
            </template>
          </el-table-column>
          <el-table-column prop="Count" label="标签发帖数" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="dayRegister">
        <span class="retain">{{timeParame}}&nbsp;&nbsp;日活数&nbsp;&nbsp;{{tableData.DayActiveNum}}</span>
        <span class="retain">{{timeParame}}&nbsp;&nbsp;次日留存&nbsp;&nbsp;{{tableData.DayRetain}}</span>
        <span class="retain">{{timeParame}}&nbsp;&nbsp;三日留存&nbsp;&nbsp;{{tableData.ThreeDayRetain}}</span>
        <span class="retain">{{timeParame}}&nbsp;&nbsp;周留存&nbsp;&nbsp;{{tableData.WeekRetain}}</span>
        <span class="retain">{{timeParame}}&nbsp;&nbsp;月留存&nbsp;&nbsp;{{tableData.MonthRetain}}</span>
        <span class="retain userlogin">{{begin}}至{{ends}}&nbsp;&nbsp;<br>登录用户数&nbsp;&nbsp;{{userlogin}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        value1: '',
        timeParame: '',
        begin: '',
        ends: '',
        registerNum: 0,
        userPost: 0,
        labelNum: 0,
        tableData: [],
        loading: false,
        userlogin: 0,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    methods: {
      getTime() {
        if (this.value != '') {
          this.registerNum = 0;
          this.userPost = 0;
          this.labelNum = 0;
          this.loading = true;
          var date = new Date(this.value);
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (month < 10) {
            month = "0" + month.toString()
          }
          if (day < 10) {
            day = "0" + day.toString()
          }
          this.timeParame = date.getFullYear() + '-' + month + '-' + day;
          this.$api.userAnalysis.user_posting(data => {
            this.loading = false
            this.value = ''
            this.tableData = data
            for (var i = 0; i < data.DayRegisterNum.length; i++) {
              this.registerNum += data.DayRegisterNum[i].Count
            }
            for (var i = 0; i < data.DayArticleNum.length; i++) {
              this.userPost += data.DayArticleNum[i].Count
            }
            for (var i = 0; i < data.DayLabelArticleNum.length; i++) {
              this.labelNum += data.DayLabelArticleNum[i].Count
            }
          }, {
            date: this.timeParame
          })
        }
      },
      getUserLoginNum() {
        const start = this.dateDeal('YYYY-MM-DD', this.value1[0])
        const end = this.dateDeal('YYYY-MM-DD', this.value1[1])
        this.begin = start
        this.ends = end
        this.$api.userAnalysis.user_login(data => {
          this.userlogin = data
          this.value1 = ''
        }, {
          startDate: start,
          endDate: end
        })
      },
      dateDeal(str, time) {
        var formate = '';
        var date = new Date(time);
        var year = date.getFullYear();
        var mouth = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var sec = date.getSeconds();
        if (day < 9 && day > 0) {
          day = '0' + day;
        }
        if (mouth < 9 && day > 0) {
          mouth = '0' + mouth;
        }
        var formate = str.replace(/YYYY/g, year).replace(/MM/g, mouth).replace(/DD/g, day).replace(/HH/g, hour).replace(
          /MM/g, minute).replace(/SS/g, sec);
        return formate;
      }
    }
  }

</script>

<style scoped lang="less">
  .user-table {
    display: flex;

    .dayRegister {
      width: 300px;
      margin: 0 10px;

      .registerNum {
        text-align: center;
        margin: 15px 0;
        font-size: 20px;
        font-weight: bold;
      }

      .retain {
        display: block;
        color: red;
        font-weight: bold;
        margin-top: 60px;
        font-size: 20px;
        background: #fff;
      }
    }
  }

  .block {
    width: 100%;
    padding: 30px 0;
  }

</style>
