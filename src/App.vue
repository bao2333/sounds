<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style src="@/vendor/styles/bootstrap.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-corporate.scss" lang="scss"></style>
<style src="@/vendor/styles/colors.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="./style.scss" lang="scss"></style>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Sounds后台管理系统',
    // titleTemplate: '%s - Vue Starter'
  },
  created(){

  },
  updated () {
    // Remove loading state
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
  }
}
</script>
<style lang="less">
  ul{
    li{
    list-style: none;
    }
  }
  *{
    margin: 0;
    padding: 0;
  }
  .el-loading-mask{
    z-index:0;
  }
  .el-button+.el-button {
    margin-left: 0px;
}
</style>
