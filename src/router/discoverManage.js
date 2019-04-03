import Layout2 from '@/layout/Layout2'

export default [{
  path: '/discover',
  component: Layout2,
  children: [{
    path: 'official',
    name:'discoverOfficial',
    meta:{
      title:'官方动态'
    },
    component: resolve => require(['@/view/discover/official'],resolve)
  },{
    path: 'editor',
    name:'discoverEditor',
    meta:{
      title:'编辑动态'
    },
    component: resolve => require(['@/view/discover/editor'],resolve)
  },{
    path: 'audit',
    name:'discoverAudit',
    meta:{
      title:'发现审核'
    },
    component: resolve => require(['@/view/discover/audit'],resolve)
  },]
}]
