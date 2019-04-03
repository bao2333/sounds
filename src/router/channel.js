import Layout2 from '@/layout/Layout2'

export default [{
  path: '/channel',
  component: Layout2,
  children: [{
    path: 'timeslot',
    name:'timeSlot',
    meta:{
      title:'时段详情'
    },
    component: resolve => require(['@/view/channel/timeSlot'],resolve)
  },{
    path: 'channellist',
    name:'channelList',
    meta:{
      title:'渠道列表'
    },
    component: resolve => require(['@/view/channel/channelList'],resolve)
    }]
}]
