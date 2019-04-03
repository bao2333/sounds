<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/information/official' }" >官方消息</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/information/activity' }" >推动活动</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">新增活动</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section>
            <h3>新增活动</h3>
            <div class="edit" style="margin-top: 15px">
                <div class="update_img">
                    <div class="add_head" @click="selectIcon">
                        <img :src="$oss.url+ossurl" alt="" width="148" height="148" >
                        <i class="el-icon-plus avatar-uploader-icon" v-show="showIcon"></i>
                    </div>
                    <input accept="image/jpeg,image/png" ref="iconFile" @change="iconFileChange" type="file" name="icon" style="display: none"/>
                </div>
                <el-input size="mini" style="width:20%;margin:15px auto;display:block" placeholder="请输入消息标题" v-model="title"></el-input>
                <quill-editor ref="textEditor" v-model="articleContent" :options="editorOption" style="width:75%;margin:15px auto;height:auto;">
                </quill-editor>
                <div class="check_radio">
                    <p>选择用户类型：</p>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
                        <el-checkbox v-for="(user,index) in users" :label="user" :key="index">{{user.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="buttonPost">
                    <el-button  class="quxiao" @click="$router.push({name:'informationActivity'})">取消</el-button>
                    <el-button  class="submitActivity" @click="addPushInformation()">提交</el-button>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
import * as OSS from 'ali-oss'
    const usersData = [     //多选数据
        {name:'所有男性',id:1},
        {name:'所有女性',id:2},
        {name:'所有大V',id:3},
        {name:'所有星秀',id:4},
    ];
    export default {
        name: "addOrEditor",
        data(){
            return{
                articleContent:'',
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
                    placeholder:'请输入文章内容 ...'
                },
                users:usersData,    //多选数据
                checkedUsers:[],    //多选数据
                checkAll:false,
                isIndeterminate: true,
                ossurl:'',  //上传获取的oss资源
                showIcon:true,  //上传+显示
                title:'',   //标题
            }
        },
        created(){

        },
        methods:{
            // 全选
            handleCheckAllChange(val){
                if(val==true){
                    this.checkedUsers = this.users
                }else{
                    this.checkedUsers  = []
                }
                this.isIndeterminate = false;
            },
            // 复选
            handleCheckedUsersChange(value){
                let checkedCount = value.length;
                if( checkedCount === this.users.length){
                    this.checkAll = true;
                    this.isIndeterminate = false
                }
                if( checkedCount > 0 && checkedCount < this.users.length){
                    this.isIndeterminate = true
                }
            },
            addPushInformation(){
                if(this.ossurl == '' || this.title == '' || this.articleContent == ''){
                    this.$notify({
                      type:'warning',
                      message:'请完善信息后再进行添加！！',
                      title:'警告',
                    })
                }else if(this.ossurl !== '' || this.title !== '' || this.articleContent !== ''){
                    this.$api.oss.update(data => {
                        new OSS.Wrapper({
                            region: 'oss-cn-hangzhou',
                            accessKeyId: data.accessKeyId,
                            accessKeySecret: data.accessKeySecret,
                            stsToken: data.securityToken,
                            bucket: 'sounds-miyu'
                        }).put(data.random,new Blob([this.articleContent])).then(data => {
                            let checkArr = []
                            this.checkedUsers.map(item=>{
                                checkArr.push(item.id)
                            })
                            this.$api.find.activity_add(()=>{
                                this.$notify({
                                type:'success',
                                message:'添加推送消息成功，手机会有推送哦！',
                                title:'成功',
                                })
                                //添加推送成功后跳转到推送消息页面
                                this.$router.push({name:'informationActivity'})
                            },{
                                icon:this.ossurl,
                                title:this.title,
                                content:data.name,  //编译后的富文本
                                peopleType:checkArr
                            })
                        }).catch(function (err) {
                            console.error('error: %j', err);
                        });
                    });
                }
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
     margin: 20px;
     h3{
         text-align: center;
     }
     .update_img{
        overflow: hidden;
        .add_head{
            width: 150px;
            height: 150px;
            border:1px dashed #000;
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
         margin: 15px auto;
         div.check_radio{
             margin:15px 0  0 150px;
             .radio_type{
                 margin-left: 100px;
             }
         }
         div.buttonPost{
             width:154px;
             margin: 30px auto;
             .el-button{
                 display: inline-block;
                 background-color: @theme_color;
                 color: #fff;
             }
         }
     }
 }

</style>
