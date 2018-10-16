import Vue from 'vue'
import Router from 'vue-router'
import First from '@/views/try/firstStep'
import Second from '@/views/try/secondStep'
import report from '@/views/try/report'
import resubmit from '@/views/try/reSubmit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //试用第一页
      name: 'First',
      component: First,
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/second', //中奖后
      name: 'Second',
      component: Second,
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/report', //中奖提交报告
      name: 'report',
      component: report,
      meta:{
        title:'试用流程'
      }
    },  
    {
      name: 'resubmit',//继续抽奖
      path:'/resubmit',
      component: resubmit,
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/stepNav',//步骤导航
      name: 'stepNav',
      component: resolve => require(['@/views/try/stepNav'],resolve),
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/supplyFirst',//中奖后提交申请第一步
      name: 'supplyFirst',
      component: resolve => require(['@/views/try/supplyFirst'],resolve),
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/supplySecond',//中奖后提交申请第二步
      name: 'supplySecond',
      component: resolve => require(['@/views/try/supplySecond'],resolve),
      meta:{
        title:'试用流程'
      }
    },
    {
      path: '/supplyThird',//中奖后提交申请第三步
      name: 'supplyThird',
      component: resolve => require(['@/views/try/supplyThird'],resolve),
      meta:{
        title:'试用流程'
      }
    },
    //认证步骤
    {
      path: '/verity',
      name: 'verity',
      component: resolve => require(['@/views/account/identification'],resolve),
      meta:{
        title:'去认证'
      }
    }
  ]
})

