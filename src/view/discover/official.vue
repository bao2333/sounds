<template>
    <div class="box">
        <header>
            <h3>官方动态</h3>
            <hr>
        </header>
        <div v-loading="loading" style="overflow:hidden"  v-if="tableData.data!==undefined">
            <aside>
                <p>点赞数: <span>{{ articleDetails.likeNum }}</span> </p>
                <p>收藏数: <span>{{ articleDetails.collectNum }}</span> </p>
                <p>转发数: <span>{{ articleDetails.transpondNum }}</span> </p>
                <p>浏览量: <span>{{ articleDetails.pageViewNum }}</span> </p>
                <el-button @click="$router.push({name:'discoverEditor',params:{id:articleDetails.id,coverType:articleDetails.coverType,url:articleDetails.officialHead,title: articleDetails.officialName,article:articleDetails.content,label:articleDetails.labelName,type:articleDetails.coverType,labelId:articleDetails.labelId,imgs:articleDetails.coverResources}})" class="deitor_dongtai">编辑动态</el-button>
            </aside>

            <section>
                <div class="header">
                    <div class="header_img">
                        <img :src="$oss.url+articleDetails.officialHead" alt="" width="100" height="100" style="float:left">
                        <h3 style="float:left">{{ articleDetails.officialName }}</h3>
                    </div>
                    <div class="article_name">
                        <!-- <p>{{ articleDetails.labelName }}</p> -->
                        <!-- <p><i class="el-icon-location"></i>{{ articleDetails.location }}</p> -->
                        <p>{{ new Date(articleDetails.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}</p>
                    </div>
                </div>
                <div class="article" >
                  <el-input type="textarea" v-model="articleDetails.content" readonly placeholder="请输入内容"  style="width:90%;margin-left: 5%"></el-input>
                </div>

                <div  class="article_images">
                    <!-- <img :src="$oss.url+item" alt="" v-for="(item,index) in articleDetails.coverResources"
                        :key="index"
                        class="article_images_img" v-if="articleDetails.coverType==0"> -->
                    <template v-for="(item,index) in articleDetails.coverResources">
                        <img :src="$oss.url+item" alt="" 
                        :key="index"
                        class="article_images_img" v-if="articleDetails.coverType==0">
                    </template>
                    <video :src="$oss.url + articleDetails.coverResources[0]"  controls="controls" width="200" height="200" v-if="articleDetails.coverType==1"></video>
                    <audio :src="$oss.url + articleDetails.coverResources[0]"  controls="controls" v-if="articleDetails.coverType==2"></audio>
                </div>
            </section>
            <!-- 评论 -->
            <main>
                <ul>
                    <li v-for="(item,index) in articleDetails.comments" :key="index">
                        <div>
                            <img :src="$oss.url+item.userHead" alt="" width="50" height="50" style="float:left">
                            <span style="margin-left:10px;">
                                <span style="font-weight:bold;color:#666;margin-right:10px;">{{ item.userName }}:</span>
                                <span class="plContent">{{ item.content }}</span>
                            </span>
                            <i class="el-icon-delete" @click="deletePinglun(item.commentId)"></i>
                        </div>
                        <el-button class="answer" @click="answer(index)" size="medium" type="text" plain>回复</el-button>
                        <span style="position:absolute;right:10px;top:52px">
                            {{ new Date(item.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}
                        </span>
                        <!-- 官方回复的评论界面 -->
                        <ul v-if="item.commentList.length">
                            <li v-for="(reply,index) in item.commentList" :key="index">
                                <div class="container">
                                    <img src="../../../static/imgs/logo@2x.jpg" alt="">
                                    <div class="right-container">
                                        <p class="item">
                                            <span>
                                                <span>Sounds官方 回复 {{item.userName}} :</span>
                                                <span>{{reply.content}}</span>
                                            </span>
                                            <el-button size="medium" type="text" plain style="width:50px" @click="delComment(reply.commentId)">删除</el-button>
                                        </p>
                                        <p class="reply">
                                            <span>{{ new Date(reply.createTime) | moment('YYYY-MM-DD HH:mm:ss') }}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 官方回复的输入框 -->
                        <div class="publish" v-if="index == num">
                            <div class="left">
                                <img src="../../../static/imgs/logo@2x.jpg" alt="" class="picture">
                            </div>
                            <div class="right">
                                <el-input v-model="input" placeholder="请输入回复的内容" :autofocus="flag"></el-input>
                                <el-button type="primary" plain @click="comment()" :disabled="reversion">回复</el-button>
                                <el-button type="primary" plain @click="remove()">取消</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="block" style="float: right;margin-top: 15px">
                    <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="pageSize" :total="total" @current-change="handleCurrentChange"></el-pagination>
                </div>
            </main>
        </div>

        <div style="height:300px;" v-else>
            <h3 style="line-height:300px;text-align:center;color:red">暂无官方动态！</h3>
        </div>
        <div class="delete">
            <el-button type="danger" size="small" @click="deleteDongtai()" v-if="tableData.data!==undefined">删除</el-button>
            <el-button type="primary" size="small" plain @click="$router.push({name:'discoverEditor',query:{methods:'add'}})">新增</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "official",
        data(){
            return{
                num: -1,
                input:'',
                flag: true,
                loading:false,
                articleDetails:{},
                size:null,
                pageSize:null,
                total:null,
                page:1,
                tableData:{}
            }
        },
        created(){
            
        },
        mounted(){
            this.getList()
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList()
            },
            getList(){
                const page = this.page
                this.loading = true;
                this.$api.find.gfdt_list(data=>{
                    this.tableData = data
                    if(data.data==undefined){
                         this.loading = false;
                         this.$notify({
                             type:'success',
                             message:'暂无官方动态'
                         })
                    }else{
                        // console.log(data.data)
                        this.loading = false;
                        this.articleDetails = data.data;
                        this.total = data.pageNum.total;
                        this.size = data.pageNum.pageSize;
                        this.pageSize = data.pageNum.pages;
                    }
                },{
                    pageNum:page,
                })
            },
            deletePinglun(id){
                this.$confirm('确定要删除此条评论吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.find.gfdt_delete(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除评论成功!',
                            title:'成功'
                        });
                        this.getList()
                    },{
                        id:id
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteDongtai(){
                this.$confirm('确定要删除此条官方动态吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.find.delete(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除评论成功!',
                            title:'成功'
                        });
                        this.getList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            answer(index) {
                this.num = index;
            },
            remove() {
                this.num = -1
            },
            comment() {
                this.$api.find.publish_comment(data => {
                    this.input = '';
                    this.num = -1;
                    this.getList()
                }, {
                    articleId: this.articleDetails.id,
                    content: this.input,
                    quoteId: this.articleDetails.comments[this.num].commentId
                    }
                )
            },
            delComment(id) {
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.find.gfdt_delete(data => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    },{
                        id
                    })  
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });      
                });
            }
        },
        computed: {
            reversion () {
                if (this.input.length > 0) {
                    return false
                } else {
                    return true
                }
            }
        }
    }
