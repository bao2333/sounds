<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/users/list' }" >用户管理</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">个人主页</el-breadcrumb-item>
        </el-breadcrumb>
        <hr>
        <section>
            <aside>
                <div class="head">
                    <img :src="$oss.url+head" alt="" width="100" >
                    <h4>{{name}}</h4>
                </div>
            </aside>
            <article>
                 <el-table :data="tableData" style="width: 100%" border v-loading="loading">
                    <el-table-column label="发布时间" align="center">
                        <template slot-scope="props">
                            {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="文字内容" align="center"></el-table-column>
                    <el-table-column label="媒体内容" align="center">
                        <template slot-scope="props">
                          <p v-if="props.row.coverType==-1">暂无资源</p>
                          <div v-if="props.row.coverType == 0">
                            <img :src="$oss.url + ele" alt="" v-for="(ele,index) in props.row.coverResources" :key="index" width="100" style="margin:0 3px 3px 0">
                          </div>
                          <div v-if="props.row.coverType == 1">
                            <video :src="$oss.url + ele" v-for="(ele,index) in props.row.coverResources" :key="index" width="200" controls="controls"></video>
                          </div>
                          <div v-if="props.row.coverType == 2">

                            <!-- <div class="box" v-for="(ele,index) in props.row.coverResources" :key="index">
                              <button class="play_button" @click="play_click(ele,props.row,props.$index)" v-show="props.row.isShow === true">
                                <i class="ion ion-ios-play align-middle"></i>
                              </button>
                              <button class="play_button" @click="paused_click();pauseClick(props.$index)" v-show="props.row.isShow === false">
                                <i class="ion ion-ios-pause align-middle"></i>
                              </button>
                              <audio @ended="ended(props.row)" :src="$oss.url+ele" ref="personal_play">
                              </audio>
                              <span>{{props.row.second}}s</span>
                            </div> -->

                            <audioPlayer 
                            :url="ele" 
                            :second="props.row.second" 
                            v-for="(ele,index) in props.row.coverResources" 
                            :key="index" 
                            style="margin-left:50px;"/>
                          </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="文章状态" align="center">
                        <template slot-scope="props">
                          {{ props.row.state == 0 ? '待审核 ' : props.row.state == 1 ? '已审核' : props.row.state == 2 ? '审核失败' :''  }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="props">
                            <el-button type="danger" size="mini" @click="deleteCol(props.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="float: right;margin-top: 15px">
                  <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pageSize" :total="total" @current-change="handleCurrentChange"></el-pagination>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
import audioPlayer from "../../components/audioPlayer"
export default {
    name: "userHome",
    data() {
      return {
        loading:false,  //加载
        tableData: [], //列表
        page:1,
        size:null,
        pageSize:null,
        total:null,
        head:'',  //头像
        name:'',  //名字
      }
    },
    components: {
      audioPlayer
    },
    created() {
      this.getList()
    },
    methods: {
      handleCurrentChange(val){
        this.page = val;
        this.getList()
      },
      getList(){
        this.loading = true;
        const page = this.page;
        this.$api.user.personal_home(data=>{
          console.log(data)
          this.loading = false;
          this.head = data.head;
          this.name = data.name;
          this.tableData = data.article;
          this.total = data.pageInfo.total;
          this.pageSize = data.pageInfo.pages;
          this.size = data.pageInfo.pageSize;
        },{
          pageNum:page,
          userId:parseInt(this.$route.params.userId),
        })
      },
      // 删除
      deleteCol(id) {
        this.$confirm("确定删除此条状态吗?", "提示", {
          confirmButtonText: "狠心删除",
          cancelButtonText: "点错了",
          type: "warning"
        }).then(() => {
            this.$api.user.personal_home_delete(()=>{
              this.$notify({
                type: "success",
                message: "删除成功!"
              });
              this.getList()
            },{
              id:id
            })
          }).catch(() => {
            this.$notify({
              type: "info",
              message: "已取消删除"
            });
          });
        }
      },
      pauseAll(index) {
        let videos = document.getElementsByTagName('video');
        for (let j = videos.length - 1; j >= 0; j--) {
          if (j != index) videos[j].pause();
        }
      },
      //点击播放
      async play_click(src,row,index) {
        console.clear()
        this.palyIndex = index
        await this.tableData.map(item => {
          this.$set(item,'isShow',true)
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
          this.pauseAll(i);
        }
        await this.$set(this.tableData[index],'isShow',false)
      },
      //点击触发暂停事件
      paused_click(index) {

        var audios = document.getElementsByTagName('audio');
        for (let j = audios.length - 1; j >= 0; j--) {
          if (j != index) audios[j].pause();
        }
      },
      pauseClick(index){
        this.$set(this.tableData[index],'isShow',true)
      },
      //播放完毕，按钮回归播放状态
      ended(row) {
        row.isShow = true
      },
    };
</script>

<style scoped lang="less">
aside {
  width: 200px;
  float: left;
  div.head {
    width: 150px;
    height: auto;
    border: 1px solid #ccc;
    padding: 15px;
    text-align: center;
    h4 {
      margin-top: 15px;
      text-align: center;
      font-size: 16px;
    }
  }
}
article {
  width: calc(100% - 200px);
  display: block;
  float: left;
}

</style>
