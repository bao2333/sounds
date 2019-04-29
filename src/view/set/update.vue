<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }">系统设置</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">升级维护</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="android_app">
            <h3>安卓APP</h3>
            <div class="details">
                <ul>
                    <li v-for="(item,index) in androidData" :key="index">
                        <span>版本名称：{{ item.verInfo }}</span>
                        <span>版本号：{{ item.verCode }}</span>
                        链接：<input size="mini" :value="item.downloadLink" :id="item.id"/>
                        <el-button size="mini" type="primary" @click="copyUrl(item)">复制链接</el-button>
                        <div style="margin-left:15px;">
                            状态:<span>{{item.updateType == 0 ? '非强制更新' : '强制更新'}}</span>
                            <el-button size="mini" type="primary" @click="forceUpdate(item)">{{item.updateType == 0 ? '强制更新' : '非强制更新'}}</el-button>
                            <el-button size="mini" type="danger" @click="deleteBanben(item.id)">删除</el-button>
                            <el-button size="mini" type="text" style="font-size:16px;margin-right:15px;" @click="dialogVisible=true;getDetails(item)">更新详情></el-button>
                        </div>
                    </li>
                    <li>
                       <div class="add_show" v-show="addAndroidShow" @click="showOrfalse(0)">
                           <i class="el-icon-plus"></i>
                       </div>
                       <div class="add_banben" v-show="!addAndroidShow">
                            <span>版本名称：<el-input size="mini" v-model="add.androidBanben"></el-input></span>
                            <span>版本号：<el-input size="mini" v-model="add.androidVersionNumber"></el-input></span>
                            <div class="add_detail">
                                链接：<el-input size="mini" v-model="add.androidUrl"></el-input>
                                <el-button size="mini" type="primary" @click="dialogVisible=true;setDetails(0)">版本更新详情设置</el-button>
                                <i class="el-icon-circle-close-outline" @click="cancelAdd(0)"></i>
                                <i class="el-icon-circle-check-outline" @click="AddPost(0)"></i>
                            </div> 
                       </div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="ios_app">
            <h3>苹果APP</h3>
            <div class="details">
                <ul>
                    <li v-for="(item,index) in iosData" :key="index">
                        <span>版本名称：{{ item.verInfo }}</span>
                        链接：<input size="mini" :value="item.downloadLink" :id="item.id"/>
                        <el-button size="mini" type="primary" @click="copyUrl(item)">复制链接</el-button>
                        <el-button size="mini" type="text" style="font-size:16px;margin-right:15px;" @click="dialogVisible=true;getDetails(item)">更新详情></el-button>
                        <el-button size="mini" type="danger" @click="deleteBanben(item.id)">删除</el-button>
                    </li>
                    <li>
                       <div class="add_show" v-show="addIosShow" @click="showOrfalse(1)">
                           <i class="el-icon-plus"></i>
                       </div>
                       <div class="add_banben" v-show="!addIosShow">
                            <span>最新版本：<el-input size="mini" v-model="add.iosBanben"></el-input></span>
                            <span>链接：<el-input size="mini" v-model="add.iosUrl"></el-input></span>
                            <el-button size="mini" type="primary" @click="dialogVisible=true;setDetails(1)">版本更新详情设置</el-button>
                            <i class="el-icon-circle-close-outline" @click="cancelAdd(1)"></i>
                            <i class="el-icon-circle-check-outline" @click="AddPost(1)"></i>
                       </div>
                    </li>
                </ul>
            </div>
        </section>
        <el-dialog title="更新详情" :visible.sync="dialogVisible" width="30%" > 
            <div v-if="setType==0">
                <p>安卓版本详情：</p>
                 <el-input type="textarea" v-model="add.androidDetails"></el-input>
            </div>
            <div v-else-if="setType==1">
                 <p>苹果版本详情：</p>
                 <el-input type="textarea" v-model="add.iosDetails"></el-input>
            </div>
            <div v-show="detailsShow">
                <p>发布时间: <span>{{ new Date(openDate) | moment('YYYY-MM-DD') }}</span></p>
                <p>版本详情: <span>{{ banbenDetail }}</span></p>
                <p>版本类型: <span>{{ history==0?'历史版本': history==1?'最新版本':'' }}</span></p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "update",
        data(){
            return{
                dialogVisible:false,
                detailsShow:true,  //详情显示隐藏
                androidUrl:'',   //安卓链接
                iosUrl:'',   //安卓链接
                addAndroidShow:true,   //添加的显示隐藏
                addIosShow:true,   //添加的显示隐藏
                add:{
                    androidBanben:'',
                    androidUrl:'',
                    androidDetails:'',
                    androidVersionNumber: '',
                    iosBanben:'',
                    iosUrl:'',
                    iosDetails:'',
                    iosVersionNumber: ''
                },
                iosData:[], 
                androidData:[],
                banbenDetail:'',    //版本详情
                openDate:'',    //发布时间
                history:'',    //发布时间
                setType:null,
                inputText:''
            }
        },
        created(){
            this.getInformation()
        },
        mounted(){
            
        },
        methods:{
            getInformation(){
                this.$api.set.banben_list(data=>{
                    console.log(data)
                    // 遍历数据，根据appType来取出android和ios的数据
                   data.map(item=>{
                       item.map(element=>{
                           if(element.appType==0){
                               this.androidData = item
                               this.androidUrl = element.downloadLink
                           }
                           if(element.appType==1){
                               this.iosData = item;
                               this.iosUrl = element.downloadLink
                           }
                       })
                   })
                })
            },
            // 复制网址
            copyUrl(ele){
                let inputText = document.getElementById(ele.id);
                let currentFocus = document.activeElement;
                inputText.focus();
                inputText.setSelectionRange(0, inputText.value.length);
                if(document.execCommand('copy', true)){
                    this.$message({
                        type:'success',
                        message:'已成功复制到剪贴板'
                    })
                }
                currentFocus.focus();
            },
            // 获取版本详情
            getDetails(ele){
                this.banbenDetail = ele.updateDetail
                this.openDate = ele.openDate
                this.history = ele.history
                this.setType = null;    //查看历史版本的时候置空setType
                this.detailsShow = true;
            },
            // 设置版本的详情
            setDetails(type){
                this.setType = type;
                this.detailsShow = false;   //设置的时候隐藏历史版本详情
            },
            // 添加新版本
            AddPost(type){
                this.$api.set.banben_add(()=>{
                    this.getInformation()
                    this.add.androidBanben=''
                    this.add.androidUrl=''
                    this.add.androidDetails=''
                    this.add.androidVersionNumber= ''
                    this.add.iosBanben=''
                    this.add.iosUrl=''
                    this.add.iosDetails=''
                    this.add.iosVersionNumber= ''
                    this.addAndroidShow = true
                    this.addIosShow = true
                    this.$notify({
                        type: 'success',
                        message: '添加新版本成功!',
                        title:'成功'
                    });
                },{
                    appType:type,
                    verInfo:type==0?this.add.androidBanben:type==1?this.add.iosBanben:'',
                    downloadLink:type==0?this.add.androidUrl:type==1?this.add.iosUrl:'',
                    updateDetail:type==0?this.add.androidDetails:type==1?this.add.iosDetails:'',
                    verCode: type==0? Number(this.add.androidVersionNumber): type==1? Number(this.add.iosVersionNumber): '',
                    updateType: 0
                })
            },
            // 删除版本
            deleteBanben(id){
                this.$confirm('确定要删除此版本记录吗?', '提示', {
                    confirmButtonText: '狠心删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.set.banben_delete(()=>{
                        this.getInformation()
                        this.$notify({
                            type: 'success',
                            message: '删除成功!',
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
            // 点击添加隐藏加号
            showOrfalse(type){
                if(type === 0){
                    this.addAndroidShow = false;
                }else if(type === 1){
                    this.addIosShow = false;
                }
                
            },
            cancelAdd(type){
                if(type === 0){
                    this.addAndroidShow = true;
                }else if(type === 1){
                    this.addIosShow = true;
                }
            },
            //强制更新
            forceUpdate(row) {
                // console.log(row)
                this.versionUpdateType = row.updateType == 0 ? '强制更新' : '非强制更新'
                this.$confirm(`<p>确定要将版本改为<span style="color:red;font-size: 16px"> ${this.versionUpdateType} </span>吗？</p>`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    type: 'success'
                }).then(() => {
                    this.$api.set.updateApp(()=>{
                        this.getInformation()
                        this.$message({
                            type: 'success',
                            message: '强制更新成功!'
                        })
                    },{
                        id: row.id,
                        verCode: row.verCode,
                        updateType: row.updateType == 0 ? 1 : row.updateType == 1 ? 0 : null
                    })
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消强制更新'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    header{
        margin-bottom: 15px;
    }
    section{
        width:48%;
        // margin:15px auto;
        float: left;
        border:1px solid #ccc;
        margin-left: 15px;
        background: #fff;
        h3{
            text-align: center;
            line-height: 45px;
            margin-bottom: 0;
        }
        .details{
            border:1px solid #ccc;
            border-bottom: 0;
            overflow: hidden;
            line-height: 50px;
            ul{
                margin-bottom: 0;
                li{
                    border-bottom:1px solid rgb(15, 19, 13);
                    height: auto;
                    position: relative;
                    span{
                        margin: 0 30px 0 15px;
                    }
                    .el-input{
                        width: 200px;
                        display: inline-block;
                    }
                    input{
                        width: 200px;
                        height: 30px;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                        padding-left: 15px;
                    }
                    .add_show{
                        width: 100%;
                        height: 50px;
                        border:1px dashed #ccc;
                        cursor: pointer;
                        i{
                            margin: 0 auto;
                            display: inline-block;
                            line-height: 50px;
                            font-size: 20px;
                            position: absolute;
                            left: 49%;
                        }
                    }
                    .add_banben{
                        overflow: hidden;
                        line-height: 50px;
                        .add_detail {
                            display: flex;
                            align-items: center;
                            margin-left: 10px;
                            button {
                                margin: 0 10px 0 10px;
                            }
                        }
                        span{
                            margin: 0 10px 0 10px;
                        }
                        i{
                            font-size: 24px;
                            cursor: pointer;
                            margin-left: 10px;
                            line-height: 50px;
                        }   
                    }
                }
            }
        }
    }
</style>
