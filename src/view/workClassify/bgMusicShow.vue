<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/workclassify/workcontent' }">作品分类界面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">背景音展示</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-box">
      <el-button @click="officalUpload" type="primary" plain size="mini">上传背景音乐</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column label="音频" align="center" width="350">
            <template slot-scope="props">
            <audio :src="$oss.url + props.row.backgroundMusic" controls></audio>
            </template>
        </el-table-column>
        <!-- <el-table-column label="图片" align="center">
            <template slot-scope="props">
            <img :src="$oss.url + props.row.picture" alt="" width="80">
            </template>
        </el-table-column> -->
        <el-table-column prop="typeName" label="分类" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="props">
            <el-button @click="cancel(props.row)" size="mini" type="danger" plain>删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>

    <!-- 上传背景音乐的弹窗 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="workValue" placeholder="请输入作品名称" size="medium"></el-input><br>
      <!-- <el-input v-model="workIntroduction" placeholder="请输入作品简介" size="medium"></el-input><br> -->
      <!-- 选择分类 -->
      <el-select v-model="value" placeholder="请选择" size="medium">
        <el-option v-for="item in options" :key="item.id" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <!-- 上传图片 -->
      <!-- <div class="add_head" @click="selectIcon(0)">
        <img :src="$oss.url + editorImg" alt width="100%">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon"
        style="display: none"> -->
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
        workValue: '', //背景音乐标题
        workIntroduction: '', //作品简介
        editorImg: '',     //背景图片
        addAudio: '',   //背景音乐
        type: -1,
        options: [],
        value: '', //作品
        audioTime: '', //音频时长
        tableData: [],
      }
    },
    created() {
        this.getBgData()
    },
    methods: {
      officalUpload() {
        this.centerDialogVisible = true
        this.$api.workClassify.selectProductionType(data => {
          this.options = data
        }, {
          attribute: 2
        })
      },
      //获取背景音乐的数据
      getBgData() {
        this.$api.workClassify.selectBackgroundMusic(data => {
            console.log(data)
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
        if (this.workValue && this.addAudio) {
          this.$api.workClassify.insertBackgroundMusic(data => {
            this.centerDialogVisible = false
            this.getBgData()
            this.workValue = ''
            this.value = ''
            this.addAudio = ''
            this.$notify({
              title: '成功',
              message: '添加背景音乐成功',
              type: 'success'
            });
          }, {
            title: this.workValue,
            backgroundMusic: this.addAudio,
            second: this.audioTime,
            type: this.value,
          })
        } else {
          this.$message.error('请输入相关内容')
        }
      },
      //删除背景音乐
      cancel(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$api.workClassify.deleteBackgroundMusic(data => {
                this.getBgData()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
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

<style lang="less" scoped>
    .bg-box {
        margin: 20px 0;
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
