<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '' }" >系统设置</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">意见反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <section>
            <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
                <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="createTime" label="反馈时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="用户姓名" align="center"></el-table-column>
                <el-table-column label="反馈内容" align="center">
                    <template slot-scope="props">
                         <el-popover
                            placement="left-end"
                            title="详情"
                            width="300"
                            trigger="click"
                            :content="props.row.content">
                            <el-button type="primary" plain slot="reference" size="mini">查看反馈详情</el-button>
                        </el-popover>
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
        name: "opinion",
        data(){
            return{
                loading:false,  //加载
                tableData:[],
                total:null, //总数
                size:null,  //每页条数
                count:null,  //页数
                page:1,     //handleCurrentChange当前页
            }
        },
        created(){
            this.getList();
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList();
            },
            getList(){
                const page = this.page;
                this.loading = true;
                this.$api.set.opinion_list(data=>{
                    this.loading = false;
                    this.tableData = data.data;
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                })
            },
        }
    }
</script>

<style scoped>

</style>
