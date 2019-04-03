<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }" >交易商城和语音</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">审核商城</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div class="search">
            <el-input v-model="search.luyin" placeholder="录音人" class="searchInput" size="mini" clearable></el-input>
            <el-select v-model="search.type" placeholder="用户等级" class="searchInput" size="mini" clearable>
                <el-option label="新秀" value="2"></el-option>
                <el-option label="大V" value="1"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="showList()" plain>查询</el-button>
        </div>
        <section>
            <el-table :data="tableData" style="width: 100%" border size="mini" v-loading="loading">
                <el-table-column prop="date" label="录音时间" align="center">
                    <template slot-scope="props">
                        {{ new Date(props.row.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="录音人" align="center"></el-table-column>
                <el-table-column prop="role" label="用户等级" align="center">
                    <template slot-scope="props">
                        {{ props.row.role == 0 ? '大V' : props.row.role == 1 ? '新秀' : '' }}
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格/条" align="center"></el-table-column>
                <el-table-column label="播放语音" align="center">
                    <template slot-scope="props">
                      <div class="box" >
                        <button class="play_button" @click="play_click(props.row.voice,props.row,props.$index)"
                                v-show="props.row.isShow === true">
                          <i class="ion ion-ios-play align-middle"></i>
                        </button>
                        <button class="play_button" @click="paused_click();pauseClick(props.$index)"
                                v-show="props.row.isShow === false">
                          <i class="ion ion-ios-pause align-middle"></i>
                        </button>
                        <audio @ended="ended(props.row)" :src="$oss.url+props.row.voice" ref="personal_play">
                          <!-- <source :src="$oss.url+url" type="audio/mpeg"> -->
                        </audio>
                        <span>{{props.row.second}}s</span>
                      </div>
                        <!--<audioPlayer :url="props.row.voice" :second="props.row.second" style="margin-left:calc(50% - 50px)" />-->
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="照片" align="center">
                    <template slot-scope="props">
                        <viewer :images="[props.row.picture]">
                            <img :src="$oss.url + props.row.picture" alt="" width="100">
                        </viewer>
                    </template>
                </el-table-column>
                <el-table-column label="审核" align="center" width="130">
                     <template slot-scope="props">
                         <el-button type="success" size="mini" plain @click="shenhePass(props.row.id,0)" class="shenheBtn">审核通过</el-button>
                         <el-button type="danger" size="mini" plain @click="shenhePass(props.row.id,1)" class="shenheBtn">审核不通过</el-button>
                     </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
import audioPlayer from '../../components/audioPlayer'
    export default {
        name: "soundStore",
        components:{
            audioPlayer
        },
        data(){
            return{
                loading:false,
                search:{
                    type:'',        //搜索项
                    luyin:'',       //录音人
                    deleted:'',     //已删除
                    unreviewed:'',  //未审核
                },
                tableData:[
                    {
                        date:'123'
                    }
                ],
                page:1,   //分页
                total:null,   //分页总条目数
                size:null,   //分页页数
                count:null,   //页数
                url:'',
                deg:0,
            }
        },
        created(){
            this.showList();
        },
        methods:{
          //点击播放
          async play_click(src, row, index) {
            console.clear()
            this.palyIndex = index
            await this.tableData.map(item => {
              this.$set(item, 'isShow', true)
            })
            // await this.$set(this.tableData[this.palyIndex],'isShow',true)
            var audios = document.getElementsByTagName('audio');
            //判斷播放地址
            let srcAudio = 'http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/' + src
            for (let i = audios.length - 1; i >= 0; i--) {
              if (audios[i].src == srcAudio) {
                audios[i].play()

                this.paused_click(i)
              }
            }
            await this.$set(this.tableData[index], 'isShow', false)
          },
          //点击触发暂停事件
          paused_click(index) {

            var audios = document.getElementsByTagName('audio');
            for (let j = audios.length - 1; j >= 0; j--) {
              if (j != index) audios[j].pause();
            }
          },
          pauseClick(index) {
            this.$set(this.tableData[index], 'isShow', true)
          },
          //播放完毕，按钮回归播放状态
          ended(row) {
            row.isShow = true
          },
          imgClick(imgUrl){
            this.url = imgUrl
          },
            // 分页
            handleCurrentChange(val){
                this.page = val;
                this.showList();
            },
            showList(){
                this.loading = true;
                const page = this.page;
                this.$api.store.shenheStore(data=>{
                    this.loading = false;
                    this.tableData = data.result;
                  this.tableData.map(item=>{
                    this.$set(item,'isShow',true)
                  })
                    this.total = data.pageInfo.total;
                    this.size = data.pageInfo.pageSize;
                    this.count = data.pageInfo.pages;
                },{
                    pageNum:page,
                    name:this.search.luyin==''?null:this.search.luyin,
                    userType:parseInt(this.search.type),
                })
            },
            // 审核
            shenhePass(id,ele) {
                if(ele==0){
                    this.$api.store.shenheStore_pass(()=>{
                        this.$notify({
                            type:'success',
                            message:'审核成功，已通过！',
                            title:'成功'
                        })
                        this.showList();
                    },{
                        id:id,
                    })
                }else if(ele==1){
                    this.$api.store.shenheStore_nopass(()=>{
                        this.$notify({
                            type:'success',
                            message:'审核成功，不被通过！',
                            title:'成功'
                        })
                        this.showList();
                    },{
                        id:id,
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
  @theme_color: rgb(233, 116, 38);
.searchInput{
    width: 150px;
    margin-right: 12px;
    margin-top: 15px;
}
section{
    margin-top: 15px;
}
.shenheBtn{
    width: 100px;
}
.el-button+.el-button{
    margin: 5px 0 0 0 ;
}
.box {
  width: 100px;
  overflow: hidden;
  background-color: rgba(233, 116, 38, .3);
  border-radius: 15px;
  margin-left: 50px;
  span {
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
