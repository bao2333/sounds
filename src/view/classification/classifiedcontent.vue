<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/channel/timeslot' }">分类页面</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">分类内容</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box">
      <h3>一级分类</h3>
      <!-- <router-view name="first"></router-view> -->
      <div class="box-top">
        <ul class="labelList">
          <li v-for="(item, index) in PrimaryClassification" :key="index" :class="{'active': index == firstnum}">
            <span @click="firstContent(index)" class="first-title">{{item.typeName}}</span>
          </li>
          <li class="list-last">
            <el-button type="primary" icon="el-icon-plus" circle @click="add(1)"></el-button>
          </li>
          <li class="list-last">
            <el-button type="danger" icon="el-icon-delete" circle @click="del(1)"></el-button>
          </li>
          <li class="list-last">
            <el-button type="primary" icon="el-icon-edit" circle @click="editType(1)"></el-button>
          </li>
        </ul>
      </div>
      <h3>二级分类</h3>
      <div class="box-top">
        <ul class="labelList">
          <li v-for="(item, index) in SecondaryClassification" :key="index" :class="{'active': index == secondnum}">
            <span @click="secondContent(index)" class="first-title">{{item.typeName}}</span>
          </li>
          <li class="list-last">
            <el-button type="primary" icon="el-icon-plus" circle @click="add(2)"></el-button>
          </li>
          <li class="list-last">
            <el-button type="danger" icon="el-icon-delete" circle @click="del(2)"></el-button>
          </li>
          <li class="list-last">
            <el-button type="primary" icon="el-icon-edit" circle @click="editType(2)"></el-button>
          </li>
        </ul>
      </div>

      <!-- 一级二级分类的弹窗 -->
      <el-dialog :title="markTitle" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input v-model="firstTitle" v-if="type == 1" placeholder="输入一级分类"></el-input>
        <el-input v-model="secondTitle" v-else placeholder="输入二级分类"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改分类的弹窗 -->
      <el-dialog title="修改分类" :visible.sync="centerDialogVisibleEdit" width="30%" center>
        <el-input v-model="changeFirstTypeName" placeholder="请输入修改的一级分类" v-if="type == 1"></el-input>
        <el-input v-model="changeSecondTypeName" placeholder="请输入修改的二级分类" v-else></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="centerEdit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- <router-view></router-view> -->
      <!-- 图片的展示列表 -->
      <div class="box-pic">
        <el-button type="primary" @click="uploadMark">上传</el-button>
        <el-table ref="tab" :data="pictureList" row-key="id" border style="width: 100%">
          <el-table-column prop="id" label="id" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="content" label="内容" align="center">
          </el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="props">
              <img :src="$oss.url + props.row.picture" alt="" width="80" height="40">
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="props">
              <!-- <el-button type="primary" size="mini" @click="modify(props)">修改</el-button> -->
              <el-button type="danger" size="mini" @click="delItem(props.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 上传标题 简介 图片的弹窗 -->
        <el-dialog title="提示" :visible.sync="centerDialogVisibleImg" width="30%" center>
          <div class="boxImg">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <el-input v-model="introduction" placeholder="请输入内容简介"></el-input>
            <!-- 上传图片 -->
            <img :src="$oss.url + editorImg" alt="" width="300" height="150">
            <!-- <div class="add_head" @click="selectIcon(0)">
              <img :src="$oss.url + editorImg" alt width="100%">
              <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
            </div>
            <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none"> -->
            <el-button type="primary" @click="uploadCropImg">上传图片</el-button>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisibleImg = false">取 消</el-button>
            <el-button type="primary" @click="dermine">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 裁剪图片的弹窗 -->
        <el-dialog title="提示" :visible.sync="CropImage" width="50%" center>
          <div class="content">
            <div class="show-info">
              <h2>自动生成截图框 固定比例 w : h => 2 : 1</h2>
              <div class="test">
                <vueCropper ref="cropper2" :img="example2.img " :outputSize="example2.size"
                  :outputType="example2.outputType" :info="example2.info" :canScale="example2.canScale"
                  :autoCrop="example2.autoCrop" :autoCropWidth="example2.autoCropWidth"
                  :autoCropHeight="example2.autoCropHeight" :fixed="example2.fixed" :fixedNumber="example2.fixedNumber">
                </vueCropper>
              </div>
              <label class="btn" for="upload2">上传</label>
              <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);"
                accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,2)">
              <button @click="finish2()" class="btn">裁剪</button>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="DetermineCroppedImage">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import vueCropper from 'vue-cropper'
  import * as OSS from "ali-oss";

  export default {
    data() {
      return {
        CropImage: false,
        centerDialogVisible: false,
        centerDialogVisibleImg: false,
        centerDialogVisibleEdit: false,
        markTitle: '', //弹框的标题
        type: 0, //根据类型显示不同的输入框
        firstTitle: '', //一级分类的标题
        secondTitle: '', //二级分类的标题
        PrimaryClassification: [], //一级分类内容
        SecondaryClassification: [], //二级分类内容
        firstnum: 0,    //选中一级分类的下标
        secondnum: null,  //选中的二级分类的下标
        plusShow: true,
        editorImg: '', //头像地址
        title: '', //标题
        introduction: '', //简介
        pictureList: [], //图片的列表
        type: -1, //判断当前的点击类型
        addAudio: '', //音频地址
        changeFirstTypeName: '', //修改一级分类的内容
        changeSecondTypeName: '', //修改二级分类的内容

        //裁剪图片的变量
        model: false,
        modelSrc: '',
        crap: false,
        previews: {},
        form: {
          head: ''
        },
        example2: {
          //img的路径自行修改
          //   img: '$oss.url + \'/\' + form.head ',
          img: '$oss.url + form.head ',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 150,
          fixed: true,
          // 真实的输出宽高
          infoTrue: true,
          fixedNumber: [2, 1]
        },
        downImg: '#'
      }
    },
    components: {
      vueCropper
    },
    created() {
      this.GetClassification()
      this.GetSecondClassification(1)
    },
    mounted() {
      const el = this.$refs.tab.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      new Sortable(el, {
        animation: 150,
        onEnd: evt => {
          this.$api.ClassificationManagement.ChangeImageOrder(data => {
            var firstId = this.PrimaryClassification[this.firstnum].id
            if (this.SecondaryClassification.length) {
              var secondId = this.SecondaryClassification[this.secondnum].id
            }
            if (secondId && firstId) {
              this.getPicture(secondId)
            } else {
              this.getPicture(firstId)
            }
          }, {
            beSort: this.pictureList[evt.oldIndex].sort,
            beSortId: this.pictureList[evt.oldIndex].id,
            sort: this.pictureList[evt.newIndex].sort,
            sortId: this.pictureList[evt.newIndex].id
          })
        }
      })
    },
    methods: {
      //增加分类
      add(type) {
        // type为分类的等级  0为1级分类  1为2级分类 
        this.centerDialogVisible = true
        if (type == 1) {
          this.type = 1
          this.markTitle = '添加一级分类'
        } else if (type == 2) {
          this.type = 2
          this.markTitle = '添加二级分类'
        }
      },
      //删除分类
      del(type) {
        // type为 1 是删除一级分类
        // type为 2 是删除二级分类
        if (type == 1) {
          this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const delElementId = this.PrimaryClassification[this.firstnum].id
            this.$api.ClassificationManagement.DeleteCategory(data => {
              this.GetClassification()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }, {
              id: delElementId
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else if (type == 2) {
          this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const delElementId = this.SecondaryClassification[this.secondnum].id
            this.$api.ClassificationManagement.DeleteCategory(data => {
              const firstId = this.PrimaryClassification[this.firstnum].id
              this.GetSecondClassification(firstId)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }, {
              id: delElementId
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //修改分类
      editType(type) {
        // type为1 是修改1级分类  type为2 是修改2级分类
        this.centerDialogVisibleEdit = true
        if (type == 1) {
          this.type = 1
          const editElementTypeName = this.PrimaryClassification[this.firstnum].typeName
          this.changeFirstTypeName = editElementTypeName
        } else if (type == 2) {
          this.type = 2
          const editElementTypeName = this.SecondaryClassification[this.secondnum].typeName
          this.changeSecondTypeName = editElementTypeName
        }
      },
      //修改分类确定
      centerEdit() {
        this.centerDialogVisibleEdit = false
        if (this.type == 1) {
          const editElementId = this.PrimaryClassification[this.firstnum].id
          this.$api.ClassificationManagement.UpdateClassification(data => {
            this.GetClassification()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }, {
            typeName: this.changeFirstTypeName,
            id: editElementId
          })
        } else if (this.type == 2) {
          const editElementId = this.SecondaryClassification[this.secondnum].id
          this.$api.ClassificationManagement.UpdateClassification(data => {
            const firstId = this.PrimaryClassification[this.firstnum].id
            this.GetSecondClassification(firstId)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }, {
            typeName: this.changeSecondTypeName,
            id: editElementId
          })
        }
      },
      //添加分类确定
      determine() {
        this.centerDialogVisible = false
        if (this.type == 1) {
          this.$api.ClassificationManagement.IncreaseClassification(data => {
            this.firstTitle = ''
            this.GetClassification()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }, {
            typeName: this.firstTitle,
            level: 1,
            highLevelId: 0
          })
        } else if (this.type == 2) {
          const firstId = this.PrimaryClassification[this.firstnum].id
          this.$api.ClassificationManagement.IncreaseClassification(data => {
            this.secondTitle = ''
            this.GetSecondClassification(firstId)
          }, {
            typeName: this.secondTitle,
            level: 2,
            highLevelId: firstId
          })
        }
      },
      //点击一级分类
      firstContent(index) {
        this.firstnum = index
        const firstId = this.PrimaryClassification[this.firstnum].id
        this.GetSecondClassification(firstId)
        this.getPicture(firstId)
      },
      //点击二级分类
      secondContent(index) {
        this.secondnum = index
        const secondId = this.SecondaryClassification[this.secondnum].id
        this.getPicture(secondId)
      },
      //获取一级分类
      GetClassification() {
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.PrimaryClassification = data
        }, {
          id: 0
        })
      },
      //获取二级分类
      GetSecondClassification(id) {
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.SecondaryClassification = data
        }, {
          id
        })
      },
      //根据id获取对应分类的图片
      getPicture(id) {
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          this.pictureList = data
        }, {
          id
        })
      },
      uploadMark() {
        this.centerDialogVisibleImg = true
      },
      //添加分类确定
      dermine() {
        this.centerDialogVisibleImg = false
        var firstId = this.PrimaryClassification[this.firstnum].id
        if (this.SecondaryClassification.length) {
          var secondId = this.SecondaryClassification[this.secondnum].id
        }
        if (secondId && firstId) {
          this.$api.ClassificationManagement.AddPicture(data => {
            this.GetSecondClassification(firstId)
            this.getPicture(secondId)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.title = ''
            this.introduction = ''
            this.editorImg = ''
          }, {
            picture: this.editorImg,
            id: secondId,
            title: this.title,
            content: this.introduction
          })
        } else {
          this.$api.ClassificationManagement.AddPicture(data => {
            this.GetSecondClassification(firstId)
            this.getPicture(firstId)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.title = ''
            this.introduction = ''
            this.editorImg = ''
          }, {
            picture: this.editorImg,
            id: firstId,
            title: this.title,
            content: this.introduction
          })
        }
      },
      modify(item) {

      },
      //删除图片
      delItem(id) {
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.ClassificationManagement.DeleteImage(data => {
            var firstId = this.PrimaryClassification[this.firstnum].id
            if (this.SecondaryClassification.length) {
              var secondId = this.SecondaryClassification[this.secondnum].id
            }
            if (secondId && firstId) {
              this.getPicture(secondId)
            } else {
              this.getPicture(firstId)
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }, {
            id
          })




        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //上传图片之前裁剪图片
      uploadCropImg() {
        this.CropImage = true
      },
      DetermineCroppedImage() {
        this.CropImage = false
      },
      //base64转Blob
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
        });
      },
      //点击裁剪，这一步是可以拿到处理后的地址
      finish2() {
        this.$refs.cropper2.getCropData((data) => {
          this.modelSrc = data
          this.model = true;
          //裁剪后的图片显示
          this.example2.img = this.modelSrc;

          //阿里云处理图片，项目的接口，这里可以不用，上面的地址打印即为base64的地址
          this.$api.oss.update(data => {
            new OSS.Wrapper({
              //这里应该是有自己的配置的
              region: 'oss-cn-hangzhou',
              accessKeyId: data.accessKeyId,
              accessKeySecret: data.accessKeySecret,
              stsToken: data.securityToken,
              bucket: 'sounds-miyu'
            }).put(data.random, this.dataURLtoBlob(this.example2.img)).then(data => {

              this.form.head = data.name;
              this.modelSrc = this.form.head;
              this.editorImg = this.modelSrc

            }).catch(function (err) {
              console.error('error: %j', err);
            });
          });
          // console.log(this.modelSrc)
        })

      },
      //上传
      uploadImg(e, num) {
        //上传图片
        this.example2.img = ''
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          data = e.target.result
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blobcs
        reader.readAsArrayBuffer(file)
      },
    }
  }