</script>
<style>
  .el-textarea__inner{
    height: 200px;
  }
</style>
<style scoped lang="less">
    @theme_color:rgb(233, 116, 38);
    .box{
        position: relative;
        header{
            h3{
                text-align: center;
            }
        }
        section{
            width: 62%;
            border:1px solid #ccc;
            margin: 15px auto;
            overflow: hidden;
            padding: 15px;
            .header{
                overflow: hidden;
                .header_img{
                    float: left;
                }
                .article_name{
                    float: right;
                }

            }
            .article_images{
                float: left;
                margin-top: 20px;
                .article_images_img{
                    width: 200px;
                    margin-right: 15px;
                }
            }

        }
        main{
            width: 62%;
            border:1px solid #ccc;
            margin: 15px auto;
            overflow: hidden;
            padding: 15px;
            ul{
                li{
                    // border:1px solid red;
                    border-bottom: 1px solid #ccc;
                    margin: 3px;
                    overflow: hidden;
                    position: relative;
                    div{
                        padding:15px;
                        position: relative;
                        overflow: hidden;
                        i{
                            font-size: 20px;
                            position: absolute;
                            right: 10px;
                            top: 8px;
                            cursor: pointer;
                        }
                    }
                    .answer {
                        width: 50px;
                        position: absolute;
                        right: 50px;
                        top: 2px;
                    }
                    .publish {
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .left {
                            box-sizing: border-box;
                            width: 10%;
                            .picture {
                                display: block;
                                width: 50px;
                                height: 50px;
                                margin: 0 auto;
                                border-radius: 50%;
                            }
                        }
                        .right {
                            padding: 0;
                            width: 90%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .el-button {
                                margin-left: 10px;
                            }
                        }
                    }
                    .container {
                        width: 80%;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        border-bottom: 0;
                        background: #eee;
                        img {
                            width: 40px;
                            height: 40px;
                            margin: 0 10px;
                            border-radius: 50%;
                        }
                        .right-container {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 0 0 0 10px;
                            .item {
                                margin-bottom: 0;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            .reply {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                        }
                    }
                    ul {
                        li {
                            border-bottom: none;
                        }
                    }
                }
            }
        }
        aside{
            position: absolute;
            right: 40px;
            top: 55px;
            width: 180px;
            // height: 125px;
            padding:10px;
            border:1px solid #000;
            p{
                margin: 0;
                line-height: 26px;
                font-size: 16px;
                span{
                    display: inline-block;
                    width: 100px;
                    text-align: center;
                    font-weight: bolder;
                    color: red;
                    font-size: 20px;
                }
            }
        }
    }
    .deitor_dongtai{
        background:@theme_color;
        color: #fff;
        margin-left: 32px;
    }
    .delete{
        position: absolute;
        left: 20px;
        top: 0px;
        width: 180px;
    }
    .plContent{
        width: 650px;
        display: block;
        margin-left: 50px;
        padding-left: 15px;
        background: rgb(238, 238, 238);
        margin-top: 15px;
    }
    .article{
        margin: 15px 0 15px 0;
    }
</style>
