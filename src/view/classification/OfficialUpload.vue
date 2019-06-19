<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/channel/timeslot' }">分类页面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">音频的上传和背景图</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 上传 -->
    <div class="upload">
      <el-button type="primary" @click="uploaded">上传</el-button>
    </div>
    <!-- 图片和音频的展示 -->
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="id" label="id" width="180" align="center">
      </el-table-column>
      <el-table-column label="声音" align="center">
        <template slot-scope="props">
          <audio :src="$oss.url + props.row.voice" controls></audio>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="props">
          <img :src="$oss.url + props.row.picture" alt="" width="80" height="40">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
          <template slot-scope="props">
            <!-- <el-button type="primary" size="mini"  @click="updata(props)">修改</el-button> -->
            <el-button type="danger" size="mini"  @click="del(props)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination> 
    </div>
    <!-- 上传音频 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisibleAudio"
      width="30%"
      center>
      <!-- 上传音频 -->
      <el-button @click="selectPic">选择图片</el-button><br>
      <img :src="$oss.url + pictureAddress" alt="" width="200" height="100">
      <div class="boxs">
        <audio :src="$oss.url + addAudio" controls="controls" v-if="addAudio!==''" id="audio_duration"></audio>
      </div>
      <input accept="audio/*" ref="audioFile" @change="iconFileChange" type="file" name="icon" style="display: none">
      <el-button type="primary" @click="selectIcon(1)">上传音频</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerAudio">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择图片 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisibleImg"
      width="60%"
      center>
      <!-- 选择一级分类 -->
      <el-select v-model="value1" placeholder="请选择" @change="handleChange1">
        <el-option v-for="item in options1" :key="item.typeName" :label="item.typeName" :value="item.typeName">
        </el-option>
      </el-select>
      <!-- 选择二级分类 -->
      <el-select v-model="value2" collapse-tags style="margin-left: 20px;" placeholder="请选择" @change="handleChange2">
        <el-option v-for="item in options2" :key="item.typeName" :label="item.typeName" :value="item.typeName">
        </el-option>
      </el-select>
      <ul class="imgList">
        <li v-for="(item, index) in imgList" :key="index">
          <img :src="$oss.url + item.picture" alt="" @click="SelectedImage(item)">
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as OSS from "ali-oss";
  export default {
    data() {
      return {
        addImg: '',
        addAudio: '',
        type: -1, //判断当前的点击类型
        options1: [],
        options2: [],
        value1: [],
        value2: [],
        imgList: [],
        currentPage: 1,
        tableData: [],
        centerDialogVisibleAudio: false,
        centerDialogVisibleImg: false,
        pictureId: '',
        pictureAddress: '',
        total: 0
      }
    },
    created() {
      this.getAllAudio()
    },
    mounted() {
      this.$api.ClassificationManagement.QueryClassification(data => {
        this.options1 = data
      }, {
        id: 0
      })
    },
    methods: {
      getAllAudio() {
        this.$api.ClassificationManagement.QueryOfficialAudio(data => {
          this.tableData = data.result
          this.total = data.pageInfo.total
        }, {
          pageNum: this.currentPage
        })
      },
      selectIcon(type) {
        //type 0为图片 1为音频
        if (type == 0) {
          this.type = 0
          this.$refs.iconFile.click();
          this.$refs.iconFile.value = null;
        } else if (type == 1) {
          this.type = 1
          this.$refs.audioFile.click();
          this.$refs.audioFile.value = null;
        }
      },
      iconFileChange(e) {
        let file = e.target.files[0];
        if (!file.name.substring(file.name.lastIndexOf(".")) == ".png") {
          return;
        }
        let reader = new FileReader();
        reader.onload = e => {
          let data = e.target.result;
          this.$api.oss.update(data => {
            new OSS.Wrapper({
                region: "oss-cn-hangzhou",
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.securityToken,
                bucket: 'sounds-miyu'
                // bucket: 'zhiyuan-hz'
              })
              .put(data.random, file)
              .then(data => {
                if (this.type == 0) {
                  this.addImg = data.name
                } else if (this.type == 1) {
                  this.addAudio = data.name
                }
              })
              .catch(function (err) {
                console.error("error: %j", err);
              });
          }, {});
          // };
          // image.src = data;
        };
        reader.readAsDataURL(file);
      },
      //选完一级分类后 显示所有的二级分类
      handleChange1() {
        const firstId = this.options1.filter(item => {
          if(item.typeName == this.value1) {
            return item
          }
        })
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.options2 = data
        }, {
          id: firstId[0].id
        })
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          this.imgList = data
        }, {
          id: firstId[0].id
        })
      },
      handleChange2() {
        const secondId = this.options2.filter(item => {
          if(item.typeName == this.value2) {
            return item
          }
        })
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          this.imgList = data
        }, {
          id: secondId[0].id
        })
      },
      updata(props) {
        console.log(props)
      },
      del(props) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.ClassificationManagement.DeleteOfficialAudio(data => {
            this.getAllAudio()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, {
            id: props.row.id
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleCurrentChange() {
        this.$api.ClassificationManagement.QueryOfficialAudio(data => {
          this.tableData = data.result
        }, {
          pageNum: this.currentPage
        })
      },
      uploaded() {
        this.centerDialogVisibleAudio = true
      },
      selectPic() {
        this.centerDialogVisibleImg = true
      },
      SelectedImage(item) {
        this.pictureId = item.id
        this.pictureAddress = item.picture
      },
      centerImg() {
          this.centerDialogVisibleImg = false
      },
      centerAudio() {
        this.centerDialogVisibleAudio = false
        this.$api.ClassificationManagement.InsertOfficialAudio(data => {
          this.getAllAudio()
          this.addAudio = ''
          this.pictureAddress = ''
          this.value1 = ''
          this.value2 = ''
        }, {
          voice: this.addAudio,
          picture: this.pictureAddress,
          pictureId: this.pictureId
        })
      },
    }
  }

</script>

<style lang="scss" scoped>
  .upload {
    .el-button {
      margin: 10px 0;
    }
  }
  .block {
    float: right;
    width: 485px;
    margin-top: 30px;
    .el-pagination {
      width: 100%;
    }
  }
  .boxs {
    width: 300px;
    margin: 10px 0;
    min-height: 100px;
    border: 1px solid #999;
  }
  .imgList {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 5px;
      img {
        width: 100px;
        height: 50px;
        cursor: pointer;
      }
    }
  }
</style>
