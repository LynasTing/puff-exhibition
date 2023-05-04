import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/amap',
      children: [
        {
          path: '/amap',
         component: () => import('@/views/chart-overview-amap/index.vue')
        }
      ]
    },
    {
      path: '/chart',
      component: () => import('@/views/chart-overview-chart/index.vue')
    },
   
  ]
})
export default router
