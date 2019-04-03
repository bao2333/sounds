<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }" >交易商城和语音</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">倾诉（发标）</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section>
          <div style="margin: 15px;">
            <el-input size="mini" placeholder="请输入发标人姓名" style="width: 200px" v-model="search.name" clearable></el-input>
            <el-select v-model="search.status" placeholder="请选择状态" size="mini" clearable>
              <el-option label="待倾听" value="0"></el-option>
              <el-option label="待确认" value="1"></el-option>
              <el-option label="待聊天" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
              <el-option label="已失效" value="4"></el-option>
            </el-select>
            <el-date-picker v-model="search.startTime" type="date" value-format="timestamp" style="width: 200px" placeholder="选择开始日期" size="mini"></el-date-picker>
            <el-date-picker v-model="search.endTime" type="date" value-format="timestamp" style="width: 200px" placeholder="选择结束日期" size="mini"></el-date-picker>
            <el-button type="primary" size="mini" @click="showList()">搜索</el-button>
          </div>
            <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
                <!-- <el-table-column prop="date" label="序号" align="center"></el-table-column> -->
                <el-table-column prop="name" label="发标人" align="center"></el-table-column>
                <el-table-column label="预约开始时间" align="center">
                    <template slot-scope="props">
                         {{ new Date(props.row.appointmentStartTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                     </template>
                </el-table-column>
                <el-table-column label="预约结束时间" align="center">
                    <template slot-scope="props">
                         {{ new Date(props.row.appointmentEndTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                     </template>
                </el-table-column>
                <el-table-column label="聊天费用" align="center">
                     <template slot-scope="props">
                         {{ props.row.costChat }}金币/分钟
                     </template>
                </el-table-column>
                <el-table-column prop="userPourOutNum" label="倾听人数" align="center" sortable></el-table-column>
                <el-table-column prop="date" label="倾诉状态" align="center">
                     <template slot-scope="props">
                         {{ props.row.state == 0 ? '待倾听' : props.row.state == 1 ? '待确认' : props.row.state == 2 ? '待聊天' : props.row.state == 3 ? '已完成' : props.row.state == 4 ? '已失效' : '' }}
                     </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "pourOutFa",
        data(){
            return{
                loading:false,
                tableData:[],
                page:1,   //分页
                total:null,   //分页总条目数
                size:null,   //分页页数
                count:null,
                search:{
                  name:'',
                  status:'',
                  startTime:null,
                  endTime:null,
                }
            }
        },
        created(){
            this.showList()
        },
        methods:{
            // 分页
            handleCurrentChange(val){
                this.page = val;
                this.showList()
            },
            showList(){
                this.loading = true;
                const page = this.page
                this.$api.store.fabiao(data=>{
                    this.tableData = data.result;
                    this.loading = false;
                    this.total = data.pageInfo.total;
                    this.count = data.pageInfo.pages;
                    this.size = data.pageInfo.pageSize;
                },{
                    pageNum:page,
                    name:this.search.name == '' ? null : this.search.name,
                    status:this.search.status == '' ? null : parseInt(this.search.status),
                    start:this.search.startTime,
                    end:this.search.endTime,
                })
            }
        }
    }
</script>

<style scoped>

</style>
