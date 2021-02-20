import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Index'
import Content from '@/views/home/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content/:id',
      name: 'content',
      component: Content
    }
  ]
})
