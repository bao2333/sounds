<template>
  <div>
    <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/discover/official' }" >官方动态</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page" v-if="$route.query.methods == 'add'">新增动态</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page" v-else>修改动态</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
    <div class="box">

      <!-- 头像 -->
    <div class="add_head" @click="selectIcon">
      <img :src="$oss.url+editorImg" alt width="150" height="150">
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
    <!-- 标题 -->
    <!-- <h3>{{ this.$route.params.title }}</h3> -->
    <el-input v-model="addTitle" size="small" class="add_title"></el-input>
    <!-- 富文本，动态内容 -->
    <div class="edit" style="width:800px;margin: 15px;float:left">
      <el-input type="textarea" v-model="articleContent" placeholder="请输入内容"  style="width:90%;margin-left: 5%"></el-input>
    </div>
    <!-- 上传 -->
    <main>
        <ul>
            <li v-if="this.updateType==0 || this.updateType == undefined">
              <div v-for="(item,index) in imgs" :key="index">
                <img :src="$oss.url + item" alt="" class="upadte_img">
                <i class="el-icon-circle-close-outline delete" @click="deleteImg(index)"></i>
              </div>

              <div style="width: 150px;height: 150px" v-if="addImgShow==true">
                <img :src="$oss.url + addImg" alt="" class="upadte_img" @click="selectIcon(0)" >
                <i  style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);font-size: 16px;" class="el-icon-plus" @click="selectIcon(0)"></i>
              </div>
            </li>
            <li v-if="this.updateType==1 || this.updateType == undefined">
               <video :src="$oss.url + addVideo" controls="controls" width="200" height="200" v-if="addVideo!=='' && imgs.length==0"></video>
               <el-button @click="deleteVideo()" style="display:block" size="mini" type="danger" v-if="addVideo!==''">删除视频</el-button>
            </li>
            <li v-if="this.updateType==2 || this.updateType == undefined">
               <audio :src="$oss.url + addAudio" controls="controls" v-if="addAudio!=='' && imgs.length==0" id="audio_duration"></audio>
               <el-button @click="deleteAudio()" style="display:block" size="mini" type="danger" v-if="addAudio!==''">删除音频</el-button>
            </li>
        </ul>
    </main>
    <br>
    <!-- 上传按钮 -->
    <ul class="shangchuan_ul">
      <li>
        <el-button @click="selectIcon(0)" icon="el-icon-picture" v-show="imgShow">上传图片</el-button>
      </li>
      <li>
        <input
        accept="video/*"
        ref="videoFile"
        @change="iconFileChange"
        type="file"
        name="icon"
        style="display: none">
        <el-button @click="selectIcon(1)" icon="el-icon-mobile-phone" v-show="videoShow">上传视频</el-button>
      </li>
      <li>
        <input
        accept="audio/*"
        ref="audioFile"
        @change="iconFileChange"
        type="file"
        name="icon"
        style="display: none">
        <el-button @click="selectIcon(2)" icon="el-icon-service"  v-show="audioShow">上传音频</el-button>
      </li>
    </ul>
    <div class="editor">
      <el-button type="primary" @click="editorPost()"  v-if="this.$route.query.methods !== 'add'">修改</el-button>
      <el-button type="primary" @click="addPost()" v-if="this.$route.query.methods == 'add'">添加</el-button>
    </div>
    <!-- 标签模态 -->
    <el-dialog title="标签" :visible.sync="dialogVisible" width="30%">
      <ul class="label_item">
        <li v-for="(item,index) in labelData" :key="index" @click="checkLabel(item)">
          {{ item.name }}
        </li>
      </ul>
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
      dialogVisible:false,
      addImgShow: false, //添加图片限制
      videoShow: true, //上传视频按钮
      audioShow: true, //上传音频按钮
      imgShow: true, //上传图片按钮
      plusShow: true,
      editorImg: "",
      editorOption: {
        modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            [{ 'align': [] }],
            ]
        },
        placeholder:'请输入文章内容 ...'
        },
        articleContent:'',
        type:'',
        labelName:'',
        imgs:[],
        fileList2:[], //上传
        updateType:0,
        updateIndex:null,
        addImg:'',  //上传图片
        addVideo:'',  //上传视频
        addAudio:'',  //上传音频
        labelData:[], //标签
        labelNameId:'', //标签id
        second:null,
        addTitle:'',  //添加
    };
  },
  created() {
     this.getInfomation()
     if(this.$route.query.methods == 'add'){
       this.getOfficalHead()
     }
    document.onkeydown = null
  },
  updated() {
    if(this.imgs){
      if(this.imgs.length >= 4 || this.imgs.length==0){
        this.addImgShow = false
      }
    }
  },
  methods: {
    getInfomation() {
        this.articleContent = this.$route.params.article;
        this.updateType = this.$route.params.type;
        this.labelNameId = this.$route.params.labelId;
        this.updateType = this.$route.params.coverType;
        this.editorImg = this.$route.params.url;
        this.labelName = this.$route.params.label;
        this.addTitle = this.$route.params.title
        // 判断获取格式
        if(this.$route.params.coverType=='0'){
          this.imgs = this.$route.params.imgs;
        }else if(this.$route.params.coverType=='1'){
          this.addVideo = this.$route.params.imgs[0]
        }else if(this.$route.params.coverType=='2'){
          this.addAudio =  this.$route.params.imgs[0]
        }
        if(this.$route.params.imgs==undefined){
          this.imgs = []
        }
        if(this.type=='0'){
          this.videoShow = false;
          this.audioShow = false;
        }else if(this.type=='1'){
          this.imgShow = false;
          this.audioShow = false;
        }else if(this.type=='2'){
          this.imgShow = false;
          this.videoShow = false;
        }
    },
    //上传
    selectIcon(type,i) {
      //type 0为图片  1为视频  2为语音
      this.updateType = type
      this.updateIndex = i  //点击图片获取当前索引
      // 根据不同参数来设置不同类型文件上传的点击事件
      if(type==0){
        this.$refs.iconFile.click();
        this.$refs.iconFile.value = null;
        this.addImgShow = true;

      }else if(type==1){
        this.$refs.videoFile.click();
        this.$refs.videoFile.value = null;
        this.addImgShow = false;
        // this.imgShow = false;

      }else if(type==2){
        this.$refs.audioFile.click();
        this.$refs.audioFile.value = null;
      }else{
        this.$refs.iconFile.click();
        this.$refs.iconFile.value = null; //相同图片上传第二次的时候会导致失效，每次上传之前清空value
      }
    },
    iconFileChange(e) {
      let file = e.target.files[0];
      console.log(file)
      if (!file.name.substring(file.name.lastIndexOf(".")) == ".png") {
        return;
      }
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
                console.log(data)
                if(this.updateType==0){ //图片
                  this.addImg = data.name
                  this.imgs.push(this.addImg)
                  this.addImg = ''

                  this.videoShow = false;
                  this.audioShow = false;
                }else if(this.updateType==1){   //视频
                  this.addVideo = data.name;
                  console.log(this.addVideo)
                  this.addImgShow = false;
                  this.audioShow = false;

                }else if(this.updateType==2){   //音频
                  this.addAudio = data.name;
                  this.imgShow = false;
                  this.videoShow = false;

                }else{
                  this.editorImg = data.name;   //头像上传
                  this.plusShow = false;
                }
              })
              .catch(function(err) {
                console.error("error: %j", err);
              });
          }, {});
        // };
        // image.src = data;
      };
      reader.readAsDataURL(file);


    },
    // 根据索引删除图片
    deleteImg(i){
      this.imgs.splice(i,1)
      if(this.imgs.length == 0){
        this.videoShow = true;
        this.audioShow = true;
      }
    },
    // 删除视频
    deleteVideo(){
      this.addVideo = '';
      if(this.addVideo == ''){
        this.imgShow = true;
        this.videoShow = true;
        this.audioShow = true;
      }
    },
    // 删除语音
    deleteAudio(){
      this.addAudio = '';
      if(this.addAudio == ''){
        this.imgShow = true;
        this.videoShow = true;
        this.audioShow = true;
      }
    },
    editorPost(){
      // if(this.imgs.length==0){
      //   this.updateType=0
      // }
      // 获取录音标签的时长
      if(this.updateType==2){
        var myVid = document.getElementById("audio_duration");
          if(myVid != null){
           var duration;
           myVid.load();

           myVid.oncanplay=()=>{  
               this.$api.find.editor_dongtai(()=>{
                 this.$notify({
                   type:'success',
                   message:'修改动态成功！',
                   title:'成功'
                 })
                 this.$router.push({name:'discoverOfficial'})
              },{
                id:this.$route.params.id,
                label:this.labelNameId,
                content:this.articleContent,
                coverResources:this.updateType==0?this.imgs:this.updateType==1?this.addVideo.split(' '):this.updateType==2?this.addAudio.split(' '):null,
                second:parseInt(myVid.duration),
                coverType:this.updateType,
                officialName:this.addTitle==''?null:this.addTitle,
                officialHead:this.editorImg,
              })
            }
          }
      }else{
          // 提交接口
        this.$api.find.editor_dongtai(()=>{
          this.$notify({
            type:'success',
            message:'修改动态成功！',
            title:'成功'
          })

          this.$router.push({name:'discoverOfficial'})
        },{
          id:this.$route.params.id,
          label:this.labelNameId,
          content:this.articleContent,
          coverResources:this.updateType==0?this.imgs:this.updateType==1?this.addVideo.split(' '):this.updateType==2?this.addAudio.split(' '):null,
          second:this.second==''?null:Math.floor(this.second),
          coverType:this.updateType,
          officialName:this.addTitle==''?null:this.addTitle,
          officialHead:this.editorImg,
        })
      }

    },
    checkLabel(item){
      this.labelName = item.name
      this.labelNameId = item.id
      this.dialogVisible = false;
    },
    // 新增
    addPost(){
      // 判断内容不能为空
      if(this.articleContent==undefined || this.addTitle == undefined || this.editorImg==undefined){
        this.$notify.error({
          type:'waring',
          message:'请完善内容再进行添加！',
          title:'警告'
        })
      }else if(this.articleContent!==undefined && this.addTitle !== undefined && this.editorImg!==undefined){
         // 获取录音标签的时长
          if(this.updateType==2){
            var myVid = document.getElementById("audio_duration");
            if(myVid != null){
               var duration;
               myVid.load();
               myVid.oncanplay=()=>{  
                  this.$api.find.editor_dongtai(()=>{
                    this.$notify({
                      type:'success',
                      message:'新增动态成功！',
                      title:'成功'
                    })
                    this.$router.push({name:'discoverOfficial'})
                  },{
                    content:this.articleContent,
                    coverResources:this.updateType==0?this.imgs:this.updateType==1?this.addVideo.split(' '):this.updateType==2?this.addAudio.split(' '):null,
                    second:this.second==''?null:Math.floor(myVid.duration),
                    coverType:this.updateType,
                    officialName:this.addTitle==''?null:this.addTitle,
                    officialHead:this.editorImg,
                  })
                }
              }
          }else{
             this.$api.find.add_dongtai(()=>{
                this.$notify({
                  type:'success',
                  message:'新增动态成功！',
                  title:'成功'
                })
                this.$router.push({name:'discoverOfficial'})
              },{
                content:this.articleContent,
                coverResources:this.updateType==0?this.imgs:this.updateType==1?this.addVideo.split(' '):this.updateType==2?this.addAudio.split(' '):null,
                second:this.second==''?null:Math.floor(this.second),
                coverType:this.updateType!==0||this.updateType!==1?0:this.updateType,
                officialName:this.addTitle==''?null:this.addTitle,
                officialHead:this.editorImg,
              })
          }
        }
      },
      // 新增获取官方头像 名字
      getOfficalHead(){
        this.$api.find.get_offical_head(data=>{
          this.editorImg = data.officialHead;
          this.addTitle = data.officialName;
        })
      }
  },
};
</script>
<style>
  .el-textarea__inner{
    height: 200px;
  }
