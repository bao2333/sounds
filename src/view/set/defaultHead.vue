<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }" >系统设置</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">默认头像、语音</el-breadcrumb-item>
            </el-breadcrumb>

        </header>
        <section>
            <h3>默认头像、语音设置</h3>
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
            <div class="show_time">
                <p>默认语音设置：<el-button @click="selectIcon(1)" icon="el-icon-service" size="mini" style="float:right">上传音频</el-button></p>
                <!-- <audioPlayer :url="defaultAudio" :second="defaultSecond" style="margin-left:100px;"/> -->
                 <audio :src="$oss.url + defaultAudio" controls="controls"  id="audio_duration"></audio>
                 <input
                    accept="audio/*"
                    ref="audioFile"
                    @change="iconFileChange"
                    type="file"
                    name="icon"
                    style="display: none">

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
  import audioPlayer from '../../components/audioPlayer.vue'
export default {
  name: "start",
  components:{
      audioPlayer
  },
  data() {
    return {
      editorImg: '',     //上传得到的图片资源
      plusShow: true,   //加号显示隐藏
      defaultAudio: '',     //语音资源
      defaultSecond: null,     //语音资源时长
      itemType: null,     //上传类型
    };
  },
  created() {
      this.getImgData();
  },
  methods: {
    getImgData(){
        this.$api.set.default_set(data=>{
            this.editorImg = data.defaultHead;
            this.defaultAudio = data.defaultVoice;
            this.defaultSecond = parseInt(data.defaultVoiceTime);
        })
    },
    //   取消
    cancelImg() {
         this.getImgData();
    },
    // 修改
    editorImgMethods(){
        // 获取语音时长
        var myVid = document.getElementById("audio_duration");
         var duration;
         myVid.load();
         myVid.oncanplay = ()=>{  
            this.$api.set.default_editor(()=>{
                this.getImgData();
                this.$notify({
                    type:'success',
                    message:'修改默认头像、语音成功！',
                    title:'成功'
                })
            },{
                defaultHead:this.editorImg,
                defaultVoice:this.defaultAudio,
                defaultVoiceTime:parseInt(myVid.duration),
            })
          }
    },
    //上传图片
    selectIcon(type) {
      this.itemType = type
      if(type==1){
        this.$refs.audioFile.click();
        this.$refs.audioFile.value = null;
      }else{
        this.$refs.iconFile.click();
        this.$refs.iconFile.value = null; //相同图片上传第二次的时候会导致失效，每次上传之前清空value
      }
    },
    iconFileChange(e) {
      let file = e.target.files[0];
      if (!file.name.substring(file.name.lastIndexOf(".")) == ".png") {
        return;
      }
      if(file.type == ''){
        this.$notify({
          type:'error',
          message:'不支持该文件格式,请重新上传！',
          title:'警告'
        })
      }else{
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

        };
        image.src = data;
         this.$api.oss.update(data => {
            new OSS.Wrapper({
              region: "oss-cn-hangzhou",
              accessKeyId: data.accessKeyId,
              accessKeySecret: data.accessKeySecret,
              stsToken: data.securityToken,
              // bucket: 'sounds-miyu'
              bucket: 'zhiyuan-hz'
            })
              .put(data.random, file)
              .then(data => {
                  if(this.itemType == 1){
                      this.defaultAudio = data.name
                      this.$notify({
                        type:'success',
                        message:'上传音频成功！',
                        title:'成功'
                    })
                  }else{
                    this.editorImg = data.name;
                    this.plusShow = false;
                  }

              })
              .catch(function(err) {
                console.error("error: %j", err);
              });
          }, {});
      };
      reader.readAsDataURL(file);
      }
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
