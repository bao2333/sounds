import Layout2 from '@/layout/Layout2'

export default [{
  path: '/money',
  component: Layout2,
  children: [{
    path: 'caiwuCard',
    name:'MoneyCaiwuCard',
    meta:{
      title:'财务账单'
    },
    component: resolve => require(['@/view/money/caiwuCard'],resolve)
  },{
    path: 'tixianshoufei',
    name:'MoneyTixianshoufei',
    meta:{
      title:'提现收费'
    },
    component: resolve => require(['@/view/money/tixianshoufei'],resolve)
  },{
    path: 'userCard',
    name:'MoneyUserCard',
    meta:{
      title:'用户账单'
    },
    component: resolve => require(['@/view/money/userCard'],resolve)
  },]
}, {
    path: '/shenfen',
    component: Layout2,
    children: [
      {
        path: 'shenhe',
        name: 'MoneyShenfenshenhe',
        meta: {
          title: '身份审核'
        },
        component: resolve => require(['@/view/money/shenfenshenhe'], resolve)
      },
    ]
    
}]
