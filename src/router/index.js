import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import flipCard from '@/pages/flipCard'
import lotteryDraw from '@/pages/lotteryDraw'
import puzzleDrag from '@/pages/puzzleDrag'
import puzzleSwipe from '@/pages/puzzleSwipe'
import huarongdao from '@/pages/huarongdao'
import hongbaoyu from '@/pages/hongbaoyu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/flipCard',
      name: 'flipCard',
      component: flipCard
    },
    {
      path: '/lotteryDraw',
      name: 'lotteryDraw',
      component: lotteryDraw
    },
    {
      path: '/puzzleDrag',
      name: 'puzzleDrag',
      component: puzzleDrag
    },
    {
      path: '/puzzleSwipe',
      name: 'puzzleSwipe',
      component: puzzleSwipe
    },
    {
      path: '/huarongdao',
      name: 'huarongdao',
      component: huarongdao
    },
    {
      path: '/hongbaoyu',
      name: 'hongbaoyu',
      component: hongbaoyu
    },
  ]
})
