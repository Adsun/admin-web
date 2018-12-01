import { userHandleLog } from '@/api/dashboard'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const dashboard = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 用户日志列表
    userHandleLog({ commit }) {
      return new Promise((resolve, reject) => {
        userHandleLog().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default dashboard
