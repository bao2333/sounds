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
      <span class="dayLive">{{timeParame}}&nbsp;日活数&nbsp;{{dayLiveNum}}</span>
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        timeParame: '',
        dayLiveNum: 0,
        registerNum: 0,
        userPost: 0,
        labelNum: 0,
        tableData: [],
        loading: false,
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
            this.dayLiveNum = data.DayActiveNum
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
      }
    }
  }
</script>

<style scoped lang="less">
  .user-table {
    display: flex;
    .dayRegister {
      width: 300px;
      margin: 0 20px;
      .registerNum {
        text-align: center;
        margin:15px 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .block {
    width: 100%; 
    margin:30px 0;
  }
  .dayLive {
    width: 200px;
    font-size: 24px;
    font-weight: bold;
    color: red;
    margin-left: 200px;
  }
</style>
