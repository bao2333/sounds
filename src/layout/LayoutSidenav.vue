<template>
  <sidenav :orientation="orientation" :class="curClasses">
    <!-- Brand demo (see src/demo.css) -->
    <div class="app-brand demo" v-if="orientation !== 'horizontal'" style="margin-top: 15px">
      <span class="app-brand-logo demo ">
        <img src="/static/imgs/logo@2x.jpg" alt="" width="42" height="42" >
      </span>
      <router-link to="/users/list" class="app-brand-text demo sidenav-text font-weight-normal ml-2" style="font-size: 22px;"><span style="margin-left: 15px;font-weight:bold">Sounds</span></router-link>
      <a href="javascript:void(0)" class="layout-sidenav-toggle sidenav-link text-large ml-auto" @click="toggleSidenav()">
        <i class="ion ion-md-menu align-middle"></i>
      </a>
    </div>
    <!--<div class="sidenav-divider mt-0" v-if="orientation !== 'horizontal'"></div>-->
    <!-- Inner -->
    <div class="sidenav-inner" :class="{ 'py-1': orientation !== 'horizontal' }">
      <sidenav-menu icon="ion ion-ios-happy" :active="isMenuActive('/users')" :open="isMenuOpen('/users')">
        <template slot="link-text">用户管理</template>
        <sidenav-router-link  to="/users/list" :exact="true">统计列表</sidenav-router-link>
        <sidenav-router-link  to="/users/record" :exact="true">档案搜索</sidenav-router-link>
        <sidenav-router-link  to="/users/personalFile" :exact="true" v-if="$route.name == 'userPersonalFile'">个人档案</sidenav-router-link>
        <sidenav-router-link  to="/users/head" :exact="true">头像设置</sidenav-router-link>
        <sidenav-router-link  to="/users/newv" :exact="true">新秀/大V</sidenav-router-link>
        <sidenav-router-link  to="/users/home" :exact="true" v-if="$route.name == 'userHome'">个人主页</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-pulse" :active="isMenuActive('/label')" :open="isMenuOpen('/label')">
        <template slot="link-text">标签秀音管理</template>
        <sidenav-router-link  to="/label/sound" :exact="true">标签库</sidenav-router-link>
        <sidenav-router-link  to="/label/type" :exact="true">秀音类目</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-musical-notes" :active="isMenuActive('/deal')" :open="isMenuOpen('/deal')">
        <template slot="link-text">交易商城和语音</template>
        <sidenav-router-link  to="/deal/pourOutFa" :exact="true">倾诉（发标）</sidenav-router-link>
        <sidenav-router-link  to="/deal/pourOutJie" :exact="true">倾诉（接标）</sidenav-router-link>
         <sidenav-router-link  to="/deal/soundStore" :exact="true">审核商城</sidenav-router-link>
        <sidenav-router-link  to="/deal/soundAudit" :exact="true">查阅商城</sidenav-router-link>
        <sidenav-router-link  to="/deal/personal" :exact="true">个人介绍</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-disc" :active="isMenuActive('/discover')" :open="isMenuOpen('/discover')" >
        <template slot="link-text">发现管理</template>
        <sidenav-router-link  to="/discover/official" :exact="true">官方动态</sidenav-router-link>
        <sidenav-router-link  to="/discover/editor" :exact="true" v-if="$route.name == 'discoverEditor'">编辑动态</sidenav-router-link>
        <sidenav-router-link  to="/discover/userRecordingManagement" :exact="true">用户录音管理</sidenav-router-link>
        <sidenav-router-link  to="/discover/audit" :exact="true">用户文章管理</sidenav-router-link>
        <sidenav-router-link  to="/discover/search" :exact="true">查询分类</sidenav-router-link>
        <sidenav-router-link  to="/discover/searchdefault" :exact="true">查询默认分类</sidenav-router-link>
      </sidenav-menu>
      <sidenav-router-link  icon="ion ion-ios-card" :to="{name:'MoneyShenfenshenhe'}" >身份审核</sidenav-router-link>
      <sidenav-menu icon="ion ion-md-information-circle-outline" :active="isMenuActive('/information')" :open="isMenuOpen('/information')">
        <template slot="link-text">消息管理</template>
        <sidenav-router-link  to="/information/official" :exact="true">官方消息</sidenav-router-link>
        <sidenav-router-link  to="/information/activity" :exact="true">推送活动</sidenav-router-link>
        <sidenav-router-link  to="/information/reply" :exact="true">消息回复</sidenav-router-link>
        <sidenav-router-link  to="/information/activity" :exact="true"  v-if="$route.name == 'informationAdd'">新增活动</sidenav-router-link>
        <sidenav-router-link  to="/information/rollingBroadcast" :exact="true">滚动广播</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-bowtie" :active="isMenuActive('/money')" :open="isMenuOpen('/money')">
        <template slot="link-text">财务管理</template>
        <sidenav-router-link  to="/money/tixianshoufei" :exact="true">提现收费</sidenav-router-link>
        <sidenav-router-link  to="/money/userCard" :exact="true">用户账单</sidenav-router-link>
        <sidenav-router-link  to="/money/caiwuCard" :exact="true">财务账单</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-logo-freebsd-devil" :active="isMenuActive('/report')" :open="isMenuOpen('/report')">
        <template slot="link-text">举报管理</template>
        <sidenav-router-link  to="/report/userReport" :exact="true">用户举报</sidenav-router-link>
        <sidenav-router-link  to="/report/userClose" :exact="true">查封账户</sidenav-router-link>
        <sidenav-router-link  to="/report/jubaoContent" :exact="true">举报内容设置</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-settings" :active="isMenuActive('/set')" :open="isMenuOpen('/set')">
        <template slot="link-text">系统设置</template>
        <sidenav-router-link  to="/set/opinion" :exact="true">意见反馈</sidenav-router-link>
        <sidenav-router-link  to="/set/shensu" :exact="true">申诉管理</sidenav-router-link>
        <sidenav-router-link  to="/set/about" :exact="true">关于我们</sidenav-router-link>
        <sidenav-router-link  to="/set/role" :exact="true" v-if="role == 1">角色管理</sidenav-router-link>
        <sidenav-router-link  to="/set/privacy" :exact="true">隐私和协议</sidenav-router-link>
        <sidenav-router-link  to="/set/update" :exact="true">升级维护</sidenav-router-link>
        <sidenav-router-link  to="/set/applePay" :exact="true">用户充值设置</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-heart" :active="isMenuActive('/page')" :open="isMenuOpen('/page')">
        <template slot="link-text">启动页管理</template>
        <sidenav-router-link  to="/page/start" :exact="true">启动页</sidenav-router-link>
        <sidenav-router-link  to="/page/yindao" :exact="true">引导页</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-contact" :active="isMenuActive('/adminpermission')" :open="isMenuOpen('/adminpermission')">
        <template slot="link-text">管理员权限</template>
        <sidenav-router-link  to="/admin/adminlist" :exact="true">统计列表</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-people" :active="isMenuActive('/burying')" :open="isMenuOpen('/burying')">
        <template slot="link-text">用户分析</template>
        <sidenav-router-link  to="/burying/nikkatsu" :exact="true">活跃用户</sidenav-router-link>
        <sidenav-router-link  to="/burying/staytime" :exact="true">群发短信</sidenav-router-link>
        <sidenav-router-link  to="/burying/average" :exact="true">埋点统计</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-rocket" :active="isMenuActive('/classification')" :open="isMenuOpen('/classification')">
        <template slot="link-text">动态分类界面</template>
        <sidenav-router-link  to="/classification/classifiedcontent" :exact="true">分类管理</sidenav-router-link>
        <!-- <sidenav-router-link  to="/classification/officialupload" :exact="true">音频分类管理</sidenav-router-link> -->
        <sidenav-router-link  to="/classification/homerecommendation" :exact="true">首页推荐管理</sidenav-router-link>
        <sidenav-router-link  to="/classification/secondsort" :exact="true">二级分类排序</sidenav-router-link>
        <sidenav-router-link  to="/classification/recommendedtoday" :exact="true">今日推荐</sidenav-router-link>
      </sidenav-menu>
      <sidenav-menu icon="ion ion-ios-pizza" :active="isMenuActive('/workclassify')" :open="isMenuOpen('/workclassify')">
        <template slot="link-text">作品分类管理</template>
        <sidenav-router-link  to="/workclassify/workcontent" :exact="true">作品,背景音,头像分类</sidenav-router-link>
        <!-- <sidenav-router-link  to="/workclassify/workshow" :exact="true">作品分类展示</sidenav-router-link> -->
        <sidenav-router-link  to="/workclassify/bgmusicshow" :exact="true">背景音分类展示</sidenav-router-link>
        <sidenav-router-link  to="/workclassify/like" :exact="true">猜你喜欢</sidenav-router-link>
      </sidenav-menu>
    </div>
  </sidenav>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'

