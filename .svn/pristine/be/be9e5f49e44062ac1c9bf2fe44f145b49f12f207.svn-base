import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import globals from './globals'
import Popper from 'popper.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueMoment from 'vue-moment'
import * as api from './Api'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.prototype.$api = api;
// oss地址前缀
Vue.prototype.$oss = {
  // url: "http://oss.dev.51zhiyuan.net/"
  url: "http://sounds-miyu.oss-cn-hangzhou.aliyuncs.com/"
};

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(VueQuillEditor)
Vue.use(VueMoment)
// Global RTL flag
Vue.mixin({
  data: globals
})

api.allHandle.handleSuccess = function (response, callback, error) {
  let body = response.data;
  switch (body.event) {
    case 'SUCCESS':
      if (callback) {
        callback(body.data);
      }
      break;
    case 'ERROR':
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      if (error) {
        error(body);
      }
      break;
    case 'EXCEPTION':
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      if (error) {
        error(body);
      }
      break;
    case 'UNAUTHORIZED':
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      if (error) {
        error(body);
      }
      router.push({ name: 'userlogin' });
      break;
    default:
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      // console.log(response)
  }
};
api.allHandle.handleCatch = function (error) {
  console.log(error);
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
