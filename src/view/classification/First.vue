<template>
  <div>
    <div class="box-top">
      <ul class="labelList">
        <router-link to="" tag="li" v-for="(item, index) in 50" :key="index">
          标签的内容
        </router-link>
        <li class="list-last">
          <el-button type="primary" icon="el-icon-plus" circle @click="add"></el-button>
        </li>
      </ul>
    </div>
    <el-dialog title="添加分类" :visible.sync="centerDialogVisible" width="30%" center>
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false
      }
    },
    methods: {
      add() {
        this.centerDialogVisible = true
        console.log("11111")
      }
    }
  }

</script>

<style lang="scss" scoped>
  .box-top {
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    border-bottom: 1px solid black;

    .labelList {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0 5px;

      li {
        margin: 5px 10px;
        line-height: 41px;
      }
    }
  }

</style>
