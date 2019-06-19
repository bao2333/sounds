<template>
  <div>
    <div class="box">
      <ul class="piclist">
        <li class="pic" v-for="(item, index) in 1" :key="index">
          <img src="http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/68b58733368f4f42b5e56308403cb074" alt="" width="343" height="171.5">
          <div class="box-item">
            <div class="headline">
              标题
            </div>
            <div class="introduction">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro minus sint pariatur cum doloribus repudiandae quas expedita eaque dolore impedit iste quaerat inventore tempore a, perspiciatis nisi ratione aut! Recusandae!
            </div>
          </div>
          <div class="mark">
            <div class="center">
              <el-button circle type="primary" icon="el-icon-edit" @click="edit"></el-button>
              <el-button circle type="danger" icon="el-icon-delete" @click="delPic"></el-button>
            </div>
          </div>
        </li>
        <li class="last pic">
          <el-button type="primary" @click="uploadMark">上传</el-button>
        </li>
      </ul>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="boxImg">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
          <el-input v-model="introduction" placeholder="请输入内容简介"></el-input>
          <!-- 上传图片 -->
          <div class="add_head" @click="selectIcon(0)">
            <img :src="$oss.url + editorImg" alt width="100%">
            <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
          </div>
          <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none">
          <!-- 上传音频 -->
          <div class="boxs">
            <audio :src="$oss.url + addAudio" controls="controls" v-if="addAudio!==''" id="audio_duration"></audio>
          </div>
          <input accept="audio/*" ref="audioFile" @change="iconFileChange" type="file" name="icon" style="display: none">
          <el-button type="primary" @click="selectIcon(1)">上传音频</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dermine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import * as OSS from "ali-oss";

  export default {
    name: "editor",
    data() {
      return {
        plusShow: true,
        editorImg: '',   //头像地址
        title: '',  //标题
        introduction: '', //简介
        centerDialogVisible: false,
        type: -1, //判断当前的点击的类型
        addAudio: ''  //音频地址
      }
    },
    created() {

    },
    methods: {
      //上传
      selectIcon(type) {
        // type为 0是图片  1为音频
        if(type == 0) {
          this.type = 0
          this.$refs.iconFile.click();
          this.$refs.iconFile.value = null;
        } else if(type == 1) {
          this.type = 1
          this.$refs.audioFile.click();
          this.$refs.audioFile.value = null;
        }
        
      },
      iconFileChange(e) {
        let file = e.target.files[0];
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
                if(this.type == 0) {
                  this.editorImg = data.name; //头像上传
                  this.plusShow = false;
                } else if(this.type == 1) {
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
      uploadMark() {
        this.centerDialogVisible = true
      },
      dermine() {
        this.centerDialogVisible = false
        // const firstId = this.
        // this.$api.ClassificationManagement.AddPicture(data => {
        //   console.log(data)
        // }, {
        //   picture: '',
        //   id: '',
        //   title: '',
        //   content: ''
        // })
      },
      edit() {
        console.log('编辑')
      },
      delPic() {
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      }
    }
  }
</script>
<style>
  .el-textarea__inner {
    height: 200px;
  }
</style>
<style scoped lang="less">
  @theme_color: rgb(233, 116, 38);
  .box {
    .piclist {
      display: flex;
      flex-wrap: wrap;
      .pic {
        width: 343px;
        height: 171.5px;
        margin: 20px;
        position: relative;
        .mark {
          display: none;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 9999;
          background: #000;
          opacity: 0.8;
          text-align: center;
          .center {
            margin-top: 65px;
            .el-button {
              margin: 0 10px;
            }
          }
        }
        .box-item {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          color: #fff;
          padding: 0 10px;
          .headline {
            font-size: 24px;
            font-weight: bold;

          }
          .introduction {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        &:hover .mark{
          display: block;
        }
      }
      .last {
        text-align: center;
        line-height: 171.5px;
        border: 1px solid #999;
      }
    }
    .add_head {
      width: 343px;
      height: 171.5px;
      border: 1px dashed #ccc;
      float: left;
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
      border: 1px solid #999;
    }
    .boxImg {
      width: 400px;
      height: 300px;
      .el-input {
        margin: 5px 0;
      }
    }
}

</style>
