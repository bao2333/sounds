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

      <!-- 分类的弹窗 -->
      <el-dialog :title="markTitle" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input v-model="firstTitle" v-if="type == 1" placeholder="输入一级分类"></el-input>
        <el-input v-model="secondTitle" v-else placeholder="输入二级分类"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
      
      <!-- 修改的弹窗 -->
      <el-dialog
        title="修改"
        :visible.sync="centerDialogVisibleEdit"
        width="30%"
        center>
        <el-input v-model="changeFirstTypeName" placeholder="请输入修改的一级分类" v-if="type == 1"></el-input>
        <el-input v-model="changeSecondTypeName" placeholder="请输入修改的二级分类" v-else></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerEdit">确 定</el-button>
        </span>
      </el-dialog>


      <!-- <router-view></router-view> -->
      <div class="box-pic">
        <!-- <ul class="piclist">
          <li class="pic" v-for="(item, index) in pictureList" :key="index">
            <img :src="$oss.url + item.picture" alt="" width="343" height="171.5">
            <div class="box-item">
              <div class="headline">
                {{item.title}}
              </div>
              <div class="introduction">
                {{item.content}}
              </div>
            </div>
            <div class="mark">
              <div class="center">
                <el-button circle type="primary" icon="el-icon-edit" @click="edit(item)"></el-button>
                <el-button circle type="danger" icon="el-icon-delete" @click="delPic(item.id)"></el-button>
              </div>
            </div>
          </li>
          <li class="last pic">
            <el-button type="primary" @click="uploadMark">上传</el-button>
          </li>
        </ul> -->
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
        <el-dialog title="提示" :visible.sync="centerDialogVisibleImg" width="30%" center>
          <div class="boxImg">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <el-input v-model="introduction" placeholder="请输入内容简介"></el-input>
            <!-- 上传图片 -->
            <div class="add_head" @click="selectIcon(0)">
              <img :src="$oss.url + editorImg" alt width="100%">
              <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
            </div>
            <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon"
              style="display: none">
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisibleImg = false">取 消</el-button>
            <el-button type="primary" @click="dermine">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import * as OSS from "ali-oss";
import { type } from 'os';
  export default {
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisibleImg: false,
        centerDialogVisibleEdit: false,
        markTitle: '', //弹框的标题
        type: 0, //根据类型显示不同的输入框
        firstTitle: '', //一级分类的标题
        secondTitle: '', //二级分类的标题
        PrimaryClassification: [], //一级分类内容
        SecondaryClassification: [], //二级分类内容
        firstnum: 0,
        secondnum: null,
        plusShow: true,
        editorImg: '', //头像地址
        title: '', //标题
        introduction: '', //简介
        pictureList: [], //图片的列表
        type: -1, //判断当前的点击类型
        addAudio: '', //音频地址
        pictureId: '', //图片Id
        pictureAddress: '', //图片地址
        changeFirstTypeName: '',  //修改分类的内容
        changeSecondTypeName: ''
      }
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
              if(secondId && firstId) {
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
          this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
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
      editType(type) {
        // type为1 是修改1级分类  type为2 是修改2级分类
        this.centerDialogVisibleEdit = true
        if(type == 1) {
          this.type = 1
          const editElementTypeName = this.PrimaryClassification[this.firstnum].typeName
          this.changeFirstTypeName = editElementTypeName 
        } else if (type == 2) {
          this.type = 2
          const editElementTypeName = this.SecondaryClassification[this.secondnum].typeName
          this.changeSecondTypeName = editElementTypeName
        }
      },
      centerEdit() {
        this.centerDialogVisibleEdit = false
        if(this.type == 1) {
            const editElementId= this.PrimaryClassification[this.firstnum].id
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
        } else if(this.type == 2) {
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
      firstContent(index) {
        this.firstnum = index
        const firstId = this.PrimaryClassification[this.firstnum].id
        this.GetSecondClassification(firstId)
        this.getPicture(firstId)
      },
      secondContent(index) {
        this.secondnum = index
        const secondId = this.SecondaryClassification[this.secondnum].id
        this.getPicture(secondId)
      },
      //查询一级分类
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
      //获取图片
      getPicture(id) {
        this.$api.ClassificationManagement.GetCategoryImage(data => {
          this.pictureList = data
        }, {
          id
        })
      },
      //上传
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
      uploadMark() {
        this.centerDialogVisibleImg = true
      },
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
      center() {

      },
      modify(item) {

      },
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
      }
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
      border-bottom: 1px solid black;

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

</style>
