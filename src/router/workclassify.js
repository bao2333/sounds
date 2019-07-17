import Layout2 from '@/layout/Layout2'

export default [{
  path: '/workclassify',
  component: Layout2,
  children: [
    {
      path: 'workcontent',
      name:'workcontent',
      meta:{
        title:'作品分类管理'
      },
      component: resolve => require(['@/view/workClassify/workclassifyItem'],resolve)
    },
    {
      path: 'workshow',
      name:'workshow',
      meta:{
        title:'作品分类展示'
      },
      component: resolve => require(['@/view/workClassify/worksShow'],resolve)
    },
    {
      path: 'bgmusicshow',
      name:'bgmusicshow',
      meta:{
        title:'背景音展示'
      },
      component: resolve => require(['@/view/workClassify/bgMusicShow'],resolve)
    },
    {
        path: 'like',
        name:'like',
        meta:{
          title:'猜你喜欢'
        },
        component: resolve => require(['@/view/workClassify/like'],resolve)
      },
  ]
}]
