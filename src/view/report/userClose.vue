<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: '' }" >举报管理</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">查封账户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section>
            <el-input v-model="searchName" placeholder="请输入被举报人姓名" size="mini" style="display:inline-block;width:200px;" clearable></el-input>
            <el-button type="primary" size="mini" @click="getList()">查询</el-button>
            <el-table :data="tableData" style="width: 100%;margin-top:15px" border size="small" v-loading="loading">
                <el-table-column prop="name" label="被举报人" align="center"></el-table-column>
                <el-table-column label="被举报总数" align="center">
                    <template slot-scope="props">
                        {{ props.row.allCount == null ? 0 : props.row.allCount }}
                    </template>
                </el-table-column>
                <el-table-column prop="countONWeekday" label="这周被举报" align="center"></el-table-column>
                <el-table-column label="查封时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.startTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="解封时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.endTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="当前状态" align="center">
                    <template slot-scope="props">
                        {{ props.row.status == 0 ? '封禁中' : props.row.status == 1 ? '已解封' : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="封禁天数" align="center">
                    <template slot-scope="props">
                        {{ props.row.day }}
                    </template>
                </el-table-column>
                <el-table-column label="解冻账户" align="center">
                    <template slot-scope="props">
                        <el-button type="danger" size="mini" @click="jiedong(props.row.userId)">解冻账户</el-button>
                        <el-button type="danger" size="mini" disabled v-if="props.row.status == 1">解冻账户</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="查封" align="center">
                    <template slot-scope="props">
                        <el-select v-model="chafengData[props.$index]" placeholder="选择查封天数" :disabled="selectShow" size="mini" style="width:150px;" @change="chafengPost(props.$index,props.row.userId)">
                            <el-option label="再+3天" value="3"></el-option>
                            <el-option label="再+1周" value="7"></el-option>
                            <el-option label="再+1个月" value="30"></el-option>
                            <el-option label="查封永久" value="36500"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </section>
        <section class="reported">
            <el-input v-model="searchReportedName" placeholder="请输入被举报人姓名" size="mini" style="display:inline-block;width:200px;" clearable></el-input>
            <el-button type="primary" size="mini" @click="reported()">查询</el-button>
            <el-table :data="reportedData" style="width: 100%;margin-top:15px" border size="small" v-loading="loading">
                <el-table-column prop="name" label="被举报人" align="center"></el-table-column>
                <el-table-column label="查封" align="center">
                    <template slot-scope="props">
                        <el-select v-model="chafengData[props.$index]" placeholder="选择查封天数" :disabled="selectShow" size="mini" style="width:150px;" @change="chafengPost(props.$index,props.row.userId)">
                            <el-option label="再+3天" value="3"></el-option>
                            <el-option label="再+1周" value="7"></el-option>
                            <el-option label="再+1个月" value="30"></el-option>
                            <el-option label="查封永久" value="36500"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
    export default {
        name: "userClose",
        data(){
            return{
                loading:false,
                tableData:[],
                searchName:'',      //搜索的名字
                searchReportedName: '',  //搜索全部的用户
                page:1,         //当前页数
                total:null,   //分页总条目数
                size:null,   //分页页数
                count:null,   //页数
                chafengData:{},     //追加查封日期
                selectShow:false,
                reportedData: []
            }
        },
        created(){
            if(this.$route.params.name){
                this.searchName = this.$route.params.name
            }
            this.getList()
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList()
            },
            getList(){
                const page = this.page;
                this.loading = true;
                this.$api.jubao.chafeng_list(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                    for( let key in this.tableData){
                      this.$set(this.chafengData,key,'')
                    }
                    console.log(this.chafengData)
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                    name:this.searchName==''?null:this.searchName
                })
            },
            // 解冻账户
            jiedong(userId){
                this.$confirm('确定要解冻该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.jubao.jiedong(()=>{
                        this.$notify({
                            type: 'success',
                            message: '解冻成功!',
                            title:'成功'
                        });
                        this.getList()
                    },{
                        userId:userId
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            reported() {
                this.$api.jubao.jubao_content_reported(data => {
                    this.reportedData = data
                    this.searchReportedName = ''
                }, {
                    name: this.searchReportedName
                })
            },
            chafengPost(index,userId){
                this.$confirm(`确定要追加查封该用户 ${this.chafengData[index]} 天吗？`, '提示', {
                    confirmButtonText: '狠心查封',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.selectShow = true;
                    this.$api.jubao.jubao_sealUp(()=>{
                        this.$notify({
                            type: 'success',
                            message: '查封用户成功!',
                            title:'成功'
                        });
                        this.getList();
                        this.chafengData[index] = ''
                        this.selectShow = false
                        this.reportedData = []
                    },{
                        userId:userId,
                        day:parseInt(this.chafengData[index])
                    })
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    }
</script>

<style scoped>
section{
    margin-top: 15px;
}
.reported {
    margin-top: 50px;
}
</style>
