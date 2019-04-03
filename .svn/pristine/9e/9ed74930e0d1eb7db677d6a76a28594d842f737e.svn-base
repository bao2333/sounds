<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '' }" >系统设置</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">申诉管理</el-breadcrumb-item>
        </el-breadcrumb>
        <section>
            <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
                <!-- <el-table-column prop="userId" label="用户名称" align="center"></el-table-column> -->
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column prop="content" label="内容" align="center"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="props">
                       <viewer :images="[props.row.picture]">
                            <img :src="$oss.url + props.row.picture" alt="" width="100">
                        </viewer>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="删除" align="center" width="100">
                  <template slot-scope="props">
                    <el-button type="danger" size="mini" @click="deletePost(props.row.id)">删除</el-button>
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
        data(){
            return{
                loading:false,
                tableData:[],
                size:null,
                count:null,
                total:null,
                page:1,
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
                const page = this.page;
                this.loading = true;
                this.$api.set.shensu_list(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page
                })
            },
          deletePost(id){
            this.$confirm('确定要删除此条申诉吗?', '提示', {
              confirmButtonText: '狠心删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.set.shensu_delete(()=>{
                this.$notify({
                  type: 'success',
                  message: '删除成功!',
                  title:'成功'
                });
                this.getList()
              },{
                id:id
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

</style>
