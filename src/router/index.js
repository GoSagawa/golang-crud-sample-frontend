import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import List from '@/components/List'
import Input from '@/components/Input'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/input',
      name: 'Input',
      component: Input
    }
  ]
})
