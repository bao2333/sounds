<template>
  <div>
    <el-button type="primary" @click="addIndex">增加分类</el-button>
    <el-button type="primary" @click="addIndexPic">增加分类的图片</el-button>
    <el-table ref="tab" :data="tableData" row-key="id" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center">
      </el-table-column>
      <el-table-column prop="typeName" label="分类名称" align="center">
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="prop">  
          {{ prop.row.type == 1 ? '官方' : (prop.row.type == 2 ? '秀音': (prop.row.type == 3 ? '推荐' : (prop.row.type == 4 ?'人声' : '无')) ) }}
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="props">
          <img :src="$oss.url + props.row.picture" alt="" width="80" height="40">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="props">
          <el-button type="primary" size="mini"  @click="updata(props)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(props)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加分类的弹窗 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input v-model="typeName" placeholder="请输入分类名称"></el-input>
      <el-select v-model="typeValue" placeholder="请选择" @change="valueChange">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 增加内容的分类 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisibleImg" width="30%" center>
      <el-select v-model="value" placeholder="请选择分类名称" @change="handleChange">
        <el-option v-for="item in options" :key="item.id" :label="item.typeName" :value="item.typeName">
        </el-option>
      </el-select>
      <el-input v-model="title" placeholder="请输入简介"></el-input>
      <div class="add_head" @click="selectIcon(0)">
        <img :src="$oss.url + editorImg" alt width="100%" height="180">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none">
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleImg = false">取 消</el-button>
        <el-button type="primary" @click="dermineImg">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisibleEditImg" width="30%" center>
      <el-input v-model="value1" placeholder="修改的标题"></el-input>
      <div class="add_head" @click="selectIcon(0)">
        <img :src="$oss.url + editorImg1" alt width="100%" height="180">
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange1" type="file" name="icon" style="display: none">
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleEditImg = false">取 消</el-button>
        <el-button type="primary" @click="dermineEditImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as OSS from "ali-oss";
  // https://www.cnblogs.com/xiangsj/p/6628003.html
  export default {
    data() {
      return {
        plusShow: true,
        tableData: [],
        centerDialogVisible: false,
        centerDialogVisibleImg: false,
        centerDialogVisibleEditImg: false,
        editorImg: '',
        editorImg1: '',
        typeName: '',
        typeId: '',
        value: '',
        value1: '',
        title: '',
        options: [],
        typeOptions: [{
          value: '1',
          label: '官方'
        }, {
          value: '2',
          label: '秀音'
        }, {
          value: '3',
          label: '推荐'
        }, {
          value: '4',
          label: '人声'
        }],
        typeValue: '',
        indexInfoId: ''
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      const el = this.$refs.tab.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      new Sortable(el, {
        animation: 150,
        onEnd: evt => {
          this.$api.ClassificationManagement.ChangeCategorySort(data => {
            this.getData()
          }, {
            beSort: this.tableData[evt.oldIndex].sort,
            beSortId: this.tableData[evt.oldIndex].id,
            sort: this.tableData[evt.newIndex].sort,
            sortId: this.tableData[evt.newIndex].id
          })
        }
      })
    },
    methods: {
      // 获取首页上面四个的分类
      getData() {
        this.$api.ClassificationManagement.QueryHorizontalContent(data => {
          this.tableData = data
        }, {
          id: -1
        })
      },
      updata(props) {
        console.log(props)
        this.centerDialogVisibleEditImg = true
        this.indexInfoId = props.row.id
        this.value1 = props.row.typeName
        this.editorImg1 = props.row.picture
      },
      //删除分类
      del(props) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.ClassificationManagement.DeleteCategory(data => {
            this.getData()
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
      addIndex() {
        this.centerDialogVisible = true
      },
      dermine() {
        this.centerDialogVisible = false
        if(this.typeName.length <= 6) {
          this.$api.ClassificationManagement.IncreaseClassification(data => {
            this.typeName = ''
            this.typeValue = ''
          }, {
            typeName: this.typeName,
            level: -1,
            highLevelId: -1,
            type: this.typeValue
          })
        }
      },
      addIndexPic() {
        this.centerDialogVisibleImg = true
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.options = data
        }, {
          id: -1
        })
      },
      dermineImg() {
        this.centerDialogVisibleImg = false

        if(this.value && this.editorImg) {
            this.$api.ClassificationManagement.AddPicture(data => {
              this.getData()
              this.editorImg = ''
              this.title = ''
              this.value = ''
            }, {
              picture: this.editorImg,
              id: this.typeId,
              title: this.title,
              content: ''
            })
        } else {
         this.$message.error('请填写相关信息');
        }
        
      },
      handleChange() {
        const typeId = this.options.filter(item => {
          if (item.typeName == this.value) {
            return item
          }
        })
        this.typeId = typeId[0].id
      },
      valueChange() {
        console.log(this.typeValue)
      },
      selectIcon() {
        this.$refs.iconFile.click();
        this.$refs.iconFile.value = null;
      },
      dermineEditImg() {
        this.centerDialogVisibleEditImg = false
        this.$api.ClassificationManagement.updateTypeAndPicture(data => {
          this.getData()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }, {
          id: this.indexInfoId,
          typeName: this.value1,
          picture: this.editorImg1
        })
      },
      iconFileChange(e) {
        let file = e.target.files[0];

        // var reg = /image/
        // var str = file.type
        // var s = reg.test(str)
        // if(s) {
        //   var fileLimit = file.size / 1024 < 500
        //   if(!fileLimit) {
        //     this.$message.error('上传图片大小不能超过 500KB!')
        //   }
        // }
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

        // let reader = new FileReader();
        // reader.onload = e => {
        //   let data = e.target.result;
        //   this.$api.oss.update(data => {
        //     new OSS.Wrapper({
        //         region: "oss-cn-hangzhou",
        //         accessKeyId: data.accessKeyId,
        //         accessKeySecret: data.accessKeySecret,
        //         stsToken: data.securityToken,
        //         bucket: 'sounds-miyu'
        //         // bucket: 'zhiyuan-hz'
        //       })
        //       .put(data.random, file)
        //       .then(data => {
        //         this.editorImg = data.name; //头像上传
        //         this.plusShow = false;
        //       })
        //       .catch(function (err) {
        //         console.error("error: %j", err);
        //       });
        //   }, {});
        //   // };
        //   // image.src = data;
        // };
        // reader.readAsDataURL(file);
      },
      iconFileChange1(e) {
        let file = e.target.files[0];

        // var reg = /image/
        // var str = file.type
        // var s = reg.test(str)
        // if(s) {
        //   var fileLimit = file.size / 1024 < 500
        //   if(!fileLimit) {
        //     this.$message.error('上传图片大小不能超过 500KB!')
        //   }
        // }
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

        // let reader = new FileReader();
        // reader.onload = e => {
        //   let data = e.target.result;
        //   this.$api.oss.update(data => {
        //     new OSS.Wrapper({
        //         region: "oss-cn-hangzhou",
        //         accessKeyId: data.accessKeyId,
        //         accessKeySecret: data.accessKeySecret,
        //         stsToken: data.securityToken,
        //         bucket: 'sounds-miyu'
        //         // bucket: 'zhiyuan-hz'
        //       })
        //       .put(data.random, file)
        //       .then(data => {
        //         this.editorImg = data.name; //头像上传
        //         this.plusShow = false;
        //       })
        //       .catch(function (err) {
        //         console.error("error: %j", err);
        //       });
        //   }, {});
        //   // };
        //   // image.src = data;
        // };
        // reader.readAsDataURL(file);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .add_head {
    width: 343px;
    height: 171.5px;
    border: 1px dashed #ccc;
    margin-top: 10px;
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
  .el-input {
    margin: 5px 0;
  }
</style>