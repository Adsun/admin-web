import { getUserList, addUser, updateConstant, getLimits, deleteUser, getUserLimit, updateUserLimit } from '@/api/system'

const system = {
  state: {
  },

  mutations: {
  },
  actions: {
    // 获取结算方式/附加服务/行业/品牌
    updateConstant({ commit }, param) {
      return new Promise((resolve, reject) => {
        updateConstant(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 权限管理列表
    getUserLimit({ commit }, param) {
      return new Promise((resolve, reject) => {
        getUserLimit(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户列表
    getUserList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getUserList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增编辑用户信息
    creatUser({ commit }, param) {
      return new Promise((resolve, reject) => {
        addUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取权限页面列表
    getLimitsList({ commit }) {
      return new Promise((resolve, reject) => {
        getLimits().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除用户
    removeUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新用户页面编辑查看权限
    updateUserLimits({ commit }, params) {
      return new Promise((resolve, reject) => {
        debugger
        updateUserLimit(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default system
