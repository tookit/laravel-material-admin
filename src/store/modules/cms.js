import request from '@/util/request'

const state = {
  categories: [],
}

// getters
const getters = {
  getPostCategory: (state) => {
    return state.categories
  },
}

// actions
const actions = {
  fetchPost(context, query) {
    return request({
      url: `cms/post`,
      method: 'get',
      params: query,
    })
  },
  createPost(context, data) {
    return request({
      url: `cms/post`,
      method: 'post',
      data: data,
    })
  },
  updatePost(context, { id, data }) {
    return request({
      url: `cms/post/${id}`,
      method: 'put',
      data: data,
    })
  },
  deletePost(context, id) {
    return request({
      url: `cms/post/${id}`,
      method: 'delete',
    })
  },

  fetchTag(context, query) {
    return request({
      url: `cms/tag`,
      method: 'get',
      params: query,
    })
  },
  createTag(context, data) {
    return request({
      url: `cms/tag`,
      method: 'post',
      data: data,
    })
  },
  updateTag(context, { id, data }) {
    return request({
      url: `cms/tag/${id}`,
      method: 'put',
      data: data,
    })
  },
  deleteTag(context, id) {
    return request({
      url: `cms/tag/${id}`,
      method: 'delete',
    })
  },

  fetchPostCategory(context, query) {
    return request({
      url: `cms/category`,
      method: 'get',
      params: query,
    }).then((resp) => {
      if (query.pageSize === -1) {
        context.commit('SET_POST_CATEGORIES', resp.data)
      }
      return resp
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
  SET_POST_CATEGORIES(state, data) {
    state.categories = data
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
