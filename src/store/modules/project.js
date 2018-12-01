import {addProject,projectUpdate,projectState,deleteProjects,finishProjects,projectDetails,projectNodeState,generalLink,getCooper,submitCooper} from '@/api/project'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const project = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 新增項目
    createProject({ commit }, param) {
      return new Promise((resolve, reject) => {
        addProject(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取进行中项目列表数据
    projectUpdateList({ commit }, param) {
      return new Promise((resolve, reject) => {
        projectUpdate(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有已归档项目列表
    finishProjectList({ commit }, param) {
      return new Promise((resolve, reject) => {
        finishProjects(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有已删除项目列表数据
    deleteProjectList({ commit }, param) {
      return new Promise((resolve, reject) => {
        deleteProjects(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改项目状态以及节点信息
    state({ commit }, param) {
      return new Promise((resolve, reject) => {
        projectState(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改项目节点状态
    nodeState({ commit }, param) {
      return new Promise((resolve, reject) => {
        projectNodeState(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查看项目详情
    projectDetail({ commit }, param) {
      return new Promise((resolve, reject) => {
        projectDetails(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 协作邀请表单提交
    linkSbumit({ commit }, param) {
      return new Promise((resolve, reject) => {
        generalLink(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查看协作任务邀请详情
    getCooper({ commit }, param) {
      return new Promise((resolve, reject) => {
        getCooper(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交协作任务
    submitCooper({ commit }, param) {
      return new Promise((resolve, reject) => {
        submitCooper(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default project
