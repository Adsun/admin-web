import { add, getUser, updateFile, downloadFile,getContact } from '@/api/common'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const common = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 新增供应商联系人
    addContact({ commit }, param) {
      return new Promise((resolve, reject) => {
        add(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取联系人
    getUser({ commit }, param) {
      return new Promise((resolve, reject) => {
        getUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取联系人详情
    getContact({ commit }, param) {
      return new Promise((resolve, reject) => {
        getContact(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新附件状态
    update({ commit }, param) {
      return new Promise((resolve, reject) => {
        updateFile(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 下载附件 暂未用到
    download({ commit }, param) {
      return new Promise((resolve, reject) => {
        downloadFile(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default common
