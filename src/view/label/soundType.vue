<template>
    <div style="overflow:hidden">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/label/sound' }" >标签库</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">秀音类目</el-breadcrumb-item>
        </el-breadcrumb>
        <section>
            <div class="type_box">
                <h4>男.出品音色</h4>
                <div class="type_label">
                    <!-- 标签组件 -->
                    <sound-type :arrs="boyChugan" :type="0"/>
                </div>
            </div>
            <div class="type_box">
                <h4>女.出品音色</h4>
                <div class="type_label">
                    <!-- 标签组件 -->
                    <sound-type :arrs="grilChugan" :type="1"/>
                </div>
            </div>
            <div class="type_box">
                <h4>男.声感修饰（百分比随机生成）</h4>
                <div class="type_label">
                    <!-- 标签组件 -->
                    <sound-type :arrs="boySound" :widthAuto="{width:'200px'}" :inputAuto="{width:'198px'}"  :type="2"/>
                </div>
            </div>
            <div class="type_box">
                <h4>女.声感修饰（百分比随机生成）</h4>
                <div class="type_label">
                    <!-- 标签组件 -->
                    <sound-type :arrs="girlSound" :widthAuto="{width:'200px'}" :inputAuto="{width:'198px'}"  :type="3"/>
                </div>
            </div>
            <div class="type_box">
                <h4>男/女.声音属性</h4>
                <div class="type_label">
                    <div class="gong">
                       <div class="gongType">攻类：</div>
                       <div style="overflow:hidden">
                           <sound-type :arrs="gongType"   :type="6"/>
                        </div>
                    </div>
                    <!-- <div class="shou">
                        <div class="shouType">受类：</div>
                        <div style="overflow:hidden">
                           <sound-type :arrs="shouType"  :type="7" />
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="type_box">
                <h4>男/女.声音属性</h4>
                <div class="type_label">
                    <div class="shou">
                        <div class="shouType">受类：</div>
                        <div style="overflow:hidden">
                            <sound-type :arrs="shouType"  :type="7" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="luyin">
                <h4>录音台词</h4>
                <div class="luyin_label">
                    <div class="textArea">
                      <textarea name="" id="" class="text_area" v-model="textareaData"></textarea>
                      <el-button class="add_taici" size="mini" @click="addTaici()">添加台词</el-button>
                    </div>
                    <!-- 标签组件 -->
                    <sound-type :arrs="luyinSound" :widthAuto="{width:'400px'}" :addtype="luyin" :inputAuto="{width:'398px'}" style="float:left;width:calc( 100% - 300px );"  :type="5"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import soundTypeLabel from '../../components/soundTypeLabel'    //标签组件
    export default {
        name: "soundType",
        components:{
            'sound-type':soundTypeLabel  //标签组件
        },
        data(){
            return{
                boyChugan:[],
                grilChugan:[],
                boySound:[],
                girlSound:[],
                gongType:[],
                shouType:[],
                luyinSound:[],
                stars:[
                    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座',
                ],
                luyin:'1',
                textareaData:'' //添加台词textarea
            }
        },
        created(){

        },
        mounted(){
            this.labelList()
        },
        methods:{
            labelList(){
                this.$api.label.sound_list(data=>{
                   this.boyChugan = data[0];
                   this.grilChugan = data[1];
                   this.boySound = data[2];
                   this.girlSound = data[3];
                   this.luyinSound = data[5];
                   this.gongType = data[6];
                   this.shouType = data[7];

                })
            },
            // 添加台词
            addTaici(){
              if(this.textareaData == ''){
                this.$notify({
                  type:'warning',
                  message:'请输入完整标签，标签名不能为空！',
                  title:'注意',
                })
              }else{
                this.$api.label.sound_add(()=>{
                  this.$notify({
                    type:'success',
                    message:'添加成功',
                    title:'成功',
                  })
                  this.labelList();
                  this.textareaData = ''
                },{
                  name:this.textareaData,
                  type:5
                })
              }
            }
        }
    }
</script>

<style scoped lang="less">
@theme_color: rgb(233, 116, 38);
    section{
        margin-top: 15px;
        .type_box{
            /*background: #f2f2f2;*/
            width: 45%;
            border:1px solid rgba(238, 238, 238, 0.808);
            height: 400px;
            padding: 15px;
            float: left;
           margin-top: 25px;
           h4{
               color: #194180;;
           }
            .type_label{
                // border:1px solid #ccc;
                height: 90%;
                overflow: auto;
                background: #fff;
                box-shadow: 5px 2px 5px 2px rgba(233, 116, 38, 0.664);
                border-radius: 10px;
                ul {
                    overflow: hidden;
                    padding: 20px;
                  li{
                    float: left;
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border:1px solid #ccc;
                    margin-right: 28px;
                    margin-top: 15px;
                }
                }
                .gong{
                //    height: 150px;
                   overflow-y:auto;
                    div.gongType{
                        width: 20%;
                        float: left;
                        height: 100%;
                        font-size: 16px;
                        text-align: center;
                        line-height: 50px;
                        overflow-y:auto;
                    }

                }
                .shou{
                    // height: 150px;
                    overflow: auto;
                    div.shouType{
                        width: 20%;
                        float: left;
                        height:100%;
                        font-size: 16px;
                        text-align: center;
                        line-height: 50px;
                        overflow-y:auto;
                    }
                }
            }
        }
        .type_box:nth-child(odd){
                margin-right: 60px;
                margin-left: 40px
        }
        .luyin{
            width: 94%;
            // height: 400px;
            float: left;
            margin: 40px;
            padding: 20px;
            /*background: #f2f2f2;*/
            h4{
               color: #194180;;
            }
            // border:1px solid #ccc;
            .luyin_label{
                background: #fff;
                overflow: hidden;
                box-shadow: 5px 2px 5px 2px rgba(233, 116, 38, 0.664);
                border-radius: 10px;
                .textArea{
                    width: 300px;
                    height: 300px;
                    float: left;
                    // border:1px solid #ccc;
                    padding: 10px;
                    .text_area{
                        width:100%;
                        height:220px;
                    }
                    .add_taici{
                        margin: 15px auto;
                        display: block;
                        background-color:@theme_color;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>