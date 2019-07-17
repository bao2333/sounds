<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/information/official' }">消息管理</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">滚动广播</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div class="roll-box">
            <el-input placeholder="添加滚动广播内容" v-model="value" size="middle"></el-input>
            <el-button type="primary" plain @click="addContent">添加</el-button>
            <el-table :data="tableData" style="width: 100%; margin-top: 20px;" border>
                <el-table-column prop="id" label="id" align="center">
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.createTime) | moment("YYYY-MM-DD HH:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="广播内容" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="props">
                        <el-button type="danger" @click="delRollItem(props.row)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            tableData: []
        }
    },
    created() {
        this.getContent()
    },
    methods: {
        //获取内容
        getContent() {
            this.$api.find.getRollBroadcast(data => {
                this.tableData = data
            })
        },
        //增加内容
        addContent() {
            this.$api.find.addRollBroadcast(data => {
                this.getContent()
                this.$message({
                    message: '添加滚动内容成功',
                    type: 'success'
                });
                this.value = ''
            }, {
                content: this.value
            })
        },
        //删除内容
        delRollItem(row) {
            this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.find.delRollBroadcast(data => {
                    this.getContent()
                    this.$message({
                        message: '删除滚动内容成功',
                        type: 'success'
                    });
                }, {
                    id: row.id
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

<style lang="scss" scoped>
    .roll-box {
        margin-top: 30px;
        .el-input {
            width: 250px;
        }
        .contentBtn {
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            color: #606266;
        }
    }
</style>