export default {
  name: 'app-layout-sidenav',
  data(){
    return{
      role:window.localStorage.getItem('miyu.type')
    }
  },
  components: {
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
  },

  props: {
    orientation: {
      type: String,
      default: 'vertical'
    }
  },

  computed: {
    curClasses () {
      let bg = this.layoutSidenavBg

      if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
        bg = bg
          .replace(' sidenav-dark', '')
          .replace(' sidenav-light', '')
          .replace('-darker', '')
          .replace('-dark', '')
      }

      return `bg-${bg} ` + (
        this.orientation !== 'horizontal'
          ? 'layout-sidenav'
          : 'layout-sidenav-horizontal container-p-x flex-grow-0'
      )
    }
  },

  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },

    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },

    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    }
  }
}
</script>
<style>
  .bg-sidenav-theme .sidenav-item.active > .sidenav-link:not(.sidenav-toggle) {
    background-color:rgb(233, 116, 38);
  }
  .bg-sidenav-theme {
    background-color: #e3e4e8 !important;
    color: rgb(233, 116, 38);
  }
  .bg-sidenav-theme:hover .sidenav-text{
    color: rgb(233, 116, 38);
  }
  .bg-sidenav-theme .sidenav-text {
    color: #194180;
  }
  .bg-sidenav-theme .sidenav-item.open:not(.sidenav-item-closing) > .sidenav-toggle, .bg-sidenav-theme .sidenav-item.active > .sidenav-link {
    color: #194180;
  }
  .bg-sidenav-theme hr, .bg-sidenav-theme .sidenav-divider, .bg-sidenav-theme .sidenav-inner > .sidenav-item.open > .sidenav-menu::before {
    border-color: rgba(255, 64, 129,0.6) !important;
  }
  .bg-sidenav-theme .sidenav-link:hover, .bg-sidenav-theme .sidenav-link:focus, .bg-sidenav-theme .sidenav-horizontal-prev:hover, .bg-sidenav-theme .sidenav-horizontal-prev:focus, .bg-sidenav-theme .sidenav-horizontal-next:hover, .bg-sidenav-theme .sidenav-horizontal-next:focus {
    color: rgb(233, 116, 38);
  }
</style>