</style>
<style scoped lang="less">
 @theme_color:rgb(233, 116, 38);

.box {
  width: 800px;
  height: auto;
  margin: 0 auto;
  border: 1px solid #ccc;
  overflow: hidden;
  h3 {
    margin-top: 20px;
    margin-left: 10px;
    float: left;
  }
  h4{
    margin-top: 20px;
    margin-right: 30px;
    float: right;
    span{
      font-weight: bold;
      color: @theme_color;
      cursor: pointer;
    }
  }
  .add_head {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    float: left;
    position: relative;
    margin-top: 20px;
    margin-left: 30px;
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
  main{
      float: left;
      ul{
          margin-left: 30px;
          li{
            position: relative;
            overflow: hidden;
            div{
              position: relative;
              float: left;
              display: block;
            }
            img.upadte_img{
              border:1px solid #ccc;
              min-height:150px;
              width:150px;
              display:inline-block;
              margin-right: 10px;
            }
            i.delete{
              position:absolute;
              top:0;
              right:10px;
              font-size: 20px;
              background: #fff;
              border-radius: 50%;
              cursor: pointer;
              display: none;
            }
            div:hover i.delete{
              display: block
            }
          }
      }
  }
  .shangchuan_ul{
    float: left;
    width: 100%;
    li{
      float: left;
      margin-left: 15px;
    }
  }
}
.editor{
  float: right;
  margin:15px;

}
.label_item{
  overflow: hidden;
  li{
    padding:5px 15px;
    background: #ccc;
    float: left;
    margin:10px 0 0 10px;
    border:1px solid #000;
    cursor: pointer;
  }
}
// 添加
.add_title{
  float:left;
  width:200px;
  margin:25px;
}
</style>
