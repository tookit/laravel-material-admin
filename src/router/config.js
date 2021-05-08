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
      title: i18n.t('server error'),
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
      //cms
      {
        path: '/cms',
        name: 'cms.index',
        meta: {
          title: i18n.t('cms'),
          icon: 'mdi-newspaper',
        },
        component: RouterWrapper,
        redirect: {
          path: '/cms/post/list',
        },
        children: [
          {
            path: '/cms/post/list',
            name: 'cms.post.list',
            component: () => import('@/views/cms/post/PostList.vue'),
            meta: {
              title: i18n.t('post'),
              icon: 'mdi-post',
            },
          },
          // {
          //   path: '/cms/tag/list',
          //   name: 'cms.tag.list',
          //   component: () => import('@/views/cms/tag/TagList.vue'),
          //   meta: {
          //     title: i18n.t('tag'),
          //     icon: 'mdi-tag',
          //   },
          // },
          // {
          //   path: '/cms/category/list',
          //   name: 'cms.category.list',
          //   component: () => import('@/views/cms/category/CategoryList.vue'),
          //   meta: {
          //     title: i18n.t('category'),
          //     icon: 'mdi-tag',
          //   },
          // },
        ],
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
