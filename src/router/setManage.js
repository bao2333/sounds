import Layout2 from '@/layout/Layout2'

export default [{
  path: '/set',
  component: Layout2,
  children: [{
    path: 'about',
    name:'setAbout',
    meta:{
      title:'关于我们'
    },
    component: resolve => require(['@/view/set/about'],resolve)
  },{
    path: 'editorAbout',
    name: 'editorAbout',
    meta: {
      title: '编辑关于我们'
    },
    component: resolve => require(['@/view/set/editorAbout'], resolve)
    },{
    path: 'opinion',
    name:'setOpinion',
    meta:{
      title:'意见反馈'
    },
    component: resolve => require(['@/view/set/opinion'],resolve)
  },{
      path: 'privacy',
    name:'setPrivacy',
    meta:{
      title:'隐私和协议'
    },
    component: resolve => require(['@/view/set/privacy'],resolve)
  },{
      path: '/privacyEditor/:type',
      name: 'setPrivacyEditor',
      meta: {
        title: '协议修改'
      },
      component: resolve => require(['@/view/set/privacyEditor'], resolve)
  },{
    path: 'update',
    name:'setUpdate',
    meta:{
      title:'升级维护'
    },
    component: resolve => require(['@/view/set/update'],resolve)
    },{
    path: 'shensu',
    name: 'setShensu',
    meta: {
      title: '申诉'
    },
      component: resolve => require(['@/view/set/shensu'], resolve)
    },{
      path: 'defaultHead',
      name: 'setDefaultHead',
      meta: {
        title: '默认头像、语音'
      },
      component: resolve => require(['@/view/set/defaultHead'], resolve)
    },{
      path: 'role',
      name: 'setRole',
      meta: {
        title: '默认头像、语音'
      },
      component: resolve => require(['@/view/set/role'], resolve)
    },{
      path: 'applePay',
      name: 'setApplePay',
      meta: {
        title: 'Apple Pay设置'
      },
      component: resolve => require(['@/view/set/applePay'], resolve)
    },
  ]
}]
