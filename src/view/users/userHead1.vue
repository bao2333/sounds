<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }" >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">头像设置</el-breadcrumb-item>
    </el-breadcrumb>
    <header>
      <h3>默认头像</h3>
    </header>
    <section>
      <transition-group name="fade">
        <div class="section_box" v-for="item in heads" :key="item.id">
          <img :src="$oss.url+item.url" alt="">
          <i class="ion ion-md-close align-middle" @click="close_head(item.id)"></i>
        </div>

      </transition-group>

      <div class="add_head" @click="selectIcon">
         <img :src="$oss.url+editor.img" alt="" width="150" height="150" >
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input accept="image/jpeg,image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none"/>
    </section>
  </div>
</template>

<script>
  import * as OSS from 'ali-oss'
    export default {
        name: "userHead",
      data(){
          return{
            plusShow:true,  //新增图片i显示隐藏
            editor:{
              img:''
            },
            heads:[]
          }
      },
      created(){
        this.gethear()
      },
      methods:{
        close_head(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.user.delete_head(()=>{
              this.gethear();
              this.$notify({
                  type:'success',
                  message:'删除头像成功！',
                  title:'成功'
                });
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
        // 获取用户头像
        gethear(){
          this.$api.user.head(data=>{
            this.heads = data;
          })
        },
        //上传图片
        selectIcon(){
          this.$refs.iconFile.click();
          this.$refs.iconFile.value = null;   //相同图片上传第二次的时候会导致失效，每次上传之前清空value
        },
        iconFileChange(e){
          let file = e.target.files[0];
          if(!file.name.substring(file.name.lastIndexOf('.')) == '.png'){
            return;
          }
          let reader = new FileReader();
          reader.onload = e => {
            let data = e.target.result;
            //加载图片获取图片真实宽度和高度
            let image = new Image();
            image.onload= () =>{
              let width = image.width;
              let height = image.height;
              this.$api.oss.update(data => {
                new OSS.Wrapper({
                  region: 'oss-cn-hangzhou',
                  accessKeyId: data.accessKeyId,
                  accessKeySecret: data.accessKeySecret,
                  stsToken: data.securityToken,
                  bucket: 'sounds-miyu'
                }).put(data.random,file).then(data => {
                  console.log(data)
                  this.editor.img = data.name;
                  this.plusShow = false;
                  // 新增图片接口
                  this.$api.user.add_head(()=>{
                     this.gethear();
                     this.$notify({
                       type:'success',
                       message:'添加头像成功！',
                       title:'成功'
                     });
                      this.editor.img = '';
                       this.plusShow = true;
                  },{
                    url:this.editor.img
                  })
                }).catch(function (err) {
                  console.error('error: %j', err);
                });
              },{});
            };
            image.src= data;
          };
          reader.readAsDataURL(file);
        },

      }
    }
</script>

<style scoped lang="less">
  @theme_color:rgb(255, 64, 129);
  header{
    h3{
      text-align: center;
    }
  }
  .section_box{
    position: relative;
    float: left;
    margin-right: 30px;
    margin-top: 20px;
    img{
      width: 150px;
      height: 150px;
    }
    i{
      font-size: 24px;
      position: absolute;
      right:-12px;
      top: -10px;
      z-index: 99;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      text-align: center;
      background-color:@theme_color ;
      color: #fff;
      line-height: 22px;
      cursor: pointer;
    }
    i:hover{
      background-color: #cccccc;
      color: #000;
      border: 1px solid #000;
    }
  }

  .add_head{
    width: 150px;
    height: 150px;
    border:1px dashed #ccc;
    float: left;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
    i{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -12.5px;
      margin-top: -12.5px;
      font-size: 25px;
    }
  }
</style>
