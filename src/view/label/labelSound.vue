<template>
    <div>
        <section>
             <transition-group name="fade">
                <div class="label" v-for="item in  arrs"  :key="item.id">
                    <div class="label_item">
                        <input type="text" v-model="item.name">
                        <i class="ion ion-md-close align-middle" @click="close_label(item.id,item.name)"></i>
                        <span class="hot_jh" v-show="item.hot==0?true:false" @click="showHot(item)">激活</span>
                        <span class="hot" v-show="!item.hot==0?true:false" @click="showNoHot(item)"></span>
                    </div>
                </div>
             </transition-group>
            <div class="add_label" @click="add_label">
                <p v-show="show_label">+</p>
                <input type="text" v-model="newValue" placeholder="新增标签" v-show="!show_label" @blur="disappear()">
            </div>
        </section>
        <footer>
          <p>当前用户可选：<span> <span style="font-size:16px;color:red;font-weight:bold">{{ anOptionalTag }}</span> 个可选（注册时可选数量）</span></p>
          <p>用户可选设置：<el-input placeholder="请输入1-15的数字" size="mini" v-model="hotNum"></el-input>个</p>
          <el-button size="small" @click="editorHotNum()">修改</el-button>
        </footer>
    </div>
</template>

<script>
export default {
  name: "labelSound", //标签管理
  data() {
    return {
      show_label: true,
      newValue:'',
      arrs: [],
      anOptionalTag:'',   //获取hot数据量
      hotNum:'',   //设置hot数据量
    };
  },
  created() {
    this.getList()
    this.getHotNum()
  },
  mounted(){

  },
  methods: {
    getList(){
      this.$api.label.label_list(data=>{
        this.arrs = data
      })
    },
    //   设置热门
    showHot(item) {
      this.$api.label.label_hot(()=>{
        item.hot = !item.hot;
      },{
        id:item.id
      })

    },
    // 取消热门
    showNoHot(item) {
      this.$api.label.label_cancelHot(()=>{
        item.hot = !item.hot;
      },{
        id:item.id
      })
    },
    // 删除标签
    close_label(id,name) {
      // this.arrs.splice(i, 1);  //假删除
      this.$confirm(`确定要删除 ${name} 标签吗?`, '提示', {
          confirmButtonText: '狠心删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.label.label_delete(()=>{
            // 添加标签成功，刷新接口并提示
            this.getList()
            this.$notify({
              type:'success',
              message:'删除标签成功！',
              title:'成功'
            })
          },{
            id:id
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 添加标签
    add_label(){
        this.show_label = false;
        this.newValue = '';
    },
    // 新增标签（接口）
    disappear(){
        this.show_label = true;
        // if(this.newValue!=''){
        //   this.arrs.push({name:this.newValue,hot:1})
        // }
        //二次确认
        if(this.newValue !== ''){
          this.$confirm(`确定添加 ${this.newValue} 为新标签吗?`, '提示', {
            confirmButtonText: '添加',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.label.label_add(()=>{
              // 添加标签成功，刷新接口并提示
              this.getList()
              this.$notify({
                type:'success',
                message:'添加标签成功！',
                title:'成功'
              })
            },{
              name:this.newValue
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        }
    },
    // 获取当前用户可选hot数量
    getHotNum(){
      this.$api.label.hot_num(data=>{
        this.anOptionalTag = data.anOptionalTag
      })
    },
    // 修改hot数量
    editorHotNum(){
      this.$api.label.hot_num_editor(()=>{
        this.$notify({
          title:'成功',
          type:'success',
          message:'修改hot数量成功！'
        })
        this.getHotNum()
        this.hotNum = ''  //修改成功后清空input的值
      },{
        anOptionalTag:parseInt(this.hotNum)
      })
    }
  }
};
</script>

<style scoped lang="less">
@theme_color: rgb(255, 64, 129);
section {
  width: 80%;
  overflow: hidden;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  .add_label{
      width: 150px;
      height: 50px;
      border:1px dashed #ccc;
      float: left;
      margin: 20px 0 0 30px;
      cursor: pointer;
      position: relative;
      p{
        font-size: 26px;
        line-height: 50px;
        text-align: center;
      }
      input{
        display: inline-block;
        width: 140px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        left: 50%;
        margin-left: -70px;
        text-align: center;
        background-color: #fff;
        border: 1px solid @theme_color;

      }
  }
  .add_label:hover{
      color: @theme_color;
      border:1px dashed @theme_color;
  }
  .label {
    width: 150px;
    height: 50px;
    border: 1px solid #ccc;
    position: relative;
    float: left;
    margin: 20px 0 0 30px;
    .label_item {
      input {
        border: none;
        display: inline-block;
        width: 140px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
        left: 50%;
        margin-left: -70px;
        text-align: center;
        background-color: #fff;
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
        background-color: #000;
        color: #fff;
      }
      span {
        position: absolute;
        top: -10px;
        cursor: pointer;
      }
      .hot {
        color: red;
        width: 20px;
        height: 20px;
        background: url("../../../static/imgs/hot.png") no-repeat;
        background-size: cover;
      }
      .hot_jh {
        color: #fcf;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
footer{
  width: 400px;
  margin: 80px auto;
  font-size: 16px;
  .el-button{
    margin:15px auto;
    display:block
  }
  .el-input{
    display:inline-block;
    width:250px;
  }
}
</style>
