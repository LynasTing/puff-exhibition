import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/amap',
      component: Layout,
      children: [
        {
          path: '/amap',
          component: () => import('@/views/chart-overview-amap/index.vue')
        },
        {
          path: '/chart',
          component: () => import('@/views/chart-overview-chart/index.vue')
        }
      ]
    },
   
  ]
})
export default router