</script>

<style lang="scss" scoped>
  .box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 10px;

    .box-top {
      width: 100%;
      max-height: 150px;
      overflow-y: auto;
      border-bottom: 1px solid #999;

      .labelList {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0 5px;

        li {
          margin: 5px 10px;
          line-height: 41px;
          cursor: pointer;
          padding: 0 5px;
          border-radius: 4px;

          .first-title {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 41px;
          }
        }

        .active {
          color: #fff;
          background: #409eff;
        }
      }
    }
  }

  .box-pic {
    .el-button {
      margin: 5px 0;
    }

    .piclist {
      display: flex;
      flex-wrap: wrap;

      .pic {
        width: 343px;
        height: 171.5px;
        margin: 20px;
        position: relative;

        .heightAudio {
          height: 50px;
        }

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

        &:hover .mark {
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

    .boxImg {
      width: 400px;

      .el-input {
        margin: 5px 0;
      }
    }

    .boxs {
      width: 300px;
      margin: 10px 0;
      min-height: 100px;
      border: 1px solid #999;
    }
  }

  .content {
    max-width: 585px;
    margin-bottom: 100px;

    .show-info {
      margin-bottom: 50px;

      h2 {
        line-height: 50px;
      }

      .test {
        height: 285px;
      }

      .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 20px 10px 0px 0px;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
      }
    }
  }

</style>
