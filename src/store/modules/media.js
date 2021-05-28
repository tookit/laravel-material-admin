import request from '@/util/request'

const state = {
  types: [],
}

// getters
const getters = {
  getMediaType: (state) => {
    const temp = []
    for (let type in state.types) {
      temp.push({
        text: type,
        value: type,
      })
    }
    return temp
  },
}

// actions
const actions = {
  fetchMedia(context, query) {
    return request({
      url: `media`,
      method: 'get',
      params: query,
    })
  },
  fetchMediaType({ commit }) {
    return request({
      url: `media/type`,
      method: 'get',
    }).then((resp) => {
      commit('SET_MEDIA_TYPE', resp.data)
      return resp
    })
  },

  deleteMedia(context, id) {
    return request({
      url: `media/${id}`,
      method: 'delete',
    })
  },
}

// mutations
const mutations = {
  SET_MEDIA_TYPE(state, data) {
    state.types = data
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
