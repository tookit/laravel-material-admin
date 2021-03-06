import request from '@/util/request'
import colors from 'vuetify/es5/util/colors'

const randomColor = () => {
  const temp = Object.keys(colors)
  const key = temp[Math.floor(Math.random() * temp.length)]
  const color = colors[key].base
  return color
}

const state = {
  access_token: null,
  expires_in: 3600, // minutes
  expire_at: 0,
  token_type: 'bearer',
  username: 'admin',
  avatar: null,
  userColor: '#2196f3',
  status: 'online',
}
const getters = {
  getAccessToken: (state) => {
    return state.access_token
  },
  getExpire: (state) => {
    let milliseconds = new Date().getTime()
    return milliseconds + state.expires_in * 60 * 1000
  },
  getAvatar: (state) => state.avatar,
  getUsername: (state) => state.username,
  getUserStatus: (state) => state.status,
}
const actions = {
  login({ commit, dispatch }, { username, password }) {
    return request({
      url: '/auth/login',
      method: 'post',
      data: {
        username,
        password,
      },
    }).then((resp) => {
      commit('SET_LOGIN', resp)
      dispatch('fetchProfile')
    })
  },
  register({ commit, dispatch }, data) {
    return request({
      url: '/auth/register',
      method: 'post',
      data: data,
    }).then((resp) => {
      commit('SET_LOGIN', resp)
      dispatch('fetchProfile')
      return resp
    })
  },
  logout({ commit, dispatch }) {
    commit('SET_ACCESS_TOKEN', null)
  },
  // get current login user info

  fetchProfile({ commit, dispatch, rootState }) {
    return request({
      url: '/me',
      method: 'get',
    }).then((resp) => {
      commit('SET_LOGIN_PROFILE', resp.data)
      return resp
    })
  },
  updateProfile({ commit }, data) {
    return request({
      url: '/me',
      method: 'post',
      data: data,
    }).then((resp) => {
      commit('SET_LOGIN_PROFILE', resp.data)
      return resp
    })
  },
}
const mutations = {
  SET_LOGIN(state, { access_token, expires_in }) {
    state.access_token = access_token
    state.expires_in = expires_in
  },
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
  },
  SET_LOGIN_PROFILE(state, payload) {
    state.username = payload.username
    state.avatar = payload.avatar
    state.color = randomColor()
  },
  UPDATE_SELF_STATUS(state, status) {
    state.status = status
  },
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
