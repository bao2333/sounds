<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/burying/nikkatsu' }">用户分析</el-breadcrumb-item>
            <el-breadcrumb-item class="now_page">短信群发</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="send">
            <el-button type="primary" plain @click="sendMsg()">
                短信群发
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        sendMsg() {
            this.$api.userAnalysis.sendMsg(data => {
                console.log(data)
                this.$notify({
                    title: '成功',
                    message: '短信群发成功',
                    type: 'success'
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .send {
        margin-top: 30px;
    }
</style>
