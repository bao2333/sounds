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
        <h3>背景音分类</h3>
        <div class="work-box">
          <div class="label" v-for="(item,index) in bgMusic" :key="index" :style="[divWidth]">
            <input type="text" v-model="item.typeName" :style="[inputOfWidth]">
            <i class="ion ion-md-close align-middle" @click="close_label(item.id)"></i>
          </div>
          <div class="add_label" @click="add_bg_label" v-if="add_type !== '1'">
            <p v-show="show_bg_label">+</p>
            <input type="text" v-model="newBgValue" placeholder="新增分类" v-show="!show_bg_label" @blur="disappear(2)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelArrs: [],
        bgMusic: [],
        newValue: '',
        newBgValue: '',
        show_label: true,
        show_bg_label: true,
        inputOfWidth: {
          width: '138px'
        },
        divWidth: {
          width: '140px'
        },
        add_type: this.addtype,
      }
    },
    created() {
      this.getClassify(1)
      this.getClassify(2)
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
      //新增鼠标移出事件
      disappear(type) {
        if(type == 1) {
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
        } else if (type == 2) {
          this.show_bg_label = true; //鼠标移出
          if (this.newBgValue !== '') {
            //添加接口
            this.$api.workClassify.insertProductionType(() => {
                this.$notify({
                  type: 'success',
                  message: '添加成功',
                  title: '成功',
                })
                this.getClassify(2)
              }, {
                typeName: this.newBgValue,
                attribute: 2
              })
            }
          }
      },
      //查询分类
      getClassify(attr) {
        if(attr == 1) {
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
    },
  }

</script>

<style lang="less" scoped>
  @theme_color: rgb(233, 116, 38);

  .classify {
    display: flex;
    align-items: center;
    .child {
      margin-right: 100px;
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
    float: left;
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

</style>
