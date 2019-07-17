<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="handlechange">
      <el-option v-for="item in options" :key="item.id" :label="item.typeName" :value="item.typeName">
      </el-option>
    </el-select>
    <div class="sort">
      <el-input v-model="sortId" placeholder="排序"></el-input>
      <el-input v-model="beSortId" placeholder="被排序"></el-input>
      <el-button type="primary" @click="sort">排序</el-button>
    </div>
    <el-table ref="tab" row-key="id"  :data="tableData" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="typeName" label="标题" width="180">
      </el-table-column>
      <el-table-column label="图片">
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        options: [],
        tableData: [],
        sortId: '',
        beSortId: ''
      }
    },
    created() {
      this.getClassification()
    },
    mounted() {
        // const el = this.$refs.tab.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        // new Sortable(el, {
        //     animation: 150,
        //     onEnd: evt => {
        //         this.$api.ClassificationManagement.ChangeCategorySort(data => {
        //             this.check()
        //         }, {
        //             beSort: this.tableData[evt.oldIndex].sort,
        //             beSortId: this.tableData[evt.oldIndex].id,
        //             sort: this.tableData[evt.newIndex].sort,
        //             sortId: this.tableData[evt.newIndex].id
        //         })
        //     }
        // })
    },
    methods: {
      getClassification() {
        this.$api.ClassificationManagement.QueryClassification(data => {
          this.options = data
        }, {
          id: 0
        })
      },
      handlechange() {
        this.check()
      },
      check() {
        const id = this.options.filter(item => {
            if(item.typeName == this.value) {
                return item
            }
        })
        this.$api.ClassificationManagement.QueryClassification(data => {
            this.tableData = data
        }, {
            id: id[0].id
        })
      },
      sort() {
        var sortValue = this.sortId
        var beSortValue = this.beSortId
        console.log(this.tableData)
        var sortItem = this.tableData.filter(item => {
          if(item.id == sortValue) {
            return item
          }
        })
        var beSortItem = this.tableData.filter(item => {
          if(item.id == beSortValue) {
            return item
          }
        })
        this.$api.ClassificationManagement.ChangeCategorySort(data => {
            this.check()
            this.sortId = ''
            this.beSortId = ''
        }, {
            beSort: beSortItem[0].sort,
            beSortId: beSortItem[0].id,
            sort: sortItem[0].sort,
            sortId: sortItem[0].id
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .sort {
    float: right;
    display: flex;
    .el-input{
      margin: 0 4px;
    }
  }
</style>
