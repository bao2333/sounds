<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name:'' }">财务管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">身份审核</el-breadcrumb-item>
    </el-breadcrumb>
    <section>
        <div style="margin-top:15px;"> 
            <el-select v-model="search.status" placeholder="请选择审核状态" class="searchitem" clearable size="small">
            <el-option label="等待审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="getList()">搜索</el-button>
        </div>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;" border v-loading="loading">
        <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
        <el-table-column label="提交时间" align="center">
          <template
            slot-scope="props"
          >{{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center"></el-table-column>
        <el-table-column label="身份证面" align="center">
          <template slot-scope="props">
            <img :src="$oss.url + props.row.frontOfIdCard" alt width="120" height="100" @click="dialogVisible=true;selsecImg(props.row.frontOfIdCard)" style="cursor:pointer">
          </template>
        </el-table-column>
        <el-table-column prop="date" label="身份背面" align="center">
          <template slot-scope="props">
            <img :src="$oss.url + props.row.backOfIdCard" alt width="120" height="100" @click="dialogVisible=true;selsecImg(props.row.backOfIdCard)" style="cursor:pointer">
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="props">
            {{ props.row.auditResult == 0 ? '等待审核' : props.row.auditResult == 1 ? '审核通过' : props.row.auditResult == 2 ? '审核不通过' : '' }}
          </template>
        </el-table-column>
        <el-table-column label="审核操作" align="center" width="100">
          <template slot-scope="props">
              <el-button type="success" size="mini" class="shenheBtn" v-if="props.row.auditResult !== 1" @click="handleClick(props.row,1)" >通过</el-button>
              <el-button style="margin-left:0" type="danger" size="mini" class="shenheBtn" v-if="props.row.auditResult!==2" @click="handleClick(props.row,2)" >不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;margin-top: 15px">
        <el-pagination
          layout="total,prev, pager, next"
          :page-size="size"
          background
          :page-count="1"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </section>
    <el-dialog title="图片审核" :visible.sync="dialogVisible" width="40%" >
        <img :src="$oss.url+imgUrl" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "shenfenshenhe",
  data() {
    return {
      dialogVisible: false, //图片模态
      loading: false, //加载
      status: '', //审核状态
      tableData: [], //列表数据
      page: 1, //分页当前页
      total: null, //总数
      size: null, //个数
      search:{
          status:'0'
      },
      imgUrl:'',    //图片模态
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
       this.getList();
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      const page = this.page;
      this.$api.money.shenfen_list(data => {
        this.loading = false;
        this.tableData = data.data;
        this.size = data.pageInfo.pageSize;
        this.total = data.pageInfo.total;
      },{
          pageNum:page,
          auditResult:this.search.status==''?null:parseInt(this.search.status)
      });
    },
    // 审核
    handleClick(row,val){
        // val  1为通过  2为不通过
        this.$api.money.shenfen_check(()=>{
            this.getList();
            this.$notify({
                type:'success',
                title:'成功',
                message:'审核成功！',
            })
        },{
            id:row.id,
            userId:row.userId,
            auditResult:parseInt(val),
        })
        console.log(id,val)
    },
    // 查看图片
    selsecImg(url){
        this.imgUrl = url
    }
  }
};
</script>

<style scoped>
.shenheBtn{
    width: 80px;
    margin-left: 0;
   
}
.shenheBtn:nth-of-type(2){
    margin-top: 5px;
}
.searchitem{
    width: 200px;
    display: inline-block;
    margin-right: 10px;
    margin-top: 5px;
  }
</style>
