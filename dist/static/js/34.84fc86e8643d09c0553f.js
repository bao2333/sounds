webpackJsonp([34],{"3HyY":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"editorInformation",data:function(){return{articleContent:"",editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{size:["small",!1,"large","huge"]}],[{color:["#000"]},{background:[]}],["clean"],[{align:[]},"image"]]},placeholder:"请输入文章内容 ..."},radio:"1",push:"2"}},created:function(){document.onkeydown=function(t){if(13==window.event.keyCode)return!1}},methods:{}},o=a("XyMi");var l=function(t){a("aMBa")},r=Object(o.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("header",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/information/official"}}},[t._v("官方消息")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/information/activity"}}},[t._v("推动活动")]),t._v(" "),a("el-breadcrumb-item",{staticClass:"now_page"},[t._v("编辑动态")])],1)],1),t._v(" "),a("section",[a("h3",[t._v("编辑动态")]),t._v(" "),a("div",{staticClass:"edit",staticStyle:{"margin-top":"15px"}},[a("quill-editor",{ref:"textEditor",attrs:{options:t.editorOption},model:{value:t.articleContent,callback:function(e){t.articleContent=e},expression:"articleContent"}}),t._v(" "),a("div",{staticClass:"check_radio"},[a("p",[t._v("选择用户类型：")]),t._v(" "),a("div",{staticClass:"radio_type"},[a("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("所有男性用户")]),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("所有女性用户")]),t._v(" "),a("el-radio",{attrs:{label:"3"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("所有大V用户")]),t._v(" "),a("el-radio",{attrs:{label:"4"},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("所有新秀用户")])],1),t._v(" "),a("p",[t._v("选择推送方式：")]),t._v(" "),a("div",{staticClass:"radio_type"},[a("el-radio",{attrs:{label:"1"},model:{value:t.push,callback:function(e){t.push=e},expression:"push"}},[t._v("短信推送")]),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.push,callback:function(e){t.push=e},expression:"push"}},[t._v("手机push推送")])],1)]),t._v(" "),a("div",{staticClass:"buttonPost"},[a("el-button",{staticClass:"quxiao",on:{click:function(e){t.$router.push({name:"informationActivity"})}}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"submitActivity"},[t._v("提交")])],1)],1)])])},[],!1,l,"data-v-4cc501fc",null);e.default=r.exports},aMBa:function(t,e){}});