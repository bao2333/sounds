<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }" >消息管理</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">官方消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section>
            <h3>编辑官方消息</h3>
            <div class="update_img">
                <div class="add_head" @click="selectIcon">
                    <img :src="$oss.url+ossurl" alt="" width="148" height="148" >
                    <i class="el-icon-plus avatar-uploader-icon" v-show="showIcon"></i>
                </div>
                <input accept="image/jpeg,image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none"/>
            </div>
            <el-input size="mini" style="width:20%;margin:15px auto;display:block" placeholder="请输入消息标题" v-model="title"></el-input>
            <div class="edit" style="margin-top: 15px">
                <quill-editor ref="textEditor" v-model="articleContent" :options="editorOption" style="width:70%;margin:15px auto;height:auto;">
                </quill-editor>
            </div>
            <el-button size="small" class="submitBtn" @click="addOffical()">保存</el-button>
        </section>
        <hr>
        <main>
            <h3>消息列表</h3>
            <article v-for="(item,index) in officalData" :key="index">
                <div class="article_header">
                    <p><img :src="$oss.url + item.icon " alt="" width="40" height="40" style="margin-right:10px;"> {{item.title}}</p>
                    <i class="el-icon-delete avatar-uploader-icon deleteIcon" @click="deleteNews(item.id)"></i>
                </div>
                <div  class="article_p" v-html="item.content">

                </div>
                <div>
                    <p class="footer_p">
                        <i>{{new Date(item.createTime) | moment('YYYY-MM-DD HH:mm:ss')}}</i>
                        <!-- <span>查看详情</span> -->
                    </p>
                </div>
            </article>
            <div class="block" style="float: right;margin-top: 15px">
                <el-pagination layout="total,prev, pager, next" :page-size="size" background :page-count="count" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </main>
    </div>
</template>

