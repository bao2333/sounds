<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/burying/nikkatsu' }">用户分析</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">短信群发</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="send">
      <el-input v-model="value" placeholder="模板 id"></el-input>
      <el-button type="primary" plain @click="sendMsg()">
        短信群发
      </el-button>
    </div>


          <!-- pc端的轮播图 -->
          <!-- <div class="add_head" @click="selectIcon(0)">
            <img :src="$oss.url + editorImg" alt width="100%">
            <i class="el-icon-plus avatar-uploader-icon" v-show="plusShow"></i>
          </div>
          <input accept="image/jpeg, image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none"> -->








    <!-- 图片裁剪 -->
    <!-- <div class="wrapper">
      <div class="model" v-show="model" @click="model = false">
        <div class="model-show">
          <img :src="$oss.url + modelSrc" alt="">
        </div>
      </div>
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
    </div> -->

    <!-- 判断a标签是否支持下载功能 -->
  <!-- var supportDownload = "download" in document.createElement("a");
    if(!supportDownload){
        //        code...
    } -->


  </div>
</template>

<script>
  import vueCropper from 'vue-cropper'
  import * as OSS from 'ali-oss';
  import codes from "./code"
  export default {
    data() {
      return {
        editorImg: '',
        plusShow: true,
        value: '',
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
      vueCropper,
      codes
    },
    methods: {
      //群发短信
      sendMsg() {
        this.$api.userAnalysis.sendMsg(data => {
          this.value = ''
          this.$notify({
            title: '成功',
            message: '短信群发成功',
            type: 'success'
          })
        }, {
          templateid: this.value
        })
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
              console.log(data)
              this.form.head = data.name;
              this.modelSrc = this.form.head;
              console.log("modeSrc是:" + this.modelSrc)
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

      selectIcon(type) {
        // type为 0是图片  1为音频
        if(type == 0) {
          this.type = 0
          this.$refs.iconFile.click();
          this.$refs.iconFile.value = null;
        } else if(type == 1) {
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
                if(this.type == 0) {
                  this.editorImg = data.name; //头像上传
                  this.plusShow = false;
                  this.$api.userAnalysis.addBanner(data => {
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                  }, {
                    picture: data.name
                  })
                } else if(this.type == 1) {
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



    }
  }

</script>

<style lang="less" scoped>
  .send {
    display: flex;
    margin-top: 30px;

    .el-input {
      width: 200px;
    }

    button {
      margin-left: 10px;
    }
  }
* {
    margin: 0;
    padding: 0;
  }
 
  .content {
    margin: auto;
    max-width:585px;
    margin-bottom: 100px;
  }
 
  .test-button {
    display: flex;
    flex-wrap: wrap;
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
    margin:20px 10px 0px 0px;
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
 
  .des {
    line-height: 30px;
  }
 
  code.language-html {
    padding: 10px 20px;
    margin: 10px 0px;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
  }
 
  .show-info {
    margin-bottom: 50px;
  }
 
  .show-info h2 {
    line-height: 50px;
  }
 
  /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
    }*/
 
  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
  }
 
  .test {
    height: 285px;
  }
 
  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }
 
  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
 
  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }
 
  .c-item {
    display: block;
    padding: 10px 0;
    user-select: none;
  }
 
  @keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
 
  @media screen and (max-width: 1000px) {
    .content {
      max-width: 90%;
      margin: auto;
    }
 
    .test {
      height: 400px;
    }
  }

  .add_head {
      width: 343px;
      height: 171.5px;
      border: 1px dashed #ccc;
      float: left;
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
