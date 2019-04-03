<template>
    <div style="overflow:hidden" v-loading="loading">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '' }" >系统设置</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">关于我们</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" style="margin:20px 0" size="small" @click="$router.push({name:'editorAbout'})">编辑关于我们</el-button>
        <div class="set_about">
            <h3>关于我们</h3>
            <img src="../../../static/imgs/logo@2x.jpg" alt="" width="100" height="100">
            <div class="about_article" v-html=" aboutData.aboutUs">
               
            </div>
            <div class="about_footer">
                <p>客服热线：<span>{{aboutData.customerServiceHotline}}</span></p>
                <p>联系地址：<span>{{aboutData.contactAddress}}</span></p>
                <h4>{{ aboutData.businessName }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data(){
            return{
                loading:false,
                aboutData:[],
            }
        },
        created(){
            this.getList()
        },
        methods:{
            getList(){
                this.loading = true;
                this.$api.set.about_list(data=>{
                    this.loading = false;
                    this.aboutData = data;
                })
            }
        }
    }
</script>

<style scoped lang="less">
@theme_color:rgb(255, 64, 129);
.set_about{
    width: 80%;
    margin: 15px auto;
    background: #fff;
    padding: 30px 0;
    h3{
        text-align: center
    }
    img{
        display: block;
        margin: 0 auto
    }
    .about_article{
        width: 40%;
        margin: 15px auto; 
        // text-align: center;
        font-size: 16px;
        border:1px solid #ccc;
        padding: 10px;
    }
    .about_footer{
        width: 40%;
        margin: 15px auto;
        p{
            font-size: 16px;
            span{
                float: right;
                color: @theme_color;
                font-weight: bold;
            }
        }
        h4{
            text-align: center;
        }
    }
}
 
</style>
<style scoped>
.about_article >>> img{
    display: block;
     width: 100%;
 }
</style>
