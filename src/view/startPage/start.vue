<template>
  <div>
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{  }">启动页管理</el-breadcrumb-item>
        <el-breadcrumb-item class="now_page">启动页</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <section>
      <h3>启动页</h3>
      <div class="add_head" @click="selectIcon">
        <img :src="$oss.url+editorImg" alt width="200" >
        <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
      </div>
      <input
        accept="image/jpeg, image/png"
        ref="iconFile"
        @change="iconFileChange"
        type="file"
        name="icon"
        style="display: none"
      >
      <br>
      <div class="show_time">显示时间：
        <el-input v-model="showTime"  placeholder="请选择显示时间" size="small" style="width:200px;display:inline-block"></el-input>
        <div style="margin-top:35px;">
          <el-button class="cancel" size="small" @click="cancelImg()">取消</el-button>
          <el-button class="change" size="small" @click="editorImgMethods()">修改</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import * as OSS from 'ali-oss'
export default {
  name: "start",
  data() {
    return {
      editorImg: '',     //上传得到的图片资源
      plusShow: true,   //加号显示隐藏
      showTime: '',     //显示时间下拉
      imgId: '',     //启动页id
    };
  },
  created() {
      this.getImgData();
  },
  methods: {
    getImgData(){
        this.$api.qd.qd_img(data=>{
            this.editorImg = data[0].coverResource;
            this.imgId = data[0].id;
            this.plusShow = false;
            this.showTime = data[0].timeDuration + '秒'
        },{
            type:0
        })
    },
    //   取消
    cancelImg() {
      this.getImgData();
    },
    // 修改
    editorImgMethods(){
        this.$api.qd.qd_editor(()=>{
            this.getImgData();
            this.$notify({
                type:'success',
                message:'修改启动页成功！',
                title:'成功'
            })
        },{
            id:this.imgId,
            coverResource:this.editorImg,
            timeDuration:parseInt(this.showTime.replace('秒',''))
        })
    },
    //上传图片
    selectIcon() {
      this.$refs.iconFile.click();
      this.$refs.iconFile.value = null; //相同图片上传第二次的时候会导致失效，每次上传之前清空value
    },
    iconFileChange(e) {
      let file = e.target.files[0];
      if (!file.name.substring(file.name.lastIndexOf(".")) == ".png") {
        return;
      }
      let reader = new FileReader();
      reader.onload = e => {
        let data = e.target.result;
        //加载图片获取图片真实宽度和高度
        let image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;
          if (width < 200 || height < 400) {
            this.$notify.error({
              title: "操作提示",
              message: "图片大小必须大于200*400！"
            });
            return;
          }
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
                this.editorImg = data.name;
                this.plusShow = false;
              })
              .catch(function(err) {
                console.error("error: %j", err);
              });
          }, {});
        };
        image.src = data;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped lang="less">
@theme_color: rgb(255, 64, 129);
section {
  h3 {
    text-align: center;
  }
  .add_head {
    width: 202px;
    min-height: 200px;
    border: 1px dashed #000;
    // float: left;
    position: relative;
    margin-top: 20px;
    margin-left: calc(50% - 100px);
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
  .show_time {
    width: 300px;
    margin: 35px auto;
    .cancel {
      float: left;
      margin-left: 40px;
    }
    .change {
      float: right;
      margin-right: 40px;
      background: @theme_color;
      color: #fff;
    }
  }
}
</style>
