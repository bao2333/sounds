<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/classification/classifiedcontent' }">分类界面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">今日推荐</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="realTime">
      <h5>选择定时日期:</h5> <el-date-picker v-model="selectTime" type="date" placeholder="选择日期" @change="changeTime"></el-date-picker> (若无需定时则不需选择日期)
      <h5>今日推荐</h5>
      <el-select v-model="value1" placeholder="请选择" @change="changeValue1">
        <el-option v-for="item in options1" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择" @change="changeValue2">
        <el-option v-for="item in options2" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <h5>今日人声</h5>
      <el-select v-model="value3" placeholder="请选择" @change="changeValue3">
        <el-option v-for="item in options3" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="value4" placeholder="请选择" @change="changeValue4">
        <el-option v-for="item in options4" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <br>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    data() {
      return {
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        selectTime: '',
      }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            this.$api.ClassificationManagement.QueryClassification(data => {
                this.options1 = data
                this.options3 = data
            }, {
                id: 0
            })
        },
        changeValue1() {
            this.$api.ClassificationManagement.QueryClassification(data => {
                this.options2 = data
            }, {
                id: this.value1
            })
        },
        changeValue2() {
            
        },
        changeValue3() {
            this.$api.ClassificationManagement.QueryClassification(data => {
                this.options4 = data
            }, {
                id: this.value3
            })
        },
        changeValue4() {
            
        },
        changeTime() {
          console.log(moment(new Date(this.selectTime)).format("YYYY-MM-DD"))
        },
        confirm() {
          if(this.value2 || this.value4) {
            this.$api.ClassificationManagement.insertRecommendHuman(data => {
                this.value1 = ''
                this.value2 = ''
                this.value3 = ''
                this.value4 = ''
                this.selectTime = ''
                this.$message({
                    message: '推荐成功',
                    type: 'success'
                })
            }, {
                recommendType: this.value2,   //推荐分类id
                humanType: this.value4,      //人声分类id
                timeFixed: this.selectTime == "" ? "" : moment(new Date(this.selectTime)).format("YYYY-MM-DD")
            })
          }
        },
    }
  }

</script>

<style lang="less" scoped>
    h5 {
        margin-top: 16px;
    }
    .el-button {
        margin-top: 10px;
    }
    .realTime {
      width: 500px;
      padding: 10px 20px 10px 10px;
      height: 350px;
      margin: 20px 0;
      border: 1px solid #ccc;
      .el-button {
        float: right;
      }
    }

</style>
