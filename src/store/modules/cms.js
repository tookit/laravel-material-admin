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
