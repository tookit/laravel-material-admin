import request from '@/util/request'

const state = {
  flags: [
    {
      text: 'Inactive',
      value: 0,
    },
    {
      text: 'Active',
      value: 1,
    },
    {
      text: 'Frozen',
      value: 2,
    },
  ],
  genders: [
    {
      text: 'Male',
      value: 'male',
    },
    {
      text: 'Female',
      value: 'female',
    },
    {
      text: 'Other',
      value: 'other',
    },
  ],
  roles: [],
}

// getters
const getters = {
  getUserFlags: (state) => state.flags,
  getUserGenders: (state) => state.genders,
  getUserRoles: (state) => state.roles,
}

// actions
const actions = {
  fetchUser(context, query) {
    return request({
      url: `/acl/user/`,
      method: 'get',
      params: query,
    })
  },
  createUser(context, data) {
    return request({
      url: `/acl/user/`,
      method: 'post',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  updateUser(context, { id, data }) {
    return request({
      url: `/acl/user/${id}`,
      method: 'put',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  getUserById(context, id) {
    return request({
      url: `/acl/user/${id}`,
      method: 'get',
    }).then((resp) => {
      return resp
    })
  },

  //role
  fetchRole(context, query) {
    return request({
      url: `/acl/role/`,
      method: 'get',
      params: query,
    }).then((resp) => {
      if (query.pageSize === -1) {
        context.commit('SET_ROLES', resp.data)
      }
      return resp
    })
  },
  createRole(context, data) {
    return request({
      url: `/acl/role/`,
      method: 'post',
      data: data,
    })
  },
  updateRole(context, { id, data }) {
    return request({
      url: `/acl/role/${id}`,
      method: 'put',
      data: data,
    })
  },
  getRoleById(context, id) {
    return request({
      url: `/acl/role/${id}`,
      method: 'get',
    })
  },

  //permission
  fetchPermission(context, query) {
    return request({
      url: `/acl/permission/`,
      method: 'get',
      params: query,
    })
  },
  createPermission(context, data) {
    return request({
      url: `/acl/permission/`,
      method: 'post',
      data: data,
    })
  },
  updatePermission(context, { id, data }) {
    return request({
      url: `/acl/permission/${id}`,
      method: 'put',
      data: data,
    })
  },
  getPermissionById(context, id) {
    return request({
      url: `/acl/permission/${id}`,
      method: 'get',
    })
  },
}

// mutations
const mutations = {
  SET_ROLES(state, data) {
    state.roles = data.map((role) => {
      return {
        id: role.id,
        name: role.name,
      }
    })
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
