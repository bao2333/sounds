webpackJsonp([44],{"1ROq":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"labelSound",data:function(){return{show_label:!0,newValue:"",arrs:[],anOptionalTag:"",hotNum:""}},created:function(){this.getList(),this.getHotNum()},mounted:function(){},methods:{getList:function(){var t=this;this.$api.label.label_list(function(e){t.arrs=e})},showHot:function(t){this.$api.label.label_hot(function(){t.hot=!t.hot},{id:t.id})},showNoHot:function(t){this.$api.label.label_cancelHot(function(){t.hot=!t.hot},{id:t.id})},close_label:function(t,e){var a=this;this.$confirm("确定要删除 "+e+" 标签吗?","提示",{confirmButtonText:"狠心删除",cancelButtonText:"取消",type:"warning"}).then(function(){a.$api.label.label_delete(function(){a.getList(),a.$notify({type:"success",message:"删除标签成功！",title:"成功"})},{id:t})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},add_label:function(){this.show_label=!1,this.newValue=""},disappear:function(){var t=this;this.show_label=!0,""!==this.newValue&&this.$confirm("确定添加 "+this.newValue+" 为新标签吗?","提示",{confirmButtonText:"添加",cancelButtonText:"取消",type:"warning"}).then(function(){t.$api.label.label_add(function(){t.getList(),t.$notify({type:"success",message:"添加标签成功！",title:"成功"})},{name:t.newValue})}).catch(function(){t.$message({type:"info",message:"已取消添加"})})},getHotNum:function(){var t=this;this.$api.label.hot_num(function(e){t.anOptionalTag=e.anOptionalTag})},editorHotNum:function(){var t=this;this.$api.label.hot_num_editor(function(){t.$notify({title:"成功",type:"success",message:"修改hot数量成功！"}),t.getHotNum(),t.hotNum=""},{anOptionalTag:parseInt(this.hotNum)})}}},i=a("XyMi");var o=function(t){a("4C3H")},s=Object(i.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",[a("transition-group",{attrs:{name:"fade"}},t._l(t.arrs,function(e){return a("div",{key:e.id,staticClass:"label"},[a("div",{staticClass:"label_item"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"item.name"}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(a){a.target.composing||t.$set(e,"name",a.target.value)}}}),t._v(" "),a("i",{staticClass:"ion ion-md-close align-middle",on:{click:function(a){t.close_label(e.id,e.name)}}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0==e.hot,expression:"item.hot==0?true:false"}],staticClass:"hot_jh",on:{click:function(a){t.showHot(e)}}},[t._v("激活")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0==!e.hot,expression:"!item.hot==0?true:false"}],staticClass:"hot",on:{click:function(a){t.showNoHot(e)}}})])])}),0),t._v(" "),a("div",{staticClass:"add_label",on:{click:t.add_label}},[a("p",{directives:[{name:"show",rawName:"v-show",value:t.show_label,expression:"show_label"}]},[t._v("+")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newValue,expression:"newValue"},{name:"show",rawName:"v-show",value:!t.show_label,expression:"!show_label"}],attrs:{type:"text",placeholder:"新增标签"},domProps:{value:t.newValue},on:{blur:function(e){t.disappear()},input:function(e){e.target.composing||(t.newValue=e.target.value)}}})])],1),t._v(" "),a("footer",[a("p",[t._v("当前用户可选："),a("span",[a("span",{staticStyle:{"font-size":"16px",color:"red","font-weight":"bold"}},[t._v(t._s(t.anOptionalTag))]),t._v(" 个可选（注册时可选数量）")])]),t._v(" "),a("p",[t._v("用户可选设置："),a("el-input",{attrs:{placeholder:"请输入1-15的数字",size:"mini"},model:{value:t.hotNum,callback:function(e){t.hotNum=e},expression:"hotNum"}}),t._v("个")],1),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.editorHotNum()}}},[t._v("修改")])],1)])},[],!1,o,"data-v-0b0c270a",null);e.default=s.exports},"4C3H":function(t,e){}});