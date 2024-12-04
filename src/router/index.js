import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    {
      path: '/',
      redirect: '/home',
    },
    { 
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: () => import('@/views/PersonCenter/PersonCenter.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/views/Student.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/views/Teacher.vue')
    },
  ],
})

export default router
