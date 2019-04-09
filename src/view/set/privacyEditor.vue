<template>
    <div>
         <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/set/privacy' }">隐私和协议</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page" v-if="this.$route.params.type==1">用户使用协议</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page" v-if="this.$route.params.type==2">觅语隐私条款</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div class="edit" style="margin-top: 15px">
            <quill-editor ref="textEditor" v-model="articleContent" :options="editorOption" style="width:70%;margin:15px auto;height:auto;">
            </quill-editor>
        </div>
        <el-button size="small" class="submitBtn" @click="submitArticle()">保存</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
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
            }
        },
        created(){
            this.getArticle()
            document.onkeydown = function (e) {
                const key = window.event.keyCode;
                if (key == 13) {
                    return false
                }
            }
        },
        methods:{
            getArticle(){  
                this.$api.set.yinsi_list(data=>{
                    this.loading = false;
                    this.protocolOfUsage = data.protocolOfUsage;
                    this.privacyPolicy = data.privacyPolicy;
                    // this.$route.params.type==1是协议  2是隐私
                    if(this.$route.params.type==1){
                        this.articleContent = this.protocolOfUsage
                    }else if(this.$route.params.type==2){
                        this.articleContent = this.privacyPolicy
                    }   
                
                })
            },
            // 修改
            submitArticle(){
                this.$api.set.yinsi_editor(()=>{
                    this.$notify({
                        type: 'success',
                        message: '修改成功!',
                        title:'成功'
                    });
                    this.$router.push({path: '/set/privacy'})
                },{
                    protocolOfUsage:this.$route.params.type==1?this.articleContent:this.protocolOfUsage,
                    privacyPolicy:this.$route.params.type==1?this.privacyPolicy:this.articleContent,
                })
            }
        }
    }
</script>

<style scoped lang="less">
 @theme_color:rgb(255, 64, 129);
.submitBtn{
    background-color:  @theme_color;
    color: #fff;
    margin: 30px auto;
    display: block;
    padding: 10px 30px;
    font-size: 14px;
}
</style>