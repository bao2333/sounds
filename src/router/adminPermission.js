import Layout2 from '@/layout/Layout2'

export default [{
  path: '/admin',
  component: Layout2,
  children: [{
    path: 'adminlist',
    name:'adminList',
    meta:{
      title:'用户的日活'
    },
    component: resolve => require(['@/view/adminPermission/adminList'],resolve)
  }]
}]
