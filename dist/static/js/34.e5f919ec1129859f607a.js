webpackJsonp([34],{"7C1M":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"shenfenshenhe",data:function(){return{dialogVisible:!1,loading:!1,status:"",tableData:[],page:1,total:null,size:null,search:{status:"0"},imgUrl:""}},created:function(){this.getList()},methods:{handleCurrentChange:function(t){this.page=t,this.getList()},getList:function(){var t=this;this.loading=!0;var e=this.page;this.$api.money.shenfen_list(function(e){t.loading=!1,t.tableData=e.data,t.size=e.pageInfo.pageSize,t.total=e.pageInfo.total},{pageNum:e,auditResult:""==this.search.status?null:parseInt(this.search.status)})},handleClick:function(t,e){var a=this;this.$api.money.shenfen_check(function(){a.getList(),a.$notify({type:"success",title:"成功",message:"审核成功！"})},{id:t.id,userId:t.userId,auditResult:parseInt(e)}),console.log(id,e)},selsecImg:function(t){this.imgUrl=t}}},s=a("XyMi");var i=function(t){a("9Cjd")},n=Object(s.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{name:""}}},[t._v("财务管理")]),t._v(" "),a("el-breadcrumb-item",{staticClass:"now_page"},[t._v("身份审核")])],1),t._v(" "),a("section",[a("div",{staticStyle:{"margin-top":"15px"}},[a("el-select",{staticClass:"searchitem",attrs:{placeholder:"请选择审核状态",clearable:"",size:"small"},model:{value:t.search.status,callback:function(e){t.$set(t.search,"status",e)},expression:"search.status"}},[a("el-option",{attrs:{label:"等待审核",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"审核通过",value:"1"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.getList()}}},[t._v("搜索")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%","margin-top":"15px"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"序号",align:"center",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"提交时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("moment")(new Date(e.row.createTime),"YYYY-MM-DD HH:mm:ss")))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"用户名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"身份证面",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{cursor:"pointer"},attrs:{src:t.$oss.url+e.row.frontOfIdCard,alt:"",width:"120",height:"100"},on:{click:function(a){t.dialogVisible=!0,t.selsecImg(e.row.frontOfIdCard)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"身份背面",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{cursor:"pointer"},attrs:{src:t.$oss.url+e.row.backOfIdCard,alt:"",width:"120",height:"100"},on:{click:function(a){t.dialogVisible=!0,t.selsecImg(e.row.backOfIdCard)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(0==e.row.auditResult?"等待审核":1==e.row.auditResult?"审核通过":2==e.row.auditResult?"审核不通过":"")+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核操作",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1!==e.row.auditResult?a("el-button",{staticClass:"shenheBtn",attrs:{type:"success",size:"mini"},on:{click:function(a){t.handleClick(e.row,1)}}},[t._v("通过")]):t._e(),t._v(" "),2!==e.row.auditResult?a("el-button",{staticClass:"shenheBtn",staticStyle:{"margin-left":"0"},attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleClick(e.row,2)}}},[t._v("不通过")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right","margin-top":"15px"}},[a("el-pagination",{attrs:{layout:"total,prev, pager, next","page-size":t.size,background:"","page-count":1,total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"图片审核",visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{src:t.$oss.url+t.imgUrl,alt:"",width:"100%"}})])],1)},[],!1,i,"data-v-3559f87a",null);e.default=n.exports},"9Cjd":function(t,e){}});