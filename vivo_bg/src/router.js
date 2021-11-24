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
        { path: '/stu', name: 'stu', component: () => import('./views/Student.vue') },
        { path: '/adminManage', name: 'adminManage', component: () => import('./views/AdminManage.vue') },
        { path: '/news', name: 'news', component: () => import('./views/news.vue') }
      ]
    }
  ]
})
