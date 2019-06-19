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
    <div>


    <a class="btn" @click="toggleShow">设置头像</a>
    <my-upload 
        field="img" 
        @crop-success="cropSuccess" 
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        @src-file-set="srcFileSet"
        v-model="show" 
        :width="300" 
        :height="300" 
        :url="$oss.url" 
        :params="params"
        :headers="headers" 
        img-format="png">
    </my-upload>
    <img :src="imgDataUrl">
        {{imgDataUrl}}



    </div>
  </div>
</template>

<script>
    import 'babel-polyfill'; // es6 shim
	import myUpload from 'vue-image-crop-upload';
  export default {
    data() {
      return {
        value: '',
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        imgDataUrl: '' // the datebase64 url of created image
      }
    },
    components: {
      'my-upload': myUpload
    },
    methods: {
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
      srcFileSet(fileName, fileType, fileSize) {
          console.log(fileName)
          console.log(fileType)
          console.log(fileSize)
      },
      selectIcon(type) {
        //type 0为图片 1为音频
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
                if (this.type == 0) {
                  this.addImg = data.name
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
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }

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

</style>
