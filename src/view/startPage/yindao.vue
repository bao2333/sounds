<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{  }">启动页管理</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">引导页</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div style="margin-top:15px">
            <el-button type="primary" size="small" plain @click="cancel()">取消</el-button>
            <el-button type="primary" size="small" @click="imgSubmit()">修改</el-button>
        </div>
        <section>
            <h4>引导页</h4>

            <div class="imgItem" v-for="(item,index) in imgData" :key="index" >
                <div class="add_head" @click="selectIcon1(index)">
                    <img :src="$oss.url+item.coverResource" alt width="200" >
                    <i class="el-icon-plus avatar-uploader-icon add" v-show="plusShow"></i>
                </div>
                <input
                    accept="image/jpeg, image/png"
                    :ref="'item'"
                    @change="iconFileChange1($event,index)"
                    type="file"
                    name="icon"
                    style="display: none"
                >
                <i class="el-icon-circle-close-outline avatar-uploader-icon delete" @click="deleteImg(item.id)"></i>
            </div>
            <div class="imgItem">
                <div class="add_head"  @click="selectIcon()">
                    <img :src="$oss.url+editorImg" alt width="200" >
                    <i class="el-icon-plus avatar-uploader-icon add" v-show="plusShow"></i>
                </div>
                <input
                    accept="image/jpeg, image/png"
                    ref="iconfile"
                    @change="iconFileChange"
                    type="file"
                    name="icon"
                    style="display: none"
                >
                <i class="el-icon-circle-close-outline avatar-uploader-icon delete" @click="delAddImg()"></i>
            </div>
        </section>
    </div>
</template>

<script>
  import * as OSS from 'ali-oss'
    export default {
        name: "yindao",
        data(){
            return{
                plusShow:true,
                imgData:[],     //引导页数据
                editorImg:'',    //上传图片
                imgArr:[]
            }
        },
        created(){

        },
        mounted(){
            this.getList()
        },
        methods:{
            getList(){
                this.$api.qd.qd_img(data=>{
                    this.imgData = data
                },{
                    type:1
                })
            },
            cancel(){
                this.getList()
            },
            // img提交
            imgSubmit(){
                // 提交前 ： 先遍历引导数据 并加入提交数组中前面，因为在添加图片的时候先加的数组
                let oldData = []
                this.imgData.forEach(element => {
                    oldData.push(element.coverResource)
                });
                // 如果修改索引存在  那么就替换数组中所修改的信息
                if(this.index){
                    oldData.splice(this.index,1,this.changeImg)
                }

                // 最终提交引导页
                this.$api.qd.yd_editor(()=>{
                    this.$notify({
                        type:'success',
                        message:'添加成功',
                        title:'成功'
                    })
                    this.getList()
                    this.editorImg = ''
                    this.imgArr = []
                },{
                    coverResource:oldData.concat(this.imgArr)
                })
            },
            // 删除已上传的引导页
            deleteImg(id){
                this.$confirm('确定要删除此引导页吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.qd.yd_del(()=>{
                        this.$notify({
                            type: 'success',
                            message: '删除成功!',
                            title:'删除成功'
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
            // 移除刚添加的引导页
            delAddImg(){
                this.editorImg = ''
            },
            //上传图片
            selectIcon1(i){
                this.$refs['item'][i].click();
                this.$refs['item'][i].value = null;   //相同图片上传第二次的时候会导致失效，每次上传之前清空value
            },
            selectIcon(){
                this.$refs.iconfile.click();
                this.$refs.iconfile.value = null;
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

                    this.$api.oss.update(data => {
                        new OSS.Wrapper({
                        region: 'oss-cn-hangzhou',
                        accessKeyId: data.accessKeyId,
                        accessKeySecret: data.accessKeySecret,
                        stsToken: data.securityToken,
                        bucket: 'sounds-miyu'
                        // bucket: 'zhiyuan-hz'
                        }).put(data.random,file).then(data => {
                        this.editorImg = data.name;
                        this.imgArr.push(data.name) //向最终提交数组中添加新图片资源
                        this.$notify({
                            type:'success',
                            message:'上传图片成功',
                            title:'成功'
                        })
                        }).catch(function (err) {
                        console.error('error: %j', err);
                        });
                    },{});
                    };
                    image.src= data;
                };
                reader.readAsDataURL(file);
            },
             iconFileChange1(e,i){
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
                    // if( width <400 || height<200){
                    //   this.$notify.error({
                    //     title: '操作提示',
                    //     message: '图片大小必须大于400*200！'
                    //   });
                    //   return;
                    // }
                    this.$api.oss.update(data => {
                        new OSS.Wrapper({
                        region: 'oss-cn-hangzhou',
                        accessKeyId: data.accessKeyId,
                        accessKeySecret: data.accessKeySecret,
                        stsToken: data.securityToken,
                        bucket: 'sounds-miyu'
                        }).put(data.random,file).then(data => {
                        this.changeImg = data.name;

                        // this.plusShow = false;
                        this.index = i
                        this.imgData[i].coverResource = data.name
                         this.$notify({
                            type:'success',
                            message:'上传图片成功',
                            title:'成功'
                        })
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
section{
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
    background: #fff;
    padding: 35px;
    // background: rgb(235, 230, 230);
    h4{
        text-align: center;
    }
    .imgItem{
        width: 200px;
        min-height: 200px;
        height: 355.72px;
        background: #ccc;
        float: left;
        margin:15px 20px 0 0;
        position: relative;
        cursor: pointer;
        i.add {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -12.5px;
            margin-top: -12.5px;
            font-size: 25px;
        }
        i.delete {
            position: absolute;
            right:0;
            top: 0;
            margin-right: -10px;
            margin-top: -10px;
            font-size: 25px;
            border:1px solid #fff;
            background: #fff;
            border-radius: 50%;
            display: none;
            z-index: 99999;
        }
    }
    .imgItem:hover i.delete{
        display: block
    }
}
</style>
