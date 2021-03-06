import Layout2 from '@/layout/Layout2'

export default [{
  path: '/report',
  component: Layout2,
  children: [{
    path: 'userReport',
    name:'userReport',
    meta:{
      title:'用户举报'
    },
    component: resolve => require(['@/view/report/userReport'],resolve)
  },{
    path: 'userClose',
    name:'userClose',
    meta:{
      title:'查封账户'
    },
    component: resolve => require(['@/view/report/userClose'],resolve)
    }, {
      path: 'jubaoContent',
      name: 'jubaoContent',
      meta: {
        title: '举报内容设置'
      },
      component: resolve => require(['@/view/report/jubaoContent'], resolve)
    }]
}]
