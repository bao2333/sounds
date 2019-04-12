webpackJsonp([22],{jbQX:function(i,e){},"r+71":function(i,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"update",data:function(){return{dialogVisible:!1,detailsShow:!0,androidUrl:"",iosUrl:"",addAndroidShow:!0,addIosShow:!0,add:{androidBanben:"",androidUrl:"",androidDetails:"",iosBanben:"",iosUrl:"",iosDetails:""},iosData:[],androidData:[],banbenDetail:"",openDate:"",history:"",setType:null,inputText:""}},created:function(){this.getInformation()},mounted:function(){},methods:{getInformation:function(){var i=this;this.$api.set.banben_list(function(e){console.log(e),e.map(function(e){e.map(function(t){0==t.appType&&(i.androidData=e,i.androidUrl=t.downloadLink),1==t.appType&&(i.iosData=e,i.iosUrl=t.downloadLink)})})})},copyUrl:function(i){var e=document.getElementById(i.id),t=document.activeElement;e.focus(),e.setSelectionRange(0,e.value.length),document.execCommand("copy",!0)&&this.$message({type:"success",message:"已成功复制到剪贴板"}),t.focus()},getDetails:function(i){this.banbenDetail=i.updateDetail,this.openDate=i.openDate,this.history=i.history,this.setType=null,this.detailsShow=!0},setDetails:function(i){this.setType=i,this.detailsShow=!1},AddPost:function(i){var e=this;this.$api.set.banben_add(function(){e.getInformation(),e.$notify({type:"success",message:"添加新版本成功!",title:"成功"})},{appType:i,verInfo:0==i?this.add.androidBanben:1==i?this.add.iosBanben:"",downloadLink:0==i?this.add.androidUrl:1==i?this.add.iosUrl:"",updateDetail:0==i?this.add.androidDetails:1==i?this.add.iosDetails:""})},deleteBanben:function(i){var e=this;this.$confirm("确定要删除此版本记录吗?","提示",{confirmButtonText:"狠心删除",cancelButtonText:"取消",type:"warning"}).then(function(){e.$api.set.banben_delete(function(){e.getInformation(),e.$notify({type:"success",message:"删除成功!",title:"成功"})},{id:i})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},showOrfalse:function(i){0===i?this.addAndroidShow=!1:1===i&&(this.addIosShow=!1)},cancelAdd:function(i){0===i?this.addAndroidShow=!0:1===i&&(this.addIosShow=!0)},forceUpdate:function(){var i=this;this.$confirm("此操作将强制更新, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$api.set.banben_add(function(e){console.log(e),i.$message({type:"success",message:"强制更新成功!"})},{updateType:1})}).catch(function(){i.$message({type:"info",message:"已取消强制更新"})})}}},a=t("XyMi");var s=function(i){t("jbQX")},o=Object(a.a)(n,function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div",[t("header",[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",{attrs:{to:{path:""}}},[i._v("系统设置")]),i._v(" "),t("el-breadcrumb-item",{staticClass:"now_page"},[i._v("升级维护")])],1)],1),i._v(" "),t("section",{staticClass:"android_app"},[t("h3",[i._v("安卓APP")]),i._v(" "),t("div",{staticClass:"details"},[t("ul",[i._l(i.androidData,function(e,n){return t("li",{key:n},[t("span",[i._v("最新版本："+i._s(e.verInfo))]),i._v("\n                    链接："),t("input",{attrs:{size:"mini",id:e.id},domProps:{value:e.downloadLink}}),i._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){i.copyUrl(e)}}},[i._v("复制链接")]),i._v(" "),t("div",{staticStyle:{"margin-left":"15px"}},[i._v("\n                        状态:"),t("span"),i._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){i.forceUpdate()}}},[i._v("是否强制更新")]),i._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){i.deleteBanben(e.id)}}},[i._v("删除")]),i._v(" "),t("el-button",{staticStyle:{"font-size":"16px","margin-right":"15px"},attrs:{size:"mini",type:"text"},on:{click:function(t){i.dialogVisible=!0,i.getDetails(e)}}},[i._v("更新详情>")])],1)],1)}),i._v(" "),t("li",[t("div",{directives:[{name:"show",rawName:"v-show",value:i.addAndroidShow,expression:"addAndroidShow"}],staticClass:"add_show",on:{click:function(e){i.showOrfalse(0)}}},[t("i",{staticClass:"el-icon-plus"})]),i._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!i.addAndroidShow,expression:"!addAndroidShow"}],staticClass:"add_banben"},[t("span",[i._v("最新版本："),t("el-input",{attrs:{size:"mini"},model:{value:i.add.androidBanben,callback:function(e){i.$set(i.add,"androidBanben",e)},expression:"add.androidBanben"}})],1),i._v(" "),t("span",[i._v("链接："),t("el-input",{attrs:{size:"mini"},model:{value:i.add.androidUrl,callback:function(e){i.$set(i.add,"androidUrl",e)},expression:"add.androidUrl"}})],1),i._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){i.dialogVisible=!0,i.setDetails(0)}}},[i._v("版本更新详情设置")]),i._v(" "),t("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){i.cancelAdd(0)}}}),i._v(" "),t("i",{staticClass:"el-icon-circle-check-outline",on:{click:function(e){i.AddPost(0)}}})],1)])],2)])]),i._v(" "),t("section",{staticClass:"ios_app"},[t("h3",[i._v("苹果APP")]),i._v(" "),t("div",{staticClass:"details"},[t("ul",[i._l(i.iosData,function(e,n){return t("li",{key:n},[t("span",[i._v("最新版本："+i._s(e.verInfo))]),i._v("\n                    链接："),t("input",{attrs:{size:"mini",id:e.id},domProps:{value:e.downloadLink}}),i._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){i.copyUrl(e)}}},[i._v("复制链接")]),i._v(" "),t("el-button",{staticStyle:{"font-size":"16px","margin-right":"15px"},attrs:{size:"mini",type:"text"},on:{click:function(t){i.dialogVisible=!0,i.getDetails(e)}}},[i._v("更新详情>")]),i._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){i.deleteBanben(e.id)}}},[i._v("删除")])],1)}),i._v(" "),t("li",[t("div",{directives:[{name:"show",rawName:"v-show",value:i.addIosShow,expression:"addIosShow"}],staticClass:"add_show",on:{click:function(e){i.showOrfalse(1)}}},[t("i",{staticClass:"el-icon-plus"})]),i._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!i.addIosShow,expression:"!addIosShow"}],staticClass:"add_banben"},[t("span",[i._v("最新版本："),t("el-input",{attrs:{size:"mini"},model:{value:i.add.iosBanben,callback:function(e){i.$set(i.add,"iosBanben",e)},expression:"add.iosBanben"}})],1),i._v(" "),t("span",[i._v("链接："),t("el-input",{attrs:{size:"mini"},model:{value:i.add.iosUrl,callback:function(e){i.$set(i.add,"iosUrl",e)},expression:"add.iosUrl"}})],1),i._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){i.dialogVisible=!0,i.setDetails(1)}}},[i._v("版本更新详情设置")]),i._v(" "),t("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){i.cancelAdd(1)}}}),i._v(" "),t("i",{staticClass:"el-icon-circle-check-outline",on:{click:function(e){i.AddPost(1)}}})],1)])],2)])]),i._v(" "),t("el-dialog",{attrs:{title:"更新详情",visible:i.dialogVisible,width:"30%"},on:{"update:visible":function(e){i.dialogVisible=e}}},[0==i.setType?t("div",[t("p",[i._v("安卓版本详情：")]),i._v(" "),t("el-input",{attrs:{type:"textarea"},model:{value:i.add.androidDetails,callback:function(e){i.$set(i.add,"androidDetails",e)},expression:"add.androidDetails"}})],1):1==i.setType?t("div",[t("p",[i._v("苹果版本详情：")]),i._v(" "),t("el-input",{attrs:{type:"textarea"},model:{value:i.add.iosDetails,callback:function(e){i.$set(i.add,"iosDetails",e)},expression:"add.iosDetails"}})],1):i._e(),i._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:i.detailsShow,expression:"detailsShow"}]},[t("p",[i._v("发布时间: "),t("span",[i._v(i._s(i._f("moment")(new Date(i.openDate),"YYYY-MM-DD")))])]),i._v(" "),t("p",[i._v("版本详情: "),t("span",[i._v(i._s(i.banbenDetail))])]),i._v(" "),t("p",[i._v("版本类型: "),t("span",[i._v(i._s(0==i.history?"历史版本":1==i.history?"最新版本":""))])])])])],1)},[],!1,s,"data-v-7c429bc1",null);e.default=o.exports}});