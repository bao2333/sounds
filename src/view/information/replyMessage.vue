<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '' }">消息管理</el-breadcrumb-item>
        <el-breadcrumb-item class="now_page">消息回复</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="reply">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="item" :name="index" v-for="(item, index) in replyList" :key="index">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          replyList: [1,2,3],
          activeName: '1'
      }
    },
    created() {

    },
    methods: {
        
    }
  }

</script>

<style lang="less" scoped>
    .reply {
        margin-top: 50px;
        width: 50%;
    }
</style>
