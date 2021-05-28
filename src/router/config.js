import { LayoutAuth, LayoutDefault, RouteWrapper } from '@/components/layouts'

export const publicRoute = [
  {
    path: '*',
    component: () => import('@/views/error/NotFound.vue'),
  },
  {
    path: '/auth',
    component: LayoutAuth,
    meta: {
      title: 'login',
    },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          title: 'login',
        },
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    meta: {
      title: 'not found',
    },
    component: () => import('@/views/error/NotFound.vue'),
  },

  {
    path: '/500',
    name: '500',
    meta: {
      title: 'server error',
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
          title: 'dashboard',
          icon: 'mdi-view-dashboard',
        },
        component: () => import('@/views/Dashboard.vue'),
      },
      //cms
      {
        path: '/cms',
        name: 'cms.index',
        meta: {
          title: 'cms',
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
              title: 'post',
              icon: 'mdi-post',
            },
          },
          {
            path: '/cms/post/edit/:id',
            name: 'cms.post.list',
            props: true,
            component: () => import('@/views/cms/post/PostItem.vue'),
            meta: {
              title: 'Post Edit',
              icon: 'mdi-post',
              hidden: true,
            },
          },
          {
            path: '/cms/category/list',
            name: 'cms.category.list',
            component: () => import('@/views/cms/category/CategoryList.vue'),
            meta: {
              title: 'category',
              icon: 'mdi-newspaper-variant-multiple',
            },
          },
          {
            path: '/cms/tag/list',
            name: 'cms.tag.list',
            component: () => import('@/views/cms/tag/TagList.vue'),
            meta: {
              title: 'tag',
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
          title: 'acl',
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
              title: 'user',
              icon: 'mdi-account',
            },
          },
          {
            path: '/acl/role/list',
            name: 'acl.role.list',
            component: () => import('@/views/acl/role/RoleList.vue'),
            meta: {
              title: 'role',
              icon: 'mdi-account-group',
            },
          },
          {
            path: '/acl/permission/list',
            name: 'acl.permission.list',
            component: () => import('@/views/acl/permission/PermissionList.vue'),
            meta: {
              title: 'permission',
              icon: 'mdi-key',
            },
          },
        ],
      },

      //task
      {
        path: '/pms',
        name: 'task.index',
        meta: {
          title: 'task',
          icon: 'mdi-view-list',
        },
        component: RouteWrapper,
        redirect: {
          path: '/pms/task/list',
        },
        children: [
          {
            path: '/pms/task/list',
            name: 'pms.task.list',
            component: () => import('@/views/pms/task/TaskList.vue'),
            meta: {
              title: 'task',
              icon: 'mdi-format-list-checks',
            },
          },
          {
            path: '/pms/project/list',
            name: 'pms.project.list',
            component: () => import('@/views/pms/project/ProjectList.vue'),
            meta: {
              title: 'project',
              icon: 'mdi-view-list',
            },
          },
        ],
      },

      {
        path: '/media',
        name: 'Media',
        meta: {
          title: 'media',
          icon: 'mdi-image',
        },
        component: () => import('@/views/media/MediaList.vue'),
      },

      {
        path: '/me',
        name: 'Profile',
        meta: {
          title: 'profile',
          hidden: true,
        },
        component: () => import('@/views/profile/Index.vue'),
      },
      {
        path: '/403',
        name: 'Forbidden',
        meta: {
          title: 'access deny',
          hidden: true,
        },
        component: () => import('@/views/error/Deny.vue'),
      },
    ],
  },
]
