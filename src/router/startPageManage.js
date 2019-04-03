import Layout2 from '@/layout/Layout2'

export default [{
  path: '/page',
  component: Layout2,
  children: [{
    path: 'start',
    name:'startPage',
    meta:{
      title:'启动页'
    },
    component: resolve => require(['@/view/startPage/start'],resolve)
  },{
    path: 'yindao',
    name:'yindaoPage',
    meta:{
      title:'引导页'
    },
    component: resolve => require(['@/view/startPage/yindao'],resolve)
  }]
}]
