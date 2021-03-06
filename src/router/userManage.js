import Layout2 from '@/layout/Layout2'

export default [{
  path: '/users',
  component: Layout2,
  children: [{
    path: 'list',
    name:'userList',
    meta:{
      title:'统计列表'
    },
    component: resolve => require(['@/view/users/userList'],resolve)
  },{
    path: 'record',
    name:'userRecord',
    meta:{
      title:'档案搜索'
    },
    component: resolve => require(['@/view/users/userRecord'],resolve)
  },{
      path: '/personalFile/:userId',
    name:'userPersonalFile',
    meta:{
      title:'个人档案'
    },
    component: resolve => require(['@/view/users/personalFile'],resolve)
  },{
    path: 'head',
    name:'userHead',
    meta:{
      title:'头像设置'
    },
    component: resolve => require(['@/view/users/userHead'],resolve)
  },{
    path: 'newv',
    name:'userNewV',
    meta:{
      title:'新秀/大V'
    },
    component: resolve => require(['@/view/users/userNewV'],resolve)
  },{
    path: '/home/:userId',
    name:'userHome',
    meta:{
      title:'个人主页'
    },
    component: resolve => require(['@/view/users/userHome'],resolve)
  },]
}]
