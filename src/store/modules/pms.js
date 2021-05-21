import request from '@/util/request'

const state = {
  projectStatus: [],
  taskStatus: [],
}

// getters
const getters = {
  getProjectList: (state) => {
    return state.projects.map((item) => {
      return {
        text: item.name,
        value: item.id,
      }
    })
  },
  getProjectStatus: (state) => state.projectStatus,
  getTaskStatus: (state) => state.taskStatus,
  getTaskStatusByValue: (state) => (value) => {
    const find = state.taskStatus.find(item.value === value)
    return find.text
  },
}

// actions
const actions = {
  fetchProject(context, query) {
    return request({
      url: `pms/project`,
      method: 'get',
      params: query,
    }).then((resp) => {
      context.commit('SET_PROJECT', resp.data)
      return resp
    })
  },
  fetchProjectStatus(context) {
    return request({
      url: `pms/project/status`,
      method: 'get',
    }).then((resp) => {
      context.commit('SET_PROJECT_STATUS', resp.data)
      return resp
    })
  },
  createProject(context, data) {
    return request({
      url: `pms/project`,
      method: 'post',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  updateProject(context, { id, data }) {
    return request({
      url: `pms/project/${id}`,
      method: 'put',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  deleteProject(context, id) {
    return request({
      url: `pms/project/${id}`,
      method: 'delete',
    })
  },

  fetchTask(context, query) {
    return request({
      url: `pms/task`,
      method: 'get',
      params: query,
    })
  },
  createTask(context, data) {
    return request({
      url: `pms/task`,
      method: 'post',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  updateTask(context, { id, data }) {
    return request({
      url: `pms/task/${id}`,
      method: 'put',
      data: data,
    }).then((resp) => {
      return resp
    })
  },
  updateTaskStatus(context, { id, status }) {
    return request({
      url: `pms/task/${id}`,
      method: 'put',
      data: {
        status: status,
      },
    }).then((resp) => {
      return resp
    })
  },
  deleteTask(context, id) {
    return request({
      url: `pms/task/${id}`,
      method: 'delete',
    })
  },
  getTaskById(context, id) {
    return request({
      url: `pms/task/${id}`,
      method: 'get',
    }).then((resp) => {
      return resp
    })
  },
}

// mutations
const mutations = {
  SET_PROJECT(state, data) {
    state.projects = data
  },
  SET_PROJECT_STATUS(state, data) {
    state.projectStatus = data.map((text, value) => {
      return {
        text: text,
        value: value,
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
