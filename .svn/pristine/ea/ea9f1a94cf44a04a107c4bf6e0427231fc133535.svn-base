import Layout2 from '@/layout/Layout2'

export default [{
  path: '/deal',
  component: Layout2,
  children: [{
    path: 'pourOutFa',
    name:'dealPoutOutFa',
    meta:{
      title:'倾诉（发标）'
    },
    component: resolve => require(['@/view/deal/pourOutFa'],resolve)
  },{
    path: 'pourOutJie',
    name:'dealPoutOutJie',
    meta:{
      title:'倾诉（接标）'
    },
    component: resolve => require(['@/view/deal/pourOutJie'],resolve)
  },{
    path: 'soundStore',
    name:'dealSoundStore',
    meta:{
      title:'审核商城'
    },
    component: resolve => require(['@/view/deal/soundStore'],resolve)
  },{
    path: 'soundAudit',
    name:'dealSoundAudit',
    meta:{
      title:'查阅商城'
    },
    component: resolve => require(['@/view/deal/soundAudit'],resolve)
  },{
    path: 'personal',
    name: 'dealPersonal',
    meta: {
      title: '个人介绍'
    },
      component: resolve => require(['@/view/deal/personal'], resolve)
  },]
}]
