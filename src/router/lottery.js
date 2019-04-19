import Layout2 from '@/layout/Layout2'

export default [{
  path: '/lottery',
  component: Layout2,
  children: [{
    path: 'pricemanagement',
    name:'pricemanagement',
    meta:{
      title:'奖品管理'
    },
    component: resolve => require(['@/view/lottery/priceManagement'],resolve)
  },{
    path: 'stock',
    name:'stock',
    meta:{
      title:'奖品库存'
    },
    component: resolve => require(['@/view/lottery/stock'],resolve)
    }]
}]
