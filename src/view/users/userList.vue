<template>
  <div class="all_box"  v-loading="loading">
    <section class="section_head">
      <ul>
        <li>
          <p><span>男生数</span></p>
          <p class="li_num">{{userNums.manNum}}</p>
        </li>
        <li>
          <p>女生数</p>
          <p class="li_num">{{userNums.femaleNum}}</p>
        </li>
        <li>
          <p>总人数</p>
          <p class="li_num">{{userNums.allNum}}</p>
        </li>
        <li>
          <p>男：女占比</p>
          <p class="li_num">{{userNums.percentMale}}% : {{userNums.percentageWomen}}%</p>
        </li>
      </ul>
      <hr>
    </section>
    <section class="section_title">
      <h3>用户列表</h3>
      <div class="search">
        <el-date-picker v-model="search.time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期"
                        size="small" class="searchTime" @change="handleClick"></el-date-picker>
        <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="$router.push({name:'userRecord'})"> 档案搜索</el-button>
        <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="print(0)"> 打印当前页</el-button>
        <el-button  size="small" style="margin-left: 10px" plain class="click_dangan" @click="print(1)"> 打印全部</el-button>
        <el-dialog
          title="打印区间为2000"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <el-input v-model="interval1"></el-input> 
          --------------------------
          <el-input v-model="interval2"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dermine()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </section>
    <main>
      <el-table :data="tableData" style="width: 100%;margin-top: 15px" size="small" border>
        <el-table-column prop="id" label="用户编号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
           <template slot-scope="props">
              {{ new Date(props.row.createTime) | moment("YYYY-MM-DD HH:mm:ss") }}
           </template>
        </el-table-column>
        <el-table-column prop="name" label="账户名称" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="props">
            {{ props.row.sex == 0 ? '女' : props.row.sex == 1 ? '男' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="phone"  label="电话" align="center">
        </el-table-column>
        <el-table-column prop="role" label="级别" align="center">
          <template slot-scope="props">
            <el-button type="primary" size="mini" @click="changeRole(props.row)">{{ props.row.role == 0 ? '大V' : props.row.role == 1 ? '新秀' : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="rechargeSheetSum" label="充值" align="center"></el-table-column>
        <el-table-column prop="incomeWithdrewSum" label="提现" align="center"></el-table-column>
        <el-table-column label="查看档案" align="center">
          <template slot-scope="props">
            <el-button type="primary" size="mini" plain @click="$router.push({name:'userPersonalFile',params:{userId:props.row.id}})">查看档案</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;margin-top: 15px">
        <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pageSize" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
    export default {
        name: "userList",
      data(){
        return{
          loading:false,  //加载
          search:{
            time:'',  //搜索时间
            item:'',  //搜索下拉框选项
            account:'',  //搜索账号
            sex:'',  //搜索性别
            rank:'',  //搜索级别
          },
          tableData:[],   //表格
          userNums:{},  //男女比例
          page:1,   //分页
          total:null,   //分页总条目数
          size:null,   //每页条数
          pageSize:null,   //总页数
          centerDialogVisible: false,
          interval1: '', //区间打印1
          interval2: '', //区间打印2
        }
      },
      created(){
          this.showList();  //初始化列表
      },
      methods:{
        //  日期选中时触发事件
        handleClick(val){
          // console.log(val)
          this.showList();  // 日期选中时回调
        },
        handleCurrentChange(val){
          this.page = val;
          this.showList();
        },
        //列表
        async showList(){
          this.loading = true;
          const page = this.page;
          await this.$api.user.tongji(data=>{
            // console.log(data)
            this.loading = false;
            this.userNums = data.userNums;
            this.tableData = data.newestUsers;
            this.total = data.pageInfo.total;
            this.pageSize = data.pageInfo.pages;
            this.size = data.pageInfo.pageSize;
          },{
            pageNum:page,
            registerStart:this.search.time[0],               //注册开始时间
            registerEnd:this.search.time[1],
          })
        },
        // 打印
        async print(type){
          let userId = await window.localStorage.getItem('miyu.userId')
          let token = await window.localStorage.getItem('miyu.token')
          if(type==0){
            this.$ajax.get('/user/userManagementStatisticalListPrint',{
              params:{
                pageNum:this.page,
                registerStart:this.search.time==''?null:this.search.time[0],               //注册开始时间
                registerEnd:this.search.time==''?null:this.search.time[1],
                token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
              }
            })
            .then((res)=>{
              console.log(res)
              // 获取url
              const url = res.request.responseURL
              window.location.href = url
            })
            .catch((error)=>{
              console.log(error)
            })
          }else if(type==1){
            this.centerDialogVisible = true
            // this.$ajax.get('/user/userManagementStatisticalListPrint',{
            //   params:{
            //     pageNum:null,
            //     registerStart:this.search.time==''?null:this.search.time[0],               //注册开始时间
            //     registerEnd:this.search.time==''?null:this.search.time[1],
            //     token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
            //   }
            // })
            // .then((res)=>{
            //   // 获取url
            //   const url = res.request.responseURL
            //   window.location.href = url
            // })
            // .catch((error)=>{
            //   console.log(error)
            // })
          }
        },
        dermine() {
          let userId = window.localStorage.getItem('miyu.userId')
          let token = window.localStorage.getItem('miyu.token')
          this.centerDialogVisible = false
          if(this.interval1 && this.interval2) {
            this.$ajax.get('/user/userManagementStatisticalListPrint',{
              params:{
                pageNum:null,
                registerStart:this.search.time==''?null:this.search.time[0],               //注册开始时间
                registerEnd:this.search.time==''?null:this.search.time[1],
                token:CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userId + ':' + token)),
                startLimit: Number(this.interval1),
                endLimit: Number(this.interval2)
              }
            })
            .then((res)=>{
              // 获取url
              this.interval1 = ''
              this.interval2 = ''
              const url = res.request.responseURL
              window.location.href = url
            })
            .catch((error)=>{
              console.log(error)
            })
          } else {
            this.$message.error('两个区间不能为空')
          }
        },
        changeRole(row){
          this.userRow = row.role == 0 ? '新秀' : '大V'
          this.$confirm(`<p>确定要改变此用户级别为<span style="color:red;font-size: 16px"> ${this.userRow} </span>吗？</p>`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'success'
          }).then(() => {
            this.$api.user.editor_user_role(()=>{
              this.showList();
              this.$notify({
                type:'success',
                message:'修改级别成功',
                title:'成功'
              })
            },{
              userId:row.id,
              role:row.role == 0 ? 1 : row.role == 1 ? 0 : null
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
</script>

<style scoped lang="less">
  @theme_color:rgb(233, 116, 38);;
  .all_box{
    overflow: hidden;
    .section_head{
      width:1000px;
      margin: 0 auto;
      overflow: hidden;
      padding:0 0 20px 0;
      ul {
        margin: 0 auto;
        overflow: hidden;
        li{
          float: left;
          width: 200px;
          height: 100px;
          margin-right: 50px;
          border-right: 1px solid #ccc;
          padding-right: 40px;
          p{
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            margin-bottom: 0;
          }
          p:nth-of-type(1){
            font-size: 20px;
            font-weight: 500;
            border-bottom: 1px solid #ccc;
          }
          .li_num{
            color: @theme_color;
          }
        }
        li:last-of-type{
          border-right: 0;
        }
      }
    }
    .section_title{
      h3{
        text-align: center;
      }
      .search{
        margin-top: 15px;
        .searchTime{
          width: 360px;
          margin-right: 15px;
        }
        .searchInput{
          width: 180px;
          display: inline-block;
          margin-right: 10px;
          margin-top: 5px;
        }
      }

    }
  }
.click_dangan{
  background:  @theme_color;
  color: #fff;
}
.el-dialog__body {
  .el-input {
    width: 80px;
    margin: 0 60px;
  }
}
</style>
