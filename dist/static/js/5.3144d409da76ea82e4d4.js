webpackJsonp([5],{BXtg:function(t,a){},qUVB:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("XyMi");var s=function(t){e("BXtg"),e("xw+o")},o=Object(i.a)({name:"about",data:function(){return{loading:!1,aboutData:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.loading=!0,this.$api.set.about_list(function(a){t.loading=!1,t.aboutData=a})}}},function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{overflow:"hidden"}},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:""}}},[t._v("系统设置")]),t._v(" "),i("el-breadcrumb-item",{staticClass:"now_page"},[t._v("关于我们")])],1),t._v(" "),i("el-button",{staticStyle:{margin:"20px 0"},attrs:{type:"primary",size:"small"},on:{click:function(a){t.$router.push({name:"editorAbout"})}}},[t._v("编辑关于我们")]),t._v(" "),i("div",{staticClass:"set_about"},[i("h3",[t._v("关于我们")]),t._v(" "),i("img",{attrs:{src:e("k4dp"),alt:"",width:"100",height:"100"}}),t._v(" "),i("div",{staticClass:"about_article",domProps:{innerHTML:t._s(t.aboutData.aboutUs)}}),t._v(" "),i("div",{staticClass:"about_footer"},[i("p",[t._v("客服热线："),i("span",[t._v(t._s(t.aboutData.customerServiceHotline))])]),t._v(" "),i("p",[t._v("联系地址："),i("span",[t._v(t._s(t.aboutData.contactAddress))])]),t._v(" "),i("h4",[t._v(t._s(t.aboutData.businessName))])])])],1)},[],!1,s,"data-v-4ebfc041",null);a.default=o.exports},"xw+o":function(t,a){}});