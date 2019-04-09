<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/burying/nikkatsu' }">用户分析</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">每个板块停留时长</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="edit" style="width:800px;margin: 15px;float:left">
            <el-input type="textarea" placeholder="请输入内容"  v-model="value" style="width:90%;margin-left: 5%"></el-input>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    }
}
</script>

<style>

</style>
