import Layout2 from '@/layout/Layout2'

export default [{
  path: '/classification',
  component: Layout2,
  children: [
    {
      path: 'classifiedcontent',
      name:'classifiedcontent',
      meta:{
        title:'用户文章管理'
      },
      component: resolve => require(['@/view/classification/classifiedcontent'],resolve),
      children: [{
        path: 'classifiedpic',
        name:'classifiedpic',
        meta:{
          title:'分类图片'
        },
        components: {
          default: resolve => require(['@/view/classification/classifiedpic'],resolve),
          first: resolve => require(['@/view/classification/First'],resolve)
        }
      }]
    },
    {
      path: 'officialupload',
      name:'officialupload',
      meta:{
        title:'官方上传管理'
      },
      component: resolve => require(['@/view/classification/OfficialUpload.vue'],resolve),
    },
    {
      path: 'homerecommendation',
      name:'homerecommendation',
      meta:{
        title:'首页推荐内容'
      },
      component: resolve => require(['@/view/classification/HomeRecommendation.vue'],resolve),
    },
    {
      path: 'secondsort',
      name: 'secondsort',
      meta:{
        title:'二级分类排序'
      },
      component: resolve => require(['@/view/classification/secondSort.vue'],resolve),
    },
    {
      path: 'recommendedtoday',
      name: 'recommendedtoday',
      meta:{
        title:'今日推荐'
      },
      component: resolve => require(['@/view/classification/RecommendedToday.vue'],resolve),
    }
  ]
}]
