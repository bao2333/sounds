webpackJsonp([6],{"K6+x":function(t,e){},M551:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("/Z0X");var n=a("XyMi");var i=function(t){a("tXHP"),a("K6+x")},o=Object(n.a)({name:"activity",data:function(){return{officalData:[],size:null,count:null,total:null,page:1}},created:function(){this.getList()},methods:{handleCurrentChange:function(t){this.page=t,this.getList()},getList:function(){var t=this,e=this.page;this.$api.find.activity_list(function(e){t.officalData=e.data,e.data.map(function(e){t.$ajax.get("http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/"+e.content).then(function(t){e.content=t.data})}),t.count=e.pageNum.pageSize,t.total=e.pageNum.total,t.size=e.pageNum.pages},{pageNum:e})},deleteInformation:function(t){var e=this;this.$confirm("确定要删除该条消息吗?","提示",{confirmButtonText:"狠心删除",cancelButtonText:"取消",type:"warning"}).then(function(){e.$api.find.activity_delete(function(){e.getList(),e.$notify({type:"success",message:"删除推送消息成功!",title:"成功"})},{id:t})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}}},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("header",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/information/official"}}},[t._v("官方消息")]),t._v(" "),a("el-breadcrumb-item",{staticClass:"now_page"},[t._v("推动活动")])],1)],1),t._v(" "),a("main",[a("h3",[t._v("消息列表")]),t._v(" "),t._l(t.officalData,function(e,n){return a("article",{key:n},[a("div",{staticClass:"article_header"},[a("p",[a("img",{staticStyle:{"margin-right":"10px"},attrs:{src:t.$oss.url+e.icon,alt:"",width:"40",height:"40"}}),t._v("\n          "+t._s(e.title)+"\n        ")]),t._v(" "),a("i",{staticClass:"el-icon-delete avatar-uploader-icon deleteIcon",on:{click:function(a){t.deleteInformation(e.id)}}})]),t._v(" "),a("div",{staticClass:"article_p",domProps:{innerHTML:t._s(e.content)}}),t._v(" "),a("div",[a("p",{staticClass:"footer_p"},[a("i",[t._v(t._s(t._f("moment")(new Date(e.create_time),"YYYY-MM-DD HH:mm:ss")))])])])])}),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right","margin-top":"15px","margin-right":"5%"}},[a("el-pagination",{attrs:{layout:"total,prev, pager, next","page-size":t.size,background:"","page-count":t.count,total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-button",{staticClass:"add_article",on:{click:function(e){t.$router.push({name:"informationAdd"})}}},[t._v("新增动态")])],2)])},[],!1,i,"data-v-4e4730e4",null);e.default=o.exports},tXHP:function(t,e){}});