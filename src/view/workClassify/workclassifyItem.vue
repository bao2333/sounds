<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/workclassify/workcontent' }">作品分类界面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">作品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="classify">
      <div class="child">
        <h3>作品分类</h3>
        <div class="work-box">
          <div class="label" v-for="(item,index) in labelArrs" :key="index" :style="[divWidth]">
            <input type="text" v-model="item.typeName" :style="[inputOfWidth]">
            <i class="ion ion-md-close align-middle" @click="close_label(item.id)"></i>
          </div>
          <div class="add_label" @click="add_label" v-if="add_type !== '1'">
            <p v-show="show_label">+</p>
            <input type="text" v-model="newValue" placeholder="新增分类" v-show="!show_label" @blur="disappear(1)">
          </div>
        </div>
      </div>
      <div class="child">
        <div class="child-bg">
          <h3>背景音分类</h3>
          <el-button type="primary" size="mini" plain @click="open">背景分类</el-button>
        </div>
        <div class="work-box">
          <ul class="bg-list">
            <li v-for="(item, index) in bgMusic" :key="index"> 
                <img :src="$oss.url + item.picture" alt="" width="160" height="120">
                <p class="text">{{ item.typeName }}</p>
                <i class="el-icon-edit edit" @click="modify(item)"></i>
                <i class="ion ion-md-close delete" @click="close_label(item.id)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="child">
        <h3>头像分类</h3>
        <div class="work-box">
          <div class="label" v-for="(item,index) in avatarArr" :key="index" :style="[divWidth]">
            <input type="text" v-model="item.typeName" :style="[inputOfWidth]">
            <i class="ion ion-md-close align-middle" @click="close_label(item.id)"></i>
          </div>
          <div class="add_label" @click="add_avatar_label" v-if="add_type !== '1'">
            <p v-show="show_avatar_lable">+</p>
            <input type="text" v-model="avatarValue" placeholder="新增分类" v-show="!show_avatar_lable"
              @blur="disappear(3)">
          </div>
        </div>
      </div>
    </div>

    <!-- 上传背景分类的弹窗 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="newBgValue" placeholder="请输入背景分类" size="medium"></el-input>
      <!-- 上传图片 -->
      <div class="add_head" @click="selectIcon(0)">
        <img :src="$oss.url + editorImg" alt width="100%">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange1" type="file" name="icon"
        style="display: none">

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeBg">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改背景分类的弹窗 -->
    <el-dialog title="修改" :visible.sync="updateDialogVisible" width="30%" center>
      <el-input v-model="newBgValue1" placeholder="请输入修改的背景分类" size="medium"></el-input>
      <!-- 上传图片 -->
      <div class="add_head" @click="selectIcon1(0)">
        <img :src="$oss.url + editorImg1" alt width="100%">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow1"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile1" @change="iconFileChange2" type="file" name="icon"
        style="display: none">

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateEdit">确 定</el-button>
      </span>
    </el-dialog>
    

  </div>
</template>

