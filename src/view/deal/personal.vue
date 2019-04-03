<template>
  <div>
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '' }">交易商城和语音</el-breadcrumb-item>
        <el-breadcrumb-item class="now_page">个人介绍</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <section>
      <el-input v-model="search.luyin" placeholder="录音人" class="searchInput" size="mini" clearable></el-input>
      <el-select v-model="search.type" placeholder="用户等级" class="searchInput" size="mini" clearable>
        <el-option label="新秀" value="2"></el-option>
        <el-option label="大V" value="1"></el-option>
      </el-select>
      <el-select v-model="search.sex" placeholder="性别" class="searchInput" size="mini" clearable>
        <el-option label="女" value="0"></el-option>
        <el-option label="男" value="1"></el-option>
      </el-select>
      <el-select v-model="search.status" placeholder="状态" class="searchInput" size="mini" clearable>
        <el-option label="待审核" value="0"></el-option>
        <el-option label="已审核" value="1"></el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="getList()" plain>查询</el-button>
    </section>
    <main>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading">
        <el-table-column prop="date" label="录音时间" align="center">
          <template slot-scope="props">
            {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="录音人" align="center"></el-table-column>
        <el-table-column prop="role" label="用户等级" align="center">
          <template slot-scope="props">
            {{ props.row.role == 0 ? '大V' : props.row.role == 1 ? '新秀' : '' }}
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="props">
            {{ props.row.sex == 0 ? '女' : props.row.sex == 1 ? '男' : '' }}
          </template>
        </el-table-column>
        <el-table-column label="播放语音" align="center">
          <template slot-scope="props">
            <div class="box" >
              <button class="play_button" @click="play_click(props.row.voice,props.row,props.$index)"
                      v-show="props.row.isShow === true">
                <i class="ion ion-ios-play align-middle"></i>
              </button>
              <button class="play_button" @click="paused_click();pauseClick(props.$index)"
                      v-show="props.row.isShow === false">
                <i class="ion ion-ios-pause align-middle"></i>
              </button>
              <audio @ended="ended(props.row)" :src="$oss.url+props.row.voice" ref="personal_play">
                <!-- <source :src="$oss.url+url" type="audio/mpeg"> -->
              </audio>
              <span>{{props.row.second}}s</span>
            </div>
            <!--<audioPlayer :url="props.row.voice" :second="props.row.second" style="margin-left:calc(50% - 50px)"/>-->
          </template>
        </el-table-column>
        <el-table-column label="照片" align="center">
          <template slot-scope="props">
            <viewer :images="[props.row.picture]">
              <img :src="$oss.url + props.row.picture" alt="" width="100">
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="props">
            {{ props.row.status == 0 ? '待审核' : props.row.status == 1 ? '已审核' :'' }}
          </template>
        </el-table-column>

        <el-table-column label="审核" align="center" width="130" v-if="this.search.status === '0'">
          <template slot-scope="props">
            <el-button type="success" size="mini" plain @click="shenhePass(props.row.id,1)" class="shenheBtn">审核通过
            </el-button>
            <el-button type="danger" size="mini" plain @click="shenhePass(props.row.id,2)" class="shenheBtn">审核不通过
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center" width="130" v-else>
          <template slot-scope="props">
            <el-button type="danger" size="mini" plain @click="deleteInformation(props.row.id)" class="shenheBtn">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;margin-top: 15px">
        <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </main>

  </div>
</template>

<script>
  import audioPlayer from '../../components/audioPlayer'

  export default {
    components: {
      audioPlayer
    },
    data() {
      return {
        loading: false,
        search: {    //搜索
          luyin: '',
          type: '',
          status: '0',
        },
        tableData: [],
        page: 1,   //分页
        total: null,   //分页总条目数
        size: null,   //分页页数
        count: null,   //页数
        unreviewedData: [],  //未审核个人语音库
        url: ''
      }
    },
    created() {
      this.getList();
    },
    methods: {
      //点击播放
      async play_click(src, row, index) {
        console.clear()
        this.palyIndex = index
        await this.tableData.map(item => {
          this.$set(item, 'isShow', true)
        })
        // await this.$set(this.tableData[this.palyIndex],'isShow',true)
        var audios = document.getElementsByTagName('audio');
        //判斷播放地址
        let srcAudio = 'http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/' + src
        for (let i = audios.length - 1; i >= 0; i--) {
          if (audios[i].src == srcAudio) {
            audios[i].play()

            this.paused_click(i)
          }
        }
        await this.$set(this.tableData[index], 'isShow', false)
      },
      //点击触发暂停事件
      paused_click(index) {

        var audios = document.getElementsByTagName('audio');
        for (let j = audios.length - 1; j >= 0; j--) {
          if (j != index) audios[j].pause();
        }
      },
      pauseClick(index) {
        this.$set(this.tableData[index], 'isShow', true)
      },
      //播放完毕，按钮回归播放状态
      ended(row) {
        row.isShow = true
      },
      imgClick(imgUrl) {
        this.url = imgUrl
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList() {
        this.loading = true;
        const page = this.page;
        this.$api.store.personal_list(data => {
          this.loading = false;
          this.tableData = data.result;
          this.tableData.map(item=>{
            this.$set(item,'isShow',true)
          })
          this.total = data.pageInfo.total;
          this.size = data.pageInfo.pageSize;
          this.count = data.pageInfo.pages;
        }, {
          pageNum: page,
          name: this.search.luyin == '' ? null : this.search.luyin,
          userType: parseInt(this.search.type),
          sexType: parseInt(this.search.sex),
          status: parseInt(this.search.status)
        })
      },
      shenhePass(id, type) {
        this.$api.store.personal_sh(() => {
          this.$notify({
            type: 'success',
            message: '审核成功！',
            title: '成功'
          })
          this.getList();
        }, {
          id: id,
          resultType: type,
        })
      },
      deleteInformation(id) {
        console.log(123)
        this.$confirm('删除此条消息，新秀/大V区将不再显示该用户信息?', '提示', {
          confirmButtonText: '狠心删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.store.personal_delete(() => {
            this.$notify({
              type: 'success',
              message: '删除成功！',
              title: '成功'
            })
            this.getList();
          }, {
            id: id
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

<style scoped lang="less">
  @theme_color: rgb(233, 116, 38);
  .searchInput {
    width: 150px;
    margin-right: 12px;
  }

  section {
    margin-top: 15px
  }

  .shenheBtn {
    width: 100px;
  }

  .el-button + .el-button {
    margin: 5px 0 0 0;
  }

  .box {
    width: 100px;
    overflow: hidden;
    background-color: rgba(233, 116, 38, .3);
    border-radius: 15px;
    margin-left: 50px;
    span {
      color: #fff;
      float: right;
      line-height: 30px;
      margin-right: 12px;
    }
  }

  .play_button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    float: left;
    background-color: @theme_color;
    border: none;
    cursor: pointer;
    i {
      color: #FFF;
    }
  }
</style>
