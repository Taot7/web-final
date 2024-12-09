import { createRouter, createWebHistory } from 'vue-router'
import Course from '@/views/CoursePage/course.vue'
import OnlineCourse from '@/views/CoursePage/onlineCourse.vue'
import Test from '@/views/CoursePage/components/Test.vue'

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
      path: '/course',
      name: 'course',
      component: () => import('@/views/CoursePage/course.vue')
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: () => import('@/views/PersonCenter/PersonCenter.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('@/views/TeacherPage/Teacher.vue')
    },
    {
      path: '/usermanage',
      name: 'usermanage',
      component: () => import('@/views/UserManage/UserManagement.vue')
    },
    {
      path: '/online-course',
      name: 'onlineCourse',
      component: () => import('@/views/CoursePage/onlineCourse.vue')
    },
    {
      path: '/test/:testId/:courseId',
      name: 'Test',
      component: Test,
      props: true
    },
    {
      path: '/uploadTest',
      name: 'uploadTest',
      component: ()=> import('@/views/UploadTest.vue')
    },
    {
      path: '/course/:courseId',
      name: 'course-detail',
      component: () => import('@/views/CoursePage/course.vue')
    }
  ],
})

export default router
