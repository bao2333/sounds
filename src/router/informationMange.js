import Layout2 from '@/layout/Layout2'

export default [{
  path: '/information',
  component: Layout2,
  children: [{
    path: 'official',
    name:'informationOfficial',
    meta:{
      title:'官方消息'
    },
    component: resolve => require(['@/view/information/official'],resolve)
  },{
    path: 'activity',
    name:'informationActivity',
    meta:{
      title:'推动活动'
    },
    component: resolve => require(['@/view/information/activity'],resolve)
    }, {
      path: 'add',
      name: 'informationAdd',
      meta: {
        title: '新增活动'
      },
      component: resolve => require(['@/view/information/addInformation'], resolve)
    }, {
      path: 'editor',
      name: 'informationEditor',
      meta: {
        title: '编辑动态'
      },
      component: resolve => require(['@/view/information/editorInformation'], resolve)
    }, {
      path: 'rollingBroadcast',
      name: 'rollingBroadcast',
      meta: {
        title: '滚动广播'
      },
      component: resolve => require(['@/view/information/rollingBroadcast'], resolve)
    },
]
}]
