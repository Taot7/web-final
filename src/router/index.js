import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
      meta: {
        requiresAuth: false,
        title: '登录'
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/login/ForgotPassword.vue'),
      meta: {
        title: '忘记密码',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/login/Register.vue'),
      meta: {
        title: '注册',
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: () => import('@/views/personCenter/PersonCenter.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/views/Student.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/views/TeacherPage/Teacher.vue')
    },
  ],
})

export default router
