<template>
    <div>
      <div class="box">
        <button class="play_button" @click.stop="play_click()" v-show="button_show">
          <i class="ion ion-ios-play align-middle"></i>
        </button>
        <button class="play_button"  @click.stop="paused_click()" v-show="!button_show" >
          <i class="ion ion-ios-pause align-middle"></i>
        </button>
        <audio  @ended="ended()" @timeupdate="getPlayTime" :src="$oss.url+url"  ref="personal_play" >
          <!-- <source :src="$oss.url+url" type="audio/mpeg"> -->
        </audio>
        <span v-if="form!==1">{{second}}s</span>
      </div>

    </div>
</template>

<script>

    export default {
        name: "audioPlayer",
        props:{
          url:String,
          second:Number,
          form:Number
        },
      data(){
        return{
          button_show:true,   //播放按钮显示隐藏
          audioIndex:null,
          audioAngel:null
        }
      },
      created(){

      },
      methods:{
        //点击播放
        async play_click(){
          let audios = document.getElementsByTagName('audio');

          for(let  i = audios.length - 1; i >= 0; i--){
            await audios[i].pause()
            this.button_show = true;

            console.log('暂停播放')
          }
           //点击触发播放事件
           this.$nextTick(async ()=>{
             console.log('播放')
             this.button_show = await false
             this.$refs.personal_play.play()
           })
        },
        paused_click(){
          //点击触发暂停事件
          this.$nextTick(()=>{
            this.$refs.personal_play.pause()
            this.button_show = true
          });
        },
        //播放完毕，按钮回归播放状态
        ended(){
          this.button_show = true
        },
        getPlayTime(e){
          // console.log(e.target.currentTime)  //获取播放的时间
          // this.second = parseInt(e.target.duration)
          // console.log(e.target.duration)  //获取播放的时间
        }
      }
    }
</script>

<style scoped lang="less">
  @theme_color:rgb(233, 116, 38);
  .box{
    width: 100px;
    overflow: hidden;
    background-color:rgba(233, 116, 38,.3);
    border-radius: 15px;
    span{
      color: #fff;
      float: right;
      line-height: 30px;
      margin-right: 12px;
    }
  }
  .play_button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    float: left;
    background-color: @theme_color;
    border: none;
    cursor: pointer;
    i {
      color: #FFF;
    }
  }
</style>
