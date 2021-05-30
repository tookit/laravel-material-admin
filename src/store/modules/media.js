import request from '@/util/request'

const state = {
  types: [],
  icons: [
    {
      ext: 'ico',
      icon: '#icon-weizhi',
    },
    {
      ext: 'html',
      icon: '#icon-html',
    },
    {
      ext: 'video',
      icon: '#icon-Video',
    },
    {
      ext: 'png',
      icon: '#icon-pic',
    },
    {
      ext: 'jpg',
      icon: '#icon-pic',
    },
    {
      ext: 'jpeg',
      icon: '#icon-pic',
    },
    {
      ext: 'json',
      icon: '#icon-json',
    },
    {
      ext: 'js',
      icon: '#icon-json',
    },
    {
      ext: 'svg',
      icon: '#icon-SVG',
    },
  ],
}

// getters
const getters = {
  getIconByExt: (state) => (ext) => {
    const find = state.icons.find((item) => item.ext === ext)
    return find ? find.icon : '#icon-weizhi'
  },
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
