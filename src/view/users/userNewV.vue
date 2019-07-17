<template>
  <div v-loading="loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">新秀/大V</el-breadcrumb-item>
    </el-breadcrumb>
    <header>
      <ul>
        <li>
          <p>新秀数</p>
          <p>{{newData.starShow}}</p>
        </li>
        <li>
          <p>大V数</p>
          <p>{{newData.bigV}}</p>
        </li>
        <li>
          <p>总人数</p>
          <p>{{newData.all}}</p>
        </li>
        <li>
          <p>新秀：大V</p>
          <p>{{newData.percentStarShow}}%:{{newData.percentBigV}}%</p>
        </li>
      </ul>
    </header>
    <hr>
    <!-- 新秀的时间设置 -->
    <!-- <section>
           <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="当前新秀时间:">
                    <p class="registerDate">注册 <span>{{ newData.userUpgrade }}</span> 天</p>
                </el-form-item>
                 <el-form-item label="新秀时间设置:">
                     <div class="time_set">
                        <el-input v-model="form.timeSet" placeholder="请输入1-100的数字">天</el-input>
                        <span>天</span>
                     </div>
                </el-form-item>
                <el-button @click="editorNewDate()">修改</el-button>
           </el-form>
       </section> -->
    <div class="newsList">
      <div class="sortInput">
        <el-input v-model="sortValue1" placeholder="主动用户Id" size="mini"></el-input>
        <el-input v-model="sortValue2" placeholder="被动用户Id" size="mini"></el-input>
        <el-button @click="sort" type="primary" plain size="mini">排序</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;" border>
        <el-table-column prop="userId" label="用户id" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column label="声音类型" align="center">
          <template slot-scope="props" v-if="props.row.soundType">
            {{props.row.soundType}}
          </template>
        </el-table-column>
        <el-table-column label="技能鉴定" align="center">
          <template slot-scope="props" v-if="props.row.skillAppraisal">
            {{props.row.skillAppraisal}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="props">
            <el-button type="primary" size="mini" plain @click="addSoundsType(props.row)">声音属性</el-button>
            <el-button type="success" size="mini" plain @click="skill(props.row)">技能鉴定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;margin-top: 15px">
        <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pageSize"
          :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>

      <!-- 声音属性设置的弹窗 -->
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input v-model="soundType" placeholder="请输入声音属性"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addType">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 技能鉴定的弹窗 -->
      <el-dialog title="提示" :visible.sync="skillDialogVisible" width="30%" center>
        <el-input v-model="skillValue" placeholder="技能鉴定"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="skillDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="skillDermine">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
  export default {
    name: "userNew",
    data() {
      return {
        loading: false, //加载
        form: {
          timeSet: '', //新秀时间设置
        },
        page: 1, //分页
        total: null, //分页总条目数
        size: null, //每页条数
        pageSize: null, //总页数
        newData: {},
        tableData: [],
        centerDialogVisible: false,
        soundType: '',
        currentInfo: '',
        sortValue1: '',
        sortValue2: '',
        skillValue: '',   //技能鉴定的值
        skillDialogVisible: false,
        currentSkill: ''
      }
    },
    created() {
      this.getData();
      this.getLargeData()
    },
    methods: {
      // 获取数据
      async getData() {
        this.loading = true;
        await this.$api.user.newV(data => {
          this.loading = false;
          this.newData = data;
        })
      },
      // 修改新秀天数
      editorNewDate() {
        this.loading = true;
        this.$api.user.delete_Vdate(() => {
          this.loading = false;
          this.getData()
          this.$notify({
            type: 'success',
            message: '添加天数成功！',
            title: '成功'
          });
          this.form.timeSet = ''
        }, {
          userUpgrade: parseInt(this.form.timeSet)
        })
      },
      //获取大V数据
      getLargeData() {
        this.$api.user.selectUserLevelList(data => {
          this.tableData = data.result
          this.total = data.pageInfo.total
          this.size = data.pageInfo.pageSize
        }, {
          pageNum: this.page
        })
      },
      handleCurrentChange(val) {
        this.page = val
        this.getLargeData()
      },
      addSoundsType(row) {
        this.centerDialogVisible = true
        this.currentInfo = row
      },
      addType() {
        this.centerDialogVisible = false
        if(this.soundType.length<=5) {
          this.$api.user.updateUserLevelSoundType(data => {
            this.getLargeData()
            this.soundType = ''
            this.$message({
              message: '添加声音成功',
              type: 'success'
            })
          }, {
            userId: this.currentInfo.userId,
            soundType: this.soundType
          })
        } else {
          this.$message.error('输入字数不能超过5个')
        }
      },
      sort() {
        
        if(this.sortValue1 && this.sortValue2) {
          var item = this.tableData.filter(item => {
            if(item.userId == this.sortValue1) {
              return item
            }
          })
          var beItem = this.tableData.filter(item => {
            if(item.userId == this.sortValue2) {
              return item
            }
          })
          this.$api.user.updateUserLevelSort(data => {
            this.getLargeData()
            this.sortValue1 = ''
            this.sortValue2 = ''
            this.$message({
              message: '排序成功',
              type: 'success'
            })
          }, {
            userId: this.sortValue1,
            sort: item[0].sort,
            beUserId: this.sortValue2,
            beSort: beItem[0].sort
          })
        } else {
          this.$message.error('内容不能为空')
        }
      },
      // 技能鉴定
      skill(row) {
        this.skillDialogVisible = true
        this.currentSkill = row
      },
      skillDermine() {
        if(this.skillValue.length <= 8) {
          this.skillDialogVisible = false
          this.$api.user.updateUserLevelSkill(data => {
            this.getLargeData()
            this.skillValue = ''
            this.$message({
              message: '添加技能鉴定成功',
              type: 'success'
            })
          }, {
            userId: this.currentSkill.userId,
            skill: this.skillValue
          })
        } else {
          this.$message.error('输入的字数不能超过8个字')
        }
      }
    }
  }

</script>

<style scoped lang="less">
  @theme_color: rgb(233, 116, 38);

  .now_page {
    color: @theme_color;
  }

  header {
    width: 800px;
    margin: 0 auto;
    overflow: hidden;

    ul {
      li {
        float: left;
        width: 200px;
        font-size: 16px;
        padding: 20px;
        text-align: center;

        p:nth-of-type(1) {
          border-bottom: 1px solid #ccc;
          line-height: 50px;
        }

        p:nth-of-type(2) {
          line-height: 50px;
          color: @theme_color;
        }
      }
    }
  }

  section {
    width: 430px;
    margin: 30px auto;

    .time_set {
      position: relative;

      span {
        position: absolute;
        right: 22px;
        top: 0;
      }
    }

    .registerDate {
      margin-left: 15px;

      span {
        font-size: 16px;
        color: @theme_color;
      }
    }

    .el-button {
      margin: 15px auto;
      display: block;
      background-color: @theme_color;
      color: #fff
    }
  }

  .sortInput {
    display: flex;
    justify-content: flex-end;
    .el-input {
      width: 120px;
      margin-right: 10px;
    }
  }

</style>
