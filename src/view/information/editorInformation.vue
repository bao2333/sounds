<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/information/official' }" >官方消息</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/information/activity' }" >推动活动</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">编辑动态</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section>
            <h3>编辑动态</h3>
            <div class="edit" style="margin-top: 15px">
                <quill-editor ref="textEditor" v-model="articleContent" :options="editorOption">
                </quill-editor>
                <div class="check_radio">                
                    <p>选择用户类型：</p>
                    <div class="radio_type">
                        <el-radio v-model="radio" label="1">所有男性用户</el-radio>
                        <el-radio v-model="radio" label="2">所有女性用户</el-radio>
                        <el-radio v-model="radio" label="3">所有大V用户</el-radio>
                        <el-radio v-model="radio" label="4">所有新秀用户</el-radio>
                    </div>
                    <p>选择推送方式：</p>
                        <div class="radio_type">
                            <el-radio v-model="push" label="1">短信推送</el-radio>
                            <el-radio v-model="push" label="2">手机push推送</el-radio>
                        </div>                  
                </div>
                <div class="buttonPost">
                    <el-button  class="quxiao" @click="$router.push({name:'informationActivity'})">取消</el-button>
                    <el-button  class="submitActivity">提交</el-button>
                </div>
            </div>
            
        </section>
    </div>
</template>

<script>
    export default {
        name: "editorInformation",
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
                        [{ 'color': ['#000'] }, { 'background': [] }],
                        ['clean'],
                        [{ 'align': [] },'image'],
                    ]
                    },
                    placeholder:'请输入文章内容 ...'
                },
                 radio: '1',
                 push:'2',
            }
        },
        created(){

        },
        methods:{
            
            
        }
    }
</script>

<style scoped lang="less">
 @theme_color:rgb(255, 64, 129);
 section{
     margin: 20px;
     h3{
         text-align: center;
     }
     .edit{
         width: 70%;
         margin: 15px auto;
         div.check_radio{
             margin-top: 15px;
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
