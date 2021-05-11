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
}

// getters
const getters = {
  getUserFlags: (state) => state.flags,
  getUserGenders: (state) => state.genders,
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
}

// mutations
const mutations = {}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
