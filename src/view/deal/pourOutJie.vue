<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }" >交易商城和语音</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">倾诉（接标）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section>
          <div style="margin: 15px;">
            <el-input size="mini" placeholder="请输入发标人姓名" style="width: 200px" v-model="search.name" clearable></el-input>
            <el-select v-model="search.status" placeholder="请选择状态" size="mini" clearable>
              <el-option label="待聊天" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
            </el-select>
            <el-date-picker v-model="search.startTime" type="date" value-format="timestamp" style="width: 200px" placeholder="选择开始日期" size="mini"></el-date-picker>
            <el-date-picker v-model="search.endTime" type="date" value-format="timestamp" style="width: 200px" placeholder="选择结束日期" size="mini"></el-date-picker>
            <el-button type="primary" size="mini" @click="showList()">搜索</el-button>
          </div>
            <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
                <el-table-column prop="date" label="倾诉人头像" align="center">
                  <template slot-scope="props">
                      <img :src="$oss.url+props.row.confidantHead" alt="" width="100">
                  </template>
                </el-table-column>
                <el-table-column prop="confidantName" label="倾诉人姓名" align="center"></el-table-column>
                <el-table-column label="倾诉开始时间" align="center">
                    <template slot-scope="props">
                      {{ new Date(props.row.appointmentStartTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="倾诉结束时间" align="center">
                  <template slot-scope="props">
                    {{ new Date(props.row.appointmentEndTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                  </template>
                </el-table-column>
                <el-table-column prop="pourOutRequirements" label="倾诉要求" align="center"> </el-table-column>
                <el-table-column label="聊天费用" align="center">
                  <template slot-scope="props">
                     {{ props.row.costChat }}/分钟
                  </template>
                </el-table-column>
                <el-table-column label="聊天时长" align="center">
                  <template slot-scope="props">
                    {{ props.row.callDuration }}分钟
                  </template>
                </el-table-column>
                <el-table-column label="总费用" align="center">
                  <template slot-scope="props">
                     {{ props.row.allPrice }}
                  </template>
                </el-table-column>
                <el-table-column prop="allPrice" label="倾诉时间" align="center">
                  <template slot-scope="props">
                    {{ props.row.talkTime }}
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="倾诉状态" align="center">
                     <template slot-scope="props">
                        {{ props.row.state == 2 ? '待聊天' : props.row.state == 3 ? '已完成' : ''  }}
                     </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="pageSize" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "pourOutJie",
  data() {
    return {
      loading:false,  //加载
      tableData: [],
      page: 1, //分页
      total: null, //分页总条目数
      pageSize: null, //分页页数
      count: null, //页数
      search:{
        name:'',
        status:'',
        startTime:null,
        endTime:null,
      }
    };
  },
  created() {
    this.showList()
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },
    showList() {
      const page = this.page;
      this.loading = true;
      this.$api.store.jiebiao(data=>{
        this.loading = false;
        this.tableData = data.result;
        this.total = data.pageInfo.total;
        this.pageSize = data.pageInfo.pageSize;
        this.count = data.pageInfo.pages;
      },{
        pageNum:page,
        name:this.search.name == '' ? null : this.search.name,
        status:this.search.status == '' ? null : parseInt(this.search.status),
        start:this.search.startTime,
        end:this.search.endTime,
      })
    }
  }
};
</script>

<style scoped>
</style>