<script>
  import * as OSS from "ali-oss";
  export default {
    data() {
      return {
        labelArrs: [],
        bgMusic: [],
        avatarArr: [],
        newValue: '',
        newBgValue: '',
        avatarValue: '',
        show_label: true,
        show_bg_label: true,
        show_avatar_lable: true,
        inputOfWidth: {
          width: '138px'
        },
        divWidth: {
          width: '140px'
        },
        add_type: this.addtype,
        centerDialogVisible: false,
        plusShow: true,
        editorImg: '', //背景分类的图片,
        updateDialogVisible: false,
        newBgValue1: '',
        editorImg1: '',
        plusShow1: true,
      }
    },
    created() {
      this.getClassify(1)
      this.getClassify(2)
      this.getClassify(3)
    },
    methods: {
      //添加分类
      add_label() {
        this.show_label = false;
        this.newValue = ''
      },
      add_bg_label() {
        this.show_bg_label = false;
        this.newBgValue = ''
      },
      add_avatar_label() {
        this.show_avatar_lable = false;
        this.avatarValue = ''
      },
      //新增鼠标移出事件
      disappear(type) {
        if (type == 1) {
          this.show_label = true; //鼠标移出
          if (this.newValue !== '') {
            //添加接口
            this.$api.workClassify.insertProductionType(() => {
              this.$notify({
                type: 'success',
                message: '添加成功',
                title: '成功',
              })
              this.getClassify(1)
            }, {
              typeName: this.newValue,
              attribute: 1
            })
          }
        } else if (type == 3) {
          this.show_avatar_lable = true; //鼠标移出
          if (this.avatarValue !== '') {
            //添加接口
            this.$api.workClassify.insertProductionType(() => {
              this.$notify({
                type: 'success',
                message: '添加成功',
                title: '成功',
              })
              this.getClassify(3)
            }, {
              typeName: this.avatarValue,
              attribute: 3
            })
          }
        }
      },
      //查询分类
      getClassify(attr) {
        if (attr == 1) {
          this.$api.workClassify.selectProductionType(data => {
            this.labelArrs = data
          }, {
            attribute: attr
          })
        } else if (attr == 2) {
          this.$api.workClassify.selectProductionType(data => {
            this.bgMusic = data
          }, {
            attribute: attr
          })
        } else if (attr == 3) {
          this.$api.workClassify.selectProductionType(data => {
            this.avatarArr = data
          }, {
            attribute: attr
          })
        }
      },
      //删除分类
      close_label(id) {
        // this.arrs.splice(i, 1);     //假删除
        this.$confirm('确定要删除此标签吗?', '提示', {
          confirmButtonText: '狠心删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.workClassify.deleteProductionType(() => {
            this.$notify({
              type: 'success',
              message: '删除标签成功！',
              title: '成功',
            })
            this.getClassify(1)
            this.getClassify(2)
            this.getClassify(3)
          }, {
            id
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open() {
        this.centerDialogVisible = true
      },
      changeBg() {
        if (this.newBgValue !== '' && this.editorImg !== '') {
            //添加接口
            this.$api.workClassify.insertProductionType(() => {
              this.centerDialogVisible = false
              this.$notify({
                type: 'success',
                message: '添加成功',
                title: '成功',
              })
              this.newBgValue = ''
              this.editorImg = ''
              this.getClassify(2)
            }, {
              typeName: this.newBgValue,
              attribute: 2,
              picture: this.editorImg
            })
          }
      },
      modify(item) {
        this.updateDialogVisible = true
        this.currentInfo = item
        this.newBgValue1 = item.typeName
        this.editorImg1 = item.picture
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
      // 上传图片
      iconFileChange1(e) {
        let file = e.target.files[0];
        var fileLimit = file.size / 1024 < 500

        if(!fileLimit) {
          this.$message.error('上传图片大小不能超过 500KB!')
        } else {
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
                    this.editorImg = data.name; //头像上传
                    this.plusShow = false;
                })
                .catch(function (err) {
                  console.error("error: %j", err);
                });
            }, {});
            // };
            // image.src = data;
          };
          reader.readAsDataURL(file);
        }
      },
      //修改
      selectIcon1(type) {
        // type为 0是图片  1为音频
        if (type == 0) {
          this.type = 0
          this.$refs.iconFile1.click();
          this.$refs.iconFile1.value = null;
        } else if (type == 1) {
          this.type = 1
          this.$refs.audioFile.click();
          this.$refs.audioFile.value = null;
        }
      },
      // 修改上传图片
      iconFileChange2(e) {
        let file = e.target.files[0];
        var fileLimit = file.size / 1024 < 500

        if(!fileLimit) {
          this.$message.error('上传图片大小不能超过 500KB!')
        } else {
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
                    this.editorImg1 = data.name; //头像上传
                    this.plusShow1 = false;
                })
                .catch(function (err) {
                  console.error("error: %j", err);
                });
            }, {});
            // };
            // image.src = data;
          };
          reader.readAsDataURL(file);
        }
      },
      updateEdit() {
        this.$api.workClassify.updateProductionType(data => {
          this.updateDialogVisible = false
          this.getClassify(2)
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
        }, {
          id: this.currentInfo.id,
          typeName: this.newBgValue1,
          picture: this.editorImg1
        })
      }
    },
  }

</script>

<style lang="less" scoped>
  @theme_color: rgb(233, 116, 38);

  .classify {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .child {
      margin-right: 90px;
    }
  }


  h3 {
    margin: 20px 14px;
  }

  .work-box {
    width: 700px;
    min-height: 400px;
    box-sizing: border-box;
    border: 1px solid rgba(238, 238, 238, 0.808);
    box-shadow: 5px 2px 5px 2px rgba(233, 116, 38, 0.664);
    // display: flex;
    // flex-wrap: wrap;
    // float: left;
  }

  .label {
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
    position: relative;
    float: left;
    margin: 10px 30px;
    border-top-right-radius: 15px;

    input {
      display: inline-block;
      width: 98px;
      position: absolute;
      top: 50%;
      margin-top: -10px;
      // left: 50%;
      // margin-left: -40px;
      text-align: center;
      background-color: #fff;
      border: none;
    }

    i {
      position: absolute;
      top: -8px;
      right: -10px;
      border: 1px solid #000;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 14px;
      cursor: pointer;
    }

    i:hover {
      background-color: rgb(233, 116, 38);
      color: #fff;
    }

  }

  .add_label {
    width: 150px;
    height: 40px;
    border: 1px dashed #ccc;
    float: left;
    //   margin:15px 0 0 15px;
    margin: 10px 30px;
    cursor: pointer;
    position: relative;

    p {
      font-size: 26px;
      line-height: 40px;
      text-align: center;
    }

    input {
      display: inline-block;
      width: 120px;
      position: absolute;
      top: 50%;
      margin-top: -10px;
      left: 50%;
      margin-left: -60px;
      text-align: center;
      background-color: #fff;
      border: 1px solid @theme_color;
    }
  }

  .add_label:hover {
    color: @theme_color;
    border: 1px dashed @theme_color;
  }

  .child-bg {
    display: flex;
    align-items: center;

    .el-button {
      height: 40px;
    }
  }
  .bg-list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 160px;
        height: 120px;
        margin: 20px 30px;
        position: relative;
        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          color: #fff;
          font-size: 20px;
          transform: translate(-50%,-50%)
        }
        .delete {
          position: absolute;
          right: -12px;
          top: -20px;
          font-size: 20px;
          cursor: pointer;
        }
        .edit {
          font-size: 20px;
          position: absolute;
          right: 12px;
          top: -20px;
          cursor: pointer;
        }
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
  

</style>
