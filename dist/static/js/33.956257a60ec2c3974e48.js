webpackJsonp([33],{"H/Qi":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],["clean"],[{align:[]},"image"]]},placeholder:"请输入消息内容 ..."},articleContent:""}},created:function(){this.getArticle(),document.onkeydown=function(t){if(13==window.event.keyCode)return!1}},methods:{getArticle:function(){var t=this;this.$api.set.yinsi_list(function(e){t.loading=!1,t.protocolOfUsage=e.protocolOfUsage,t.privacyPolicy=e.privacyPolicy,1==t.$route.params.type?t.articleContent=t.protocolOfUsage:2==t.$route.params.type&&(t.articleContent=t.privacyPolicy)})},submitArticle:function(){var t=this;this.$api.set.yinsi_editor(function(){t.$notify({type:"success",message:"修改成功!",title:"成功"}),t.$router.push({path:"/set/privacy"})},{protocolOfUsage:1==this.$route.params.type?this.articleContent:this.protocolOfUsage,privacyPolicy:1==this.$route.params.type?this.privacyPolicy:this.articleContent})}}},o=i("XyMi");var r=function(t){i("NZAt")},s=Object(o.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/set/privacy"}}},[t._v("隐私和协议")]),t._v(" "),1==this.$route.params.type?i("el-breadcrumb-item",{staticClass:"now_page"},[t._v("用户使用协议")]):t._e(),t._v(" "),2==this.$route.params.type?i("el-breadcrumb-item",{staticClass:"now_page"},[t._v("觅语隐私条款")]):t._e()],1)],1),t._v(" "),i("div",{staticClass:"edit",staticStyle:{"margin-top":"15px"}},[i("quill-editor",{ref:"textEditor",staticStyle:{width:"70%",margin:"15px auto",height:"auto"},attrs:{options:t.editorOption},model:{value:t.articleContent,callback:function(e){t.articleContent=e},expression:"articleContent"}})],1),t._v(" "),i("el-button",{staticClass:"submitBtn",attrs:{size:"small"},on:{click:function(e){t.submitArticle()}}},[t._v("保存")])],1)},[],!1,r,"data-v-554bb212",null);e.default=s.exports},NZAt:function(t,e){}});