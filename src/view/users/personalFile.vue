<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users/list' }" >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="now_page">个人档案</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loadingBox" style="overflow:hidden">
      <header class="section_title">
      <img :src="$oss.url+personalData.head" alt="" width="50" height="50">
      <h3>{{ personalData.name }}</h3>
    </header>
    <section class="section_card">
      <article>
        <header >
          <h4>账号状态</h4>
        </header>
        <ul>
          <li><span>手机号</span><span>{{ personalDataBind.phoneNum }}</span></li>
          <li>
            <span>微博绑定</span>
            <span style="font-size:18px;color:blue;">
              {{ personalDataBindWB.binding==0?'未绑定':personalDataBindWB.binding==1?personalDataBindWB.weiBoName:'' }}
            </span>
          </li>
          <li>
            <span>微信绑定</span>
            <span style="font-size:18px;color:blue;">
              {{personalDataBindWX.binding==0?'未绑定':personalDataBindWX.binding==1?personalDataBindWX.wechatName:'' }}
            </span>
          </li>
          <li><span>举报别人</span><span>{{personalData.reportCount}}次</span></li>
          <li><span>当周被人举报</span><span>{{personalData.beReportCountInWeekday}}次</span></li>
        </ul>
      </article>
      <article>
        <header >
          <h4>个人信息</h4>
        </header>
        <ul>
          <li><span>生日</span><span>{{ personalData.birthday }}</span></li>
          <li><span>位置</span><span>{{ personalData.location==null?'未设置':personalData.location}}</span></li>
          <li>
            <span>标签</span>
            <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(0);selectNoLabel()">查看全部</el-button>
          </li>
          <li><span>粉丝</span><span>{{personalData.fansNum}}</span></li>
          <li><span>关注</span><span>{{personalData.followNum}}</span></li>
        </ul>
      </article>
      <article>
        <header >
          <h4>语音库</h4>
        </header>
        <ul class="sound_ku">
          <li>
            <span>个人介绍</span>
             <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(2)">语音和头像</el-button>
              <span>{{personalData.SelfIntroductionStatus==1?'待审核':''}}</span>
          </li>
          <li>
            <span>语音库</span>
            <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(3)">查看全部</el-button>

          </li>
          <li>
            <span>购买语音库</span>
            <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(4)">查看全部</el-button>
          </li>
        </ul>
      </article>
      <article>
        <header >
          <h4>账单明细</h4>
        </header>
        <ul>
          <li><span>账户余额</span><span> {{personalData.balance}} 金币</span></li>
          <!-- <li><span>收费率</span><span>20%</span></li> -->
          <li><span>总提现</span><span> +{{personalData.allIncomeWithdraw}} 元</span></li>
          <li>
            <span>交易明细</span>
            <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(5)" >查看全部</el-button>
          </li>
          <li>
            <span>身份验证</span>
            <el-button size="mini" class="select_label" @click="dialogVisible=true;selectDialog(1)">查看证件</el-button>
            <span style="font-size:14px;">{{personalData.authenticationStatus==0?'未通过验证':personalData.authenticationStatus==1?'已通过验证':''}}</span>
          </li>
        </ul>
      </article>
      <article>
        <div v-if="userNote.tone !== undefined">
          <header >
          <h4>秀音卡</h4>
        </header>
        <header >
          <p>{{userNote.tone}} {{userNote.toneNum+'%'}}</p>
          <p>{{userNote.musicalityOne}} {{userNote.musicalityOneNum+'%'}}</p>
          <p>{{userNote.musicalityTwo}} {{userNote.musicalityTwoNum+'%'}}</p>
        </header>
        <ul class="soundCard">
          <li><p>星座</p><p>{{userNote.constellation}}</p></li>
          <li><p>属性</p><p>{{userNote.soundProperties}}</p></li>
          <li><p>最佳CP</p><p>{{userNote.bestCp}}</p></li>
        </ul>
        <footer>
          <span style="float:left">播放秀音:</span>
          <!-- <audio-player class="sound_play" :url="userNote.voice" :form="type"/> -->
          <audio :src="$oss.url + userNote.voice" controls="controls"></audio>
        </footer>
        </div>
        <div class="xiuyin" v-else >
          <h4>该用户未设置秀音卡</h4>
        </div>
      </article>
      <article>
        <header >
          <h4>更多信息</h4>
        </header>
        <div class="moreInformation">
          <el-button type="text" @click="$router.push({name:'userHome',params:{userId:personalData.userId}})">查看个人主页</el-button>
          <el-button type="text" @click="$router.push({name:'MoneyUserCard',params:{name:personalData.name}})">查看用户账单</el-button>
          <el-button type="text" @click="$router.push({name:'userClose',params:{name:personalData.name}})">查看查封账户</el-button>
          <p>首次注册时间：<span>{{ new Date(personalData.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}</span></p>
          <p>最近使用Sounds：<span>{{ new Date(personalData.latestLogin) | moment('YYYY-MM-DD HH:mm:ss') }}</span></p>
        </div>
      </article>
    </section>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="type==0?'查看标签':type==1?'查看身份证':type==2?'查看语音和头像':type==3?'查看用户的语音库':type==4?'用户购买的语音库':type==5?'交易明细':''" :visible.sync="dialogVisible" width="45%">
        <!-- 查看标签 -->
        <ul v-if="type==0" class="dialog_label">
          <li v-for="(item,index) in personalData.labels" :key="index">
            {{ item.name }}
            <i class="el-icon-error" @click="deleteLabel(item,index)"></i>
          </li>
        </ul>
        <div class="selectLabel" v-if="type==0" >
            <p>未选择标签：</p>
            <ul>
              <li v-for="(item,index) in noLabelData" :key="index" @click="handleClickLabel(index,item)">
                {{ item.name }}
              </li>
            </ul>
            <el-button type="primary" size="mini" style="float:right" @click="submitLabel()">提交</el-button>
        </div>
        <!-- 查看身份证 -->
        <div v-if="type==1" class="dialog_idCard">
          <img :src="$oss.url + personalDataAuthentication.frontCard" alt="">
          <img :src="$oss.url + personalDataAuthentication.backCard" alt="" >
        </div>
        <!-- 语音和头像 -->
        <div v-if="type==2"  class="dialog_personal">
            <img :src="$oss.url +dataSelf.picture" alt="">
            <audio-player :url="dataSelf.voice" :second="dataSelf.second" style="float:left;margin:30px 0 0 30px;"/>
        </div>
        <!-- 用户语音库 -->
        <div v-if="type==3">
          <el-table :data="soundData" style="width: 100%" border v-loading="loading" height="300">
            <el-table-column label="图片" align="center">
              <template slot-scope="props">
                <img :src="$oss.url+props.row.picture" alt="" width="100">
              </template>
            </el-table-column>
            <el-table-column label="录音" align="center">
              <template slot-scope="props">
                <audio-player :url="props.row.voice" :form="1" style="margin-left:20px;"/>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="props">
                {{ props.row.status == 0 ? '待审核' : props.row.status == 1 ? '已审核' : '' }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="type==4">
          <el-table :data="soundByData" style="width: 100%" border v-loading="loading" height="300">
            <el-table-column label="图片" align="center">
              <template slot-scope="props">
                <img :src="$oss.url+props.row.picture" alt="" width="100">
              </template>
            </el-table-column>
            <el-table-column label="录音" align="center">
              <template slot-scope="props">
                <audio-player :url="props.row.voice" :form="1" style="margin-left:20px;"/>
              </template>
            </el-table-column>
            <el-table-column label="购买时间" align="center">
              <template slot-scope="props">
                {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="type==5">
          <el-tabs>
            <el-tab-pane label="收益明细">
              <jiaoyi-mingxi :moneyType="0"/>
            </el-tab-pane>
            <el-tab-pane label="支出明细">
              <jiaoyi-mingxi :moneyType="1"/>
            </el-tab-pane>
            <el-tab-pane label="充值明细">
              <jiaoyi-mingxi :moneyType="2"/>
            </el-tab-pane>
            <el-tab-pane label="提现明细">
              <jiaoyi-mingxi :moneyType="3"/>
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import audioPlayer from '../../components/audioPlayer'
  import jiaoyiminxi from '../../components/jiaoyiminxi.vue'
    export default {
        name: "personalFile",
      components:{
        'audio-player':audioPlayer,   //语音播放组件
        'jiaoyi-mingxi':jiaoyiminxi,  //交易明细组件
      },
      data(){
          return{
            loading:false,
            loadingBox:false,
            dialogVisible:false,
            personalData:{},
            personalDataBind:{},
            personalDataBindWB:{},
            personalDataBindWX:{},
            userNote:{},
            personalDataAuthentication:{},
            dataSelf:{},
            type:'',
            personal_js:'',   //个人介绍下拉
            type:1,
            soundData:[],     //用户语音库
            soundByData:[],   //用户购买语音库
            noLabelData:[],
          }
      },
      created(){

      },
      mounted(){
         this.getList();
      },
      methods:{
        getList(){
          this.loadingBox = true;
          this.$api.user.personal_file(data=>{
            this.loadingBox = false;
            this.personalData = data
            this.personalDataAuthentication = data.authentication
            this.personalDataBind = data.bind.phone
            this.personalDataBindWB = data.bind.weiBoAuth
            this.personalDataBindWX = data.bind.wechatAuth
            this.userNote = data.userTakeNote
            this.dataSelf = data.SelfIntroduction

          },{
            userId:parseInt(this.$route.params.userId)
          })
        },
        selectDialog(type){
          this.type = type;
          if(type==3){    //语音库
            this.userSoundKu();
          }else if(type==4){    //购买的语音库
            this.userBySound()
          }
        },
        // 用户语音库
        userSoundKu(){
          this.loading = true;
          this.$api.user.user_soundku((data)=>{
            this.loading = false;
            this.soundData = data
          },{
            userId:parseInt(this.$route.params.userId)
          })
        },
        //购买的语音库
        userBySound(){
          this.loading = true;
          this.$api.user.user_bySound(data=>{
            this.loading = false;
            this.soundByData = data;
          },{
            userId:parseInt(this.$route.params.userId)
          })
        },
        //交易明细
        dealDetails(){
          this.$api.user.user_dealDetails(data=>{

          },{
            userId:parseInt(this.$route.params.userId)
          })
        },
        // 查询所有用户未选择的标签
        selectNoLabel(){
          this.$api.user.get_user_nolabel(data=>{
            this.noLabelData = data
          },{
            userId:parseInt(this.$route.params.userId)
          })
        },
        // 选择标签，点击未选择的标签添加到已选中
        handleClickLabel(i,item){
          this.noLabelData.splice(i,1)
          this.personalData.labels.push(item)
        },
        // 提交标签
        submitLabel(){
          let arr = []
            this.personalData.labels.map(item=>{
              arr.push(item.id)
            })
            this.$api.user.editor_user_label(()=>{
              this.$notify({
                type:'success',
                message:'修改标签成功！',
                title:'成功'
              })
              this.dialogVisible = false;
            },{
              userId:parseInt(this.$route.params.userId),
              ids:arr
            })
        },
        // 删除已选标签，点击删除已选消失，未选添加
        async deleteLabel(item,i){
          await this.personalData.labels.splice(i,1)
          await this.noLabelData .push(item)
          // await this.selectNoLabel()
        }
      }
    }
</script>

<style scoped lang="less">
  @theme_color:rgb(233, 116, 38);
  .section_title{
    width: 300px;
    margin: 0 auto;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    position: relative;
    img{
      border-radius: 50%;
      vertical-align: top;
      position: absolute;
      left: 20px;
    }
    h3{
      /*display: inline-block;*/
      line-height: 50px;
      margin-left: 15px;
      text-align: center;
      float: right;
    }
  }
  .section_card{
    margin-top: 15px;
    article:nth-of-type(odd){
      margin-right: 50px;
    }
    article{
      width: 46%;
      height: 300px;
      border:1px solid #ccc;
      float: left;
      margin-top: 15px;
      header{
        width: 400px;
        margin: 15px auto;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        h4{
          text-align: center;
        }
        p{
          text-align: center;
          margin-bottom: 0;
          font-size: 16px;
          color:@theme_color ;
        }
        p:nth-of-type(2){
          float: left;
          margin-top: 15px;
          color: #16dcf2;
        }
        p:nth-of-type(3){
          float: right;
          margin-top: 15px;
          margin-bottom: 10px;
          color: #4f9e4f;
        }
      }
      ul{
        /*padding: 15px 30px;*/
        li{
          display: block;
          overflow: hidden;
          span{
            font-size: 20px;
            line-height: 35px;
            width: 150px;
            text-align: center;
          }
          span:nth-of-type(1){
            display: block;
            float: left;
            margin-left: 50px;
          }
          span:nth-of-type(2){
            display: block;
            float: right;
            margin-right: 50px;
            width: 160px;
          }
          .select_label{
            background-color:@theme_color ;
            color: #fff;
            float: right;
            margin-right: 90px;
          }
          .personal_zujianPlayer{
            float: right;
            margin-right: 20px;
          }
        }
      }
      ul.sound_ku{
        li{
          height: 70px;
          .personal_js{
            width: 90px;
            float: right;
            margin-right: 20px;
          }
        }
      }
      ul.soundCard{
        width: 80%;
        margin: 0px auto;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        li{
          width: 33%;
          float: left;
          text-align: center;
          p{
            font-size: 16px;
          }
          p:nth-of-type(2){
            color:@theme_color ;
          }
        }
      }
      footer{
        width: 420px;
        margin: 2px auto;
        span{
          float: left;
          margin-top: 7px;
          margin-right: 30px;
          font-size: 16px;
          line-height: 45px;
        }
        .sound_play{
          display: inline-block;
        }
      }
      .moreInformation{
        .el-button{
          margin: 0 auto;
          display: block;
          font-size: 16px;
        }
        p{
          text-align: center;
          font-size: 16px;
          span{
            color: @theme_color;
          }
        }
      }
    }
  }
  .dialog_label{
    overflow: hidden;
    li{
      float: left;
      padding:5px 15px;
      border:1px solid #ccc;
      margin-right: 10px;
      margin-top: 15px;
      position: relative;
      i{
        position: absolute;
        top: -5px;
        right: -5px;
        cursor: pointer;
      }
    }
  }
  .dialog_idCard{
    overflow: hidden;
    img{
      display: inline-block;
      width: 200px;
      // height: 100px;
      border:1px solid #ccc;
      margin-right: 15px
    }
  }
  .dialog_personal{
    overflow: hidden;
    img{
      width: 100px;
      height: 100px;
      border:1px solid #ccc;
      float: left;
    }
  }
  .xiuyin{
    height: 100%;
    h4{
      text-align: center;
      color: red;
      line-height: 300px;
    }
  }
  .selectLabel{
    // border:1px solid #ccc;
    overflow: hidden;
    p{
      margin: 0;
    }
    ul{
      overflow: hidden;
      li{
        float: left;
        border:1px solid #ccc;
        padding: 5px 15px;
        margin-left: 10px;
        cursor: pointer;
        margin-top: 10px;
        background: #ccc;
      }
    }
  }
</style>
