<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/discover/official' }">发现管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">用户录音管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <el-select v-model="search.status" placeholder="选择列表状态" size="mini" clearable>
        <el-option label="已审核" value="1"></el-option>
        <el-option label="未审核" value="0"></el-option>
      </el-select>
      <el-input v-model="search.userName" placeholder="输入用户名" size="mini" style="width:150px;" clearable>
      </el-input>
      <el-select v-model="search.type" placeholder="请选择" size="mini" clearable >
        <el-option
          v-for="item in options5"
          :key="item.id"
          :label="item.typeName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" plain size="mini" @click="showList()">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border v-loading="loading">
      <el-table-column prop="id" label="id" align="center" width="80">
      </el-table-column>
      <el-table-column prop="userName" label="用户名" align="center" width="120">
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="100">
        <template slot-scope="props">
          {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="recordName" label="录音名称" align="center">
      </el-table-column>
      <el-table-column label="录音简介" align="center">
        <template slot-scope="props">
            <el-popover
                placement="right-start"
                title="简介"
                width="300"
                trigger="hover"
                :content="props.row.introduction"
                style="overflow:hidden">
                <el-button type="text" slot="reference" class="contentBtn">{{props.row.introduction}}</el-button>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="录音类型名" align="center" width="120">
      </el-table-column>
      <el-table-column prop="voice" label="音频" align="center" width="350">
        <template slot-scope="props">
          <audio :src="$oss.url + props.row.voice" controls></audio>
        </template>
      </el-table-column>
      <el-table-column prop="picture" label="图片" align="center">
        <template slot-scope="props">
            <viewer  style="height: 150px;position: relative">
              <img :src="$oss.url + props.row.picture" alt="" 
                   style="position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%)" width="150">
            </viewer>
            <!-- <img :src="$oss.url + props.row.picture " alt="" width="100"> -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="审核状态" align="center" width="100">
        <template slot-scope="props">
          {{ props.row.checkType == 0 ? '未审核' : ( props.row.checkType == 1 ? '审核通过' : '' ) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="props">
          <el-button type="primary" plain @click="pass(props.row, 1)" size="mini" v-if="passStatus">审核通过</el-button>
          <el-button type="danger" plain @click="pass(props.row, 2)" size="mini" v-if="passStatus">审核不通过</el-button>
          <el-button type="success" plain @click="classify(props.row)" size="mini" v-if="passStatus">审核通过并分类</el-button>
          <el-button type="success" plain @click="bePassClassify(props.row)" size="mini" v-if="sortStatus">分类</el-button>
          <el-button type="warning" plain @click="like(props.row)" size="mini" v-if="sortStatus">{{ props.row.guessLike == 1 ? '取消喜欢' : (props.row.guessLike == 0 ? '喜欢' : '')  }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right;margin-top: 15px">
      <el-pagination layout="total,prev, pager, next" background :page-size="size" :total="total"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"></el-pagination>
    </div>

    <!-- 审核不通过的原因 -->
    <el-dialog title="审核不通过" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="reason" placeholder="请输入审核不通过的原因"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="notPass">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 审核通过并分类 -->
    <el-dialog title="审核通过并分类" :visible.sync="classifyDialog" width="30%" center>
      <el-select v-model="value1" placeholder="请选择">
          <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.typeName"
          :value="item.id">
          </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="passClassify">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 审核通过的分类 -->
    <el-dialog title="分类" :visible.sync="BeclassifyDialog" width="30%" center>
        <el-select v-model="value3" placeholder="请选择">
            <el-option
            v-for="item in options3"
            :key="item.id"
            :label="item.typeName"
            :value="item.id">
            </el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BeclassifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="passClassifyDermine">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import moment from "moment"
  export default {
    data() {
      return {
        loading: false,
        search: {
          status: "1", //列表状态
          userName: "", //用户名
          type: ''  //分类的类型
        },
        tableData: [],
        currentPage: 1, //当前页
        total: 0, //条目总数
        size: 0, //每页数
        centerDialogVisible: false,
        reason: '', //审核不通过的原因
        passStatus: false,
        sortStatus: true,
        currentRow: '', //当前行的信息
        classifyDialog: false,
        options1: [],
        value1: '',
        currentInfo: '',
        BeclassifyDialog: false,
        options3: [],
        value3: '',
        currentPassInfo: '',
        options5: [],
      }
    },
    created() {
        this.showList()
        this.getWorkClassify()
    },
    methods: {
      //展示列表
      showList() {
        const page = this.currentPage
        this.loading = true
        this.$api.find.selectRecordList(data => {
            this.loading = false
            this.tableData = data.result
            this.total = data.pageInfo.total
            this.size = data.pageInfo.pageSize
            if(this.search.status == 1) {
                //审核通过
                this.sortStatus = true   //分类显示
                this.passStatus = false  //其他的不显示
            } else if (this.search.status == 0 || this.search.status == 1) {
                this.sortStatus = false   //分类不显示
                this.passStatus = true      //其他的显示
            }
        }, {
          pageNum: page,
          checkType: parseInt(this.search.status),
          userName: this.search.userName == "" ? null : this.search.userName,
          type: this.search.type == "" ? null : this.search.type
        })
      },
      //获取作品分类
      getWorkClassify() {
        this.$api.workClassify.selectProductionType(data => {
          this.options5 = data
        }, {
          attribute: 1
        })
      },
      // 审核
      pass(row, val) {
        // val为  1是审核通过  2是审核不通过
        if (val == 1) {
          this.$confirm("确定此条录音被审核通过吗？", "提示", {
            confirmButtonText: "确认通过",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$api.find.checkRecord(() => {
              this.$notify({
                type: "success",
                message: "此条动态被审核通过!",
                title: '成功'
              });
              this.showList(this.page)
            }, {
              id: row.id,
              userId: row.userId,
              checkType: 1,
              reason: ''
            })
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
        } else if (val == 2) {
            this.centerDialogVisible = true
            this.currentRow = row
        }
      },
      //审核不通过
      notPass() {
        this.centerDialogVisible = false
        if(this.reason.length <= 10) {
            this.$api.find.checkRecord(() => {
                this.reason = ''
                this.$notify({
                type: "success",
                message: "此条动态不被通过!",
                title: '成功'
                });
                this.showList(this.page)
            }, {
                id: this.currentRow.id,
                userId: this.currentRow.userId,
                checkType: 2,
                reason: this.reason
            })
        } else {
            this.$message.error('字数应小于10个字');
        }
      },
      //审核通过并分类
      classify(row) {
        this.classifyDialog = true
        this.$api.workClassify.selectProductionType(data => {
          this.options1 = data
        }, {
          attribute: 1
        })
        this.currentInfo = row
      },
      passClassify() {
            this.$api.find.checkRecord(() => {
                this.$api.find.updateRecordType(data => {
                    this.$notify({
                        type: "success",
                        message: "此条动态被审核通过并分类成功!",
                        title: '成功'
                    });
                    this.showList(this.page)
                    this.value1 = ''
                    this.classifyDialog = false
                }, {
                    id: this.currentInfo.id,
                    type: this.value1
                })
            }, {
                id: this.currentInfo.id,
                userId: this.currentInfo.userId,
                checkType: 1,
                reason: ''
            })
      },
      // 页码改变
      handleCurrentChange(val) {
        this.page = val
        this.showList()
      },
      //分类
      bePassClassify(row) {
        this.BeclassifyDialog = true
        this.$api.workClassify.selectProductionType(data => {
          this.options3 = data
        }, {
          attribute: 1
        })
        this.currentPassInfo = row
      },
      passClassifyDermine() {
            this.$api.find.updateRecordType(data => {
                this.$notify({
                    type: "success",
                    message: "此条动态分类成功!",
                    title: '成功'
                });
                this.showList(this.page)
                this.value3 = ''
                this.BeclassifyDialog = false
            }, {
                id: this.currentPassInfo.id,
                type: this.value3
            })
      },
      //猜你喜欢
      like(row) {
        // this.$api.workClassify.updateRecordGuessLike(data => {
        //   this.showList()
        //   this.$notify({
        //     title: '成功',
        //     message: '喜欢成功',
        //     type: 'success'
        //   });
        // }, {
        //   id: row.id,
        //   guessLike: 1
        // })
          this.userRow = row.guessLike == 0 ? '喜欢' : '取消喜欢'
          this.$confirm(`<p>确定要改变此录音为<span style="color:red;font-size: 16px"> ${this.userRow} </span>吗？</p>`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'success'
          }).then(() => {
            this.$api.workClassify.updateRecordGuessLike(data => {
              this.showList()
              this.$notify({
                type:'success',
                message:'修改喜欢成功',
                title:'成功'
              })
            },{
              id: row.id,
              guessLike: row.guessLike == 0 ? 1 : row.guessLike == 1 ? 0 : null
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
  .search {
    margin: 20px 0;

    .el-button {
      margin-left: 20px;
    }
  }
    .contentBtn{
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #606266;
    }
  .el-button {
    width: 86px;
    margin: 2px 0;
    padding: 7px 0;
  }
  .contentBtn {
    width: 200px;
  }
</style>
