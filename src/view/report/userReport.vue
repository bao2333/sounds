<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: '' }" >举报管理</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">用户举报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <header>
            <div class="formJubao">
                <div>
                    被举报时间：
                    <el-input v-model="form.jubao" placeholder="请输入举报天数" size="mini" style="display:inline-block;width:200px;"></el-input>
                    （每个用户每天只能举报同一个用户一次）
                </div>
                <div class="two">
                    被举报次数：
                    <el-input v-model="form.count" placeholder="请输入举报次数" size="mini" style="display:inline-block;width:200px;"></el-input>
                    （请输入整数）
                    <el-button type="primary" size="mini" @click="getList()">查询</el-button>
                </div>
            </div>
            <section>
                <el-table :data="tableData" style="width: 100%;margin-top:15px" border size="small" v-loading="loading">
                    <el-table-column label="举报时间" align="center">
                        <template slot-scope="props">
                            {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="reportUserName" label="举报人" align="center"></el-table-column>
                    <el-table-column prop="beReportUserName" label="被举报人名字" align="center"></el-table-column>
                    <el-table-column prop="count" label="被举报次数" align="center"></el-table-column>
                    <el-table-column prop="reasonName" label="举报理由" align="center"></el-table-column>
                    <el-table-column label="查封" align="center">
                        <template slot-scope="props">
                            <el-select v-model="chafengData[props.$index]" placeholder="选择查封天数" size="mini" style="width:150px;" @change="chafengPost(props.$index,props.row.beReportUserId)">
                                <el-option label="查封三天" value="3"></el-option>
                                <el-option label="查封一周" value="7"></el-option>
                                <el-option label="查封一个月" value="30"></el-option>
                                <el-option label="查封永久" value="36500"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="float: right;margin-top: 15px">
                    <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
                </div>
            </section>
        </header>
    </div>
</template>

<script>
    export default {
        name: "userReport",
        data(){
            return{
                loading:false,
                form:{
                    jubao:'30',
                    count:'1',
                },
                tableData:[],
                chafengData:{}, //查封天数
                page:1,         //当前页数
                total:null,   //分页总条目数
                size:null,   //分页页数
                count:null,   //页数
            }
        },
        created(){
            this.getList()
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList()
            },
            getList(){
                this.loading = true;
                const page = this.page;
                this.$api.jubao.jubao_list(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                    for( let key in this.tableData){
                      this.$set(this.chafengData,key,'')
                    }
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                    day:this.form.jubao==''?30:parseInt(this.form.jubao),
                    times:this.form.count==''?10:parseInt(this.form.count)
                })
            },
            // 查封
            chafengPost(index,userId){
                this.$confirm(`确定要查封该用户 ${this.chafengData[index]} 天吗？`, '提示', {
                    confirmButtonText: '狠心查封',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.jubao.jubao_sealUp(()=>{
                        this.$notify({
                            type: 'success',
                            message: '查封用户成功!',
                            title:'成功'
                        });
                        this.getList();
                      this.chafengData[index] = ''
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

<style scoped lang="less">
    header{
        margin-top: 15px;
        h3{
            text-align: center;
        }
        div.formJubao{
            width: 50%;
            .two{
                margin-top: 15px;
            }
        }
    }
</style>