<script>
  import * as OSS from 'ali-oss'
    export default {
        name: "official",
        data(){
            return{
                showIcon:true,
                upadteImg:'',    //上传照片
                officalData:[],    //消息数据
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
                        [{ 'align': [] },'image'],
                    ]
                    },
                    placeholder:'请输入消息内容 ...',
                },
                articleContent:'',  //富文本
                size:null,
                count:null,
                total:null,
                page:1,
                title:'',   //标题
                ossurl:'',   //上传得到的地址
                itemContent:null,
            }
        },
        created(){
            this.getList()
            document.onkeydown = function (e){
                const key = window.event.keyCode;
                if (key == 13) {
                    return false;
                }
            }
        },
        methods:{
            handleCurrentChange(val){
                this.page = val;
                this.getList()
            },
            // 获取官方动态
            getList(){
                const page = this.page;
                this.$api.find.offical_list(data=>{
                    this.officalData = data.data;
                    //循环get解析富文本
                    data.data.map(item=>{
                      this.$ajax.get('http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/'+item.content)
                        .then((res)=>{
                          item.content = res.data
                        })
                    })
                    this.size = data.pageNum.pageSize;
                    this.count = data.pageNum.pages;
                    this.total = data.pageNum.total;
                },{
                    pageNum:page
                })
            },
            // 添加消息
            addOffical(){
              this.$api.oss.update(data => {
                new OSS.Wrapper({
                    region: 'oss-cn-hangzhou',
                    accessKeyId: data.accessKeyId,
                    accessKeySecret: data.accessKeySecret,
                    stsToken: data.securityToken,
                    bucket: 'sounds-miyu'
                    // bucket: 'zhiyuan-hz'
                }).put(data.random,new Blob([this.articleContent])).then(data => {
                  if(this.ossurl == '' || this.title == '' || this.articleContent == ''){
                    this.$notify({
                      type: 'warning',
                      message: '请完善信息后再进行添加!',
                      title:'警告'
                    });
                  }else{
                    this.$api.find.offical_add(()=>{
                      this.getList();     //添加成功之后刷新消息接口
                      this.$notify({
                        type: 'success',
                        message: '添加消息成功!',
                        title:'成功'
                      });
                      this.ossurl = '';
                      this.title = '';
                      this.articleContent = ''
                      this.showIcon = true   // 上传成功之后显示加号icon
                    },{
                      icon:this.ossurl,
                      title:this.title,
                      content:data.name,
                    })
                  }
                }).catch(function (err) {
                  console.error('error: %j', err);
                });
              },{});
            },
            // 删除消息
            deleteNews(id){
                //删除提示
                this.$confirm('确定要删除此条官方消息吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除接口
                    this.$api.find.offical_delete(()=>{
                        this.getList();     //删除成功之后刷新消息接口
                        this.$notify({
                            type: 'success',
                            message: '删除消息成功!',
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
            },
             //上传图片
            selectIcon(){
                this.$refs.iconFile.click();
                this.$refs.iconFile.value = null;   //相同图片上传第二次的时候会导致失效，每次上传之前清空value
            },
            iconFileChange(e){
                let file = e.target.files[0];
                if(!file.name.substring(file.name.lastIndexOf('.')) == '.png'){
                    return;
                }
                let reader = new FileReader();
                reader.onload = e => {
                    let data = e.target.result;
                    //加载图片获取图片真实宽度和高度
                    let image = new Image();
                    image.onload= () =>{
                    let width = image.width;
                    let height = image.height;
                    // if( width <400 || height<400){
                    //     this.$notify.error({
                    //     title: '操作提示',
                    //     message: '图片大小必须大于400*400！'
                    //     });
                    //     return;
                    // }
                   this.$api.oss.update(data => {
                    new OSS.Wrapper({
                        region: 'oss-cn-hangzhou',
                        accessKeyId: data.accessKeyId,
                        accessKeySecret: data.accessKeySecret,
                        stsToken: data.securityToken,
                        bucket: 'sounds-miyu'
                    }).put(data.random,file).then(data => {
                        this.ossurl = data.name
                        this.showIcon = false   // 上传成功之后隐藏加号icon
                        }).catch(function (err) {
                        console.error('error: %j', err);
                        });
                    },{});
                };
                    image.src= data;
                };
                reader.readAsDataURL(file);
            },
        }
    }
</script>

<style scoped lang="less">
 @theme_color:rgb(233, 116, 38);
section{
    overflow: hidden;
    background: #fff;
    margin-top: 15px;
    padding: 30px;
    h3{
        text-align: center
    }
    .update_img{
        overflow: hidden;
        .add_head{
            width: 150px;
            height: 150px;
            border:1px dashed #ccc;
            float: left;
            position: relative;
            left: 50%;
            margin-left: -75px;
            cursor: pointer;
            i{
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -12.5px;
            margin-top: -12.5px;
            font-size: 25px;
            }
        }
    }
    .edit{
        width: 70%;
        margin: 0 auto;
    }
    .submitBtn{
        background-color:  @theme_color;
        color: #fff;
        margin: 30px auto;
        display: block;
        padding: 10px 30px;
        font-size: 14px;
    }

}
main{
    background: #fff;
    margin-top: 15px;
    padding: 30px;
    overflow: hidden;
    h3{
        text-align: center;
    }
    article{
        width: 800px;
        height: auto;
        margin: 15px auto;
        border:1px solid #ccc;
       .article_header{
            border-bottom:1px solid #ccc;
           p{
               display: inline-block;
               line-height: 50px;
               margin-bottom: 0;
               font-size: 20px;
               margin-left: 15px;
           }
           .deleteIcon{
               float:right;
               line-height: 50px;
               font-size: 26px;
               margin-right: 15px;
               cursor: pointer;
           }
           .deleteIcon:hover{
               color: @theme_color
           }
       }
       .article_p{
            height: auto;
            padding: 20px;
       }
      div{
           p.footer_p{
           padding: 10px;
           margin-bottom: 0;
           overflow: hidden;
          i{
            line-height: 50px;
            margin-left: 15px;
          }
           span{
               border:1px solid #fff;
               padding: 10px 15px;
               float:right;
               margin-right: 15px;
               border-radius: 5px;
               cursor: pointer;
           }
           span:hover{
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
    display: block;
    width: 100%;
}
</style>
