import Layout2 from '@/layout/Layout2'

export default [{
  path: '/burying',
  component: Layout2,
  children: [{
    path: 'nikkatsu',
    name:'userNikkatsu',
    meta:{
      title:'用户的日活'
    },
    component: resolve => require(['@/view/burying/nikkatsu'],resolve)
  },{
    path: 'average',
    name:'userAverage',
    meta:{
      title:'发帖数量'
    },
    component: resolve => require(['@/view/burying/average'],resolve)
    },{
      path: 'staytime',
      name:'stayTime',
      meta:{
        title:'每个板块停留时间'
    },
    component: resolve => require(['@/view/burying/stayTime'],resolve)
    }]
}]
