<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/workclassify/workcontent' }">作品分类界面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">猜你喜欢</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="upload">
      <el-button @click="officalUpload" type="primary" plain size="mini">上传作品</el-button>
      <div class="sort">
        <el-input v-model="sortValue" placeholder="排序的id" size="mini"></el-input>
        <el-input v-model="beSortValue" placeholder="被排序的id" size="mini"></el-input>
        <el-button size="mini" @click="sortLike" plain type="primary">排序</el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center">
      </el-table-column>
      <el-table-column prop="name" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="introduction" label="简介" align="center">
      </el-table-column>
      <el-table-column label="音频" align="center" width="350">
        <template slot-scope="props">
          <audio :src="$oss.url + props.row.voice" controls></audio>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="props">
          <img :src="$oss.url + props.row.picture" alt="" width="80">
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="分类" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="props">
          <el-button @click="cancelLike(props.row)" size="mini" type="primary" plain>取消喜欢</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 上传内容的弹窗 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="workValue" placeholder="请输入作品名称" size="medium"></el-input><br>
      <el-input v-model="workIntroduction" placeholder="请输入作品简介" size="medium"></el-input><br>
      <!-- 选择分类 -->
      <el-select v-model="value" placeholder="请选择" size="medium">
        <el-option v-for="item in options" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <!-- 上传图片 -->
      <div class="add_head" @click="selectIcon(0)">
        <img :src="$oss.url + editorImg" alt width="100%">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon"
        style="display: none">
      <!-- 上传音频 -->
      <div class="boxs">
        <audio :src="$oss.url + addAudio" controls="controls" v-if="addAudio!==''" id="audio_duration"></audio>
      </div>
      <input accept="audio/*" ref="audioFile" @change="iconFileChange" type="file" name="icon" style="display: none">
      <el-button type="primary" @click="selectIcon(1)">上传音频</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import * as OSS from "ali-oss";
  export default {
    data() {
      return {
        plusShow: true,
        centerDialogVisible: false,
        workValue: '', //作品名
        workIntroduction: '', //作品简介
        editorImg: '',  //图片的地址
        addAudio: '',   //音频地址
        type: -1,   //判断当前的点击
        options: [],   //当前作品分类的列表
        value: '', //作品
        audioTime: '', //音频时长
        tableData: [], //喜欢数据的列表
        sortValue: '',   //排序的值
        beSortValue: ''  //被排序的值
      }
    },
    created() {
      this.getLikeData()
    },
    methods: {
      //官方上传
      officalUpload() {
        this.centerDialogVisible = true
        this.$api.workClassify.selectProductionType(data => {
          this.options = data
        }, {
          attribute: 1
        })
      },
      //获取喜欢的数据
      getLikeData() {
        this.$api.workClassify.selectRecordGuessLike(data => {
          this.tableData = data
        })
      },
      selectIcon(type) {
        // type为 0是图片  1为音频
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

        var url = URL.createObjectURL(file)
        var audioElement = new Audio(url);
        var duration;
        var that = this
        audioElement.addEventListener("loadedmetadata", function (_event) {
          duration = audioElement.duration;
          that.audioTime = Math.floor(duration)
        });



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
                  this.editorImg = data.name; //头像上传
                  this.plusShow = false;
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
      //确定上传
      sure() {
        if (this.workValue && this.workIntroduction && this.editorImg && this.addAudio) {
          this.$api.workClassify.insertOfficialRecord(data => {
            this.centerDialogVisible = false
            this.getLikeData()
            this.workValue = ''
            this.workIntroduction = ''
            this.value = ''
            this.editorImg = ''
            this.addAudio = ''
            this.$notify({
              title: '成功',
              message: '添加官方音频成功',
              type: 'success'
            });
          }, {
            name: this.workValue,
            introduction: this.workIntroduction,
            type: this.value,
            voice: this.addAudio,
            picture: this.editorImg,
            second: this.audioTime
          })
        } else {
          this.$message.error('请输入相关内容')
        }
      },
      //取消喜欢
      cancelLike(row) {
        this.$api.workClassify.updateRecordGuessLike(data => {
          console.log(data)
          this.getLikeData()
        }, {
          id: row.id,
          guessLike: 0
        })
      },
      //排序
      sortLike() {
        if(this.sortValue && this.beSortValue) {
          var sortItem = this.tableData.filter(item => {
            if(item.id == this.sortValue) {
              return item
            }
          })
          var beSortItem = this.tableData.filter(item => {
            if(item.id == this.beSortValue) {
              return item
            }
          })
          this.$api.workClassify.updateGuessLikeSort(data => {
            this.getLikeData()
            this.sortValue = ''
            this.beSortValue = ''
            this.$notify({
              title: '成功',
              message: '排序成功',
              type: 'success'
            });
          }, {
            id: this.sortValue,
            sort: sortItem[0].sort,
            beId: this.beSortValue,
            beSort: beSortItem[0].sort
          })
        } else {
          this.$message.error('内容不能为空')
        }
      }
    }
  }

</script>

<style lang="less" scoped>

  .upload {
    margin: 20px 0;
    display: flex;
    .sort {
      display: flex;
      margin-left: 300px;
      .el-input {
        width: 120px;
        margin-right: 10px;
      }
    }
  }
  .el-dialog__wrapper {
    .el-input {
      width: 200px;
      margin: 4px 0;
    }
  }

  .add_head {
    width: 100px;
    height: 100px;
    margin-top: 6px;
    border: 1px dashed #ccc;
    //float: left;
    position: relative;
    cursor: pointer;

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -12.5px;
      margin-top: -12.5px;
      font-size: 25px;
    }
  }

  .boxs {
    width: 300px;
    min-height: 100px;
    margin: 6px 0;
    border: 1px solid #999;
  }

</style>
