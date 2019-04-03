<template>
    <div>
        <header>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '' }">系统设置</el-breadcrumb-item>
                <el-breadcrumb-item class="now_page">隐私和协议</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section v-loading="loading">
            <div class="article">
                <h3 style="text-align:center">用户使用协议</h3>
                <el-button type="primary" plain size="mini" style="float:right;margin-right:25%"
                @click="$router.push({name:'setPrivacyEditor',params:{type:1}})">编辑使用协议</el-button>
            </div>
            <div class="article_detail" v-html="protocolOfUsage">

            </div>
            <hr>
              <div class="article">
                <h3 style="text-align:center">Sounds隐私条款</h3>
                <el-button type="primary" plain size="mini" style="float:right;margin-right:25%"
                @click="$router.push({name:'setPrivacyEditor',params:{type:2}})">编辑使用协议</el-button>
            </div>
            <div class="article_detail" v-html="privacyPolicy">

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "privacy",
        data(){
            return{
                loading:false,
                privacyPolicy:'',   //用户使用协议
                protocolOfUsage:'', //觅语隐私条款
            }
        },
        created(){
            this.showList()
        },
        methods:{
            showList(){
                this.loading = true;
                this.$api.set.yinsi_list(data=>{
                    this.loading = false;
                    this.privacyPolicy = data.privacyPolicy;
                    this.protocolOfUsage = data.protocolOfUsage;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .article{
        overflow: hidden;
    }
   .article_detail{
       width: 50%;
       padding: 30px;
       background: #fff;
       margin: 15px auto;
    }
</style>
<style scoped>
 .article_detail >>> img{
        width: 100%;
        display: block;
    }
</style>

