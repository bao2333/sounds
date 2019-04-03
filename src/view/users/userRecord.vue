<template>
  <div class="all">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }" >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">档案搜索</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="section_jingzhun">
      <h3>精准搜索</h3>
      <div>
        <el-select v-model="search.item" placeholder="请选择" size="small" clearable style="width: 100px">
          <el-option label="用户名" value="0"></el-option>
          <el-option label="手机号" value="1"></el-option>
          <el-option label="微博号" value="2"></el-option>
          <el-option label="微信号" value="3"></el-option>
        </el-select>
        <el-input v-model="search.jingzhun" placeholder="精准搜索" class="searchInput" size="small" prefix-icon="el-icon-search"></el-input>
        <el-button size="small" class="searchButton" @click="jingzhunSearch()">搜索档案</el-button>
      </div>
    </section>
    <hr>
    <section class="section_shaixuan">
      <h3>筛选搜索</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="日期搜索:">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" size="small" style="width: 380px">
          </el-date-picker>
          <el-select v-model="form.item" placeholder="请选择" size="small" clearable style="width: 100px">
            <el-option label="注册时间" value="1"></el-option>
            <el-option label="最近登录时间" value="2"></el-option>
            <el-option label="信息生日" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量搜索:">
          <el-input v-model="form.minNum" placeholder="最小整数" size="small" class="search_num"></el-input>
          <span style="padding: 0 10px">---------------</span>
          <el-input v-model="form.maxNum" placeholder="最大整数" size="small" class="search_num"></el-input>
          <el-select v-model="form.numItem" placeholder="请选择" size="small" clearable style="width: 100px">
            <el-option label="账户余额" value="1"></el-option>
            <el-option label="总提现" value="2"></el-option>
            <el-option label="举报别人" value="3"></el-option>
            <el-option label="被人举报" value="4"></el-option>
            <el-option label="粉丝数" value="5"></el-option>
            <el-option label="关注数" value="6"></el-option>
          </el-select>
        </el-form-item>
          <el-button size="small" class="formButton" icon="el-icon-search" @click="selectRrcord()">搜索档案</el-button>
      </el-form>
    </section>
    <hr>
    <main>
      <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="print(0)" v-show="printType"> 打印当前页</el-button>
      <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="print(1)" v-show="printType"> 打印全部</el-button>
      <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="printJingzhun(0)" v-show="!printType"> 打印当前页精准</el-button>
      <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="printJingzhun(1)" v-show="!printType"> 打印全部精准</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top: 15px" size="small" border v-loading="loading">
        <!-- <el-table-column prop="date" label="序号" align="center" sortable></el-table-column> -->
        <el-table-column label="注册时间" align="center" >
          <template slot-scope="props">
            {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="账户名称" align="center"></el-table-column>
        <el-table-column prop="wechatName" label="微信名" align="center"  v-if="search.item == 3"></el-table-column>
        <el-table-column prop="weiBoName" label="微博名" align="center"  v-if="search.item == 2"></el-table-column>
        <el-table-column label="性别" align="center" >
          <template slot-scope="props">
            {{ props.row.sex == 0 ? '女' : props.row.sex == 1 ? '男' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="role" label="级别" align="center" >
          <template slot-scope="props">
            {{ props.row.role == 0 ? '大V' : props.row.role == 1 ? '新秀' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center" ></el-table-column>
        <el-table-column prop="birthday" label="生日" align="center" ></el-table-column>
        <el-table-column prop="fansNum" label="粉丝数" align="center" ></el-table-column>
        <el-table-column prop="followNum" label="关注数" align="center" ></el-table-column>

        <el-table-column prop="balance" label="账户余额" align="center" ></el-table-column>
        <el-table-column prop="reportCount" label="举报数" align="center" ></el-table-column>
        <el-table-column prop="beReportAllCount" label="被举报数" align="center" ></el-table-column>
        <el-table-column prop="rechargeSheetSum" label="充值" align="center" ></el-table-column>
        <el-table-column prop="incomeWithdrewSum" label="提现" align="center" ></el-table-column>
        <el-table-column label="最后登录" align="center">
           <template slot-scope="props">
            {{ new Date(props.row.latestLogin) | moment('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="查看档案" align="center">
          <template slot-scope="props">
            <el-button type="primary" size="mini" plain @click="$router.push({name:'userPersonalFile',params:{userId:props.row.id}})">查看档案</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;margin-top: 15px">
        <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "userRecord",
      data(){
        return{
          loading:false,
          printType:true,   //打印按钮显示
          search:{
            item:'0',    //精准搜索下拉列表选项
            jingzhun:'',    //精准搜索
          },
          form:{
            date:'',   //日期搜索
            dateItem:'',   //日期搜索下拉选项
            minNum:null,   //最小
            maxNum:null,   //最大
            numItem:'',   //数量搜索下拉选项
          },
          tableData:[],   //表格
          page:1,   //分页
          total:null,   //分页总条目数
          size:null,   //分页页数
          count:null,   //分页页数
        }
      },
      created(){
        this.selectRrcord()
      },
      methods:{
        //  分页
        handleCurrentChange(val){
          this.page = val;
          this.selectRrcord()
          this.jingzhunSearch()
        },
        // 查看档案
        selectRrcord(){
          const page = this.page
          this.loading = true;
          this.printType = true;
          this.$api.user.search_shaixuan(data=>{
            this.loading = false;
            this.tableData = data.result
            this.total = data.pageInfo.total;
            this.size = data.pageInfo.pageSize;
            this.count = data.pageInfo.pages;
          },{
            pageNum:page,
            registerStart:this.form.item==1?this.form.date[0]:'',               //注册开始时间
            registerEnd:this.form.item==1?this.form.date[1]:'',                 //注册结束时间
            loginTimeStart:this.form.item==2?this.form.date[0]:'',              //最后登录开始时间
            loginTimeEnd:this.form.item==2?this.form.date[1]:'',                //最后登录结束时间
            birthdayStart:this.form.item==3?this.form.date[0]:'',               //生日开始时间
            birthdayEnd:this.form.item==3?this.form.date[1]:'',                 //生日结束时间
            allWithdrawStart:this.form.numItem==2?parseInt(this.form.minNum):'',            //总提现最低
            allWithdrawEnd:this.form.numItem==2?parseInt(this.form.maxNum):'',              //总体现最高
            balanceStart:this.form.numItem==1?parseInt(this.form.minNum):'',                //余额最低
            balanceEnd:this.form.numItem==1?parseInt(this.form.maxNum):'',                  //余额最高
            fansStart:this.form.numItem==5?parseInt(this.form.minNum):'',                   //粉丝最低
            fansEnd:this.form.numItem==5?parseInt(this.form.maxNum):'',                     //粉丝最高
            followStart:this.form.numItem==6?parseInt(this.form.minNum):'',                 //关注最低
            followEnd:this.form.numItem==6?parseInt(this.form.maxNum):'',                   //关注最高
            reportNumStart:this.form.numItem==3?parseInt(this.form.minNum):'',              //举报别人最低
            reportNumEnd:this.form.numItem==3?parseInt(this.form.maxNum):'',                //举报别人最高
            beReportNumStart:this.form.numItem==4?parseInt(this.form.minNum):'',            //被举报最低
            beReportNumEnd:this.form.numItem==4?parseInt(this.form.maxNum):'',              //被举报最高

          })
        },
        jingzhunSearch(){
          this.printType = false;
          this.loading = true;
          const page = this.page
          this.$api.user.search_jz(data=>{
            this.loading = false;
            this.tableData = data.result;
            this.total = data.pageInfo.total;
            this.size = data.pageInfo.pageSize;
          },{
            pageNum:page,
            type:parseInt(this.search.item),
            name:this.search.jingzhun,
          })
        },
        // 筛选打印
        async print(type){
          let userId = await window.localStorage.getItem('miyu.userId')
          let token = await window.localStorage.getItem('miyu.token')
          if(type==1){
            this.page = null
          }
          this.$ajax.get('/user/screeningSearchPrint',{
            params:{
              pageNum:this.page,
              registerStart:this.form.item==1?this.form.date[0]:null,               //注册开始时间
              registerEnd:this.form.item==1?this.form.date[1]:null,                 //注册结束时间
              loginTimeStart:this.form.item==2?this.form.date[0]:null,              //最后登录开始时间
              loginTimeEnd:this.form.item==2?this.form.date[1]:null,                //最后登录结束时间
              birthdayStart:this.form.item==3?this.form.date[0]:null,               //生日开始时间
              birthdayEnd:this.form.item==3?this.form.date[1]:null,                 //生日结束时间
              allWithdrawStart:this.form.numItem==2?parseInt(this.form.minNum):null,            //总提现最低
              allWithdrawEnd:this.form.numItem==2?parseInt(this.form.maxNum):null,              //总体现最高
              balanceStart:this.form.numItem==1?parseInt(this.form.minNum):null,                //余额最低
              balanceEnd:this.form.numItem==1?parseInt(this.form.maxNum):null,                  //余额最高
              fansStart:this.form.numItem==5?parseInt(this.form.minNum):null,                   //粉丝最低
              fansEnd:this.form.numItem==5?parseInt(this.form.maxNum):null,                     //粉丝最高
              followStart:this.form.numItem==6?parseInt(this.form.minNum):null,                 //关注最低
              followEnd:this.form.numItem==6?parseInt(this.form.maxNum):null,                   //关注最高
              reportNumStart:this.form.numItem==3?parseInt(this.form.minNum):null,              //举报别人最低
              reportNumEnd:this.form.numItem==3?parseInt(this.form.maxNum):null,                //举报别人最高
              beReportNumStart:this.form.numItem==4?parseInt(this.form.minNum):null,            //被举报最低
              beReportNumEnd:this.form.numItem==4?parseInt(this.form.maxNum):null,
              token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
            }
          })
            .then((res)=>{
              // 获取url
              const url = res.request.responseURL
              window.location.href = url
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        // 精准打印
        async printJingzhun(type){
          let userId = await window.localStorage.getItem('miyu.userId')
          let token = await window.localStorage.getItem('miyu.token')
          if(type==1){
            this.page = null
          }
          this.$ajax.get('/user/advancedSearchPrint',{
            params:{
              type:parseInt(this.search.item),
              name:this.search.jingzhun == ''? null :this.search.jingzhun ,
              pageNum:this.page,
              token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
            }
          })
            .then((res)=>{
            // 获取url
            const url = res.request.responseURL
            window.location.href = url
          })
            .catch((error)=>{
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped lang="less">
  @theme_color:rgb(233, 116, 38);
  .all{
    overflow: hidden;
    .section_jingzhun{
      width: 500px;
      margin: 0 auto;
      margin-bottom: 50px;
      h3{
        text-align: center;
      }
      div{
        .searchInput{
          width: 280px;
          display: inline-block;
          margin-top: 5px;
        }
        .searchButton{
          background-color:@theme_color;
          color: #fff;
        }
      }
    }
    .section_shaixuan{
      width: 600px;
      margin: 50px auto;
      h3{
        text-align: center;
      }
      .search_num{
        display: inline-block;
        width: 150px;
      }
      .formButton{
        background-color:@theme_color;
        color: #fff;
        margin: 0 auto;
        display: block
      }
    }
  }
  .click_dangan{
    background:  @theme_color;
    color: #fff;
  }
</style>
