webpackJsonp([19],{"3O11":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),r=a("exGp"),i=a.n(r),l=a("Av7u"),o=a.n(l),c={name:"userList",data:function(){return{loading:!1,search:{time:"",item:"",account:"",sex:"",rank:""},tableData:[],userNums:{},page:1,total:null,size:null,pageSize:null}},created:function(){this.showList()},methods:{handleClick:function(e){this.showList()},handleCurrentChange:function(e){this.page=e,this.showList()},showList:function(){var e=this;return i()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,a=e.page,t.next=4,e.$api.user.tongji(function(t){e.loading=!1,e.userNums=t.userNums,e.tableData=t.newestUsers,e.total=t.pageInfo.total,e.pageSize=t.pageInfo.pages,e.size=t.pageInfo.pageSize},{pageNum:a,registerStart:e.search.time[0],registerEnd:e.search.time[1]});case 4:case"end":return t.stop()}},t,e)}))()},print:function(e){var t=this;return i()(s.a.mark(function a(){var n,r;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,window.localStorage.getItem("miyu.userId");case 2:return n=a.sent,a.next=5,window.localStorage.getItem("miyu.token");case 5:r=a.sent,0==e?t.$ajax.get("/user/userManagementStatisticalListPrint",{params:{pageNum:t.page,registerStart:""==t.search.time?null:t.search.time[0],registerEnd:""==t.search.time?null:t.search.time[1],token:o.a.enc.Base64.stringify(o.a.enc.Utf8.parse(n+":"+r))}}).then(function(e){var t=e.request.responseURL;window.location.href=t}).catch(function(e){console.log(e)}):1==e&&t.$ajax.get("/user/userManagementStatisticalListPrint",{params:{pageNum:null,registerStart:""==t.search.time?null:t.search.time[0],registerEnd:""==t.search.time?null:t.search.time[1],token:o.a.enc.Base64.stringify(o.a.enc.Utf8.parse(n+":"+r))}}).then(function(e){var t=e.request.responseURL;window.location.href=t}).catch(function(e){console.log(e)});case 7:case"end":return a.stop()}},a,t)}))()},changeRole:function(e){var t=this;this.userRow=0==e.role?"新秀":"大V",this.$confirm('<p>确定要改变此用户级别为<span style="color:red;font-size: 16px"> '+this.userRow+" </span>吗？</p>","提示",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"success"}).then(function(){t.$api.user.editor_user_role(function(){t.showList(),t.$notify({type:"success",message:"修改级别成功",title:"成功"})},{userId:e.id,role:0==e.role?1:1==e.role?0:null})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}}},u=a("XyMi");var p=function(e){a("JnjL")},m=Object(u.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"all_box"},[a("section",{staticClass:"section_head"},[a("ul",[a("li",[e._m(0),e._v(" "),a("p",{staticClass:"li_num"},[e._v(e._s(e.userNums.manNum))])]),e._v(" "),a("li",[a("p",[e._v("女生数")]),e._v(" "),a("p",{staticClass:"li_num"},[e._v(e._s(e.userNums.femaleNum))])]),e._v(" "),a("li",[a("p",[e._v("总人数")]),e._v(" "),a("p",{staticClass:"li_num"},[e._v(e._s(e.userNums.allNum))])]),e._v(" "),a("li",[a("p",[e._v("男：女占比")]),e._v(" "),a("p",{staticClass:"li_num"},[e._v(e._s(e.userNums.percentMale)+"% : "+e._s(e.userNums.percentageWomen)+"%")])])]),e._v(" "),a("hr")]),e._v(" "),a("section",{staticClass:"section_title"},[a("h3",[e._v("用户列表")]),e._v(" "),a("div",{staticClass:"search"},[a("el-date-picker",{staticClass:"searchTime",attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"small"},on:{change:e.handleClick},model:{value:e.search.time,callback:function(t){e.$set(e.search,"time",t)},expression:"search.time"}}),e._v(" "),a("el-button",{staticClass:"click_dangan",staticStyle:{"margin-left":"10px"},attrs:{size:"small",plain:""},on:{click:function(t){e.$router.push({name:"userRecord"})}}},[e._v(" 档案搜索")]),e._v(" "),a("el-button",{staticClass:"click_dangan",staticStyle:{"margin-left":"10px"},attrs:{size:"small",plain:""},on:{click:function(t){e.print(0)}}},[e._v(" 打印当前页")]),e._v(" "),a("el-button",{staticClass:"click_dangan",staticStyle:{"margin-left":"10px"},attrs:{size:"small",plain:""},on:{click:function(t){e.print(1)}}},[e._v(" 打印全部")])],1)]),e._v(" "),a("main",[a("el-table",{staticStyle:{width:"100%","margin-top":"15px"},attrs:{data:e.tableData,size:"small",border:""}},[a("el-table-column",{attrs:{prop:"id",label:"用户编号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"注册时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(e._f("moment")(new Date(t.row.createTime),"YYYY-MM-DD HH:mm:ss"))+"\n         ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"账户名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(0==t.row.sex?"女":1==t.row.sex?"男":"")+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"role",label:"级别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.changeRole(t.row)}}},[e._v(e._s(0==t.row.role?"大V":1==t.row.role?"新秀":""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"rechargeSheetSum",label:"充值",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"incomeWithdrewSum",label:"提现",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"查看档案",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(a){e.$router.push({name:"userPersonalFile",params:{userId:t.row.id}})}}},[e._v("查看档案")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right","margin-top":"15px"}},[a("el-pagination",{attrs:{layout:"total,prev, pager, next","page-size":e.size,background:"","page-count":e.pageSize,total:e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("span",[this._v("男生数")])])}],!1,p,"data-v-be148a3e",null);t.default=m.exports},JnjL:function(e,t){}});