<template>
    <div>
        <div v-loading="loading">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/set/account' }">账号管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/set/about' }">关于我们</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">编辑详情</el-breadcrumb-item>
            </el-breadcrumb>
            <hr>
            <div class="edit" style="margin-top: 15px">
                <quill-editor ref="textEditor" v-model="articleContent" :options="editorOption" style="width:50%;margin:15px auto;height:auto;">
                </quill-editor>
            </div>
            <div class="in_editor" style="margin-top:70px;">客服热线：<input type="text" v-model="phone"></div>
            <div class="in_editor">联系地址：<input type="text" v-model="address"></div>
            <div class="in_editor">公司名称：<input type="text" v-model="companyName"></div>           
            <div class="editor_btn">
                <el-button @click="$router.push({ path: '/set/about' })" style="margin:0 20px 0" size="small">取消</el-button>
                <el-button class="change" size="small" @click="editorAbout()">修改</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                loading:false,
                // 富文本配置
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
                articleContent:'',
                phone:'',       //客服热线
                address:'',      //联系地址
                companyName:'',  //公司名称
            }
        },
        created(){
            this.getList();
        },
        methods:{
             getList(){
                this.loading = true;
                this.$api.set.about_list(data=>{
                    this.loading = false;
                    this.articleContent = data.aboutUs;
                    this.phone = data.customerServiceHotline;
                    this.address = data.contactAddress;
                    this.companyName = data.businessName;
                })
            },
            //修改
            editorAbout(){
                this.$api.set.about_editor(()=>{
                    this.$notify({
                        type:'success',
                        message:'编辑成功！',
                        title:'成功'
                    })
                    //修改成功后跳转回关于我们页面
                    this.$router.push({ path: '/set/about' })
                },{
                    aboutUs:this.articleContent,
                    customerServiceHotline:this.phone,
                    contactAddress:this.address,
                    businessName:this.companyName,
                })
            }
        }
    }
</script>

<style scoped lang="less">
 @theme_color:rgb(255, 64, 129);
    .in_editor{
        width: 380px;
        margin: 35px auto;   
        font-size: 16px;  
        input{
            width: 300px;
            font-size:12px;
            padding: 5px
        }  
    }
    .editor_btn{
         width: 220px;
          margin: 35px auto;   
    }
    .change{
        background: @theme_color;
        color: #fff;
        margin-left: 60px;
    }
</style>