<template>
  <div>
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/information/official' }">官方消息</el-breadcrumb-item>
        <el-breadcrumb-item class="now_page">推动活动</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <main>
      <h3>消息列表</h3>
      <article v-for="(item,index) in officalData" :key="index">
        <div class="article_header">
          <p>
            <img :src="$oss.url + item.icon " alt width="40" height="40" style="margin-right:10px;">
            {{item.title}}
          </p>
          <i class="el-icon-delete avatar-uploader-icon deleteIcon" @click="deleteInformation(item.id)"></i>
        </div>
        <div class="article_p" v-html="item.content"></div>
        <div>
          <p class="footer_p">
            <i>{{ new Date(item.create_time) | moment('YYYY-MM-DD HH:mm:ss') }}</i>
            <!-- <span @click="$router.push({name:'informationEditor'})">编辑动态</span> -->
          </p>
        </div>
      </article>
      <div class="block" style="float: right;margin-top: 15px;margin-right:5%">
        <el-pagination
          layout="total,prev, pager, next"
          :page-size="size"
          background
          :page-count="count"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <el-button class="add_article" @click="$router.push({name:'informationAdd'})">新增动态</el-button>
    </main>
  </div>
</template>

<script>
import * as OSS from 'ali-oss'
    export default {
        name: "activity",
        data(){
            return{
              officalData:[],   //消息数据
              size:null,    //每页条数
              count:null,    //页数
              total:null,    //总条数
              page:1,       //当前页
            }
        },
        created(){
            this.getList();
        },
        methods:{
            // 分页
            handleCurrentChange(val){
                this.page = val;
                this.getList();
            },
            // 获取消息数据
            getList(){
                const page = this.page;
                this.$api.find.activity_list(data=>{
                    this.officalData = data.data;
                    //循环get解析富文本
                    data.data.map(item=>{
                      this.$ajax.get('http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/'+item.content)
                        .then((res)=>{
                          item.content = res.data
                        })
                    })
                    this.count = data.pageNum.pageSize;
                    this.total = data.pageNum.total;
                    this.size = data.pageNum.pages;
                },{
                    pageNum:page,
                })
            },
            // 删除消息
            deleteInformation(id){
                this.$confirm('确定要删除该条消息吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$api.find.activity_delete(()=>{
                        this.getList();
                        this.$notify({
                            type: 'success',
                            message: '删除推送消息成功!',
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


            }
        }
    }
</script>

<style scoped lang="less">
@theme_color: rgb(233, 116, 38);
main {
    overflow: hidden;
    position: relative;
  h3 {
    text-align: center;
  }
  .add_article {
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    background-color: @theme_color;
    color: #fff;
  }
  article {
    width: 800px;
    // height: 300px;
    margin: 15px auto;
    border: 1px solid #ccc;
    .article_header {
      border-bottom: 1px solid #ccc;
      p {
        display: inline-block;
        line-height: 50px;
        margin-bottom: 0;
        font-size: 20px;
        margin-left: 15px;
      }
      .deleteIcon {
        float: right;
        line-height: 50px;
        font-size: 26px;
        margin-right: 15px;
        cursor: pointer;
      }
      .deleteIcon:hover {
        color: @theme_color;
      }
    }
    .article_p {
    //   height: 150px;
      padding: 20px;
    }
    div {
      p.footer_p {
        padding: 10px;
        margin-bottom: 0;
        overflow: hidden;
        i {
          line-height: 50px;
          margin-left: 15px;
        }
        span {
          border: 1px solid #ccc;
          padding: 10px 15px;
          float: right;
          margin-right: 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        span:hover {
          background-color: @theme_color;
          color: #fff;
        }
      }
    }
  }
}
</style>
<style scoped>
  .article_p >>> img{
    width: 100%;
  }
</style>
