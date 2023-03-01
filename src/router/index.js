import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      title: '首页',
      path: '/',
      name: 'home',
      component: Home
    },
    {
      title: '创建骨架',
      path: '/Init',
      name: 'Init',
      component: () => import('../views/Init.vue')
    },
    {
      title: '导入外部模型',
      path: '/ImportTheModel',
      name: 'ImportTheModel',
      component: () => import('../views/ImportTheModel.vue')
    }
  ]
})

export default router
