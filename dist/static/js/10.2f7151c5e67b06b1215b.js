webpackJsonp([10],{"43pq":function(e,t){},HOLl:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("/Z0X"),o={name:"editor",data:function(){return{dialogVisible:!1,addImgShow:!1,videoShow:!0,audioShow:!0,imgShow:!0,plusShow:!0,editorImg:"",editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],["clean"],[{align:[]}]]},placeholder:"请输入文章内容 ..."},articleContent:"",type:"",labelName:"",imgs:[],fileList2:[],updateType:0,updateIndex:null,addImg:"",addVideo:"",addAudio:"",labelData:[],labelNameId:"",second:null,addTitle:""}},created:function(){this.getInfomation(),"add"==this.$route.query.methods&&this.getOfficalHead(),document.onkeydown=null},updated:function(){this.imgs&&(this.imgs.length>=4||0==this.imgs.length)&&(this.addImgShow=!1)},methods:{getInfomation:function(){this.articleContent=this.$route.params.article,this.updateType=this.$route.params.type,this.labelNameId=this.$route.params.labelId,this.updateType=this.$route.params.coverType,this.editorImg=this.$route.params.url,this.labelName=this.$route.params.label,this.addTitle=this.$route.params.title,"0"==this.$route.params.coverType?this.imgs=this.$route.params.imgs:"1"==this.$route.params.coverType?this.addVideo=this.$route.params.imgs[0]:"2"==this.$route.params.coverType&&(this.addAudio=this.$route.params.imgs[0]),void 0==this.$route.params.imgs&&(this.imgs=[]),"0"==this.type?(this.videoShow=!1,this.audioShow=!1):"1"==this.type?(this.imgShow=!1,this.audioShow=!1):"2"==this.type&&(this.imgShow=!1,this.videoShow=!1)},selectIcon:function(e,t){this.updateType=e,this.updateIndex=t,0==e?(this.$refs.iconFile.click(),this.$refs.iconFile.value=null,this.addImgShow=!0):1==e?(this.$refs.videoFile.click(),this.$refs.videoFile.value=null,this.addImgShow=!1):2==e?(this.$refs.audioFile.click(),this.$refs.audioFile.value=null):(this.$refs.iconFile.click(),this.$refs.iconFile.value=null)},iconFileChange:function(e){var t=this,i=e.target.files[0];if(".png"!=!i.name.substring(i.name.lastIndexOf("."))){var o=new FileReader;o.onload=function(e){e.target.result;t.$api.oss.update(function(e){new a.Wrapper({region:"oss-cn-hangzhou",accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.securityToken,bucket:"sounds-miyu"}).put(e.random,i).then(function(e){0==t.updateType?(t.addImg=e.name,t.imgs.push(t.addImg),t.addImg="",t.videoShow=!1,t.audioShow=!1):1==t.updateType?(t.addVideo=e.name,console.log(t.addVideo),t.addImgShow=!1,t.audioShow=!1):2==t.updateType?(t.addAudio=e.name,t.imgShow=!1,t.videoShow=!1):(t.editorImg=e.name,t.plusShow=!1)}).catch(function(e){console.error("error: %j",e)})},{})},o.readAsDataURL(i)}},deleteImg:function(e){this.imgs.splice(e,1),0==this.imgs.length&&(this.videoShow=!0,this.audioShow=!0)},deleteVideo:function(){this.addVideo="",""==this.addVideo&&(this.imgShow=!0,this.videoShow=!0,this.audioShow=!0)},deleteAudio:function(){this.addAudio="",""==this.addAudio&&(this.imgShow=!0,this.videoShow=!0,this.audioShow=!0)},editorPost:function(){var e=this;if(2==this.updateType){var t=document.getElementById("audio_duration");if(null!=t)t.load(),t.oncanplay=function(){e.$api.find.editor_dongtai(function(){e.$notify({type:"success",message:"修改动态成功！",title:"成功"}),e.$router.push({name:"discoverOfficial"})},{id:e.$route.params.id,label:e.labelNameId,content:e.articleContent,coverResources:0==e.updateType?e.imgs:1==e.updateType?e.addVideo.split(" "):2==e.updateType?e.addAudio.split(" "):null,second:parseInt(t.duration),coverType:e.updateType,officialName:""==e.addTitle?null:e.addTitle,officialHead:e.editorImg})}}else this.$api.find.editor_dongtai(function(){e.$notify({type:"success",message:"修改动态成功！",title:"成功"}),e.$router.push({name:"discoverOfficial"})},{id:this.$route.params.id,label:this.labelNameId,content:this.articleContent,coverResources:0==this.updateType?this.imgs:1==this.updateType?this.addVideo.split(" "):2==this.updateType?this.addAudio.split(" "):null,second:""==this.second?null:Math.floor(this.second),coverType:this.updateType,officialName:""==this.addTitle?null:this.addTitle,officialHead:this.editorImg})},checkLabel:function(e){this.labelName=e.name,this.labelNameId=e.id,this.dialogVisible=!1},addPost:function(){var e=this;if(void 0==this.articleContent||void 0==this.addTitle||void 0==this.editorImg)this.$notify.error({type:"waring",message:"请完善内容再进行添加！",title:"警告"});else if(void 0!==this.articleContent&&void 0!==this.addTitle&&void 0!==this.editorImg)if(2==this.updateType){var t=document.getElementById("audio_duration");if(null!=t)t.load(),t.oncanplay=function(){e.$api.find.editor_dongtai(function(){e.$notify({type:"success",message:"新增动态成功！",title:"成功"}),e.$router.push({name:"discoverOfficial"})},{content:e.articleContent,coverResources:0==e.updateType?e.imgs:1==e.updateType?e.addVideo.split(" "):2==e.updateType?e.addAudio.split(" "):null,second:""==e.second?null:Math.floor(t.duration),coverType:e.updateType,officialName:""==e.addTitle?null:e.addTitle,officialHead:e.editorImg})}}else this.$api.find.add_dongtai(function(){e.$notify({type:"success",message:"新增动态成功！",title:"成功"}),e.$router.push({name:"discoverOfficial"})},{content:this.articleContent,coverResources:0==this.updateType?this.imgs:1==this.updateType?this.addVideo.split(" "):2==this.updateType?this.addAudio.split(" "):null,second:""==this.second?null:Math.floor(this.second),coverType:0!==this.updateType||1!==this.updateType?0:this.updateType,officialName:""==this.addTitle?null:this.addTitle,officialHead:this.editorImg})},getOfficalHead:function(){var e=this;this.$api.find.get_offical_head(function(t){e.editorImg=t.officialHead,e.addTitle=t.officialName})}}},s=i("XyMi");var d=function(e){i("nULv"),i("43pq")},l=Object(s.a)(o,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("header",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/discover/official"}}},[e._v("官方动态")]),e._v(" "),"add"==e.$route.query.methods?i("el-breadcrumb-item",{staticClass:"now_page"},[e._v("新增动态")]):i("el-breadcrumb-item",{staticClass:"now_page"},[e._v("修改动态")])],1)],1),e._v(" "),i("div",{staticClass:"box"},[i("div",{staticClass:"add_head",on:{click:e.selectIcon}},[i("img",{attrs:{src:e.$oss.url+e.editorImg,alt:"",width:"150",height:"150"}}),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:e.plusShow,expression:"plusShow"}],staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),i("input",{ref:"iconFile",staticStyle:{display:"none"},attrs:{accept:"image/jpeg, image/png",type:"file",name:"icon"},on:{change:e.iconFileChange}}),e._v(" "),i("el-input",{staticClass:"add_title",attrs:{size:"small"},model:{value:e.addTitle,callback:function(t){e.addTitle=t},expression:"addTitle"}}),e._v(" "),i("div",{staticClass:"edit",staticStyle:{width:"800px",margin:"15px",float:"left"}},[i("el-input",{staticStyle:{width:"90%","margin-left":"5%"},attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.articleContent,callback:function(t){e.articleContent=t},expression:"articleContent"}})],1),e._v(" "),i("main",[i("ul",[0==this.updateType||void 0==this.updateType?i("li",[e._l(e.imgs,function(t,a){return i("div",{key:a},[i("img",{staticClass:"upadte_img",attrs:{src:e.$oss.url+t,alt:""}}),e._v(" "),i("i",{staticClass:"el-icon-circle-close-outline delete",on:{click:function(t){e.deleteImg(a)}}})])}),e._v(" "),1==e.addImgShow?i("div",{staticStyle:{width:"150px",height:"150px"}},[i("img",{staticClass:"upadte_img",attrs:{src:e.$oss.url+e.addImg,alt:""},on:{click:function(t){e.selectIcon(0)}}}),e._v(" "),i("i",{staticClass:"el-icon-plus",staticStyle:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)","font-size":"16px"},on:{click:function(t){e.selectIcon(0)}}})]):e._e()],2):e._e(),e._v(" "),1==this.updateType||void 0==this.updateType?i("li",[""!==e.addVideo&&0==e.imgs.length?i("video",{attrs:{src:e.$oss.url+e.addVideo,controls:"controls",width:"200",height:"200"}}):e._e(),e._v(" "),""!==e.addVideo?i("el-button",{staticStyle:{display:"block"},attrs:{size:"mini",type:"danger"},on:{click:function(t){e.deleteVideo()}}},[e._v("删除视频")]):e._e()],1):e._e(),e._v(" "),2==this.updateType||void 0==this.updateType?i("li",[""!==e.addAudio&&0==e.imgs.length?i("audio",{attrs:{src:e.$oss.url+e.addAudio,controls:"controls",id:"audio_duration"}}):e._e(),e._v(" "),""!==e.addAudio?i("el-button",{staticStyle:{display:"block"},attrs:{size:"mini",type:"danger"},on:{click:function(t){e.deleteAudio()}}},[e._v("删除音频")]):e._e()],1):e._e()])]),e._v(" "),i("br"),e._v(" "),i("ul",{staticClass:"shangchuan_ul"},[i("li",[i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.imgShow,expression:"imgShow"}],attrs:{icon:"el-icon-picture"},on:{click:function(t){e.selectIcon(0)}}},[e._v("上传图片")])],1),e._v(" "),i("li",[i("input",{ref:"videoFile",staticStyle:{display:"none"},attrs:{accept:"video/*",type:"file",name:"icon"},on:{change:e.iconFileChange}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.videoShow,expression:"videoShow"}],attrs:{icon:"el-icon-mobile-phone"},on:{click:function(t){e.selectIcon(1)}}},[e._v("上传视频")])],1),e._v(" "),i("li",[i("input",{ref:"audioFile",staticStyle:{display:"none"},attrs:{accept:"audio/*",type:"file",name:"icon"},on:{change:e.iconFileChange}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.audioShow,expression:"audioShow"}],attrs:{icon:"el-icon-service"},on:{click:function(t){e.selectIcon(2)}}},[e._v("上传音频")])],1)]),e._v(" "),i("div",{staticClass:"editor"},["add"!==this.$route.query.methods?i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.editorPost()}}},[e._v("修改")]):e._e(),e._v(" "),"add"==this.$route.query.methods?i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addPost()}}},[e._v("添加")]):e._e()],1),e._v(" "),i("el-dialog",{attrs:{title:"标签",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("ul",{staticClass:"label_item"},e._l(e.labelData,function(t,a){return i("li",{key:a,on:{click:function(i){e.checkLabel(t)}}},[e._v("\n        "+e._s(t.name)+"\n      ")])}),0)])],1)])},[],!1,d,"data-v-118e9c02",null);t.default=l.exports},nULv:function(e,t){}});