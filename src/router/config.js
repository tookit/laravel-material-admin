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
      title: i18n.t('home'),
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
        component: RouteWrapper,
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
          {
            path: '/cms/category/list',
            name: 'cms.category.list',
            component: () => import('@/views/cms/category/CategoryList.vue'),
            meta: {
              title: i18n.t('category'),
              icon: 'mdi-newspaper-variant-multiple',
            },
          },
          {
            path: '/cms/tag/list',
            name: 'cms.tag.list',
            component: () => import('@/views/cms/tag/TagList.vue'),
            meta: {
              title: i18n.t('tag'),
              icon: 'mdi-tag',
            },
          },
          ,
        ],
      },

      //acl
      {
        path: '/acl',
        name: 'acl.index',
        meta: {
          title: i18n.t('acl'),
          icon: 'mdi-shield-account-outline',
        },
        component: RouteWrapper,
        redirect: {
          path: '/acl/user/list',
        },
        children: [
          {
            path: '/acl/user/list',
            name: 'acl.user.list',
            component: () => import('@/views/acl/user/UserList.vue'),
            meta: {
              title: i18n.tc('user'),
              icon: 'mdi-account',
            },
          },
          {
            path: '/acl/role/list',
            name: 'acl.role.list',
            component: () => import('@/views/acl/role/RoleList.vue'),
            meta: {
              title: i18n.t('role'),
              icon: 'mdi-account-group',
            },
          },
          {
            path: '/acl/permission/list',
            name: 'acl.permission.list',
            component: () => import('@/views/acl/permission/PermissionList.vue'),
            meta: {
              title: i18n.t('permission'),
              icon: 'mdi-account-group',
            },
          },
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
