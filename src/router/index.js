import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import flipCard from '@/pages/flipCard'

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
  ]
})
