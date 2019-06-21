<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/discover/official' }">官方动态</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">用户文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <el-select v-model="search.status" placeholder="选择列表状态" size="mini" style="float:left;" clearable>
        <el-option label="推荐" value="0"></el-option>
        <el-option label="已审核" value="1"></el-option>
        <el-option label="未审核" value="2"></el-option>
      </el-select>
      <el-select v-model="search.type" placeholder="选择媒体类型" size="mini" style="float:left;margin:0 10px;" clearable>
        <el-option label="所有媒体类" value="null"></el-option>
        <el-option label="文本" value="-1"></el-option>
        <el-option label="图片" value="0"></el-option>
        <el-option label="视频" value="1"></el-option>
        <el-option label="语音" value="2"></el-option>
      </el-select>
      <el-input v-model="search.userName" placeholder="输入用户名" size="mini" style="float:left;width:150px;" clearable>
      </el-input>
      <el-input v-model="search.userPhone" placeholder="输入电话号码" size="mini" style="float:left;width:150px;margin: 0 10px;" clearable>
      </el-input>
      <el-button type="primary" plain size="mini" style="float:left;margin-left:10px;" @click="showList()">查询
      </el-button>
      <el-button type="success" size="mini" style="float:right;margin:0px;" @click="batch()" v-if="flag">批量审核
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top:15px;" border size="mini" v-loading="loading" @selection-change="handleSelectionChange">
      <!-- <el-table-column prop="id" label="序号" align="center"></el-table-column> -->
      <el-table-column type="selection" align="center" width="36" v-if="flag">
      </el-table-column>
      <el-table-column label="用户名称" align="center" width="80">
        <template slot-scope="props">
          <a style="color:#409EFF;cursor:pointer"
             @click="$router.push({name:'userPersonalFile',params:{userId:props.row.userId}})">{{ props.row.userName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="发表时间" align="center" width="90">
        <template slot-scope="props">
          {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="文字内容" align="center" width="120">
        <template slot-scope="props">
          <el-popover
            placement="right-start"
            title="文字内容"
            width="300"
            trigger="hover"
            :content="props.row.content"
            style="overflow:hidden">
            <el-button type="text" slot="reference" class="contentBtn">{{props.row.content}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="coverType" label="媒体内容" align="center" width="200">
        <template slot-scope="props">
          <div v-if="props.row.coverType == 0">
            <viewer :images="props.row.coverResources" style="height: 150px;position: relative">
              <img :src="$oss.url + ele" alt="" v-for="(ele,index) in props.row.coverResources" :key="index" width="150"
                   style="position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%)">
            </viewer>
            <div style="position: absolute;bottom: 0;left: 50%; transform: translateX(-50%);" v-if="props.row.coverResources.length > 1">
              <img src="../../../static/imgs/much.png" alt="" width="20">
            </div>
          </div>
          <div v-if="props.row.coverType == 1">
            <video v-for="(ele,index) in props.row.coverResources" :key="index" width="200" controls="controls">
              <source :src="$oss.url + ele" type="video/mp4"/>
            </video>
          </div>
          <div v-if="props.row.coverType == 2">

            <div class="box" v-for="(ele,index) in props.row.coverResources" :key="index">
              <button class="play_button" @click="play_click(ele,props.row,props.$index)" v-show="props.row.isShow === true">
                <i class="ion ion-ios-play align-middle"></i>
              </button>
              <button class="play_button" @click="paused_click();pauseClick(props.$index)" v-show="props.row.isShow === false">
                <i class="ion ion-ios-pause align-middle"></i>
              </button>
              <audio @ended="ended(props.row)" :src="$oss.url+ele" ref="personal_play">
                <!-- <source :src="$oss.url+url" type="audio/mpeg"> -->
              </audio>
              <span>{{props.row.second}}s</span>
            </div>

            <!--<audioPlayer-->
            <!--:url="ele"-->
            <!--:second="props.row.second"-->
            <!--v-for="(ele,index) in props.row.coverResources"-->
            <!--:key="index"-->
            <!--ref="audioPlayerRef"-->
            <!--style="margin-left:50px;"/>-->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片内容" align="center" width="200">
        <template slot-scope="props">
          <div v-if="props.row.pictureResources">
            <viewer :images="props.row.pictureResources" style="height: 150px;position: relative">
              <img :src="$oss.url + ele" alt="" v-for="(ele,index) in props.row.pictureResources" :key="index" width="150"
                   style="position: absolute;top:50%;left: 50%;transform:translate(-50%,-50%)">
            </viewer>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="likeNum" label="点赞数" align="center" width="80"></el-table-column>
      <el-table-column prop="collectNum" label="收藏数" align="center" width="80"></el-table-column>
      <el-table-column prop="transpondNum" label="转发数" align="center" width="80"></el-table-column>
      <el-table-column prop="pageViewNum" label="浏览量" align="center" width="80"></el-table-column>
      <el-table-column label="位置" align="center" width="70">
        <template slot-scope="props">
          {{ props.row.location == '' ? '未定位' : props.row.location}}
        </template>
      </el-table-column>
      <el-table-column prop="labelName" label="选择标签" align="center" width="120"></el-table-column>
      <el-table-column label="审核状态" align="center" width="70">
        <template slot-scope="props">
          {{ props.row.state == 0 ? '待审核' : props.row.state == 1 ? '审核通过' : '审核不通过' }}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center" width="70">
        <template>
          官方默认
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="110">
        <template slot-scope="props">
          <el-button type="primary" size="mini" plain class="caozuoBtn zdBtn" v-if="tuijianShow"
                     @click="shenhePass(props.row, 1)">审核通过
          </el-button>
          <el-button type="success" style="margin-left:0" size="mini" plain class="caozuoBtn" v-if="tuijianShow"
                     @click="classification(props.row)">审核通过并分类
          </el-button>
          <!-- <el-button type="success" style="margin-left:0" size="mini" plain class="caozuoBtn" v-if="tongguozhidingShow"
                     @click="passZhiding(props.row)">通过并置顶
          </el-button> -->
          <el-button type="danger" style="margin-left:0" size="mini" plain class="caozuoBtn" v-if="tuijianShow"
                     @click="shenhePass(props.row, 0)">审核不通过
          </el-button>
          <el-button type="danger" style="margin-left:0" size="mini" class="caozuoBtn" v-if="noshenheShow"
                     @click="deleteArticle(props.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="props">
          <el-button type="primary" size="mini" plain class="caozuoBtn"
                     @click="dialogVisible=true;selectPinglun(props.row.id)">查看评论
          </el-button>
          <el-button type="primary" style="margin-left:0" size="mini" plain class="caozuoBtn zdBtn"
                     v-if="props.row.hot==0" @click="tuijianPost(props.row,1)">置顶推荐
          </el-button>
          <el-button type="primary" style="margin-left:0" size="mini" plain class="caozuoBtn" v-else
                     @click="tuijianPost(props.row,0)">取消置顶
          </el-button>
          <el-button type="primary" style="margin-left:0" size="mini" plain class="caozuoBtn"
                     @click="highQuality(props.row)">{{ props.row.highQuality == 0 ? '设为优质' : props.row.highQuality == 1 ? '取消优质' : '' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right;margin-top: 15px">
      <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pages" :total="total"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog title="评论" :visible.sync="dialogVisible" width="30%">
      <div class="pl_Box" v-if="this.pinglunData.length!==0" v-loading="pl_loading">
        <div v-for="(item,index) in this.pinglunData" :key="index" class="pinglun">
          <img :src="$oss.url+item.userHead" alt="" width="50" height="50">
          <span class="plName">{{ item.userName }}</span>
          <span style="float:right">{{ new Date(item.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}</span><br>
          <span class="plContent">{{ item.content }}<i class="el-icon-delete"
                                                       @click="deletePl(item.commentId)"></i></span>
        </div>

        <div class="block" style="float: right;margin-top: 15px">
          <el-pagination layout="total,prev, pager, next" :page-size="pl_size" background :page-count="pl_pages"
                         :total="pl_total" @current-change="pl_handleCurrentChange"></el-pagination>
        </div>
      </div>
      <div v-else class="no_pinglun" v-loading="pl_loading">
        <h4>该文章暂无评论</h4>
      </div>
    </el-dialog>
    
    <el-dialog title="分类" :visible.sync="classificationShow" width="30%" center>
      <!-- 一级分类 -->
      <el-select v-model="FirstClassificationValue" placeholder="请选择" @change="handleChange1">
        <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.typeName"
          :value="item.typeName"
        >
        </el-option>
      </el-select>
      <!-- 二级分类 -->
      <el-select v-model="SecondClassificationValue" placeholder="请选择" @change="handleChange2">
        <el-option
          v-for="item in options2"
          :key="item.id"
          :label="item.typeName"
          :value="item.typeName"
        >
        </el-option>
      </el-select>
      <!-- 图片的显示 -->
      <div class="imgBox">
        <ul class="imglist">
          <li v-for="(item, index) in imgList" :key="index">
            <img :src="$oss.url + item.picture" alt="" width="150" height="75" @click="chooseImg(index, item.id)">
            <div class="selectMark" v-show=" SelectedImageIndex == index ">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import audioPlayer from '../../components/audioPlayer'
  import moment from "moment"
  export default {
    name: "audit", //发现审核
    components: {
      audioPlayer
    },
    data() {
      return {
        flag: false,
        dialogVisible: false,  //评论
        imgDialog: false,  //评论
        tuijianShow: true,  //推荐和已审核按钮显示
        tongguozhidingShow: false,  //通过并置顶
        noshenheShow: true,  //未审核按钮显示（删除）
        pl_loading: false,  //评论
        loading: false,  //加载
        search: {
          status: "0", //列表状态
          type: "", //媒体类型
          userName: "", //用户名
          userPhone: ""
        },
        tableData: [], //列表
        page: 1,   //当前页
        total: null,   //条目总数
        size: null,    //每页数
        pages: null,    //页数
        pl_page: 1,
        pl_total: null,   //条目总数
        pl_size: null,    //每页数
        pl_pages: null,    //页数
        pinglunData: [],
        imgurl: '',
        deg: 0,
        height: '',
        button_show:{},   //播放按钮显示隐藏
        audioIndex: null,
        audioAngel: null,
        palyIndex: null,
        newArrArticle: '',
        newArrUser: '',
        multipleSelection:[],   //批量审核  选中的当前行的所有信息
        classificationShow: false,
        FirstClassificationValue: '',
        SecondClassificationValue: '',
        options1: [],
        options2: [],
        SelectImage: '',
        imgList: [],
        SelectedImageIndex: -1
      };
    },
    async created() {
     await this.showList();
      // var audios = await document.getElementsByTagName('audio');
      // console.log(audios)
      // for(let key in audios){
      //   this.$set(this.button_show,key,true)
      // }
    },
    mounted(){

    },
    updated() {
      //video只允许播放一个
      let videos = document.getElementsByTagName('video');
      for (let i = videos.length - 1; i >= 0; i--) {
        let p = i;
        videos[p].addEventListener('play', () => {
          // let that = this
          this.pauseAll(p);
          this.paused_click(p)
          this.tableData.map(item => {
            this.$set(item,'isShow',true)
          })
        })
      }
    },
    methods: {
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
      selectImg(url) {
        this.imgurl = url
        this.deg = 0
      },
      handleCurrentChange(val) {
        this.page = val;
        this.showList();
      },
      // 列表展示，搜索
      async showList() {
        const page = this.page
        const pl_page = this.pl_page
        this.loading = true;
        this.$api.find.find_audit(data => {
          this.loading = false;
          this.tableData = data.result;
          if (this.search.status == 0 || this.search.status == 1) {
            this.tuijianShow = false;
            this.noshenheShow = true;
            this.tongguozhidingShow = false;
            this.flag = false;
          } else if (this.search.status == 2) {
            this.noshenheShow = false;
            this.tuijianShow = true;
            this.tongguozhidingShow = true;
            this.flag = true;
          }
          // 遍历给评论页赋值
          let isShow = {'isShow' : true}
          this.tableData.map(item => {
            // item = Object.assign({} ,item , isShow)
            // item.isShow = true
            this.$set(item,'isShow',true)
            if (this.id === item.id) {  //找到所选评论的数据
              this.pinglunData = item.comments.commentData
            }
          })
          this.total = data.pageInfo.total
          this.size = data.pageInfo.pageSize
          this.pages = data.pageInfo.pages
        }, {
          pageNum: page,
          articleType: this.search.status == '' ? 0 : parseInt(this.search.status),
          coverType: this.search.type == '' ? null : parseInt(this.search.type),
          userName: this.search.userName == '' ? null : this.search.userName,
          userPhone: this.search.userPhone == '' ? null : this.search.userPhone,
        })
      },
      shenhePass(row, val) {
        if (val == 0) {
          this.$confirm("确定此条动态不被通过吗？", "提示", {
            confirmButtonText: "狠心pass",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.find.shenhe_nopass(() => {
                this.$notify({
                  type: "success",
                  message: "此条动态不被通过!",
                  title: '成功'
                });
                this.showList(this.page)
              }, {
                id: row.id,
                userId: row.userId,
              })
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else if (val == 1) {
          this.$confirm("确定此条动态被审核通过吗？", "提示", {
            confirmButtonText: "确认通过",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$api.find.shenhe_pass(() => {
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
                typeName: '默认',
                createTime: moment(new Date(row.createTime)).format("YYYY-MM-DD HH:mm:ss")
              })
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
      },
      // 审核通过并置顶
      passZhiding(row) {
        this.$confirm("确定此条动态被审核通过并置顶吗？", "提示", {
          confirmButtonText: "确认通过",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.find.pass_zhiding(() => {
              this.$notify({
                type: "success",
                message: "此条动态被审核通过并置顶!",
                title: '成功'
              });
              this.showList(this.page)
            }, {
              id: parseInt(row.id),
              userId: parseInt(row.userId),
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });

      },
      tuijianPost(row, status) {
        this.$confirm("确定要修改此推荐的置顶状态吗？", "提示", {
          confirmButtonText: "确认修改",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.find.shenhe_tuijian(() => {
              this.$notify({
                type: "success",
                message: "已修改置顶状态!",
                title: '成功'
              });
              this.showList(this.page)
            }, {
              id: row.id,
              hot: status,
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      // 删除状态
      deleteArticle(id) {
        this.$confirm("确定要删除该状态吗？", "提示", {
          confirmButtonText: "狠心删除",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.user.personal_home_delete(() => {
              this.$notify({
                type: "success",
                message: "删除成功!",
                title: '成功'
              });
              this.showList(this.page)
            }, {
              id: id,
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      // 评论分页
      pl_handleCurrentChange(val) {
        this.pl_page = val;
        this.showList()
      },
      // 点击评论赋值
      selectPinglun(id) {
        this.id = id
        const page = this.pl_page
        this.pl_loading = true;
        this.$api.find.get_pinglun(data => {
          this.pl_loading = false;
          this.pinglunData = data.result;
          this.pl_total = data.pageInfo.total
          this.pl_size = data.pageInfo.pageSize
          this.pl_pages = data.pageInfo.pages
        }, {
          id: id,
          pageNum: page
        })
      },
      deletePl(id) {
        this.$confirm('确认删除该评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.find.gfdt_delete(() => {
            this.$notify({
              type: "success",
              message: "删除成功!",
              title: '成功'
            });
            this.selectPinglun(this.id)
          }, {
            id: id
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //批量审核
      batch() {
        //对multipleSelection进行下一步的操作
        const articleId = [];
        const userIds = [];

        for (var i = 0; i < this.multipleSelection.length; i++) {
          articleId.push(this.multipleSelection[i].id.toString())
          userIds.push(this.multipleSelection[i].userId.toString())
        }
          const setarticle = new Set(articleId)
          const arrArt = Array.from(setarticle)
          this.newArrArticle = arrArt.join(',')

          const setuserid = new Set(userIds) 
          const arrUser = Array.from(setuserid) 
          this.newArrUser = arrUser.join(',')

        this.$api.find.passSelectArticle(data => {
          this.showList();
          this.$message({
            message: '批量审核通过成功',
            type: 'success'
          });
        }, {
          ids: this.newArrArticle,       //文章id
          userIds: this.newArrUser   //文章对应的用户id
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      //是否设置为优质内容
      highQuality(row) {
        this.containRow = row.highQuality == 0 ? '优质' : '非优质'
          this.$confirm(`<p>确定要改变此文章设置为<span style="color:red;font-size: 16px"> ${this.containRow} 内容</span>吗？</p>`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'success'
          }).then(() => {
            this.$api.find.setHighQuality(()=>{
              this.showList();
              this.$message({
                message: '成功设置为优质内容',
                type: 'success'
              });
            },{
              articleId: row.id,
              highQuality: row.highQuality == 0 ? 1 : row.highQuality == 1 ? 0 : null
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消设置'
            });
          });
      },
      //分类内容
      classification(prop) {
        this.classificationShow = true
        this.$api.ClassificationManagement.QueryClassification(data => {
            this.options1 = data
        }, {
          id: 0
        })
      },
      determine() {
        this.classificationShow = false
        const firstTypeName = this.FirstClassificationValue
        const SecondTypeName = this.FirstClassificationValue
        this.shenhePass(row, 1)
      },
      handleChange1() {
        const firstItem = this.options1.filter(item => {
          if(item.typeName == this.FirstClassificationValue) {
            return item
          }
        })
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.options2 = data
        }, {
          id: firstItem[0].id
        })
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          this.imgList = data
        }, {
          id: firstItem[0].id
        })
      },
      handleChange2() {
        const secondItem = this.options2.filter(item => {
          if(item.typeName == this.SecondClassificationValue) {
            return item
          }
        })
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          console.log(data)
          this.imgList = data
        }, {
          id: secondItem[0].id
        })
      },
      chooseImg(index, id) {
        this.SelectedImageIndex = index
      }
    }
  };
</script>

<style scoped lang="less">
  .el-button + .el-button {
    margin: 5px 0 0 0;
  }

  .search {
    margin-top: 15px;
    overflow: hidden;
  }

  .caozuoBtn {
    // display: block;
    width: 85px;
  }

  .pl_Box {
    overflow: hidden;
    .pinglun {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      margin-top: 5px;
      overflow: hidden;

      img {
        float: left;
      }
      span.plName {
        margin-left: 10px;
      }
      span.plContent {
        // float: left;
        background: #eee;
        margin-left: 56px;
        padding: 3px 15px;
        display: block;
        position: relative;
        i {
          position: absolute;
          top: 6px;
          right: 11px;
          font-size: 16px;
          cursor: pointer;
        }
      }

    }
  }

  .contentBtn {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #606266;
  }

  .no_pinglun {
    height: 100px;
    h4 {
      text-align: center;
      line-height: 100px;
      color: red;
    }
  }

  @theme_color: rgb(233, 116, 38);
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

  .imgBox {
    width: 450px;
    height: 200px;
    margin-top: 10px;
    border: 1px solid #eee;
    overflow-y: auto;
    .imglist {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 5px;
        cursor: pointer;
        position: relative;
        .selectMark {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: #000;
          opacity: 0.7;
          color: #fff;
          i {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
<style>
  .el-popover--plain {
    overflow: hidden;
    word-break: break-all
  }
</style>
