import request from '@/util/request'

const state = {
  catgories: [],
}

// getters
const getters = {}

// actions
const actions = {
  fetchPost(context, query) {
    return request({
      url: `cms/post`,
      method: 'get',
      params: query,
    })
  },
  fetchPostCategory(context, query) {
    return request({
      url: `cms/category`,
      method: 'get',
      params: query,
    })
  },
  createPostCategory(context, data) {
    return request({
      url: `cms/category`,
      method: 'post',
      data: data,
    })
  },
  updatePostCategory(context, { id, data }) {
    return request({
      url: `cms/category/${id}`,
      method: 'put',
      data: data,
    })
  },
  deletePostCategory(context, id) {
    return request({
      url: `cms/category/${id}`,
      method: 'delete',
    })
  },
}

// mutations
const mutations = {
  SET_CMS_CATEGORIES(state, data) {
    state.catgories = data
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
