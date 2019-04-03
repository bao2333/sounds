<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/adminlist' }">管理员权限</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">统计列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="admin-search">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" plain @click="adminSearch()" :disabled="stop">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" v-loading="loading">
        <el-table-column prop="id" label="管理员编号" align="center">
        </el-table-column>
        <el-table-column prop="userId" label="用户编号" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
            <template slot-scope="props">
            {{ props.row.sex == 0 ? '女' : props.row.sex == 1 ? '男' : '' }}
            </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限" align="center">
            <template slot-scope="props">
                <el-button type="primary" plain size="mini" @click="changeAdminRole(props.row)">
                    {{ props.row.permission == 1 ? '已授权' : '未授权' }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="props">
                {{ new Date(props.row.createTime) | moment("YYYY-MM-DD HH:mm:ss") }}
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        adminPermission: '',
        input: ''
      }
    },
    created() {
        this.adminShow()
    },
    methods: {
      adminShow() {
        this.loading = true
        this.$api.admin.admin_list(data => {
            this.loading = false
            this.tableData = data
        })
      },
      adminSearch() {
        this.loading = true
        this.$api.admin.admin_search(data => {
            this.input = ''
            this.loading = false
            this.tableData = data
        },{
            keyword: this.input
        })
      },
      changeAdminRole(row) {
        this.adminPermission = row.permission == 0 ? '已授权' : '未授权'
        this.$confirm(`<p>确定要改变此用户权限改为<span style="color:red;font-size: 16px"> ${this.adminPermission} </span>吗？</p>`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'success'
        }).then(() => {
          this.$api.admin.admin_change(() => {
            this.adminShow();
            this.$notify({
              type: 'success',
              message: '修改级别成功',
              title: '成功'
            })
          }, {
            userId: row.userId,
            permission: row.permission == 0 ? 1 : row.permission == 1 ? 0 : null
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消授权'
          });
        });
      }
    },
    computed: {
        stop() {
            if (this.input.length > 0) {
                return false
            } else {
                return true
            }
        }
    }
  }
</script>

<style scoped lang="less">
  .admin-search {
    width: 300px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    button {
      margin-left: 20px;
    }
  }
</style>
