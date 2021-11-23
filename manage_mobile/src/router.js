import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        login: Login
      },
      children: [
        { path: '/list', name: 'list', component: () => import('./views/list.vue') },
        { path: '/list1', name: 'list1', component: () => import('./views/list1.vue') },
        { path: '/dtl', name: 'dtl', component: () => import('./views/dtl.vue') }
      ]
    }
  ]
})
