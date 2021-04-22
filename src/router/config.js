import { LayoutAuth, LayoutDefault, RouteWrapper } from '@/components/layouts'
import i18n from '../plugins/i18n'

export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue'),
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: i18n.t('login'),
    },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: i18n.t('login'),
        },
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    meta: {
      title: i18n.t('not found'),
    },
    component: () => import('@/views/error/NotFound.vue'),
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: i18n.t('server error'),
    },
    component: () => import('@/views/error/Error.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/',
    component: LayoutDefault,
    meta: {
      title: 'home',
      icon: '',
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: i18n.t('dashboard'),
          icon: 'mdi-view-dashboard',
        },
        component: () => import('@/views/Dashboard.vue'),
      },

      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: i18n.t('access deny'),
          hidden: true,
        },
        component: () => import('@/views/error/Deny.vue'),
      },
    ],
  },
]
