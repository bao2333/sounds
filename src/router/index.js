import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import globals from '@/globals'

Vue.use(Router)
Vue.use(Meta)

import userRoutes from './userManage'
import labelRoutes from './labelManage'
import discoverRoutes from './discoverManage'
import dealRoutes from './dealManage'
import informationRoutes from './informationMange'
import moneyRoutes from './moneyManage'
import reportRoutes from './reportManage'
import setRoutes from './setManage'
import pageRoutes from './startPageManage'
import loginRoutes from './login'
import burying from './burying'
import classification from './classification'
import adminPermission from './adminPermission'
import workclassify from './workclassify'

const ROUTES = [
  { path: '', redirect: '/login'},
]
  .concat(userRoutes)
  .concat(labelRoutes)
  .concat(discoverRoutes)
  .concat(dealRoutes)
  .concat(informationRoutes)
  .concat(moneyRoutes)
  .concat(reportRoutes)
  .concat(setRoutes)
  .concat(pageRoutes)
  .concat(loginRoutes)
  .concat(burying)
  .concat(classification)
  .concat(adminPermission)
  .concat(workclassify)

const router = new Router({
  base: '/',
  mode: 'hash',
  routes: ROUTES
})


router.afterEach(() => {
  // On small screens collapse sidenav
  if (window.layoutHelpers && window.layoutHelpers.isSmallScreen() && !window.layoutHelpers.isCollapsed()) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10)
  }

  // Scroll to top of the page
  globals().scrollTop(0, 0)
})

router.beforeEach((to, from, next) => {
  // Set loading state
  document.body.classList.add('app-loading')

  // Add tiny timeout to finish page transition
  setTimeout(() => next(), 10)
})

export default router
