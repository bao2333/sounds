webpackJsonp([29],{B2sl:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("/Z0X"),n={name:"userHead",data:function(){return{plusShow:!0,editor:{img:""},heads:[]}},created:function(){this.gethear()},methods:{close_head:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$api.user.delete_head(function(){t.gethear(),t.$notify({type:"success",message:"删除头像成功！",title:"成功"})},{id:e})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},gethear:function(){var e=this;this.$api.user.head(function(t){e.heads=t})},selectIcon:function(){this.$refs.iconFile.click(),this.$refs.iconFile.value=null},iconFileChange:function(e){var t=this,i=e.target.files[0];if(".png"!=!i.name.substring(i.name.lastIndexOf("."))){var n=new FileReader;n.onload=function(e){var n=e.target.result,a=new Image;a.onload=function(){a.width,a.height;t.$api.oss.update(function(e){new s.Wrapper({region:"oss-cn-hangzhou",accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.securityToken,bucket:"sounds-miyu"}).put(e.random,i).then(function(e){console.log(e),t.editor.img=e.name,t.plusShow=!1,t.$api.user.add_head(function(){t.gethear(),t.$notify({type:"success",message:"添加头像成功！",title:"成功"}),t.editor.img="",t.plusShow=!0},{url:t.editor.img})}).catch(function(e){console.error("error: %j",e)})},{})},a.src=n},n.readAsDataURL(i)}}}},a=i("XyMi");var o=function(e){i("ET5o")},c=Object(a.a)(n,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/users/list"}}},[e._v("用户管理")]),e._v(" "),i("el-breadcrumb-item",{staticClass:"now_page"},[e._v("头像设置")])],1),e._v(" "),e._m(0),e._v(" "),i("section",[i("transition-group",{attrs:{name:"fade"}},e._l(e.heads,function(t){return i("div",{key:t.id,staticClass:"section_box"},[i("img",{attrs:{src:e.$oss.url+t.url,alt:""}}),e._v(" "),i("i",{staticClass:"ion ion-md-close align-middle",on:{click:function(i){e.close_head(t.id)}}})])}),0),e._v(" "),i("div",{staticClass:"add_head",on:{click:e.selectIcon}},[i("img",{attrs:{src:e.$oss.url+e.editor.img,alt:"",width:"150",height:"150"}}),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:e.plusShow,expression:"plusShow"}],staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),i("input",{ref:"iconFile",staticStyle:{display:"none"},attrs:{accept:"image/jpeg,image/png",type:"file",name:"icon"},on:{change:e.iconFileChange}})],1)],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("header",[t("h3",[this._v("默认头像")])])}],!1,o,"data-v-66d24f48",null);t.default=c.exports},ET5o:function(e,t){}});