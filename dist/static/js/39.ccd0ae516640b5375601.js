webpackJsonp([39],{I74s:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("/Z0X"),s={name:"yindao",data:function(){return{plusShow:!0,imgData:[],editorImg:"",imgArr:[]}},created:function(){},mounted:function(){this.getList()},methods:{getList:function(){var e=this;this.$api.qd.qd_img(function(t){e.imgData=t},{type:1})},cancel:function(){this.getList()},imgSubmit:function(){var e=this,t=[];this.imgData.forEach(function(e){t.push(e.coverResource)}),this.index&&t.splice(this.index,1,this.changeImg),this.$api.qd.yd_editor(function(){e.$notify({type:"success",message:"添加成功",title:"成功"}),e.getList(),e.editorImg="",e.imgArr=[]},{coverResource:t.concat(this.imgArr)})},deleteImg:function(e){var t=this;this.$confirm("确定要删除此引导页吗?","提示",{confirmButtonText:"狠心删除",cancelButtonText:"取消",type:"warning"}).then(function(){t.$api.qd.yd_del(function(){t.$notify({type:"success",message:"删除成功!",title:"删除成功"}),t.getList()},{id:e})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delAddImg:function(){this.editorImg=""},selectIcon1:function(e){this.$refs.item[e].click(),this.$refs.item[e].value=null},selectIcon:function(){this.$refs.iconfile.click(),this.$refs.iconfile.value=null},iconFileChange:function(e){var t=this,i=e.target.files[0];if(".png"!=!i.name.substring(i.name.lastIndexOf("."))){var s=new FileReader;s.onload=function(e){var s=e.target.result,a=new Image;a.onload=function(){a.width,a.height;t.$api.oss.update(function(e){new n.Wrapper({region:"oss-cn-hangzhou",accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.securityToken,bucket:"sounds-miyu"}).put(e.random,i).then(function(e){t.editorImg=e.name,t.imgArr.push(e.name),t.$notify({type:"success",message:"上传图片成功",title:"成功"})}).catch(function(e){console.error("error: %j",e)})},{})},a.src=s},s.readAsDataURL(i)}},iconFileChange1:function(e,t){var i=this,s=e.target.files[0];if(".png"!=!s.name.substring(s.name.lastIndexOf("."))){var a=new FileReader;a.onload=function(e){var a=e.target.result,c=new Image;c.onload=function(){c.width,c.height;i.$api.oss.update(function(e){new n.Wrapper({region:"oss-cn-hangzhou",accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.securityToken,bucket:"sounds-miyu"}).put(e.random,s).then(function(e){i.changeImg=e.name,i.index=t,i.imgData[t].coverResource=e.name,i.$notify({type:"success",message:"上传图片成功",title:"成功"})}).catch(function(e){console.error("error: %j",e)})},{})},c.src=a},a.readAsDataURL(s)}}}},a=i("XyMi");var c=function(e){i("y2CC")},o=Object(a.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("header",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{}}},[e._v("启动页管理")]),e._v(" "),i("el-breadcrumb-item",{staticClass:"now_page"},[e._v("引导页")])],1)],1),e._v(" "),i("div",{staticStyle:{"margin-top":"15px"}},[i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){e.cancel()}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.imgSubmit()}}},[e._v("修改")])],1),e._v(" "),i("section",[i("h4",[e._v("引导页")]),e._v(" "),e._l(e.imgData,function(t,n){return i("div",{key:n,staticClass:"imgItem"},[i("div",{staticClass:"add_head",on:{click:function(t){e.selectIcon1(n)}}},[i("img",{attrs:{src:e.$oss.url+t.coverResource,alt:"",width:"200"}}),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:e.plusShow,expression:"plusShow"}],staticClass:"el-icon-plus avatar-uploader-icon add"})]),e._v(" "),i("input",{ref:"item",refInFor:!0,staticStyle:{display:"none"},attrs:{accept:"image/jpeg, image/png",type:"file",name:"icon"},on:{change:function(t){e.iconFileChange1(t,n)}}}),e._v(" "),i("i",{staticClass:"el-icon-circle-close-outline avatar-uploader-icon delete",on:{click:function(i){e.deleteImg(t.id)}}})])}),e._v(" "),i("div",{staticClass:"imgItem"},[i("div",{staticClass:"add_head",on:{click:function(t){e.selectIcon()}}},[i("img",{attrs:{src:e.$oss.url+e.editorImg,alt:"",width:"200"}}),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:e.plusShow,expression:"plusShow"}],staticClass:"el-icon-plus avatar-uploader-icon add"})]),e._v(" "),i("input",{ref:"iconfile",staticStyle:{display:"none"},attrs:{accept:"image/jpeg, image/png",type:"file",name:"icon"},on:{change:e.iconFileChange}}),e._v(" "),i("i",{staticClass:"el-icon-circle-close-outline avatar-uploader-icon delete",on:{click:function(t){e.delAddImg()}}})])],2)])},[],!1,c,"data-v-2c0259d1",null);t.default=o.exports},y2CC:function(e,t){}});